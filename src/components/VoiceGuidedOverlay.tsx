'use client';

import { useEffect, useState } from 'react';
import { Camera, Check, Clock, Loader2, Mic, MicOff, Volume2, X } from 'lucide-react';
import type { ScheduledDoseInstance } from '@/services/scheduleEngine';
import { askPharmacistAi } from '@/services/aiClient';
import { voiceEngine, type VoicePlaybackState } from '@/services/voiceEngine';

interface VoiceGuidedOverlayProps {
  nextDose: ScheduledDoseInstance | null;
  playback: VoicePlaybackState;
  onSpeak: (sectionId: string, text: string) => void;
  onStopSpeaking: () => void;
  onOpenCameraAdd: () => void;
  onMarkDoseTaken: (dose: ScheduledDoseInstance) => void;
  onCloseGuidedMode: () => void;
}

/**
 * "Modo Só Voz" — A serene, zero-literacy Headspace-style voice sanctuary.
 * Guides non-readers step-by-step with warm voice + 3 giant unmistakable visual cards.
 */
export function VoiceGuidedOverlay({
  nextDose,
  playback,
  onSpeak,
  onStopSpeaking,
  onOpenCameraAdd,
  onMarkDoseTaken,
  onCloseGuidedMode,
}: VoiceGuidedOverlayProps) {
  const [listening, setListening] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [lastSpokenAnswer, setLastSpokenAnswer] = useState<string | null>(null);

  const welcomePrompt = nextDose
    ? `Olá! Estou com você. Seu próximo remédio é ${nextDose.medication?.name ?? 'seu medicamento'}, às ${nextDose.scheduledTime}. Toque no botão grande da câmera para mostrar uma receita, no botão do relógio para marcar que tomou, ou no microfone para me fazer qualquer pergunta.`
    : 'Olá! Estou com você. Toque no botão grande da câmera para mostrar a foto do seu remédio ou receita, ou toque no microfone para me fazer qualquer pergunta.';

  useEffect(() => {
    onSpeak('guided-welcome', welcomePrompt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVoiceAsk = () => {
    if (listening) {
      setListening(false);
      return;
    }
    onStopSpeaking();
    setListening(true);
    setLastSpokenAnswer(null);

    const stop = voiceEngine.startListening({
      onResult: async (transcript) => {
        setListening(false);
        setThinking(true);
        const res = await askPharmacistAi({ question: transcript });
        setThinking(false);
        setLastSpokenAnswer(res.answer);
        onSpeak('guided-answer', res.answer);
      },
      onError: (msg) => {
        setListening(false);
        setLastSpokenAnswer(msg);
        onSpeak('guided-err', msg);
      },
      onEnd: () => {
        setListening(false);
      },
    });

    if (!stop) setListening(false);
  };

  const isSpeaking = playback.status === 'playing' || playback.status === 'loading';

  return (
    <div className="px-5 pt-4 pb-10 min-h-[calc(100dvh-76px)] flex flex-col justify-between gap-6">
      {/* Top Calm Orb */}
      <div className="flex flex-col items-center text-center pt-4 space-y-5">
        <button
          type="button"
          onClick={() => {
            if (isSpeaking) onStopSpeaking();
            else onSpeak('guided-welcome', welcomePrompt);
          }}
          aria-label="Ouvir orientação por voz"
          className={`w-28 h-28 rounded-full flex items-center justify-center text-white shadow-xl transition-all cursor-pointer ${
            listening
              ? 'bg-[#BE123C] ring-[12px] ring-[#BE123C]/20 animate-pulse'
              : 'bg-[#146356] animate-calm-breathe'
          }`}
        >
          {thinking || playback.status === 'loading' ? (
            <Loader2 className="w-11 h-11 animate-spin" />
          ) : listening ? (
            <Mic className="w-11 h-11" />
          ) : (
            <Volume2 className="w-11 h-11" />
          )}
        </button>

        <div className="space-y-1.5 max-w-[300px]">
          <h2 className="text-[24px] font-bold text-[#1C1917] leading-snug">
            {listening
              ? 'Pode falar, estou ouvindo...'
              : thinking
                ? 'Pensando na melhor resposta...'
                : isSpeaking
                  ? 'Estou falando com você'
                  : 'Como posso te ajudar?'}
          </h2>
          {lastSpokenAnswer && (
            <p className="text-[15px] text-[#57534E] leading-relaxed pt-1">
              {lastSpokenAnswer}
            </p>
          )}
        </div>
      </div>

      {/* 3 Giant, Unmistakable Tactile Cards */}
      <div className="space-y-3.5">
        <button
          type="button"
          onClick={() => {
            onStopSpeaking();
            onOpenCameraAdd();
          }}
          className="w-full p-5 rounded-[26px] bg-white border border-black/[0.06] shadow-[0_6px_24px_rgba(28,25,23,0.05)] flex items-center gap-4 text-left active:scale-[0.99] transition-all cursor-pointer"
        >
          <span className="w-16 h-16 rounded-[20px] bg-[#E6F2EF] text-[#146356] flex items-center justify-center shrink-0">
            <Camera className="w-8 h-8 stroke-[2]" />
          </span>
          <div>
            <p className="text-[19px] font-bold text-[#1C1917]">Mostrar remédio</p>
            <p className="text-[14px] text-[#6B6560]">Foto da caixa ou receita</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            if (nextDose) {
              onMarkDoseTaken(nextDose);
              onSpeak(
                'guided-taken',
                `Muito bem! Marquei que você tomou ${nextDose.medication?.name ?? 'seu remédio'} agora.`
              );
            } else {
              onSpeak('guided-none', 'Você já tomou todos os seus remédios programados para hoje.');
            }
          }}
          className="w-full p-5 rounded-[26px] bg-[#E8F4EE] border border-[#146356]/15 flex items-center gap-4 text-left active:scale-[0.99] transition-all cursor-pointer"
        >
          <span className="w-16 h-16 rounded-[20px] bg-[#146356] text-white flex items-center justify-center shrink-0">
            {nextDose ? <Check className="w-8 h-8 stroke-[2.5]" /> : <Clock className="w-8 h-8" />}
          </span>
          <div className="min-w-0">
            <p className="text-[19px] font-bold text-[#0F4F45] truncate">
              {nextDose ? `Tomei ${nextDose.medication?.name ?? ''}` : 'Tudo certinho hoje'}
            </p>
            <p className="text-[14px] text-[#146356]">
              {nextDose ? `Horário das ${nextDose.scheduledTime}` : 'Nenhum remédio pendente'}
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={handleVoiceAsk}
          className="w-full p-5 rounded-[26px] bg-white border border-black/[0.06] shadow-[0_6px_24px_rgba(28,25,23,0.05)] flex items-center gap-4 text-left active:scale-[0.99] transition-all cursor-pointer"
        >
          <span
            className={`w-16 h-16 rounded-[20px] flex items-center justify-center shrink-0 ${
              listening ? 'bg-[#BE123C] text-white' : 'bg-[#FEF3DD] text-[#B45309]'
            }`}
          >
            {listening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8 stroke-[2]" />}
          </span>
          <div>
            <p className="text-[19px] font-bold text-[#1C1917]">
              {listening ? 'Parar de ouvir' : 'Falar minha dúvida'}
            </p>
            <p className="text-[14px] text-[#6B6560]">Pergunte qualquer coisa por voz</p>
          </div>
        </button>
      </div>

      {/* Gentle Exit Button */}
      <button
        type="button"
        onClick={() => {
          onStopSpeaking();
          onCloseGuidedMode();
        }}
        className="mx-auto py-2.5 px-5 rounded-full bg-[#EAE5DC] text-[#57534E] text-[13px] font-semibold inline-flex items-center gap-1.5 cursor-pointer"
      >
        <X className="w-4 h-4" />
        <span>Voltar para a tela normal</span>
      </button>
    </div>
  );
}
