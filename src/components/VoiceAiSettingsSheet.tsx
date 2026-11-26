'use client';

import { useState } from 'react';
import { Check, Loader2, Play, Sparkles, Volume2, X } from 'lucide-react';
import type { ClientAiKeys, VoiceProfile } from '@/types/medication';
import type { AiBackendStatus } from '@/services/aiClient';

interface VoiceAiSettingsSheetProps {
  keys: ClientAiKeys;
  status: AiBackendStatus;
  voiceProfile: VoiceProfile;
  voiceRate: 'normal' | 'slow';
  onSaveKeys: (keys: ClientAiKeys) => Promise<void>;
  onChangeVoiceProfile: (profile: VoiceProfile) => void;
  onToggleRate: () => void;
  onTestVoice: (keysOverride: ClientAiKeys, profile: VoiceProfile) => void;
  onClose: () => void;
}

const VOICE_PROFILES: Array<{ id: VoiceProfile; name: string; desc: string }> = [
  { id: 'acolhedora', name: 'Acolhedora', desc: 'Gentil (Sarah)' },
  { id: 'clara', name: 'Clara', desc: 'Nítida (Lily)' },
  { id: 'calma', name: 'Calma', desc: 'Serena (Alice)' },
];

export function VoiceAiSettingsSheet({
  keys,
  status,
  voiceProfile,
  voiceRate,
  onSaveKeys,
  onChangeVoiceProfile,
  onToggleRate,
  onTestVoice,
  onClose,
}: VoiceAiSettingsSheetProps) {
  const [elevenKey, setElevenKey] = useState(keys.elevenLabsKey ?? '');
  const [elevenVoiceId, setElevenVoiceId] = useState(keys.elevenLabsVoiceId ?? '');
  const [geminiKey, setGeminiKey] = useState(keys.geminiKey ?? '');
  const [saving, setSaving] = useState(false);
  const [savedOk, setSavedOk] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSaveKeys({
      elevenLabsKey: elevenKey.trim(),
      elevenLabsVoiceId: elevenVoiceId.trim(),
      geminiKey: geminiKey.trim(),
    });
    setSaving(false);
    setSavedOk(true);
    setTimeout(() => setSavedOk(false), 2200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-settings-title"
      className="fixed inset-0 z-50 bg-[#111827]/55 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[430px] max-h-[90dvh] overflow-y-auto bg-[#F7F6F2] rounded-t-[30px] sm:rounded-[30px] p-5 pb-8 shadow-2xl animate-sheet-up space-y-4"
      >
          <div className="flex items-center justify-between gap-2">
            <div>
                <h2 id="ai-settings-title" className="text-[22px] font-extrabold text-[#111827]">
                  Voz Humana & IA
                </h2>
                  <p className="text-[14.5px] font-medium text-[#374151]">
                    Conecte ElevenLabs e Gemini para voz 100% natural
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Fechar configurações"
                  className="w-11 h-11 rounded-full bg-white border border-slate-300 text-[#111827] inline-flex items-center justify-center cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
            </div>

            {/* Voice Style & Speed */}
                  <section className="bg-white rounded-[24px] p-4 border-2 border-slate-200 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[15.5px] font-extrabold text-[#111827] flex items-center gap-2">
                        <Volume2 className="w-5 h-5 text-[#1D4ED8]" />
                        Estilo da voz
                      </span>
                      <button
                        type="button"
                        onClick={onToggleRate}
                        className="px-3.5 py-2 rounded-full bg-[#F3F4F6] border border-slate-300 text-[13.5px] font-extrabold text-[#111827] cursor-pointer"
                      >
                        {voiceRate === 'slow' ? '🐢 Devagar' : 'Normal'}
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {VOICE_PROFILES.map((vp) => (
                        <button
                          key={vp.id}
                          type="button"
                          onClick={() => onChangeVoiceProfile(vp.id)}
                                  ? 'border-[#1D4ED8] bg-[#EFF6FF]'
                                  : 'border-slate-200 bg-[#F7F6F2]'
                              }`}
              >
                <p className="text-[14px] font-extrabold text-[#111827]">{vp.name}</p>
                <p className="text-[12.5px] font-medium text-[#374151] mt-0.5 leading-tight">
                  {vp.desc}
                </p>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              onTestVoice(
                {
                  elevenLabsKey: elevenKey.trim(),
                  elevenLabsVoiceId: elevenVoiceId.trim(),
                  geminiKey: geminiKey.trim(),
                },
                voiceProfile
              )
            }
            className="w-full min-h-[52px] px-4 rounded-2xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-[15.5px] font-extrabold inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Ouvir teste de voz agora</span>
          </button>
        </section>

        {/* API Keys Form */}
        <form onSubmit={handleSave} className="space-y-3.5">
          <div className="bg-white rounded-[24px] p-4 border-2 border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="el-key" className="text-[15.5px] font-extrabold text-[#111827]">
                1. ElevenLabs (Voz Humana)
              </label>
              <span
                        className = {`text-[12.5px] font-extrabold px-2.5 py-0.5 rounded-full ${status.elevenLabsConnected || elevenKey.trim()
                              ? 'bg-[#DCFCE7] text-[#065F46]'
                              : 'bg-[#F3F4F6] text-[#374151]'
                          }`}
              >
                      {status.elevenLabsSource === 'env'
                        ? 'Ativa (.env)'
                        : elevenKey.trim()
                          ? 'Conectada'
                          : 'Opcional'}
                    </span>
                  </div>
                  <input
                    id="el-key"
                    type="password"
                    value={elevenKey}
                    onChange={(e) => setElevenKey(e.target.value)}
                    placeholder="sk_... (cole sua chave ElevenLabs)"
                    className="w-full min-h-[48px] px-3.5 rounded-xl bg-[#F7F6F2] border-2 border-slate-300 text-[15px] text-[#111827] focus:border-[#1D4ED8] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={elevenVoiceId}
                    onChange={(e) => setElevenVoiceId(e.target.value)}
                    placeholder="ID de voz personalizado (opcional)"
                    aria-label="ID de voz ElevenLabs opcional"
                    className="w-full min-h-[44px] px-3.5 rounded-xl bg-[#F7F6F2] border border-slate-300 text-[14px] text-[#374151] focus:outline-none"
                  />
              </div>

                <div className="bg-white rounded-[24px] p-4 border-2 border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                      <label
                        htmlFor="gm-key"
                        className="text-[15.5px] font-extrabold text-[#111827] flex items-center gap-1.5"
                      >
                        <Sparkles className="w-4.5 h-4.5 text-[#047857]" />
                        <span>2. Google Gemini (Receitas + IA)</span>
                      </label>
                      <span
                                ? 'bg-[#DCFCE7] text-[#065F46]'
                                : 'bg-[#F3F4F6] text-[#374151]'
                            }`}
              >
                {status.geminiSource === 'env'
                  ? 'Ativo (.env)'
                  : geminiKey.trim()
                    ? 'Conectado'
                    : 'Opcional'}
              </span>
            </div>
            <input
              id="gm-key"
              type="password"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              placeholder="AIza... (cole sua chave Gemini)"
              className="w-full min-h-[48px] px-3.5 rounded-xl bg-[#F7F6F2] border-2 border-slate-300 text-[15px] text-[#111827] focus:border-[#047857] focus:outline-none"
            />
            <p className="text-[13.5px] font-medium text-[#374151] leading-snug">
              Lê receitas manuscritas, busca qualquer remédio do Brasil, responde dúvidas por voz e oferece voz neural Gemini.
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full min-h-[56px] rounded-2xl bg-[#111827] hover:bg-[#1F2937] text-white font-extrabold text-[16.5px] inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : savedOk ? (
              <Check className="w-5 h-5" />
            ) : null}
            <span>{savedOk ? 'Chaves salvas!' : 'Salvar configurações'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
