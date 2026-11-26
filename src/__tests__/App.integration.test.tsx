import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

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
});
