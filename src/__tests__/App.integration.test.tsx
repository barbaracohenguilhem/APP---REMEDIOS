import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import * as ocrScanner from '../services/ocrScanner';
import { MEDICATIONS_CATALOG } from '../data/medications';
import { STORAGE_KEY, createDefaultState } from '../services/storage';

// Mock Web Speech API cleanly for jsdom
function installSpeechMocks() {
  const speakMock = vi.fn();
  const cancelMock = vi.fn();

  class MockUtterance {
    text: string;
    lang = '';
    rate = 1;
    pitch = 1;
    voice: SpeechSynthesisVoice | null = null;
    onstart: (() => void) | null = null;
    onend: (() => void) | null = null;
    onerror: (() => void) | null = null;
    constructor(text: string) {
      this.text = text;
    }
  }

  Object.defineProperty(window, 'SpeechSynthesisUtterance', {
    value: MockUtterance,
    writable: true,
    configurable: true,
  });

  Object.defineProperty(window, 'speechSynthesis', {
    value: {
      speak: speakMock,
      cancel: cancelMock,
      getVoices: () => [{ lang: 'pt-BR', name: 'Google português do Brasil' }],
    },
    writable: true,
    configurable: true,
  });

  return { speakMock, cancelMock };
}

describe('Meu Remédio — Integration Flows', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the approved "Meu Remédio" Iumi visual screen on first load', () => {
    installSpeechMocks();
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Meu Remédio' })).toBeInTheDocument();
    expect(screen.getByText('Voz ON')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Iumi' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /OUVIR TUDO EM VOZ ALTA/i })).toBeInTheDocument();

    // 3 core color-coded bula sections
    expect(screen.getByText('COMO TOMAR')).toBeInTheDocument();
    expect(screen.getByText('1 por dia')).toBeInTheDocument();
    expect(screen.getByText('Mesma hora')).toBeInTheDocument();
    expect(screen.getByText('24d + 4 pausa')).toBeInTheDocument();

    expect(screen.getByText('O QUE NÃO PODE')).toBeInTheDocument();
    expect(screen.getByText('Não fumar')).toBeInTheDocument();
    expect(screen.getByText('Corta o efeito')).toBeInTheDocument();
    expect(screen.getByText('Vômito até 4h')).toBeInTheDocument();

    expect(screen.getByText('GENÉRICOS E DIFERENÇAS')).toBeInTheDocument();
    expect(screen.getByText('A partir de R$ 28 (SP)')).toBeInTheDocument();
    expect(screen.getByText('Mesma proteção')).toBeInTheDocument();
    expect(screen.getByText(/revestimento diferente pode dar inchaço/i)).toBeInTheDocument();

    // 4 bottom nav items
    const nav = screen.getByRole('navigation', { name: 'Navegação principal' });
    expect(within(nav).getByText('Entender')).toBeInTheDocument();
    expect(within(nav).getByText('Comparar')).toBeInTheDocument();
    expect(within(nav).getByText('Horários')).toBeInTheDocument();
    expect(within(nav).getByText('Adicionar')).toBeInTheDocument();
  });

  it('speaks the full intuitive bula in pt-BR and toggles Voz ON/OFF', async () => {
    const user = userEvent.setup();
    const { speakMock, cancelMock } = installSpeechMocks();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /OUVIR TUDO EM VOZ ALTA/i }));
    expect(speakMock).toHaveBeenCalled();
    const firstUtterance = speakMock.mock.calls[0][0];
    expect(firstUtterance.lang).toBe('pt-BR');
    expect(firstUtterance.text).toContain('Iumi');

    // Toggle Voz OFF cancels speech
    await user.click(screen.getByRole('button', { name: /Desativar leitura em voz alta/i }));
    expect(cancelMock).toHaveBeenCalled();
    expect(screen.getByText('Voz OFF')).toBeInTheDocument();
  });

  it('compares bioequivalent generics, switching differences (bloating/coating), and updates prices by state', async () => {
    const user = userEvent.setup();
    installSpeechMocks();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Comparar/i }));

    expect(screen.getByText('Genéricos de Iumi')).toBeInTheDocument();
    // Switching difference specific to Iumi -> Generic (not generic molecule effects)
    expect(screen.getAllByText(/Inchaço e retenção de líquido/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/revestimento diferente muda o ritmo de absorção/i)).toBeInTheDocument();

    // Change region from SP to AM and confirm prices update
    const regionSelect = screen.getByLabelText(/Sua região para média de preço/i);
    expect(screen.getAllByText(/R\$ 28 – R\$ 39/).length).toBeGreaterThan(0);

    await user.selectOptions(regionSelect, 'AM');
    expect(screen.getAllByText(/R\$ 33 – R\$ 47/).length).toBeGreaterThan(0);
  });

  it('tracks medication schedule, logs exact taken time, undoes, and triggers accessible alarm modal', async () => {
    const user = userEvent.setup();
    installSpeechMocks();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Horários/i }));
    expect(screen.getByText(/0 de 2/i)).toBeInTheDocument();

    // Mark first dose taken
    const takeButtons = screen.getAllByRole('button', { name: /TOMEI AGORA/i });
    await user.click(takeButtons[0]);
    expect(screen.getByText(/1 de 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Tomado \d{2}:\d{2}/)).toBeInTheDocument();

    // Undo restores count
    await user.click(screen.getByRole('button', { name: /Desfazer marcação/i }));
    expect(screen.getByText(/0 de 2/i)).toBeInTheDocument();

    // Trigger Test Alarm Modal & mark taken from alarm
    await user.click(screen.getByRole('button', { name: /Testar Alarme/i }));
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByText(/HORA DO REMÉDIO/i)).toBeInTheDocument();
    await user.click(within(dialog).getByRole('button', { name: /JÁ TOMEI AGORA/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByText(/1 de 2/i)).toBeInTheDocument();

    // Check Histórico subtab shows seeded yesterday adherence
    await user.click(screen.getByRole('tab', { name: 'Histórico' }));
    expect(screen.getByText(/Últimos 7 dias/i)).toBeInTheDocument();
  });

  it('adds medications from sample prescription and supports manual custom medication creation', async () => {
    const user = userEvent.setup();
    installSpeechMocks();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Adicionar/i }));

    // Test 1-tap sample photo of prescription (Puran T4 + Losec MUPS)
    await user.click(screen.getByText(/Foto da Caixa \(Tireoide \+ Estômago\)/i));
    expect(screen.getByText(/Identificamos 2 remédio\(s\)/i)).toBeInTheDocument();
    expect(screen.getByText('Puran T4')).toBeInTheDocument();
    expect(screen.getByText('Losec MUPS')).toBeInTheDocument();

    // Save Puran T4 with suggested 06:30 alarm
    await user.click(screen.getByRole('button', { name: /Salvar \+ Alarme \(06:30\)/i }));
    expect(screen.getByText(/Adicionado com Alarme ✓/i)).toBeInTheDocument();

    // Create a custom manual medication
    await user.click(screen.getByText(/Cadastrar remédio manualmente/i));
    await user.type(screen.getByLabelText(/Nome do remédio/i), 'Selozok 25 mg');
    await user.click(screen.getByRole('button', { name: /Salvar Meu Remédio e Criar Alarme/i }));

    // App navigates to Entender showing the newly added custom medication cleanly
    expect(screen.getByRole('heading', { name: 'Selozok 25 mg' })).toBeInTheDocument();
    expect(screen.getByText(/Consulte farmácia \(SP\)/i)).toBeInTheDocument();
  });

  it('switches saved medications via the top back button ("Meus Remédios" cabinet)', async () => {
    const user = userEvent.setup();
    installSpeechMocks();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Voltar para Meus Remédios/i }));
    expect(screen.getByText('Sua Caixinha de Remédios')).toBeInTheDocument();

    await user.click(screen.getByText('Glifage XR'));
    expect(screen.getByRole('heading', { name: 'Glifage XR' })).toBeInTheDocument();
    expect(screen.getByText(/matriz XR diferente pode dar diarreia e gases/i)).toBeInTheDocument();
  });

  it('shows "Ver detalhes do Original" on the reference card in Comparar and allows selecting any catalog med in AddAlarmSheet', async () => {
    const user = userEvent.setup();
    installSpeechMocks();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Comparar/i }));
    expect(screen.getByRole('button', { name: /Ver detalhes do Original/i })).toBeInTheDocument();

    // Open Horários -> Novo Alarme -> can pick a catalog medicine not yet in myMedications (e.g. Puran T4)
    await user.click(screen.getByRole('button', { name: /Horários/i }));
    await user.click(screen.getByRole('button', { name: /Novo Alarme/i }));
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByText('Puran T4')).toBeInTheDocument();
    await user.click(within(dialog).getByText('Puran T4'));
    await user.click(within(dialog).getByRole('button', { name: /Salvar Alarme/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByText('Puran T4')).toBeInTheDocument();
  });

  it('allows switching voice speed (Normal/Devagar) in the header before speaking and toggles MedicineCabinetView playback cleanly', async () => {
    const user = userEvent.setup();
    const { speakMock, cancelMock } = installSpeechMocks();
    render(<App />);

    // Speed control is accessible BEFORE any speech starts
    const speedBtn = screen.getByRole('button', { name: /Velocidade da voz: Normal/i });
    expect(speedBtn).toHaveAttribute('aria-pressed', 'false');
    await user.click(speedBtn);

    expect(
      screen.getByRole('button', { name: /Velocidade da voz: Devagar/i })
    ).toHaveAttribute('aria-pressed', 'true');

    // Subsequent speech immediately uses slow rate (0.8)
    await user.click(screen.getByRole('button', { name: /OUVIR TUDO EM VOZ ALTA/i }));
    expect(speakMock).toHaveBeenCalled();
    expect(speakMock.mock.calls[0][0].rate).toBe(0.8);

    // Toggling speed back to normal while speaking restarts active utterance at normal rate (0.98)
    await user.click(screen.getByRole('button', { name: /Velocidade da voz: Devagar/i }));
    const latestUtterance = speakMock.mock.calls[speakMock.mock.calls.length - 1][0];
    expect(latestUtterance.rate).toBe(0.98);

    // Turning voice OFF hides the speed pill; turning it back ON restores it
    await user.click(screen.getByRole('button', { name: /Desativar leitura em voz alta/i }));
    expect(screen.queryByRole('button', { name: /Velocidade da voz/i })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Ativar leitura em voz alta/i }));
    expect(screen.getByRole('button', { name: /Velocidade da voz/i })).toBeInTheDocument();

    // Open Meus Remédios cabinet and verify SpeakButton starts AND toggles stop (not restart)
    await user.click(screen.getByRole('button', { name: /Voltar para Meus Remédios/i }));
    expect(screen.getByText('Sua Caixinha de Remédios')).toBeInTheDocument();

    speakMock.mockClear();
    cancelMock.mockClear();

    const cabinetSpeakBtn = screen.getByRole('button', { name: /Ouvir lista dos meus remédios/i });
    await user.click(cabinetSpeakBtn);
    expect(speakMock).toHaveBeenCalledTimes(1);
    expect(speakMock.mock.calls[0][0].text).toContain('Iumi');

    const cabinetStopBtn = screen.getByRole('button', {
      name: /Parar leitura: Ouvir lista dos meus remédios/i,
    });
    await user.click(cabinetStopBtn);
    expect(cancelMock).toHaveBeenCalled();
    // Clicking while already playing MUST stop rather than calling speak() again
    expect(speakMock).toHaveBeenCalledTimes(1);
    expect(
      screen.getByRole('button', { name: /^Ouvir lista dos meus remédios$/i })
    ).toBeInTheDocument();
  });

  it('provides per-dose SpeakButtons on Horários Hoje and adherence SpeakButtons on Histórico', async () => {
    const user = userEvent.setup();
    const { speakMock, cancelMock } = installSpeechMocks();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Horários/i }));
    speakMock.mockClear();
    cancelMock.mockClear();

    // Individual dose card SpeakButton in Hoje tab reads medicine, dosage, time, and status
    const iumiDoseSpeakBtn = screen.getByRole('button', { name: /Ouvir dose de Iumi às 21:00/i });
    await user.click(iumiDoseSpeakBtn);
    expect(speakMock).toHaveBeenCalledTimes(1);
    const doseSpeechText: string = speakMock.mock.calls[0][0].text;
    expect(doseSpeechText).toContain('Iumi');
    expect(doseSpeechText).toContain('1 comprimido');
    expect(doseSpeechText).toContain('21:00');

    // Clicking again stops instead of restarting
    await user.click(
      screen.getByRole('button', { name: /Parar leitura: Ouvir dose de Iumi às 21:00/i })
    );
    expect(cancelMock).toHaveBeenCalled();
    expect(speakMock).toHaveBeenCalledTimes(1);

    // Mark Iumi dose taken and verify its SpeakButton now announces taken status
    const takeButtons = screen.getAllByRole('button', { name: /TOMEI AGORA/i });
    await user.click(takeButtons[takeButtons.length - 1]);
    speakMock.mockClear();

    await user.click(screen.getByRole('button', { name: /Ouvir dose de Iumi às 21:00/i }));
    expect(speakMock).toHaveBeenCalledTimes(1);
    expect(speakMock.mock.calls[0][0].text).toMatch(/Já foi tomado às \d{2}:\d{2}/);

    // Switch to Histórico tab and verify both 7-day and selected-day SpeakButtons
    await user.click(screen.getByRole('tab', { name: 'Histórico' }));
    speakMock.mockClear();
    cancelMock.mockClear();

    const weekSpeakBtn = screen.getByRole('button', {
      name: /Ouvir resumo de adesão dos últimos 7 dias/i,
    });
    await user.click(weekSpeakBtn);
    expect(speakMock).toHaveBeenCalledTimes(1);
    expect(speakMock.mock.calls[0][0].text).toMatch(/últimos 7 dias/i);
    expect(speakMock.mock.calls[0][0].text).toMatch(/doses programadas/i);

    await user.click(
      screen.getByRole('button', {
        name: /Parar leitura: Ouvir resumo de adesão dos últimos 7 dias/i,
      })
    );
    expect(cancelMock).toHaveBeenCalled();
    expect(speakMock).toHaveBeenCalledTimes(1);

    const daySpeakBtn = screen.getByRole('button', { name: /Ouvir registro de doses do dia/i });
    await user.click(daySpeakBtn);
    expect(speakMock).toHaveBeenCalledTimes(2);
    expect(speakMock.mock.calls[1][0].text).toMatch(/Registro do dia/i);
    expect(speakMock.mock.calls[1][0].text).toContain('Iumi');
  });

  it('clears stale photo preview/extracted text on voice search, sets scanNotice, and scrolls results into view', async () => {
    const user = userEvent.setup();
    installSpeechMocks();

    const origCreateObjectURL = Object.getOwnPropertyDescriptor(URL, 'createObjectURL');
    const origRevokeObjectURL = Object.getOwnPropertyDescriptor(URL, 'revokeObjectURL');
    const createObjectUrlMock = vi.fn(() => 'blob:mock-photo-preview');
    const revokeObjectUrlMock = vi.fn();
    Object.defineProperty(URL, 'createObjectURL', {
      value: createObjectUrlMock,
      configurable: true,
      writable: true,
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      value: revokeObjectUrlMock,
      configurable: true,
      writable: true,
    });

    const scrollIntoViewMock = vi.fn();
    const origScrollIntoView = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = scrollIntoViewMock;

    const rafSpy = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: FrameRequestCallback) => {
        cb(0);
        return 1;
      });

    const iumiMed = MEDICATIONS_CATALOG.find((m) => m.id === 'iumi')!;
    const ocrSpy = vi.spyOn(ocrScanner, 'scanImageForMedications').mockResolvedValue({
      extractedText: 'Receita foto antiga: Iumi 21:00',
      matches: [
        {
          medication: iumiMed,
          matchedTerm: 'iumi',
          detectedTimes: ['21:00'],
          detectedDosage: '1 comprimido',
          confidence: 'alta',
        },
      ],
      usedOcr: true,
    });

    let nextTranscript = 'Dipirona 1g 6/6h';
    class FakeSpeechRecognition {
      lang = '';
      continuous = false;
      interimResults = false;
      maxAlternatives = 1;
      onresult: ((e: { results: Array<Array<{ transcript: string }>> }) => void) | null = null;
      onerror: ((e: { error?: string }) => void) | null = null;
      onend: (() => void) | null = null;
      start() {
        this.onresult?.({ results: [[{ transcript: nextTranscript }]] });
        this.onend?.();
      }
      stop() {
        this.onend?.();
      }
    }

    const origRecognition = (window as unknown as Record<string, unknown>).SpeechRecognition;
    Object.defineProperty(window, 'SpeechRecognition', {
      value: FakeSpeechRecognition,
      configurable: true,
      writable: true,
    });

    try {
      render(<App />);
      await user.click(screen.getByRole('button', { name: /Adicionar/i }));

      // Step 1: Upload a photo so previewUrl, extractedText, and photo scanNotice are populated
      const photoInput = screen.getByLabelText(/Escolher foto ou print da galeria/i);
      const fakeFile = new File(['fake-image'], 'receita.jpg', { type: 'image/jpeg' });
      await user.upload(photoInput, fakeFile);

      expect(await screen.findByAltText(/Imagem enviada para leitura/i)).toBeInTheDocument();
      expect(screen.getByText(/Ver texto lido da receita/i)).toBeInTheDocument();
      expect(screen.getByText(/Encontramos 1 remédio\(s\) na imagem!/i)).toBeInTheDocument();

      // Step 2: Switch to voice mode and run voice search
      await user.click(screen.getByRole('tab', { name: /Falar o Nome/i }));
      scrollIntoViewMock.mockClear();

      await user.click(screen.getByRole('button', { name: /Tocar para falar o nome do remédio/i }));

      // Stale photo preview and extracted OCR text MUST be cleared
      expect(screen.queryByAltText(/Imagem enviada para leitura/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Ver texto lido da receita/i)).not.toBeInTheDocument();
      expect(revokeObjectUrlMock).toHaveBeenCalledWith('blob:mock-photo-preview');

      // Clear voice scanNotice, new match, and scrollIntoView must all be triggered
      expect(screen.getByText(/Encontramos 1 remédio pelo que você falou!/i)).toBeInTheDocument();
      expect(screen.getByText('Novalgina')).toBeInTheDocument();
      expect(screen.getByText(/06:00 · 12:00 · 18:00 · 00:00/)).toBeInTheDocument();
      expect(scrollIntoViewMock).toHaveBeenCalled();

      // Step 3: Voice search hitting fallback searchMedications ("pressao" -> Losartana)
      scrollIntoViewMock.mockClear();
      nextTranscript = 'pressao';
      await user.click(screen.getByRole('button', { name: /Tocar para falar o nome do remédio/i }));
      expect(
        screen.getByText(/Encontramos Aradois \/ Losartana pelo que você falou!/i)
      ).toBeInTheDocument();
      expect(scrollIntoViewMock).toHaveBeenCalled();

      // Step 4: Voice search with no match clears stale scanNotice & matches cleanly
      nextTranscript = 'RemedioInexistenteXYZ';
      await user.click(screen.getByRole('button', { name: /Tocar para falar o nome do remédio/i }));
      expect(
        screen.queryByText(/Encontramos .* pelo que você falou!/i)
      ).not.toBeInTheDocument();
      expect(
        screen.getByText(/Ouvi "RemedioInexistenteXYZ", mas não achei no catálogo/i)
      ).toBeInTheDocument();
    } finally {
      ocrSpy.mockRestore();
      if (origCreateObjectURL) {
        Object.defineProperty(URL, 'createObjectURL', origCreateObjectURL);
      } else {
        delete (URL as unknown as Record<string, unknown>).createObjectURL;
      }
      if (origRevokeObjectURL) {
        Object.defineProperty(URL, 'revokeObjectURL', origRevokeObjectURL);
      } else {
        delete (URL as unknown as Record<string, unknown>).revokeObjectURL;
      }
      rafSpy.mockRestore();
      Element.prototype.scrollIntoView = origScrollIntoView;
      Object.defineProperty(window, 'SpeechRecognition', {
        value: origRecognition,
        configurable: true,
        writable: true,
      });
    }
  });

  it('scrolls first-ever voice search into view, rejects 1-char noise, and ignores stale in-flight OCR', async () => {
    const user = userEvent.setup();
    installSpeechMocks();

    const origCreateObjectURL = Object.getOwnPropertyDescriptor(URL, 'createObjectURL');
    const origRevokeObjectURL = Object.getOwnPropertyDescriptor(URL, 'revokeObjectURL');
    Object.defineProperty(URL, 'createObjectURL', {
      value: vi.fn(() => 'blob:slow-ocr-preview'),
      configurable: true,
      writable: true,
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      value: vi.fn(),
      configurable: true,
      writable: true,
    });

    const scrollIntoViewMock = vi.fn();
    const origScrollIntoView = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = scrollIntoViewMock;

    const rafSpy = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: FrameRequestCallback) => {
        cb(0);
        return 1;
      });

    let resolveSlowOcr: ((value: ocrScanner.ScanResult) => void) | null = null;
    const ocrSpy = vi.spyOn(ocrScanner, 'scanImageForMedications').mockImplementation(
      () =>
        new Promise<ocrScanner.ScanResult>((resolve) => {
          resolveSlowOcr = resolve;
        })
    );

    let nextTranscript = 'Dipirona 1g 6/6h';
    class FakeSpeechRecognition {
      lang = '';
      continuous = false;
      interimResults = false;
      maxAlternatives = 1;
      onresult: ((e: { results: Array<Array<{ transcript: string }>> }) => void) | null = null;
      onerror: ((e: { error?: string }) => void) | null = null;
      onend: (() => void) | null = null;
      start() {
        this.onresult?.({ results: [[{ transcript: nextTranscript }]] });
        this.onend?.();
      }
      stop() {
        this.onend?.();
      }
    }

    const origRecognition = (window as unknown as Record<string, unknown>).SpeechRecognition;
    Object.defineProperty(window, 'SpeechRecognition', {
      value: FakeSpeechRecognition,
      configurable: true,
      writable: true,
    });

    try {
      render(<App />);
      await user.click(screen.getByRole('button', { name: /Adicionar/i }));
      await user.click(screen.getByRole('tab', { name: /Falar o Nome/i }));

      // 1. First-ever voice search (results section was NOT previously mounted) MUST still scroll into view
      scrollIntoViewMock.mockClear();
      await user.click(screen.getByRole('button', { name: /Tocar para falar o nome do remédio/i }));
      expect(screen.getByText(/Encontramos 1 remédio pelo que você falou!/i)).toBeInTheDocument();
      expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);

      // 2. 1-character noisy transcript ("a") must NOT fall back to matching Iumi
      nextTranscript = 'a';
      await user.click(screen.getByRole('button', { name: /Tocar para falar o nome do remédio/i }));
      expect(screen.queryByText(/Encontramos Iumi/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Ouvi "a", mas não achei no catálogo/i)).toBeInTheDocument();

      // 3. Start a slow in-flight OCR scan, switch to Voice before OCR completes, and finish a voice search
      await user.click(screen.getByRole('tab', { name: /Foto da Receita/i }));
      const photoInput = screen.getByLabelText(/Escolher foto ou print da galeria/i);
      const fakeFile = new File(['slow-image'], 'lenta.jpg', { type: 'image/jpeg' });
      await user.upload(photoInput, fakeFile);
      expect(screen.getByText(/Preparando imagem/i)).toBeInTheDocument();

      await user.click(screen.getByRole('tab', { name: /Falar o Nome/i }));
      nextTranscript = 'Amoxicilina 500mg 8/8h';
      await user.click(screen.getByRole('button', { name: /Tocar para falar o nome do remédio/i }));

      // Voice result MUST immediately dismiss OCR loading state and render Amoxicilina
      expect(screen.queryByText(/Preparando imagem/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Encontramos 1 remédio pelo que você falou!/i)).toBeInTheDocument();
      expect(screen.getByText('Amoxil / Amoxicilina')).toBeInTheDocument();

      // Late-resolving stale OCR promise MUST be ignored and not overwrite Amoxicilina with Iumi
      const iumiMed = MEDICATIONS_CATALOG.find((m) => m.id === 'iumi')!;
      await act(async () => {
        resolveSlowOcr?.({
          extractedText: 'Foto atrasada: Iumi 21:00',
          matches: [
            {
              medication: iumiMed,
              matchedTerm: 'iumi',
              detectedTimes: ['21:00'],
              detectedDosage: '1 comprimido',
              confidence: 'alta',
            },
          ],
          usedOcr: true,
        });
      });

      expect(screen.getByText('Amoxil / Amoxicilina')).toBeInTheDocument();
      expect(screen.queryByText(/Encontramos 1 remédio\(s\) na imagem!/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Ver texto lido da receita/i)).not.toBeInTheDocument();
    } finally {
      ocrSpy.mockRestore();
      if (origCreateObjectURL) {
        Object.defineProperty(URL, 'createObjectURL', origCreateObjectURL);
      } else {
        delete (URL as unknown as Record<string, unknown>).createObjectURL;
      }
      if (origRevokeObjectURL) {
        Object.defineProperty(URL, 'revokeObjectURL', origRevokeObjectURL);
      } else {
        delete (URL as unknown as Record<string, unknown>).revokeObjectURL;
      }
      rafSpy.mockRestore();
      Element.prototype.scrollIntoView = origScrollIntoView;
      Object.defineProperty(window, 'SpeechRecognition', {
        value: origRecognition,
        configurable: true,
        writable: true,
      });
    }
  });

  it('announces contraceptive pause days via SpeakButton in Horários and stops cabinet speech on navigation', async () => {
    const user = userEvent.setup();
    const { speakMock, cancelMock } = installSpeechMocks();

    // Seed localStorage with a single Iumi 24+4 schedule created 25 days ago -> today is Pause Day 2 of 4
    const baseState = createDefaultState();
    const created25DaysAgo = new Date();
    created25DaysAgo.setDate(created25DaysAgo.getDate() - 25);
    baseState.schedules = [
      {
        id: 'sched-iumi-pause',
        medicationId: 'iumi',
        dosage: '1 comprimido',
        times: ['21:00'],
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
        cycleMode: '24_4',
        enabled: true,
        notes: 'Cartela 24 + 4',
        createdAt: created25DaysAgo.toISOString(),
      },
    ];
    baseState.doseLogs = [];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(baseState));

    render(<App />);
    await user.click(screen.getByRole('button', { name: /Horários/i }));
    speakMock.mockClear();
    cancelMock.mockClear();

    // Pause banner renders WITHOUT contradictory "Nenhum alarme ativo para hoje" empty box
    expect(screen.getByText(/Iumi — Dia de pausa \(2 de 4\)/i)).toBeInTheDocument();
    expect(screen.queryByText(/Nenhum alarme ativo para hoje/i)).not.toBeInTheDocument();

    // Pause banner SpeakButton speaks pause instructions and toggles stop
    const pauseSpeakBtn = screen.getByRole('button', { name: /Ouvir aviso de pausa de Iumi/i });
    await user.click(pauseSpeakBtn);
    expect(speakMock).toHaveBeenCalledTimes(1);
    expect(speakMock.mock.calls[0][0].text).toMatch(/dia de pausa, dia 2 de 4/i);

    await user.click(
      screen.getByRole('button', { name: /Parar leitura: Ouvir aviso de pausa de Iumi/i })
    );
    expect(cancelMock).toHaveBeenCalled();
    expect(speakMock).toHaveBeenCalledTimes(1);

    // Top Horários summary SpeakButton announces pause day instead of "não tem alarmes cadastrados"
    await user.click(
      screen.getByRole('button', { name: /Ouvir seus horários de remédios de hoje/i })
    );
    expect(speakMock.mock.calls[1][0].text).toMatch(/Hoje é dia de pausa para Iumi/i);

    // Selecting a medication from Meus Remédios stops active cabinet-intro playback
    await user.click(screen.getByRole('button', { name: /Entender/i }));
    await user.click(screen.getByRole('button', { name: /Voltar para Meus Remédios/i }));
    cancelMock.mockClear();
    await user.click(screen.getByRole('button', { name: /Ouvir lista dos meus remédios/i }));
    await user.click(screen.getByText('Glifage XR'));
    expect(cancelMock).toHaveBeenCalled();
  });
});
