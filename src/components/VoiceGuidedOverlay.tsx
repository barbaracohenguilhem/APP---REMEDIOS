'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Camera, Check, Clock, Loader2, Mic, MicOff, Volume2, X } from 'lucide-react';
import type { Medication } from '@/types/medication';
import type { ScheduledDoseInstance } from '@/services/scheduleEngine';
import { askPharmacistAi } from '@/services/aiClient';
import { voiceEngine, type VoicePlaybackState } from '@/services/voiceEngine';

interface VoiceGuidedOverlayProps {
  activeMedication: Medication;
  nextDose: ScheduledDoseInstance | null;
  playback: VoicePlaybackState;
  onSpeak: (sectionId: string, text: string) => void;
  onStopSpeaking: () => void;
  onOpenCameraAdd: () => void;
  onMarkDoseTaken: (dose: ScheduledDoseInstance) => void;
  onCloseGuidedMode: () => void;
}

/**
 * "Modo Só Voz" — Complete zero-literacy voice sanctuary.
 * Every core action (Scan photo, Mark taken, Hear bula & generics, Ask any question) works 100% by voice + giant unmistakable buttons.
 */
export function VoiceGuidedOverlay({
  activeMedication,
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
    ?`Olá! Estou com você. Seu próximo remédio é ${nextDose.medication?.name ?? 'seu medicamento'}, às ${nextDose.scheduledTime}. Toque no botão verde da câmera para mostrar uma receita, no botão de confirmar quando tomar, no botão azul para ouvir a bula do ${activeMedication.name}, ou no microfone para fazer qualquer pergunta.`
    : `Olá! Estou com você. Toque no botão da câmera para mostrar seu remédio, no botão azul para ouvir sobre o ${activeMedication.name}, ou no microfone para me fazer qualquer pergunta.`;

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
        const res = await askPharmacistAi({
          question: transcript,
          medicationName: activeMedication.name,
          activeIngredient: activeMedication.activeIngredient,
        });
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

  const handleHearBulaAndGenerics = () => {
    const script = `${activeMedication.name}. ${activeMedication.purposeSimple} ${activeMedication.howToTake.spokenScript} ${activeMedication.whatNotToDo.spokenScript} ${activeMedication.genericsHighlight.spokenScript}`;
    setLastSpokenAnswer(`${activeMedication.name}: ${activeMedication.howToTake.summary}`);
    onSpeak('guided-bula', script);
  };

  const isSpeaking = playback.status === 'playing' || playback.status === 'loading';

  return (
        <div className="px-4 pt-4 pb-8 min-h-[calc(100dvh-76px)] flex flex-col justify-between gap-5">
          {/* Giant Breathing Audio Orb */}
          <div className="flex flex-col items-center text-center pt-2 space-y-4">
            <button
              type="button"
              onClick={() => {
                if (isSpeaking) onStopSpeaking();
                else onSpeak('guided-welcome', welcomePrompt);
              }}
              aria-label={isSpeaking ? 'Parar de ouvir' : 'Ouvir orientação por voz'}
              className={`w-28 h-28 rounded-full flex items-center justify-center text-white shadow-xl transition-all cursor-pointer ${listening
                    ? 'bg-[#B91C1C] ring-[12px] ring-[#FECACA] animate-pulse'
                    : isSpeaking
                      ? 'bg-[#1D4ED8] ring-[12px] ring-[#DBEAFE]'
                      : 'bg-[#047857] animate-calm-breathe'
                }`}
            >
              {thinking || playback.status === 'loading' ? (
            <Loader2 className="w-12 h-12 animate-spin" />
              ) : listening ? (
            <Mic className="w-12 h-12" />
              ) : (
            <Volume2 className="w-12 h-12" />
              )}
            </button>

                <div className="space-y-1.5 max-w-[340px]">
                  <h2 className="text-[24px] font-extrabold text-[#111827] leading-snug">
                    {listening
                        ? 'Pode falar, estou ouvindo!'
                        : thinking
                            ? 'Preparando sua resposta...'
                            : isSpeaking
                    ? 'Estou falando (toque para parar)'
                  : 'Toque no que você precisa'}
                  </h2>
                  {lastSpokenAnswer && (
                      <p className="text-[16px] font-medium text-[#1F2937] leading-relaxed bg-white rounded-2xl p-3.5 border border-slate-200">
                        {lastSpokenAnswer}
                      </p>
          )}
                    </div>
      </div>

                  {/* 4 Giant Unmistakable High-Contrast Cards */}
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => {
                        onStopSpeaking();
                        onOpenCameraAdd();
                      }}
                      className="w-full p-5 rounded-[24px] bg-[#0F766E] hover:bg-[#115E59] text-white flex items-center gap-4 text-left shadow-sm active:scale-[0.99] transition-all cursor-pointer"
                    >
                        <span className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                          <Camera className="w-9 h-9 stroke-[2.2]" />
                        </span>
                        <div>
                          <p className="text-[20px] font-extrabold leading-tight">Mostrar remédio</p>
                          <p className="text-[15px] text-white/90 font-medium">Foto da receita ou caixa</p>
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
                          onSpeak('guided-none', 'Parabéns! Você já tomou todos os seus remédios de hoje.');
                        }
                      }}
                      className="w-full p-5 rounded-[24px] bg-[#047857] hover:bg-[#065F46] text-white flex items-center gap-4 text-left shadow-sm active:scale-[0.99] transition-all cursor-pointer"
                    >
                        <span className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                          {nextDose ? <Check className="w-9 h-9 stroke-[3]" /> : <Clock className="w-9 h-9" />}
                        </span>
                        <div className="min-w-0">
                            <p className="text-[20px] font-extrabold leading-tight truncate">
                              {nextDose ? `Tomei ${nextDose.medication?.name ?? ''}` : 'Tudo certinho hoje'}
                            </p>
                              <p className="text-[15px] text-white/90 font-medium">
                                {nextDose ? `Horário das ${nextDose.scheduledTime}` : 'Nenhum pendente agora'}
                              </p>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={handleHearBulaAndGenerics}
                            className="w-full p-5 rounded-[24px] bg-[#1D4ED8] hover:bg-[#1E40AF] text-white flex items-center gap-4 text-left shadow-sm active:scale-[0.99] transition-all cursor-pointer"
                          >
                            <span className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                              <BookOpen className="w-9 h-9 stroke-[2.2]" />
                            </span>
                            <div className="min-w-0">
                              <p className="text-[20px] font-extrabold leading-tight truncate">
                                Ouvir bula: {activeMedication.name}
                              </p>
                              <p className="text-[15px] text-white/90 font-medium">Como tomar, perigos e genéricos</p>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={handleVoiceAsk}
                            className="w-full p-5 rounded-[24px] bg-white border-2 border-[#D97706] text-[#111827] flex items-center gap-4 text-left shadow-sm active:scale-[0.99] transition-all cursor-pointer"
                          >
                            <span
            className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${listening ? 'bg-[#B91C1C] text-white' : 'bg-[#FEF3C7] text-[#92400E]'
                                }`}
                            >
                              {listening ? <MicOff className="w-9 h-9" /> : <Mic className="w-9 h-9 stroke-[2.2]" />}
                            </span>
                            <div>
                                <p className="text-[20px] font-extrabold leading-tight">
                                  {listening ? 'Parar de ouvir' : 'Falar minha dúvida'}
                                </p>
                                <p className="text-[15px] font-medium text-[#374151]">Pergunte qualquer coisa por voz</p>
                            </div>
                          </button>
                        </div>

                        {/* Exit Button */}
                        <button
                          type="button"
                          onClick={() => {
                            onStopSpeaking();
                            onCloseGuidedMode();
                          }}
                          className="w-full min-h-[50px] px-5 rounded-2xl bg-[#E5E7EB] text-[#111827] text-[15.5px] font-extrabold inline-flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <X className="w-5 h-5" />
                          <span>Voltar para a tela normal</span>
                        </button>
                      </div>
                      );
}
