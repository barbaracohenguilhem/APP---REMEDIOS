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
  { id: 'acolhedora', name: 'Acolhedora', desc: 'Quente e gentil (Sarah)' },
  { id: 'clara', name: 'Clara', desc: 'Articulada e nítida (Lily)' },
  { id: 'calma', name: 'Calma', desc: 'Ritmo sereno (Alice)' },
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
      className="fixed inset-0 z-50 bg-[#1C1917]/45 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[430px] max-h-[90dvh] overflow-y-auto bg-[#F6F4EF] rounded-t-[32px] sm:rounded-[32px] p-5 pb-8 shadow-2xl animate-sheet-up space-y-5"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 id="ai-settings-title" className="text-[20px] font-bold text-[#1C1917]">
              Voz Humana & IA
            </h2>
            <p className="text-[13px] text-[#6B6560]">
              Conecte ElevenLabs e Gemini para voz 100% natural e leitura de receitas
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar configurações"
            className="w-9 h-9 rounded-full bg-white text-[#57534E] hover:bg-[#EAE4D9] inline-flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Voice Style & Speed */}
        <section className="bg-white rounded-[24px] p-4 border border-black/[0.05] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-bold text-[#1C1917] flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-[#146356]" />
              Tom da voz brasileira
            </span>
            <button
              type="button"
              onClick={onToggleRate}
              className="px-3 py-1 rounded-full bg-[#F3EFE8] text-[12px] font-semibold text-[#1C1917] cursor-pointer"
            >
              {voiceRate === 'slow' ? 'Ritmo: Calmo (0.85×)' : 'Ritmo: Normal (1×)'}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {VOICE_PROFILES.map((vp) => (
              <button
                key={vp.id}
                type="button"
                onClick={() => onChangeVoiceProfile(vp.id)}
                className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  voiceProfile === vp.id
                    ? 'border-[#146356] bg-[#E6F2EF]'
                    : 'border-black/[0.06] bg-[#FAF9F6]'
                }`}
              >
                <p className="text-[13px] font-bold text-[#1C1917]">{vp.name}</p>
                <p className="text-[11px] text-[#6B6560] mt-0.5 leading-tight">{vp.desc}</p>
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
            className="w-full py-2.5 px-4 rounded-full bg-[#146356] hover:bg-[#0F4F45] text-white text-[13.5px] font-semibold inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Ouvir teste de voz agora</span>
          </button>
        </section>

        {/* API Keys Form */}
        <form onSubmit={handleSave} className="space-y-3.5">
          {/* ElevenLabs */}
          <div className="bg-white rounded-[24px] p-4 border border-black/[0.05] space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="el-key" className="text-[14px] font-bold text-[#1C1917]">
                1. ElevenLabs (Voz Humana)
              </label>
              <span
                className={`text-[11.5px] font-semibold px-2.5 py-0.5 rounded-full ${
                  status.elevenLabsConnected || elevenKey.trim()
                    ? 'bg-[#E6F2EF] text-[#146356]'
                    : 'bg-[#F3EFE8] text-[#78716C]'
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
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6F4EF] text-[13.5px] text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#146356]/30"
            />
            <input
              type="text"
              value={elevenVoiceId}
              onChange={(e) => setElevenVoiceId(e.target.value)}
              placeholder="ID de voz personalizado (opcional)"
              aria-label="ID de voz ElevenLabs opcional"
              className="w-full px-3.5 py-2 rounded-xl bg-[#F6F4EF] text-[12.5px] text-[#57534E] focus:outline-none"
            />
          </div>

          {/* Gemini */}
          <div className="bg-white rounded-[24px] p-4 border border-black/[0.05] space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="gm-key" className="text-[14px] font-bold text-[#1C1917] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#146356]" />
                <span>2. Google Gemini (Receitas + Qualquer Remédio)</span>
              </label>
              <span
                className={`text-[11.5px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${
                  status.geminiConnected || geminiKey.trim()
                    ? 'bg-[#E6F2EF] text-[#146356]'
                    : 'bg-[#F3EFE8] text-[#78716C]'
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
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6F4EF] text-[13.5px] text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#146356]/30"
            />
            <p className="text-[12px] text-[#78716C] leading-relaxed">
              Libera leitura de receitas manuscritas, busca de qualquer remédio do Brasil, dúvidas por voz e voz neural Gemini (se ElevenLabs não estiver conectada).
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3.5 rounded-full bg-[#1C1917] hover:bg-[#292524] text-white font-semibold text-[15px] inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : savedOk ? (
              <Check className="w-4 h-4" />
            ) : null}
            <span>{savedOk ? 'Chaves salvas!' : 'Salvar configurações'}</span>
          </button>

          <p className="text-[11.5px] text-center text-[#78716C]">
            Para deploy em produção (Vercel), você também pode definir <code>ELEVENLABS_API_KEY</code> e <code>GEMINI_API_KEY</code> no arquivo <code>.env.local</code>.
          </p>
        </form>
      </div>
    </div>
  );
}
