import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MeuRemedioApp } from '@/components/MeuRemedioApp';

describe('MeuRemedioApp V2 calm minimalist flow', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes('/api/status')) {
          return new Response(
            JSON.stringify({
              elevenLabsConnected: false,
              elevenLabsSource: 'none',
              geminiConnected: false,
              geminiSource: 'none',
              naturalVoiceProvider: 'none',
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
          );
        }
        return new Response(JSON.stringify({ error: 'NO_TTS_KEY' }), {
          status: 501,
          headers: { 'Content-Type': 'application/json' },
        });
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('opens on the calm Hoje hub and navigates to Iumi detail and Comparar switching sheet', async () => {
    const user = userEvent.setup();
    render(<MeuRemedioApp />);

    expect(await screen.findByText('Seus remédios')).toBeInTheDocument();
    expect(screen.getByText('Sua semana')).toBeInTheDocument();

    // Tap Comparar tab -> see Iumi generics list -> tap EMS -> see focused 3-block switching sheet
    await user.click(screen.getByRole('button', { name: 'Comparar' }));
    expect(await screen.findByText('Comparar opções')).toBeInTheDocument();

    const emsCard = screen.getByRole('button', { name: /EMS/i });
    await user.click(emsCard);

    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByText(/O que muda na troca/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/Inchaço e retenção de líquido/i)).toBeInTheDocument();
  });

  it('toggles Modo Só Voz for non-readers cleanly and opens Voz & IA settings sheet', async () => {
    const user = userEvent.setup();
    render(<MeuRemedioApp />);

    await user.click(screen.getByRole('button', { name: /Só Voz/i }));
    expect(await screen.findByText('Mostrar remédio')).toBeInTheDocument();
    expect(screen.getByText('Falar minha dúvida')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Voltar para a tela normal/i }));
    await waitFor(() => {
      expect(screen.getByText('Seus remédios')).toBeInTheDocument();
    });

    await user.click(
      screen.getByRole('button', { name: /Configurar voz humana e inteligência artificial/i })
    );
    expect(await screen.findByText('Voz Humana & IA')).toBeInTheDocument();
    expect(screen.getByLabelText(/1\. ElevenLabs/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/2\. Google Gemini/i)).toBeInTheDocument();
  });
});
