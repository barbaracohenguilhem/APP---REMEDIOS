module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/src/app/api/status/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$serverAi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/serverAi.ts [app-route] (ecmascript)");
;
;
async function GET(req) {
    const resolved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$serverAi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveAiKeys"])(req);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        elevenLabsConnected: Boolean(resolved.elevenLabsKey),
        elevenLabsSource: resolved.source.elevenLabs,
        geminiConnected: Boolean(resolved.geminiKey),
        geminiSource: resolved.source.gemini,
        naturalVoiceProvider: resolved.elevenLabsKey ? 'elevenlabs' : resolved.geminiKey ? 'gemini' : 'none'
    });
}
}),
"[project]/src/lib/serverAi.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ELEVENLABS_VOICE_MAP",
    ()=>ELEVENLABS_VOICE_MAP,
    "GEMINI_VOICE_MAP",
    ()=>GEMINI_VOICE_MAP,
    "extractJsonObject",
    ()=>extractJsonObject,
    "getCachedAudio",
    ()=>getCachedAudio,
    "pcmToWav",
    ()=>pcmToWav,
    "resolveAiKeys",
    ()=>resolveAiKeys,
    "setCachedAudio",
    ()=>setCachedAudio
]);
const ELEVENLABS_VOICE_MAP = {
    acolhedora: 'EXAVITQu4vr4xnSDxMaL',
    clara: 'pFZP5JQG7iQjIQuC4Bku',
    calma: 'Xb7hH8MSUJpSbSDYk0k2'
};
const GEMINI_VOICE_MAP = {
    acolhedora: 'Aoede',
    clara: 'Kore',
    calma: 'Leda'
};
function resolveAiKeys(req) {
    const headerEleven = req.headers.get('x-elevenlabs-key')?.trim() || '';
    const envEleven = process.env.ELEVENLABS_API_KEY?.trim() || '';
    const elevenLabsKey = headerEleven || envEleven;
    const headerVoiceId = req.headers.get('x-elevenlabs-voice-id')?.trim() || '';
    const envVoiceId = process.env.ELEVENLABS_VOICE_ID?.trim() || '';
    const elevenLabsVoiceId = headerVoiceId || envVoiceId;
    const headerGemini = req.headers.get('x-gemini-key')?.trim() || '';
    const envGemini = process.env.GEMINI_API_KEY?.trim() || '';
    const geminiKey = headerGemini || envGemini;
    return {
        elevenLabsKey,
        elevenLabsVoiceId,
        geminiKey,
        source: {
            elevenLabs: headerEleven ? 'header' : envEleven ? 'env' : 'none',
            gemini: headerGemini ? 'header' : envGemini ? 'env' : 'none'
        }
    };
}
function pcmToWav(pcmBuffer, sampleRate = 24000, channels = 1, bitsPerSample = 16) {
    const byteRate = sampleRate * channels * bitsPerSample / 8;
    const blockAlign = channels * bitsPerSample / 8;
    const header = Buffer.alloc(44);
    header.write('RIFF', 0);
    header.writeUInt32LE(36 + pcmBuffer.length, 4);
    header.write('WAVE', 8);
    header.write('fmt ', 12);
    header.writeUInt32LE(16, 16); // PCM chunk size
    header.writeUInt16LE(1, 20); // AudioFormat = PCM
    header.writeUInt16LE(channels, 22);
    header.writeUInt32LE(sampleRate, 24);
    header.writeUInt32LE(byteRate, 28);
    header.writeUInt16LE(blockAlign, 32);
    header.writeUInt16LE(bitsPerSample, 34);
    header.write('data', 36);
    header.writeUInt32LE(pcmBuffer.length, 40);
    return Buffer.concat([
        header,
        pcmBuffer
    ]);
}
const audioCache = new Map();
const MAX_CACHE_ENTRIES = 80;
function getCachedAudio(cacheKey) {
    const hit = audioCache.get(cacheKey);
    if (!hit) return undefined;
    // Refresh LRU order
    audioCache.delete(cacheKey);
    audioCache.set(cacheKey, hit);
    return hit;
}
function setCachedAudio(cacheKey, entry) {
    if (audioCache.size >= MAX_CACHE_ENTRIES) {
        const oldestKey = audioCache.keys().next().value;
        if (oldestKey) audioCache.delete(oldestKey);
    }
    audioCache.set(cacheKey, entry);
}
function extractJsonObject(raw) {
    const trimmed = raw.trim();
    const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
    const candidate = fenced ? fenced[1].trim() : trimmed;
    try {
        return JSON.parse(candidate);
    } catch  {
        const firstBrace = candidate.indexOf('{');
        const lastBrace = candidate.lastIndexOf('}');
        if (firstBrace >= 0 && lastBrace > firstBrace) {
            return JSON.parse(candidate.slice(firstBrace, lastBrace + 1));
        }
        throw new Error('Could not parse JSON from Gemini response');
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0xyrdk7r5vorx._.js.map