(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/AddAlarmSheet.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AddAlarmSheet",
    ()=>AddAlarmSheet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MedicationAvatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/MedicationAvatar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const PRESETS = [
    {
        label: 'Manhã (08:00)',
        times: [
            '08:00'
        ]
    },
    {
        label: 'Noite (21:00)',
        times: [
            '21:00'
        ]
    },
    {
        label: '12 em 12h',
        times: [
            '08:00',
            '20:00'
        ]
    },
    {
        label: '8 em 8h',
        times: [
            '07:00',
            '15:00',
            '23:00'
        ]
    }
];
function AddAlarmSheet({ medications, medicationPhotos, initialMedicationId, onSave, onClose }) {
    _s();
    const initial = medications.find((m)=>m.id === initialMedicationId) ?? medications[0];
    const [selectedMedId, setSelectedMedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initial?.id ?? '');
    const [dosage, setDosage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initial?.howToTake.defaultDosage ?? '1 comprimido');
    const [times, setTimes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initial?.howToTake.defaultTimes?.length ? [
        ...initial.howToTake.defaultTimes
    ] : [
        '08:00'
    ]);
    const [cycleMode, setCycleMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initial?.category === 'anticoncepcional' ? '24_4' : 'daily');
    const [notes, setNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initial?.howToTake.summary ?? '');
    const handlePickMed = (med)=>{
        setSelectedMedId(med.id);
        setDosage(med.howToTake.defaultDosage);
        setTimes(med.howToTake.defaultTimes.length ? [
            ...med.howToTake.defaultTimes
        ] : [
            '08:00'
        ]);
        setCycleMode(med.category === 'anticoncepcional' ? '24_4' : 'daily');
        setNotes(med.howToTake.summary);
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        const cleanTimes = Array.from(new Set(times.map((t)=>t.trim()).filter((t)=>/^\d{2}:\d{2}$/.test(t)))).sort();
        if (!selectedMedId || cleanTimes.length === 0) return;
        onSave({
            medicationId: selectedMedId,
            dosage: dosage.trim() || '1 comprimido',
            times: cleanTimes,
            daysOfWeek: [
                0,
                1,
                2,
                3,
                4,
                5,
                6
            ],
            cycleMode,
            enabled: true,
            notes: notes.trim() || undefined
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "add-alarm-sheet-title",
        className: "fixed inset-0 z-50 bg-[#1C1917]/45 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-0 sm:p-4",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            onClick: (e)=>e.stopPropagation(),
            className: "w-full max-w-[430px] max-h-[88dvh] overflow-y-auto bg-[#F6F4EF] rounded-t-[32px] sm:rounded-[32px] p-5 pb-8 shadow-2xl animate-sheet-up space-y-5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            id: "add-alarm-sheet-title",
                            className: "text-[20px] font-bold text-[#1C1917]",
                            children: "Novo lembrete"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AddAlarmSheet.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onClose,
                            "aria-label": "Fechar",
                            className: "w-9 h-9 rounded-full bg-white text-[#57534E] hover:bg-[#EAE4D9] inline-flex items-center justify-center cursor-pointer",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AddAlarmSheet.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/AddAlarmSheet.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AddAlarmSheet.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2.5 overflow-x-auto no-scrollbar pb-1",
                            children: medications.map((med)=>{
                                const active = med.id === selectedMedId;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>handlePickMed(med),
                                    className: `shrink-0 px-3.5 py-2.5 rounded-[20px] border flex items-center gap-2.5 transition-all cursor-pointer ${active ? 'bg-[#1C1917] text-white border-[#1C1917]' : 'bg-white text-[#1C1917] border-black/[0.06]'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MedicationAvatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MedicationAvatar"], {
                                            medication: med,
                                            photoOverride: medicationPhotos[med.id],
                                            size: "sm",
                                            className: "w-8 h-8 rounded-xl"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddAlarmSheet.tsx",
                                            lineNumber: 109,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[13.5px] font-semibold",
                                            children: med.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddAlarmSheet.tsx",
                                            lineNumber: 115,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, med.id, true, {
                                    fileName: "[project]/src/components/AddAlarmSheet.tsx",
                                    lineNumber: 99,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/AddAlarmSheet.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-[24px] p-4 border border-black/[0.05] space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[13px] font-semibold text-[#57534E]",
                                    children: "Horários"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AddAlarmSheet.tsx",
                                    lineNumber: 123,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-2",
                                    children: PRESETS.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setTimes([
                                                    ...p.times
                                                ]),
                                            className: "py-2.5 px-3 rounded-xl bg-[#F6F4EF] hover:bg-[#E6F2EF] text-[13px] font-semibold text-[#1C1917] text-left cursor-pointer",
                                            children: p.label
                                        }, p.label, false, {
                                            fileName: "[project]/src/components/AddAlarmSheet.tsx",
                                            lineNumber: 126,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AddAlarmSheet.tsx",
                                    lineNumber: 124,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2 pt-1",
                                    children: [
                                        times.map((t, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 flex items-center gap-2.5 rounded-2xl bg-[#F6F4EF] px-4 py-2.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                className: "w-4.5 h-4.5 text-[#146356]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AddAlarmSheet.tsx",
                                                                lineNumber: 141,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "time",
                                                                "aria-label": `Horário ${idx + 1}`,
                                                                value: t,
                                                                onChange: (e)=>setTimes((prev)=>prev.map((v, i)=>i === idx ? e.target.value : v)),
                                                                className: "flex-1 bg-transparent text-[18px] font-bold text-[#1C1917] focus:outline-none"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AddAlarmSheet.tsx",
                                                                lineNumber: 142,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/AddAlarmSheet.tsx",
                                                        lineNumber: 140,
                                                        columnNumber: 19
                                                    }, this),
                                                    times.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setTimes((prev)=>prev.filter((_, i)=>i !== idx)),
                                                        "aria-label": "Remover horário",
                                                        className: "w-10 h-10 rounded-full bg-[#FEECEF] text-[#BE123C] inline-flex items-center justify-center cursor-pointer",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AddAlarmSheet.tsx",
                                                            lineNumber: 159,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AddAlarmSheet.tsx",
                                                        lineNumber: 153,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, idx, true, {
                                                fileName: "[project]/src/components/AddAlarmSheet.tsx",
                                                lineNumber: 139,
                                                columnNumber: 17
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>{
                                                const next = [
                                                    '12:00',
                                                    '18:00',
                                                    '20:00',
                                                    '08:00',
                                                    '14:00'
                                                ].find((c)=>!times.includes(c)) ?? '15:00';
                                                setTimes((prev)=>[
                                                        ...prev,
                                                        next
                                                    ]);
                                            },
                                            className: "w-full py-2.5 rounded-xl border border-dashed border-[#146356]/35 text-[#146356] text-[13px] font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AddAlarmSheet.tsx",
                                                    lineNumber: 175,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Outro horário no dia"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AddAlarmSheet.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AddAlarmSheet.tsx",
                                            lineNumber: 165,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AddAlarmSheet.tsx",
                                    lineNumber: 137,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AddAlarmSheet.tsx",
                            lineNumber: 122,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-[24px] p-4 border border-black/[0.05] grid grid-cols-2 gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "al-dose",
                                            className: "block text-[12.5px] font-semibold text-[#57534E] mb-1",
                                            children: "Dose"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddAlarmSheet.tsx",
                                            lineNumber: 184,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "al-dose",
                                            type: "text",
                                            value: dosage,
                                            onChange: (e)=>setDosage(e.target.value),
                                            className: "w-full px-3.5 py-2.5 rounded-xl bg-[#F6F4EF] text-[13.5px] font-semibold text-[#1C1917] focus:outline-none"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddAlarmSheet.tsx",
                                            lineNumber: 187,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AddAlarmSheet.tsx",
                                    lineNumber: 183,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "al-cycle",
                                            className: "block text-[12.5px] font-semibold text-[#57534E] mb-1",
                                            children: "Frequência"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddAlarmSheet.tsx",
                                            lineNumber: 196,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            id: "al-cycle",
                                            value: cycleMode,
                                            onChange: (e)=>setCycleMode(e.target.value),
                                            className: "w-full px-3 py-2.5 rounded-xl bg-[#F6F4EF] text-[13.5px] font-semibold text-[#1C1917] focus:outline-none",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "daily",
                                                    children: "Todos os dias"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AddAlarmSheet.tsx",
                                                    lineNumber: 205,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "24_4",
                                                    children: "24d + 4 pausa"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AddAlarmSheet.tsx",
                                                    lineNumber: 206,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "21_7",
                                                    children: "21d + 7 pausa"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AddAlarmSheet.tsx",
                                                    lineNumber: 207,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AddAlarmSheet.tsx",
                                            lineNumber: 199,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AddAlarmSheet.tsx",
                                    lineNumber: 195,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AddAlarmSheet.tsx",
                            lineNumber: 182,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: "w-full py-4 rounded-full bg-[#146356] hover:bg-[#0F4F45] text-white font-bold text-[15px] cursor-pointer",
                            children: "Salvar lembrete"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AddAlarmSheet.tsx",
                            lineNumber: 212,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AddAlarmSheet.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/AddAlarmSheet.tsx",
            lineNumber: 75,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/AddAlarmSheet.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_s(AddAlarmSheet, "7xEAU4eosyRueEEaFpzx4oPkQII=");
_c = AddAlarmSheet;
var _c;
__turbopack_context__.k.register(_c, "AddAlarmSheet");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AddMedicationSheet.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AddMedicationSheet",
    ()=>AddMedicationSheet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alarm$2d$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlarmClock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/alarm-clock.js [app-client] (ecmascript) <export default as AlarmClock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/camera.js [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImagePlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image-plus.js [app-client] (ecmascript) <export default as ImagePlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.js [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic-off.js [app-client] (ecmascript) <export default as MicOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$samplePrescriptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/samplePrescriptions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$medicationSearch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/medicationSearch.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$aiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/aiClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/voiceEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MedicationAvatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/MedicationAvatar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
async function fileToCompressedDataUrl(file) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onerror = ()=>reject(new Error('Falha ao ler arquivo'));
        reader.onload = ()=>{
            const rawUrl = String(reader.result || '');
            const img = new Image();
            img.onload = ()=>{
                const maxDim = 1024;
                const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
                const canvas = document.createElement('canvas');
                canvas.width = Math.max(1, Math.round(img.width * scale));
                canvas.height = Math.max(1, Math.round(img.height * scale));
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    resolve({
                        dataUrl: rawUrl,
                        mimeType: file.type || 'image/jpeg'
                    });
                    return;
                }
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const compressed = canvas.toDataURL('image/jpeg', 0.82);
                resolve({
                    dataUrl: compressed,
                    mimeType: 'image/jpeg'
                });
            };
            img.onerror = ()=>resolve({
                    dataUrl: rawUrl,
                    mimeType: file.type || 'image/jpeg'
                });
            img.src = rawUrl;
        };
        reader.readAsDataURL(file);
    });
}
function AddMedicationSheet({ catalog, hasGeminiKey, onClose, onOpenVoiceSettings, onAddExisting, onAddNewMedication, onSpeak }) {
    _s();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('choose');
    const cameraRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const galleryRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Scan / Print state
    const [photoDataUrl, setPhotoDataUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [scanning, setScanning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scanError, setScanError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [scannedItems, setScannedItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showExamples, setShowExamples] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pastedText, setPastedText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [resolvingIdx, setResolvingIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Voice state
    const [listening, setListening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [voiceHeard, setVoiceHeard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [voiceError, setVoiceError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Search / AI Lookup state
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [lookingUpAi, setLookingUpAi] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lookupError, setLookupError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Manual form
    const [manualName, setManualName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [manualDosage, setManualDosage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('1 comprimido');
    const [manualTime, setManualTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('08:00');
    const [manualNotes, setManualNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const handleImagePicked = async (file)=>{
        setStep('scan');
        setScanning(true);
        setScanError(null);
        setScannedItems([]);
        try {
            const { dataUrl, mimeType } = await fileToCompressedDataUrl(file);
            setPhotoDataUrl(dataUrl);
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$aiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scanPrescriptionImage"])({
                imageBase64: dataUrl,
                mimeType
            });
            setScanning(false);
            if (res.error === 'NO_GEMINI_KEY') {
                // Graceful filename fallback if user hasn't added Gemini key yet
                const fallbackMatches = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$medicationSearch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parsePrescriptionText"])(file.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' '), catalog);
                if (fallbackMatches.length > 0) {
                    setScannedItems(fallbackMatches.map((m)=>({
                            catalogId: m.medication.id,
                            name: m.medication.name,
                            activeIngredient: m.medication.activeIngredient,
                            dosage: m.detectedDosage,
                            times: m.detectedTimes,
                            cycleMode: m.medication.category === 'anticoncepcional' ? '24_4' : 'daily',
                            notes: m.medication.howToTake.summary
                        })));
                    return;
                }
                setScanError(res.message || 'Configure a chave Gemini para ler receitas por foto.');
                return;
            }
            if (res.error) {
                setScanError(res.message || 'Não foi possível ler a imagem.');
                return;
            }
            if (res.items.length === 0) {
                setScanError('Não identifiquei o nome do remédio nessa imagem. Tente outra foto ou busque pelo nome.');
                return;
            }
            setScannedItems(res.items);
            onSpeak('scan-done', `Encontrei ${res.items.map((i)=>i.name).join(' e ')}. Toque para salvar e ouvir a bula fácil.`);
        } catch  {
            setScanning(false);
            setScanError('Não consegui processar a imagem. Tente novamente.');
        }
    };
    const handleAnalyzeText = (text)=>{
        setStep('scan');
        setPhotoDataUrl(null);
        setScanError(null);
        const local = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$medicationSearch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parsePrescriptionText"])(text, catalog);
        if (local.length === 0) {
            setScannedItems([]);
            setScanError('Não encontrei nenhum remédio nesse texto. Tente buscar pelo nome.');
            return;
        }
        const items = local.map((m)=>({
                catalogId: m.medication.id,
                name: m.medication.name,
                activeIngredient: m.medication.activeIngredient,
                dosage: m.detectedDosage,
                times: m.detectedTimes,
                cycleMode: m.medication.category === 'anticoncepcional' ? '24_4' : 'daily',
                notes: m.medication.howToTake.summary
            }));
        setScannedItems(items);
        onSpeak('scan-text-done', `Encontrei ${items.map((i)=>i.name).join(' e ')}. Toque para abrir.`);
    };
    const handleConfirmScannedItem = async (item, idx, withAlarm)=>{
        const existing = item.catalogId ? catalog.find((m)=>m.id === item.catalogId) : undefined;
        if (existing) {
            onAddExisting(existing, {
                createAlarm: withAlarm,
                alarmTimes: item.times,
                photoDataUrl: photoDataUrl || undefined,
                openAfter: true
            });
            onClose();
            return;
        }
        // Not in local catalog — fetch complete Brazilian bula & bioequivalent differences via Gemini!
        setResolvingIdx(idx);
        const lookup = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$aiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lookupAnyBrazilianMedication"])(item.name);
        setResolvingIdx(null);
        if (lookup.medication) {
            onAddNewMedication(lookup.medication, withAlarm ? item.times : undefined, photoDataUrl || undefined);
            onClose();
            return;
        }
        const custom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$medicationSearch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCustomMedication"])({
            name: item.name,
            activeIngredient: item.activeIngredient,
            dosage: item.dosage,
            notes: item.notes,
            colorTheme: 'teal'
        });
        onAddNewMedication(custom, withAlarm ? item.times : undefined, photoDataUrl || undefined);
        onClose();
    };
    const handleAiLookupQuery = async (term)=>{
        const clean = term.trim();
        if (!clean) return;
        setLookingUpAi(true);
        setLookupError(null);
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$aiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lookupAnyBrazilianMedication"])(clean);
        setLookingUpAi(false);
        if (res.medication) {
            const existing = catalog.find((m)=>m.id === res.medication.id);
            if (existing) {
                onAddExisting(existing, {
                    createAlarm: false,
                    openAfter: true
                });
            } else {
                onAddNewMedication(res.medication);
            }
            onClose();
            return;
        }
        setLookupError(res.message || 'Não encontrei esse remédio. Você pode cadastrar manualmente abaixo.');
    };
    const handleStartVoice = ()=>{
        setVoiceError(null);
        setListening(true);
        const stop = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].startListening({
            onResult: (transcript)=>{
                setListening(false);
                setVoiceHeard(transcript);
                const matches = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$medicationSearch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchMedications"])(catalog, transcript);
                if (matches.length > 0 && transcript.length >= 3) {
                    setQuery(transcript);
                    setStep('search');
                } else if (hasGeminiKey) {
                    void handleAiLookupQuery(transcript);
                } else {
                    setQuery(transcript);
                    setStep('search');
                }
            },
            onError: (msg)=>{
                setListening(false);
                setVoiceError(msg);
            },
            onEnd: ()=>{
                setListening(false);
            }
        });
        if (!stop) setListening(false);
    };
    const localResults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$medicationSearch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchMedications"])(catalog, query);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "add-sheet-title",
        className: "fixed inset-0 z-50 bg-[#1C1917]/45 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-0 sm:p-4",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            onClick: (e)=>e.stopPropagation(),
            className: "w-full max-w-[430px] max-h-[90dvh] overflow-y-auto bg-[#F6F4EF] rounded-t-[32px] sm:rounded-[32px] p-5 pb-8 shadow-2xl animate-sheet-up space-y-5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    ref: cameraRef,
                    type: "file",
                    accept: "image/*",
                    capture: "environment",
                    className: "hidden",
                    onChange: (e)=>{
                        const f = e.target.files?.[0];
                        if (f) void handleImagePicked(f);
                        e.target.value = '';
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                    lineNumber: 316,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    ref: galleryRef,
                    type: "file",
                    accept: "image/*",
                    className: "hidden",
                    onChange: (e)=>{
                        const f = e.target.files?.[0];
                        if (f) void handleImagePicked(f);
                        e.target.value = '';
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                    lineNumber: 328,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                step !== 'choose' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setStep('choose'),
                                    "aria-label": "Voltar",
                                    className: "w-9 h-9 rounded-full bg-white text-[#57534E] hover:bg-[#EAE4D9] inline-flex items-center justify-center cursor-pointer",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                        className: "w-4.5 h-4.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                        lineNumber: 350,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 344,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    id: "add-sheet-title",
                                    className: "text-[20px] font-bold text-[#1C1917]",
                                    children: step === 'choose' ? 'Adicionar remédio' : step === 'scan' ? 'Foto ou receita' : step === 'voice' ? 'Falar o nome' : step === 'manual' ? 'Cadastro manual' : 'Buscar remédio'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 353,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                            lineNumber: 342,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onClose,
                            "aria-label": "Fechar",
                            className: "w-9 h-9 rounded-full bg-white text-[#57534E] hover:bg-[#EAE4D9] inline-flex items-center justify-center cursor-pointer",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                lineNumber: 372,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                            lineNumber: 366,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                    lineNumber: 341,
                    columnNumber: 9
                }, this),
                step === 'choose' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setStep('scan'),
                            className: "w-full p-5 rounded-[24px] bg-white hover:bg-[#FCFBF9] border border-black/[0.05] shadow-[0_2px_14px_rgba(28,25,23,0.04)] flex items-center gap-4 text-left active:scale-[0.99] transition-all cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-13 h-13 rounded-2xl bg-[#E6F2EF] text-[#146356] flex items-center justify-center shrink-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                        className: "w-6 h-6 stroke-[2]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                        lineNumber: 385,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 384,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[16px] font-bold text-[#1C1917]",
                                            children: "Foto da receita ou caixa"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                            lineNumber: 388,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[13.5px] text-[#6B6560] mt-0.5",
                                            children: "Lê receita médica, caixinha ou print de WhatsApp"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                            lineNumber: 389,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 387,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                            lineNumber: 379,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setStep('voice'),
                            className: "w-full p-5 rounded-[24px] bg-white hover:bg-[#FCFBF9] border border-black/[0.05] shadow-[0_2px_14px_rgba(28,25,23,0.04)] flex items-center gap-4 text-left active:scale-[0.99] transition-all cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-13 h-13 rounded-2xl bg-[#FEF3DD] text-[#B45309] flex items-center justify-center shrink-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                        className: "w-6 h-6 stroke-[2]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                        lineNumber: 401,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 400,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[16px] font-bold text-[#1C1917]",
                                            children: "Falar o nome do remédio"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                            lineNumber: 404,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[13.5px] text-[#6B6560] mt-0.5",
                                            children: "Sem precisar digitar — só falar em voz alta"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                            lineNumber: 405,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 403,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                            lineNumber: 395,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setStep('search'),
                            className: "w-full p-5 rounded-[24px] bg-white hover:bg-[#FCFBF9] border border-black/[0.05] shadow-[0_2px_14px_rgba(28,25,23,0.04)] flex items-center gap-4 text-left active:scale-[0.99] transition-all cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-13 h-13 rounded-2xl bg-[#EFECE6] text-[#44403C] flex items-center justify-center shrink-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        className: "w-6 h-6 stroke-[2]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                        lineNumber: 417,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 416,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[16px] font-bold text-[#1C1917]",
                                            children: "Buscar qualquer remédio"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                            lineNumber: 420,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[13.5px] text-[#6B6560] mt-0.5",
                                            children: "Catálogo brasileiro completo ou cadastro manual"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                            lineNumber: 421,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 419,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                            lineNumber: 411,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                    lineNumber: 378,
                    columnNumber: 11
                }, this),
                step === 'scan' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>cameraRef.current?.click(),
                                    className: "py-4 px-4 rounded-[20px] bg-[#146356] hover:bg-[#0F4F45] text-white font-semibold text-[14.5px] inline-flex items-center justify-center gap-2 cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                            lineNumber: 438,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Tirar foto"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                            lineNumber: 439,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 433,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>galleryRef.current?.click(),
                                    className: "py-4 px-4 rounded-[20px] bg-white border border-black/10 hover:bg-[#F3EFE8] text-[#1C1917] font-semibold text-[14.5px] inline-flex items-center justify-center gap-2 cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImagePlus$3e$__["ImagePlus"], {
                                            className: "w-5 h-5 text-[#146356]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                            lineNumber: 446,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Print / Galeria"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                            lineNumber: 447,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 441,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                            lineNumber: 432,
                            columnNumber: 13
                        }, this),
                        photoDataUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-[20px] overflow-hidden bg-white border border-black/[0.06] max-h-44 flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: photoDataUrl,
                                alt: "Foto selecionada",
                                className: "max-h-44 object-contain"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                lineNumber: 453,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                            lineNumber: 452,
                            columnNumber: 15
                        }, this),
                        scanning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-[20px] p-5 flex items-center gap-3 text-[14px] font-semibold text-[#146356]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "w-5 h-5 animate-spin shrink-0"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 459,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Lendo receita com visão por IA..."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 460,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                            lineNumber: 458,
                            columnNumber: 15
                        }, this),
                        scanError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-[#FFF6F7] border border-[#BE123C]/15 rounded-[20px] p-4 space-y-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[13.5px] text-[#9F1239] leading-relaxed",
                                    children: scanError
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 466,
                                    columnNumber: 17
                                }, this),
                                !hasGeminiKey && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        onClose();
                                        onOpenVoiceSettings();
                                    },
                                    className: "py-2 px-4 rounded-full bg-[#146356] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                            lineNumber: 476,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Conectar chave Gemini agora"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                            lineNumber: 477,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 468,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                            lineNumber: 465,
                            columnNumber: 15
                        }, this),
                        scannedItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: scannedItems.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-[22px] p-4 border border-black/[0.06] space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[16px] font-bold text-[#1C1917]",
                                                    children: item.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                                    lineNumber: 491,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[13px] text-[#6B6560]",
                                                    children: [
                                                        item.dosage,
                                                        " · Horário sugerido: ",
                                                        item.times.join(', ')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                                    lineNumber: 492,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                            lineNumber: 490,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    disabled: resolvingIdx === idx,
                                                    onClick: ()=>void handleConfirmScannedItem(item, idx, true),
                                                    className: "flex-1 py-3 px-3 rounded-full bg-[#146356] text-white text-[13px] font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer",
                                                    children: [
                                                        resolvingIdx === idx ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                            className: "w-4 h-4 animate-spin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                                            lineNumber: 504,
                                                            columnNumber: 27
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alarm$2d$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlarmClock$3e$__["AlarmClock"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                                            lineNumber: 506,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Salvar + Alarme"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                                            lineNumber: 508,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                                    lineNumber: 497,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    disabled: resolvingIdx === idx,
                                                    onClick: ()=>void handleConfirmScannedItem(item, idx, false),
                                                    className: "py-3 px-4 rounded-full bg-[#F3EFE8] text-[#1C1917] text-[13px] font-semibold cursor-pointer",
                                                    children: "Só abrir"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                                    lineNumber: 510,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                            lineNumber: 496,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, `${item.name}-${idx}`, true, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 486,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                            lineNumber: 484,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-[22px] p-4 border border-black/[0.05] space-y-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "paste-rx",
                                    className: "text-[13px] font-semibold text-[#57534E]",
                                    children: "Ou cole o texto de uma receita do WhatsApp"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 526,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    id: "paste-rx",
                                    rows: 2,
                                    value: pastedText,
                                    onChange: (e)=>setPastedText(e.target.value),
                                    placeholder: "Ex: Iumi 1 comp às 21:00 e Dipirona 6/6h",
                                    className: "w-full rounded-2xl bg-[#F6F4EF] px-3.5 py-2.5 text-[14px] text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#146356]/30"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 529,
                                    columnNumber: 15
                                }, this),
                                pastedText.trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>handleAnalyzeText(pastedText),
                                    className: "w-full py-2.5 rounded-full bg-[#1C1917] text-white text-[13px] font-semibold cursor-pointer",
                                    children: "Ler receita colada"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 538,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                            lineNumber: 525,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setShowExamples((v)=>!v),
                                    className: "text-[13px] font-semibold text-[#146356] hover:underline cursor-pointer",
                                    children: showExamples ? 'Esconder exemplos' : 'Testar com um exemplo de receita pronto'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 550,
                                    columnNumber: 15
                                }, this),
                                showExamples && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 space-y-2 text-left",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$samplePrescriptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SAMPLE_PRESCRIPTIONS"].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>handleAnalyzeText(s.extractedText),
                                            className: "w-full p-3.5 rounded-2xl bg-white border border-black/[0.05] hover:bg-[#FAF9F6] cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[14px] font-bold text-[#1C1917]",
                                                    children: s.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                                    lineNumber: 567,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[12.5px] text-[#78716C] mt-0.5 truncate",
                                                    children: s.previewLines.slice(1).join(' · ')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                                    lineNumber: 568,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, s.id, true, {
                                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                            lineNumber: 561,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 559,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                            lineNumber: 549,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                    lineNumber: 431,
                    columnNumber: 11
                }, this),
                step === 'voice' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-[26px] p-6 border border-black/[0.05] flex flex-col items-center text-center space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[14.5px] text-[#57534E]",
                            children: "Toque no botão e diga o nome do remédio (ex.: “Iumi”, “Losartana”, “Ozempic”)"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                            lineNumber: 582,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleStartVoice,
                            "aria-label": listening ? 'Ouvindo' : 'Falar nome do remédio',
                            className: `w-24 h-24 rounded-full flex items-center justify-center text-white shadow-lg transition-all cursor-pointer ${listening ? 'bg-[#BE123C] ring-[10px] ring-[#BE123C]/20 animate-pulse' : 'bg-[#146356] animate-calm-breathe'}`,
                            children: listening ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__["MicOff"], {
                                className: "w-10 h-10"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                lineNumber: 595,
                                columnNumber: 28
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                className: "w-10 h-10"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                lineNumber: 595,
                                columnNumber: 63
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                            lineNumber: 585,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[16px] font-bold text-[#1C1917]",
                            children: listening ? 'Estou ouvindo...' : 'Toque para falar'
                        }, void 0, false, {
                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                            lineNumber: 597,
                            columnNumber: 13
                        }, this),
                        voiceHeard && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[13.5px] text-[#146356] font-medium",
                            children: [
                                "Ouvi: “",
                                voiceHeard,
                                "”"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                            lineNumber: 601,
                            columnNumber: 15
                        }, this),
                        voiceError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[13px] text-[#BE123C]",
                            children: voiceError
                        }, void 0, false, {
                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                            lineNumber: 605,
                            columnNumber: 28
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                    lineNumber: 581,
                    columnNumber: 11
                }, this),
                step === 'search' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                    className: "w-4.5 h-4.5 text-[#78716C] absolute left-4 top-1/2 -translate-y-1/2"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 613,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "search",
                                    autoFocus: true,
                                    value: query,
                                    onChange: (e)=>{
                                        setQuery(e.target.value);
                                        setLookupError(null);
                                    },
                                    placeholder: "Digite qualquer remédio do Brasil...",
                                    className: "w-full pl-11 pr-4 py-3.5 rounded-full bg-white border border-black/[0.08] text-[15px] text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#146356]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 614,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                            lineNumber: 612,
                            columnNumber: 13
                        }, this),
                        query.trim().length >= 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            disabled: lookingUpAi,
                            onClick: ()=>void handleAiLookupQuery(query),
                            className: "w-full py-3.5 px-4 rounded-[20px] bg-[#E6F2EF] hover:bg-[#D5EBE5] text-[#0F4F45] font-semibold text-[14px] inline-flex items-center justify-center gap-2 cursor-pointer",
                            children: lookingUpAi ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "w-4 h-4 animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                        lineNumber: 637,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Montando bula e genéricos de “",
                                            query.trim(),
                                            "”..."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                        lineNumber: 638,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                lineNumber: 636,
                                columnNumber: 19
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                        lineNumber: 642,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Consultar “",
                                            query.trim(),
                                            "” com IA (qualquer remédio BR)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                        lineNumber: 643,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                lineNumber: 641,
                                columnNumber: 19
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                            lineNumber: 629,
                            columnNumber: 15
                        }, this),
                        lookupError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[13px] text-[#9F1239] bg-[#FFF6F7] rounded-2xl p-3.5",
                            children: lookupError
                        }, void 0, false, {
                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                            lineNumber: 650,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-[24px] border border-black/[0.05] divide-y divide-black/[0.05] overflow-hidden max-h-72 overflow-y-auto",
                            children: localResults.map((med)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        onAddExisting(med, {
                                            createAlarm: false,
                                            openAfter: true
                                        });
                                        onClose();
                                    },
                                    className: "w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-[#FAF9F6] cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MedicationAvatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MedicationAvatar"], {
                                            medication: med,
                                            size: "sm"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                            lineNumber: 666,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "min-w-0 flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[15px] font-bold text-[#1C1917] truncate",
                                                    children: med.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                                    lineNumber: 668,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[12.5px] text-[#78716C] truncate",
                                                    children: med.activeIngredient
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                                    lineNumber: 669,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                            lineNumber: 667,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            className: "w-4 h-4 text-[#146356] opacity-70"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                            lineNumber: 671,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, med.id, true, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 657,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                            lineNumber: 655,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>{
                                setManualName(query);
                                setStep('manual');
                            },
                            className: "w-full py-3 rounded-full bg-white border border-black/10 text-[#57534E] text-[13.5px] font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 684,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Cadastrar manualmente"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 685,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                            lineNumber: 676,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                    lineNumber: 611,
                    columnNumber: 11
                }, this),
                step === 'manual' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: (e)=>{
                        e.preventDefault();
                        if (!manualName.trim()) return;
                        const med = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$medicationSearch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCustomMedication"])({
                            name: manualName,
                            dosage: manualDosage,
                            notes: manualNotes,
                            colorTheme: 'teal'
                        });
                        onAddNewMedication(med, manualTime ? [
                            manualTime
                        ] : undefined);
                        onClose();
                    },
                    className: "bg-white rounded-[24px] p-5 border border-black/[0.05] space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "man-name",
                                    className: "block text-[13px] font-semibold text-[#57534E] mb-1.5",
                                    children: "Nome do remédio"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 708,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "man-name",
                                    type: "text",
                                    required: true,
                                    value: manualName,
                                    onChange: (e)=>setManualName(e.target.value),
                                    placeholder: "Ex: Vitamina D 2000 UI",
                                    className: "w-full px-4 py-3 rounded-2xl bg-[#F6F4EF] text-[15px] text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#146356]/30"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 711,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                            lineNumber: 707,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "man-dose",
                                            className: "block text-[13px] font-semibold text-[#57534E] mb-1.5",
                                            children: "Dose"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                            lineNumber: 724,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "man-dose",
                                            type: "text",
                                            value: manualDosage,
                                            onChange: (e)=>setManualDosage(e.target.value),
                                            className: "w-full px-4 py-3 rounded-2xl bg-[#F6F4EF] text-[14px] text-[#1C1917] focus:outline-none"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                            lineNumber: 727,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 723,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "man-time",
                                            className: "block text-[13px] font-semibold text-[#57534E] mb-1.5",
                                            children: "Horário"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                            lineNumber: 736,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "man-time",
                                            type: "time",
                                            value: manualTime,
                                            onChange: (e)=>setManualTime(e.target.value),
                                            className: "w-full px-4 py-3 rounded-2xl bg-[#F6F4EF] text-[14px] font-semibold text-[#1C1917] focus:outline-none"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                            lineNumber: 739,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 735,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                            lineNumber: 722,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "man-notes",
                                    className: "block text-[13px] font-semibold text-[#57534E] mb-1.5",
                                    children: "Como tomar (opcional)"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 750,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "man-notes",
                                    type: "text",
                                    value: manualNotes,
                                    onChange: (e)=>setManualNotes(e.target.value),
                                    placeholder: "Ex: Após o almoço",
                                    className: "w-full px-4 py-3 rounded-2xl bg-[#F6F4EF] text-[14px] text-[#1C1917] focus:outline-none"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                                    lineNumber: 753,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                            lineNumber: 749,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: "w-full py-3.5 rounded-full bg-[#146356] hover:bg-[#0F4F45] text-white font-semibold text-[15px] cursor-pointer",
                            children: "Salvar remédio"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AddMedicationSheet.tsx",
                            lineNumber: 763,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AddMedicationSheet.tsx",
                    lineNumber: 692,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/AddMedicationSheet.tsx",
            lineNumber: 311,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/AddMedicationSheet.tsx",
        lineNumber: 304,
        columnNumber: 5
    }, this);
}
_s(AddMedicationSheet, "5WnXMT9mE5rL+vwFt1C1FK+qvII=");
_c = AddMedicationSheet;
var _c;
__turbopack_context__.k.register(_c, "AddMedicationSheet");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AlarmRingingModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlarmRingingModal",
    ()=>AlarmRingingModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2d$ring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BellRing$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell-ring.js [app-client] (ecmascript) <export default as BellRing>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-2.js [app-client] (ecmascript) <export default as Volume2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MedicationAvatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/MedicationAvatar.tsx [app-client] (ecmascript)");
'use client';
;
;
;
function AlarmRingingModal({ dose, photoOverride, onMarkTaken, onSnooze, onDismiss, onReplayVoice }) {
    const med = dose.medication;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "alarm-ring-title",
        className: "fixed inset-0 z-50 bg-[#1C1917]/60 backdrop-blur-sm flex items-center justify-center p-5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-[380px] bg-[#F6F4EF] rounded-[34px] p-6 shadow-2xl border border-white/60 relative animate-sheet-up",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: onDismiss,
                    "aria-label": "Fechar aviso",
                    className: "absolute top-5 right-5 w-9 h-9 rounded-full bg-white text-[#57534E] hover:bg-[#EAE4D9] inline-flex items-center justify-center cursor-pointer",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        className: "w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/AlarmRingingModal.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/AlarmRingingModal.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center text-center pt-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-14 h-14 rounded-full bg-[#E6F2EF] text-[#146356] flex items-center justify-center animate-calm-breathe",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2d$ring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BellRing$3e$__["BellRing"], {
                                className: "w-7 h-7"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AlarmRingingModal.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/AlarmRingingModal.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-4 text-[13px] font-semibold uppercase tracking-wide text-[#146356]",
                            children: [
                                "Hora do seu remédio · ",
                                dose.scheduledTime
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AlarmRingingModal.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this),
                        med && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MedicationAvatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MedicationAvatar"], {
                                medication: med,
                                photoOverride: photoOverride,
                                size: "lg",
                                className: "w-24 h-24 rounded-[28px]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AlarmRingingModal.tsx",
                                lineNumber: 54,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/AlarmRingingModal.tsx",
                            lineNumber: 53,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            id: "alarm-ring-title",
                            className: "text-[26px] font-bold text-[#1C1917] mt-4",
                            children: med?.name ?? 'Seu Remédio'
                        }, void 0, false, {
                            fileName: "[project]/src/components/AlarmRingingModal.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[16px] font-semibold text-[#57534E] mt-1",
                            children: dose.dosage
                        }, void 0, false, {
                            fileName: "[project]/src/components/AlarmRingingModal.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this),
                        dose.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[13.5px] text-[#78716C] mt-1 max-w-[260px]",
                            children: dose.notes
                        }, void 0, false, {
                            fileName: "[project]/src/components/AlarmRingingModal.tsx",
                            lineNumber: 68,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onReplayVoice,
                            className: "mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#146356] font-semibold text-[13px] border border-black/[0.06] hover:bg-[#E6F2EF] cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AlarmRingingModal.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Ouvir novamente"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AlarmRingingModal.tsx",
                                    lineNumber: 77,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AlarmRingingModal.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full space-y-2.5 mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onMarkTaken,
                                    className: "w-full py-4 rounded-full bg-[#146356] hover:bg-[#0F4F45] text-white font-bold text-[16px] shadow-[0_8px_22px_rgba(20,99,86,0.28)] inline-flex items-center justify-center gap-2 active:scale-[0.99] transition-all cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            className: "w-5 h-5 stroke-[2.6]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AlarmRingingModal.tsx",
                                            lineNumber: 86,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Já tomei agora"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AlarmRingingModal.tsx",
                                            lineNumber: 87,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AlarmRingingModal.tsx",
                                    lineNumber: 81,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onSnooze,
                                    className: "w-full py-3.5 rounded-full bg-white border border-black/10 hover:bg-[#EFECE6] text-[#1C1917] font-semibold text-[14.5px] inline-flex items-center justify-center gap-2 cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                            className: "w-4.5 h-4.5 text-[#78716C]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AlarmRingingModal.tsx",
                                            lineNumber: 95,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Lembrar em 15 minutos"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AlarmRingingModal.tsx",
                                            lineNumber: 96,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AlarmRingingModal.tsx",
                                    lineNumber: 90,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AlarmRingingModal.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AlarmRingingModal.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/AlarmRingingModal.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/AlarmRingingModal.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c = AlarmRingingModal;
var _c;
__turbopack_context__.k.register(_c, "AlarmRingingModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AudioPlayerBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AudioPlayerBar",
    ()=>AudioPlayerBar,
    "QuietListenButton",
    ()=>QuietListenButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-2.js [app-client] (ecmascript) <export default as Volume2>");
'use client';
;
;
function AudioPlayerBar({ label, sublabel, sectionId, playback, rate, hasNaturalVoiceKey, onPlayToggle, onToggleRate, onOpenVoiceSettings }) {
    const isThisLoading = playback.status === 'loading' && playback.sectionId === sectionId;
    const isThisPlaying = playback.status === 'playing' && playback.sectionId === sectionId;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-[22px] bg-[#146356] text-white p-3.5 shadow-[0_10px_28px_rgba(20,99,86,0.22)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onPlayToggle,
                        "aria-label": isThisPlaying ? 'Pausar leitura' : label,
                        className: "w-12 h-12 rounded-full bg-white text-[#146356] hover:bg-[#F6F4EF] flex items-center justify-center shrink-0 shadow-sm active:scale-95 transition-transform cursor-pointer",
                        children: isThisLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "w-5 h-5 animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AudioPlayerBar.tsx",
                            lineNumber: 42,
                            columnNumber: 13
                        }, this) : isThisPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
                            className: "w-5 h-5 fill-current"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AudioPlayerBar.tsx",
                            lineNumber: 44,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                            className: "w-5 h-5 fill-current ml-0.5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AudioPlayerBar.tsx",
                            lineNumber: 46,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AudioPlayerBar.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onPlayToggle,
                        className: "flex-1 min-w-0 text-left cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[15px] font-bold leading-tight tracking-tight",
                                children: isThisLoading ? 'Preparando voz natural...' : isThisPlaying ? 'Ouvindo agora...' : label
                            }, void 0, false, {
                                fileName: "[project]/src/components/AudioPlayerBar.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[12.5px] text-white/75 mt-0.5 truncate",
                                children: isThisPlaying ? playback.provider === 'elevenlabs' ? 'Voz humana · ElevenLabs' : playback.provider === 'gemini' ? 'Voz natural · Gemini' : 'Voz do aparelho (conecte IA para voz humana)' : sublabel ?? (hasNaturalVoiceKey ? 'Explicação calma em português natural' : 'Toque para ouvir em voz alta')
                            }, void 0, false, {
                                fileName: "[project]/src/components/AudioPlayerBar.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AudioPlayerBar.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    isThisPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-end gap-[3px] h-5 pr-1 shrink-0",
                        "aria-hidden": "true",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-[3px] h-5 bg-white/90 rounded-full animate-soft-wave-1"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AudioPlayerBar.tsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-[3px] h-5 bg-white/90 rounded-full animate-soft-wave-2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AudioPlayerBar.tsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-[3px] h-5 bg-white/90 rounded-full animate-soft-wave-3"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AudioPlayerBar.tsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-[3px] h-5 bg-white/90 rounded-full animate-soft-wave-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AudioPlayerBar.tsx",
                                lineNumber: 81,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AudioPlayerBar.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onToggleRate,
                        "aria-label": "Alternar velocidade da voz",
                        className: "px-2.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-semibold shrink-0 transition-colors cursor-pointer",
                        children: rate === 'slow' ? '0.85×' : '1×'
                    }, void 0, false, {
                        fileName: "[project]/src/components/AudioPlayerBar.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AudioPlayerBar.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            !hasNaturalVoiceKey && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onOpenVoiceSettings,
                className: "mt-2.5 w-full py-2 px-3 rounded-xl bg-white/12 hover:bg-white/20 text-white/95 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                        className: "w-3.5 h-3.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/AudioPlayerBar.tsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Conectar ElevenLabs ou Gemini para voz 100% humana"
                    }, void 0, false, {
                        fileName: "[project]/src/components/AudioPlayerBar.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AudioPlayerBar.tsx",
                lineNumber: 96,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AudioPlayerBar.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c = AudioPlayerBar;
function QuietListenButton({ sectionId, playback, onClick, ariaLabel }) {
    const isLoading = playback.status === 'loading' && playback.sectionId === sectionId;
    const isPlaying = playback.status === 'playing' && playback.sectionId === sectionId;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        "aria-label": ariaLabel,
        "aria-pressed": isPlaying,
        className: `w-10 h-10 rounded-full inline-flex items-center justify-center shrink-0 transition-all active:scale-95 cursor-pointer ${isPlaying ? 'bg-[#146356] text-white shadow-sm' : 'bg-[#F0ECE4] text-[#146356] hover:bg-[#E6F2EF]'}`,
        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
            className: "w-4 h-4 animate-spin"
        }, void 0, false, {
            fileName: "[project]/src/components/AudioPlayerBar.tsx",
            lineNumber: 138,
            columnNumber: 9
        }, this) : isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
            className: "w-4 h-4 fill-current"
        }, void 0, false, {
            fileName: "[project]/src/components/AudioPlayerBar.tsx",
            lineNumber: 140,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
            className: "w-4.5 h-4.5 stroke-[2.1]"
        }, void 0, false, {
            fileName: "[project]/src/components/AudioPlayerBar.tsx",
            lineNumber: 142,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/AudioPlayerBar.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
_c1 = QuietListenButton;
var _c, _c1;
__turbopack_context__.k.register(_c, "AudioPlayerBar");
__turbopack_context__.k.register(_c1, "QuietListenButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/CleanIcons.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CleanIcon",
    ()=>CleanIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ban$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ban$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ban.js [app-client] (ecmascript) <export default as Ban>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/car.js [app-client] (ecmascript) <export default as Car>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cigarette$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CigaretteOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/cigarette-off.js [app-client] (ecmascript) <export default as CigaretteOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coffee$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coffee$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/coffee.js [app-client] (ecmascript) <export default as Coffee>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplets$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/droplets.js [app-client] (ecmascript) <export default as Droplets>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pill$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pill.js [app-client] (ecmascript) <export default as Pill>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/stethoscope.js [app-client] (ecmascript) <export default as Stethoscope>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Utensils$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/utensils.js [app-client] (ecmascript) <export default as Utensils>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wine$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__WineOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wine-off.js [app-client] (ecmascript) <export default as WineOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
'use client';
;
;
const TONE_MAP = {
    sage: 'bg-[#E6F2EF] text-[#146356]',
    rose: 'bg-[#FEECEF] text-[#BE123C]',
    amber: 'bg-[#FEF3DD] text-[#B45309]',
    neutral: 'bg-[#F0ECE4] text-[#44403C]'
};
function CleanIcon({ type, tone = 'sage', size = 'md' }) {
    const box = size === 'sm' ? 'w-10 h-10 rounded-2xl' : 'w-12 h-12 rounded-2xl';
    const iconCls = size === 'sm' ? 'w-5 h-5 stroke-[2]' : 'w-5.5 h-5.5 stroke-[2]';
    const renderIcon = ()=>{
        switch(type){
            case 'pill':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pill$3e$__["Pill"], {
                    className: iconCls
                }, void 0, false, {
                    fileName: "[project]/src/components/CleanIcons.tsx",
                    lineNumber: 46,
                    columnNumber: 16
                }, this);
            case 'clock':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                    className: iconCls
                }, void 0, false, {
                    fileName: "[project]/src/components/CleanIcons.tsx",
                    lineNumber: 48,
                    columnNumber: 16
                }, this);
            case 'calendar':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                    className: iconCls
                }, void 0, false, {
                    fileName: "[project]/src/components/CleanIcons.tsx",
                    lineNumber: 50,
                    columnNumber: 16
                }, this);
            case 'water':
            case 'drops':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplets$3e$__["Droplets"], {
                    className: iconCls
                }, void 0, false, {
                    fileName: "[project]/src/components/CleanIcons.tsx",
                    lineNumber: 53,
                    columnNumber: 16
                }, this);
            case 'food':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Utensils$3e$__["Utensils"], {
                    className: iconCls
                }, void 0, false, {
                    fileName: "[project]/src/components/CleanIcons.tsx",
                    lineNumber: 55,
                    columnNumber: 16
                }, this);
            case 'fasting':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coffee$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coffee$3e$__["Coffee"], {
                    className: iconCls
                }, void 0, false, {
                    fileName: "[project]/src/components/CleanIcons.tsx",
                    lineNumber: 57,
                    columnNumber: 16
                }, this);
            case 'no-smoking':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cigarette$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CigaretteOff$3e$__["CigaretteOff"], {
                    className: iconCls
                }, void 0, false, {
                    fileName: "[project]/src/components/CleanIcons.tsx",
                    lineNumber: 59,
                    columnNumber: 16
                }, this);
            case 'no-alcohol':
            case 'no-juice':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wine$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__WineOff$3e$__["WineOff"], {
                    className: iconCls
                }, void 0, false, {
                    fileName: "[project]/src/components/CleanIcons.tsx",
                    lineNumber: 62,
                    columnNumber: 16
                }, this);
            case 'cuts-effect':
            case 'no-crush':
            case 'pregnant-no':
            case 'no-driving':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ban$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ban$3e$__["Ban"], {
                    className: iconCls
                }, void 0, false, {
                    fileName: "[project]/src/components/CleanIcons.tsx",
                    lineNumber: 67,
                    columnNumber: 16
                }, this);
            case 'vomit-warning':
            case 'stomach-ache':
            case 'bloating':
            case 'alert-triangle':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                    className: iconCls
                }, void 0, false, {
                    fileName: "[project]/src/components/CleanIcons.tsx",
                    lineNumber: 72,
                    columnNumber: 16
                }, this);
            case 'sun-warning':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                    className: iconCls
                }, void 0, false, {
                    fileName: "[project]/src/components/CleanIcons.tsx",
                    lineNumber: 74,
                    columnNumber: 16
                }, this);
            case 'heart-check':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                    className: iconCls
                }, void 0, false, {
                    fileName: "[project]/src/components/CleanIcons.tsx",
                    lineNumber: 76,
                    columnNumber: 16
                }, this);
            case 'car-ok':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__["Car"], {
                    className: iconCls
                }, void 0, false, {
                    fileName: "[project]/src/components/CleanIcons.tsx",
                    lineNumber: 78,
                    columnNumber: 16
                }, this);
            case 'sleep':
            case 'fatigue':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                    className: iconCls
                }, void 0, false, {
                    fileName: "[project]/src/components/CleanIcons.tsx",
                    lineNumber: 81,
                    columnNumber: 16
                }, this);
            case 'doctor':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__["Stethoscope"], {
                    className: iconCls
                }, void 0, false, {
                    fileName: "[project]/src/components/CleanIcons.tsx",
                    lineNumber: 83,
                    columnNumber: 16
                }, this);
            case 'time-fast':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                    className: iconCls
                }, void 0, false, {
                    fileName: "[project]/src/components/CleanIcons.tsx",
                    lineNumber: 85,
                    columnNumber: 16
                }, this);
            case 'shield-check':
            case 'stomach-ok':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                    className: iconCls
                }, void 0, false, {
                    fileName: "[project]/src/components/CleanIcons.tsx",
                    lineNumber: 88,
                    columnNumber: 16
                }, this);
            case 'headache':
            case 'dizziness':
            case 'taste':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                    className: iconCls
                }, void 0, false, {
                    fileName: "[project]/src/components/CleanIcons.tsx",
                    lineNumber: 92,
                    columnNumber: 16
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                    className: iconCls
                }, void 0, false, {
                    fileName: "[project]/src/components/CleanIcons.tsx",
                    lineNumber: 94,
                    columnNumber: 16
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `${box} ${TONE_MAP[tone]} inline-flex items-center justify-center shrink-0`,
        "aria-hidden": "true",
        children: renderIcon()
    }, void 0, false, {
        fileName: "[project]/src/components/CleanIcons.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
_c = CleanIcon;
var _c;
__turbopack_context__.k.register(_c, "CleanIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/CompararView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompararView",
    ()=>CompararView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-alert.js [app-client] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$regions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/regions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pricing.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MedicationAvatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/MedicationAvatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AudioPlayerBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AudioPlayerBar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function CompararView({ medication, allMedications = [], medicationPhotos = {}, onSelectMedication, selectedUf, onChangeUf, playback, voiceRate, hasNaturalVoiceKey, onSpeak, onStopSpeaking, onToggleRate, onOpenVoiceSettings, onAskAboutSwitch, embedded = false }) {
    _s();
    const [inspectingProduct, setInspectingProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const reference = medication.equivalents.find((e)=>e.type === 'referencia') ?? medication.equivalents[0];
    const region = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$regions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRegionByUf"])(selectedUf);
    const toggleSpeak = (id, text)=>{
        if (playback.sectionId === id && playback.status !== 'idle') {
            onStopSpeaking();
        } else {
            onSpeak(id, text);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: embedded ? 'space-y-4' : 'px-5 pt-2 pb-28 space-y-5',
        children: [
            !embedded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[13px] font-medium text-[#78716C]",
                                children: "Genéricos e similares"
                            }, void 0, false, {
                                fileName: "[project]/src/components/CompararView.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-[26px] font-bold text-[#1C1917] leading-tight mt-0.5",
                                children: "Comparar opções"
                            }, void 0, false, {
                                fileName: "[project]/src/components/CompararView.tsx",
                                lineNumber: 76,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/CompararView.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this),
                    allMedications.length > 1 && onSelectMedication && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 overflow-x-auto no-scrollbar pb-0.5",
                        children: allMedications.map((med)=>{
                            const active = med.id === medication.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>onSelectMedication(med.id),
                                className: `shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold transition-all cursor-pointer ${active ? 'bg-[#1C1917] text-white' : 'bg-white text-[#57534E] border border-black/[0.06] hover:bg-[#F3EFE8]'}`,
                                children: med.name
                            }, med.id, false, {
                                fileName: "[project]/src/components/CompararView.tsx",
                                lineNumber: 86,
                                columnNumber: 19
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/CompararView.tsx",
                        lineNumber: 82,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 pt-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MedicationAvatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MedicationAvatar"], {
                                medication: medication,
                                photoOverride: medicationPhotos[medication.id],
                                size: "sm"
                            }, void 0, false, {
                                fileName: "[project]/src/components/CompararView.tsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0 flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[16px] font-bold text-[#1C1917] truncate",
                                        children: medication.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/CompararView.tsx",
                                        lineNumber: 110,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[13px] text-[#78716C] truncate",
                                        children: medication.activeIngredient
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/CompararView.tsx",
                                        lineNumber: 111,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/CompararView.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/CompararView.tsx",
                        lineNumber: 103,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CompararView.tsx",
                lineNumber: 73,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-[22px] p-4 border border-black/[0.05] shadow-[0_2px_14px_rgba(28,25,23,0.03)] space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-[13px] font-semibold text-[#57534E]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                        className: "w-4 h-4 text-[#146356]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/CompararView.tsx",
                                        lineNumber: 121,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Preços em"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/CompararView.tsx",
                                        lineNumber: 122,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/CompararView.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                "aria-label": "Selecionar estado para média de preço",
                                value: selectedUf,
                                onChange: (e)=>onChangeUf(e.target.value),
                                className: "rounded-full bg-[#F3EFE8] hover:bg-[#EAE4D9] px-3.5 py-1.5 text-[13px] font-semibold text-[#1C1917] focus:outline-none cursor-pointer",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$regions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRAZILIAN_REGIONS"].map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: r.uf,
                                        children: r.uf === 'BR' ? 'Média Brasil' : `${r.uf} · ${r.name}`
                                    }, r.uf, false, {
                                        fileName: "[project]/src/components/CompararView.tsx",
                                        lineNumber: 131,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/CompararView.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/CompararView.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between gap-3 pt-2.5 border-t border-black/[0.05]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[13.5px] text-[#57534E] leading-relaxed",
                                children: [
                                    "Mesma eficácia pela ANVISA. Toque em qualquer opção abaixo para ver",
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        className: "text-[#1C1917] font-semibold",
                                        children: "o que pode mudar na troca"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/CompararView.tsx",
                                        lineNumber: 141,
                                        columnNumber: 13
                                    }, this),
                                    ' ',
                                    "(revestimento, excipientes e absorção)."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/CompararView.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AudioPlayerBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuietListenButton"], {
                                sectionId: "compare-why",
                                playback: playback,
                                onClick: ()=>toggleSpeak('compare-why', medication.genericsHighlight.spokenScript),
                                ariaLabel: "Ouvir sobre diferenças entre genéricos"
                            }, void 0, false, {
                                fileName: "[project]/src/components/CompararView.tsx",
                                lineNumber: 144,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/CompararView.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CompararView.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                "aria-label": "Opções bioequivalentes",
                className: "space-y-3",
                children: medication.equivalents.map((eq)=>{
                    const price = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateRegionalPrice"])(eq, selectedUf);
                    const savings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateSavingsPercent"])(reference, eq, selectedUf);
                    const isRef = eq.id === reference?.id;
                    const firstEffect = eq.switchingEffects[0];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setInspectingProduct(eq),
                        className: "w-full text-left bg-white hover:bg-[#FCFBF9] active:scale-[0.995] rounded-[24px] p-5 border border-black/[0.05] shadow-[0_2px_14px_rgba(28,25,23,0.03)] transition-all cursor-pointer space-y-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0 flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[12px] font-semibold text-[#78716C]",
                                                children: [
                                                    isRef ? 'Referência' : eq.type === 'generico' ? 'Genérico' : 'Similar intercambiável',
                                                    ' ',
                                                    "· ",
                                                    eq.lab
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/CompararView.tsx",
                                                lineNumber: 170,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-[16px] font-bold text-[#1C1917] mt-0.5 leading-snug",
                                                children: eq.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/CompararView.tsx",
                                                lineNumber: 178,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/CompararView.tsx",
                                        lineNumber: 169,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        className: "w-5 h-5 text-[#A8A29E] shrink-0 mt-1"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/CompararView.tsx",
                                        lineNumber: 182,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/CompararView.tsx",
                                lineNumber: 168,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-baseline justify-between gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `text-[17px] font-bold ${price.isFreeSus ? 'text-[#15803D]' : 'text-[#1C1917]'}`,
                                        children: price.formattedRange
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/CompararView.tsx",
                                        lineNumber: 186,
                                        columnNumber: 17
                                    }, this),
                                    savings !== null && savings > 0 && !isRef && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[12.5px] font-semibold text-[#146356]",
                                        children: savings === 100 ? 'Gratuito SUS' : `Economiza ~${savings}%`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/CompararView.tsx",
                                        lineNumber: 194,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/CompararView.tsx",
                                lineNumber: 185,
                                columnNumber: 15
                            }, this),
                            firstEffect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-2 border-t border-black/[0.05] flex items-center gap-2 text-[13px] text-[#9A3412]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                        className: "w-4 h-4 text-[#D97706] shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/CompararView.tsx",
                                        lineNumber: 202,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "truncate font-medium",
                                        children: [
                                            "Na troca: ",
                                            firstEffect.symptom
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/CompararView.tsx",
                                        lineNumber: 203,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/CompararView.tsx",
                                lineNumber: 201,
                                columnNumber: 17
                            }, this),
                            !eq.bioequivalent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-2 border-t border-black/[0.05] flex items-center gap-2 text-[13px] text-[#BE123C]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                        className: "w-4 h-4 shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/CompararView.tsx",
                                        lineNumber: 211,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold",
                                        children: "Atenção: não substitui diretamente"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/CompararView.tsx",
                                        lineNumber: 212,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/CompararView.tsx",
                                lineNumber: 210,
                                columnNumber: 17
                            }, this)
                        ]
                    }, eq.id, true, {
                        fileName: "[project]/src/components/CompararView.tsx",
                        lineNumber: 162,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/CompararView.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            inspectingProduct && reference && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": "switch-sheet-title",
                className: "fixed inset-0 z-50 bg-[#1C1917]/45 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-0 sm:p-4",
                onClick: ()=>{
                    onStopSpeaking();
                    setInspectingProduct(null);
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: (e)=>e.stopPropagation(),
                    className: "w-full max-w-[430px] max-h-[88dvh] overflow-y-auto bg-[#F6F4EF] rounded-t-[32px] sm:rounded-[32px] p-5 pb-8 shadow-2xl animate-sheet-up space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start justify-between gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[12px] font-semibold uppercase tracking-wide text-[#146356]",
                                            children: inspectingProduct.id === reference.id ? 'Medicamento de referência' : `Troca · ${reference.name.split(' ')[0]} → ${inspectingProduct.lab}`
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/CompararView.tsx",
                                            lineNumber: 239,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            id: "switch-sheet-title",
                                            className: "text-[21px] font-bold text-[#1C1917] leading-snug mt-0.5",
                                            children: inspectingProduct.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/CompararView.tsx",
                                            lineNumber: 244,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/CompararView.tsx",
                                    lineNumber: 238,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        onStopSpeaking();
                                        setInspectingProduct(null);
                                    },
                                    "aria-label": "Fechar comparação",
                                    className: "w-9 h-9 rounded-full bg-white text-[#57534E] hover:bg-[#EAE4D9] inline-flex items-center justify-center shrink-0 cursor-pointer",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/CompararView.tsx",
                                        lineNumber: 260,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CompararView.tsx",
                                    lineNumber: 251,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/CompararView.tsx",
                            lineNumber: 237,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AudioPlayerBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AudioPlayerBar"], {
                            label: "Ouvir o que muda nessa troca",
                            sublabel: inspectingProduct.switchVerdict.headline,
                            sectionId: `sheet-eq-${inspectingProduct.id}`,
                            playback: playback,
                            rate: voiceRate,
                            hasNaturalVoiceKey: hasNaturalVoiceKey,
                            onPlayToggle: ()=>{
                                const effectsSpoken = inspectingProduct.switchingEffects.length > 0 ? `O que pode mudar na troca: ${inspectingProduct.switchingEffects.map((fx)=>`${fx.symptom}. ${fx.why}`).join(' ')}` : 'Este é o medicamento de referência usado como base.';
                                toggleSpeak(`sheet-eq-${inspectingProduct.id}`, `${inspectingProduct.name}, do laboratório ${inspectingProduct.lab}. ${inspectingProduct.switchVerdict.headline}. ${inspectingProduct.switchVerdict.explanation} ${effectsSpoken}`);
                            },
                            onToggleRate: onToggleRate,
                            onOpenVoiceSettings: onOpenVoiceSettings
                        }, void 0, false, {
                            fileName: "[project]/src/components/CompararView.tsx",
                            lineNumber: 265,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-[22px] p-4 border border-black/[0.05] space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[12px] font-semibold uppercase tracking-wide text-[#78716C]",
                                    children: [
                                        "1. Média de preço em ",
                                        region.name
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/CompararView.tsx",
                                    lineNumber: 290,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-baseline justify-between gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[22px] font-bold text-[#1C1917]",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateRegionalPrice"])(inspectingProduct, selectedUf).formattedRange
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/CompararView.tsx",
                                            lineNumber: 294,
                                            columnNumber: 17
                                        }, this),
                                        inspectingProduct.id !== reference.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[13px] text-[#78716C]",
                                            children: [
                                                "Original: ",
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateRegionalPrice"])(reference, selectedUf).formattedRange
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/CompararView.tsx",
                                            lineNumber: 298,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/CompararView.tsx",
                                    lineNumber: 293,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[12.5px] text-[#78716C]",
                                    children: region.icmsLabel
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CompararView.tsx",
                                    lineNumber: 303,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/CompararView.tsx",
                            lineNumber: 289,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-[#EEF7F2] rounded-[22px] p-4 border border-[#146356]/10 flex items-start gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                    className: "w-5 h-5 text-[#146356] shrink-0 mt-0.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CompararView.tsx",
                                    lineNumber: 308,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[14px] font-bold text-[#0F4F45]",
                                            children: inspectingProduct.bioequivalent ? 'O que continua igual' : 'Atenção: formulação diferente'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/CompararView.tsx",
                                            lineNumber: 310,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[13.5px] text-[#146356]/90 mt-0.5 leading-relaxed",
                                            children: inspectingProduct.switchVerdict.explanation
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/CompararView.tsx",
                                            lineNumber: 315,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/CompararView.tsx",
                                    lineNumber: 309,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/CompararView.tsx",
                            lineNumber: 307,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-[22px] p-4 border border-black/[0.05] space-y-3.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[12px] font-semibold uppercase tracking-wide text-[#B45309]",
                                    children: "3. O que muda na troca (revestimento & absorção)"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CompararView.tsx",
                                    lineNumber: 323,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2 text-[13.5px] text-[#44403C] leading-relaxed",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    className: "text-[#1C1917]",
                                                    children: "Revestimento / Base:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CompararView.tsx",
                                                    lineNumber: 329,
                                                    columnNumber: 19
                                                }, this),
                                                ' ',
                                                inspectingProduct.coatingOrTech
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/CompararView.tsx",
                                            lineNumber: 328,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    className: "text-[#1C1917]",
                                                    children: "Absorção:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CompararView.tsx",
                                                    lineNumber: 333,
                                                    columnNumber: 19
                                                }, this),
                                                ' ',
                                                inspectingProduct.absorptionNote
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/CompararView.tsx",
                                            lineNumber: 332,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    className: "text-[#1C1917]",
                                                    children: "Excipientes:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CompararView.tsx",
                                                    lineNumber: 337,
                                                    columnNumber: 19
                                                }, this),
                                                ' ',
                                                inspectingProduct.excipients.keyNotes
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/CompararView.tsx",
                                            lineNumber: 336,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/CompararView.tsx",
                                    lineNumber: 327,
                                    columnNumber: 15
                                }, this),
                                inspectingProduct.switchingEffects.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pt-2 border-t border-black/[0.05] space-y-2.5",
                                    children: inspectingProduct.switchingEffects.map((fx, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl bg-[#FEF8EC] p-3.5 border border-[#F59E0B]/20",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[14.5px] font-bold text-[#9A3412]",
                                                    children: fx.symptom
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CompararView.tsx",
                                                    lineNumber: 349,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[13.5px] text-[#57534E] mt-1 leading-relaxed",
                                                    children: fx.why
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CompararView.tsx",
                                                    lineNumber: 350,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, `${fx.symptom}-${i}`, true, {
                                            fileName: "[project]/src/components/CompararView.tsx",
                                            lineNumber: 345,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CompararView.tsx",
                                    lineNumber: 343,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/CompararView.tsx",
                            lineNumber: 322,
                            columnNumber: 13
                        }, this),
                        inspectingProduct.id !== reference.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>{
                                const q = `Troquei ${reference.name} pelo ${inspectingProduct.name} da ${inspectingProduct.lab}. O que devo observar de diferença no meu corpo?`;
                                setInspectingProduct(null);
                                onAskAboutSwitch(q);
                            },
                            className: "w-full py-3.5 px-4 rounded-full bg-white border border-black/10 hover:bg-[#F3EFE8] text-[#1C1917] font-semibold text-[14px] inline-flex items-center justify-center gap-2 cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                    className: "w-4 h-4 text-[#146356]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CompararView.tsx",
                                    lineNumber: 368,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Tirar dúvida sobre essa troca com a IA"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CompararView.tsx",
                                    lineNumber: 369,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/CompararView.tsx",
                            lineNumber: 359,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/CompararView.tsx",
                    lineNumber: 232,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/CompararView.tsx",
                lineNumber: 222,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/CompararView.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_s(CompararView, "U/JSpCUlicEgwozSWj4SGofPgQU=");
_c = CompararView;
var _c;
__turbopack_context__.k.register(_c, "CompararView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/HistorySheet.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HistorySheet",
    ()=>HistorySheet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$scheduleEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/scheduleEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AudioPlayerBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AudioPlayerBar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function HistorySheet({ last7Days, initialDateStr, schedules, doseLogs, medications, now, playback, onSpeak, onStopSpeaking, onClose }) {
    _s();
    const [selectedDateStr, setSelectedDateStr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialDateStr || last7Days[last7Days.length - 1]?.dateStr || '');
    const parts = selectedDateStr.split('-').map(Number);
    const targetDate = parts.length === 3 ? new Date(parts[0], parts[1] - 1, parts[2]) : now;
    const dayDoses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$scheduleEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDosesForDate"])(schedules, doseLogs, medications, targetDate, now);
    const buildSpokenDay = ()=>{
        const label = selectedDateStr.split('-').reverse().join('/');
        if (dayDoses.length === 0) {
            return `No dia ${label}, nenhuma dose estava programada.`;
        }
        const items = dayDoses.map((d)=>{
            const name = d.medication?.name ?? 'Remédio';
            if (d.status === 'taken' && d.log) {
                const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$scheduleEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPunctualityLabel"])(d.log.delayMinutes);
                return `${name}, previsto às ${d.scheduledTime}, tomado às ${d.log.takenTimeDisplay}, ${p.label}`;
            }
            if (d.status === 'upcoming') return `${name}, agendado para ${d.scheduledTime}`;
            return `${name}, previsto às ${d.scheduledTime}, não registrado`;
        }).join('. ');
        return `Registro do dia ${label}. ${items}.`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "history-sheet-title",
        className: "fixed inset-0 z-50 bg-[#1C1917]/45 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-0 sm:p-4",
        onClick: ()=>{
            onStopSpeaking();
            onClose();
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            onClick: (e)=>e.stopPropagation(),
            className: "w-full max-w-[430px] max-h-[85dvh] overflow-y-auto bg-[#F6F4EF] rounded-t-[32px] sm:rounded-[32px] p-5 pb-8 shadow-2xl animate-sheet-up space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    id: "history-sheet-title",
                                    className: "text-[20px] font-bold text-[#1C1917]",
                                    children: "Histórico de horários"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HistorySheet.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[13px] text-[#78716C]",
                                    children: "Toque em qualquer dia para ver se foi tomado certinho"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HistorySheet.tsx",
                                    lineNumber: 87,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/HistorySheet.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>{
                                onStopSpeaking();
                                onClose();
                            },
                            "aria-label": "Fechar histórico",
                            className: "w-9 h-9 rounded-full bg-white text-[#57534E] hover:bg-[#EAE4D9] inline-flex items-center justify-center cursor-pointer",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/HistorySheet.tsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/HistorySheet.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/HistorySheet.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-[22px] p-3.5 border border-black/[0.05] grid grid-cols-7 gap-1",
                    children: last7Days.map((day)=>{
                        const active = day.dateStr === selectedDateStr;
                        const dotCls = day.status === 'complete' ? 'bg-[#146356] text-white' : day.status === 'partial' ? 'bg-[#FEF3DD] text-[#B45309]' : day.status === 'missed' ? 'bg-[#FEECEF] text-[#BE123C]' : 'bg-[#F3EFE8] text-[#A8A29E]';
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>{
                                onStopSpeaking();
                                setSelectedDateStr(day.dateStr);
                            },
                            className: `flex flex-col items-center py-1.5 rounded-xl transition-all cursor-pointer ${active ? 'bg-[#E6F2EF]' : 'hover:bg-[#F6F4EF]'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[11px] font-medium text-[#78716C]",
                                    children: day.weekdayShort.slice(0, 3)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HistorySheet.tsx",
                                    lineNumber: 129,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `mt-1 w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold ${dotCls}`,
                                    children: day.status === 'complete' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        className: "w-4 h-4 stroke-[2.6]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HistorySheet.tsx",
                                        lineNumber: 135,
                                        columnNumber: 48
                                    }, this) : day.dayNumber
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HistorySheet.tsx",
                                    lineNumber: 132,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, day.dateStr, true, {
                            fileName: "[project]/src/components/HistorySheet.tsx",
                            lineNumber: 118,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/HistorySheet.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-[24px] p-4 border border-black/[0.05] space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-[15px] font-bold text-[#1C1917]",
                                    children: [
                                        "Dia ",
                                        selectedDateStr.split('-').reverse().join('/')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/HistorySheet.tsx",
                                    lineNumber: 145,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AudioPlayerBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuietListenButton"], {
                                    sectionId: "history-day",
                                    playback: playback,
                                    onClick: ()=>{
                                        if (playback.sectionId === 'history-day' && playback.status !== 'idle') {
                                            onStopSpeaking();
                                        } else {
                                            onSpeak('history-day', buildSpokenDay());
                                        }
                                    },
                                    ariaLabel: "Ouvir resumo deste dia"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HistorySheet.tsx",
                                    lineNumber: 148,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/HistorySheet.tsx",
                            lineNumber: 144,
                            columnNumber: 11
                        }, this),
                        dayDoses.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[14px] text-[#78716C] py-2",
                            children: "Nenhuma dose programada neste dia."
                        }, void 0, false, {
                            fileName: "[project]/src/components/HistorySheet.tsx",
                            lineNumber: 163,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "divide-y divide-black/[0.05]",
                            children: dayDoses.map((dose)=>{
                                const punct = dose.log ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$scheduleEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPunctualityLabel"])(dose.log.delayMinutes) : null;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "py-3 first:pt-1 last:pb-1 flex items-center justify-between gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[15px] font-bold text-[#1C1917] truncate",
                                                    children: dose.medication?.name ?? 'Medicamento'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/HistorySheet.tsx",
                                                    lineNumber: 173,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[13px] text-[#6B6560]",
                                                    children: [
                                                        "Previsto ",
                                                        dose.scheduledTime,
                                                        dose.status === 'taken' && dose.log && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                " · Tomado às ",
                                                                dose.log.takenTimeDisplay
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/HistorySheet.tsx",
                                                            lineNumber: 179,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/HistorySheet.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/HistorySheet.tsx",
                                            lineNumber: 172,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `shrink-0 text-[12px] font-semibold px-3 py-1 rounded-full ${dose.status === 'taken' ? punct?.isOnTime ? 'bg-[#E6F2EF] text-[#146356]' : 'bg-[#FEF3DD] text-[#B45309]' : dose.status === 'upcoming' ? 'bg-[#F3EFE8] text-[#57534E]' : 'bg-[#FEECEF] text-[#BE123C]'}`,
                                            children: dose.status === 'taken' ? punct?.isOnTime ? 'Certinho ✓' : punct?.label : dose.status === 'upcoming' ? 'Agendado' : 'Não registrado'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HistorySheet.tsx",
                                            lineNumber: 183,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, dose.key, true, {
                                    fileName: "[project]/src/components/HistorySheet.tsx",
                                    lineNumber: 171,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/HistorySheet.tsx",
                            lineNumber: 167,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/HistorySheet.tsx",
                    lineNumber: 143,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/HistorySheet.tsx",
            lineNumber: 78,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/HistorySheet.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_s(HistorySheet, "7KK+MJbYJ48jLxVku3wa8vS/xbw=");
_c = HistorySheet;
var _c;
__turbopack_context__.k.register(_c, "HistorySheet");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/HomeView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HomeView",
    ()=>HomeView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2d$ring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BellRing$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell-ring.js [app-client] (ecmascript) <export default as BellRing>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$scheduleEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/scheduleEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MedicationAvatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/MedicationAvatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AudioPlayerBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AudioPlayerBar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function getGreeting(hour) {
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
}
function formatFriendlyDatePt(date) {
    const formatted = date.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
function HomeView({ medications, medicationPhotos, schedules, dosesToday, last7Days, now, playback, onSpeak, onStopSpeaking, onMarkTaken, onUndoDose, onSelectMedication, onOpenAdd, onOpenAddAlarm, onOpenHistory, onTriggerTestAlarm }) {
    _s();
    const [showAllToday, setShowAllToday] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const takenCount = dosesToday.filter((d)=>d.status === 'taken').length;
    const totalCount = dosesToday.length;
    // Pick the single most urgent / next upcoming dose for the calm hero card
    const heroDose = dosesToday.find((d)=>d.status === 'due_now') ?? dosesToday.find((d)=>d.status === 'late') ?? dosesToday.find((d)=>d.status === 'upcoming') ?? null;
    const medMap = new Map(medications.map((m)=>[
            m.id,
            m
        ]));
    const pausedCycle = schedules.filter((s)=>s.enabled).map((s)=>({
            schedule: s,
            cycle: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$scheduleEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getScheduleCycleInfo"])(s, now),
            med: medMap.get(s.medicationId)
        })).find((x)=>Boolean(x.cycle?.isPauseDay));
    const toggleSpeak = (id, text)=>{
        if (playback.sectionId === id && playback.status !== 'idle') {
            onStopSpeaking();
        } else {
            onSpeak(id, text);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "px-5 pt-2 pb-28 space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "pt-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[13px] font-medium text-[#78716C]",
                        children: formatFriendlyDatePt(now)
                    }, void 0, false, {
                        fileName: "[project]/src/components/HomeView.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-[28px] font-bold text-[#1C1917] leading-tight mt-0.5",
                        children: getGreeting(now.getHours())
                    }, void 0, false, {
                        fileName: "[project]/src/components/HomeView.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/HomeView.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                "aria-label": "Próxima dose",
                children: heroDose ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-[28px] p-5 border border-black/[0.05] shadow-[0_6px_28px_rgba(28,25,23,0.05)] space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-wide uppercase text-[#146356]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HomeView.tsx",
                                            lineNumber: 122,
                                            columnNumber: 17
                                        }, this),
                                        heroDose.status === 'due_now' ? 'Hora agora' : heroDose.status === 'late' ? 'Atrasado · previsto às ' + heroDose.scheduledTime : 'Próximo remédio · ' + heroDose.scheduledTime
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/HomeView.tsx",
                                    lineNumber: 121,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AudioPlayerBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuietListenButton"], {
                                    sectionId: "home-hero-dose",
                                    playback: playback,
                                    onClick: ()=>toggleSpeak('home-hero-dose', `Seu próximo remédio é ${heroDose.medication?.name ?? 'seu medicamento'}, ${heroDose.dosage}, às ${heroDose.scheduledTime}. ${heroDose.notes ?? ''}`),
                                    ariaLabel: "Ouvir próximo remédio"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HomeView.tsx",
                                    lineNumber: 129,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/HomeView.tsx",
                            lineNumber: 120,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4",
                            children: [
                                heroDose.medication && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>onSelectMedication(heroDose.medication.id),
                                    className: "shrink-0 cursor-pointer",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MedicationAvatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MedicationAvatar"], {
                                        medication: heroDose.medication,
                                        photoOverride: medicationPhotos[heroDose.medication.id],
                                        size: "lg"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HomeView.tsx",
                                        lineNumber: 149,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HomeView.tsx",
                                    lineNumber: 144,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0 flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[30px] font-bold text-[#1C1917] leading-none tracking-tight",
                                            children: heroDose.scheduledTime
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HomeView.tsx",
                                            lineNumber: 157,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-[19px] font-bold text-[#1C1917] mt-1.5 truncate",
                                            children: heroDose.medication?.name ?? 'Medicamento'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HomeView.tsx",
                                            lineNumber: 160,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[14px] text-[#6B6560] mt-0.5",
                                            children: heroDose.dosage
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HomeView.tsx",
                                            lineNumber: 163,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/HomeView.tsx",
                                    lineNumber: 156,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/HomeView.tsx",
                            lineNumber: 142,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pt-1 flex items-center gap-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>onMarkTaken(heroDose),
                                    className: "flex-1 py-3.5 px-5 rounded-full bg-[#146356] hover:bg-[#0F4F45] text-white font-semibold text-[15px] inline-flex items-center justify-center gap-2 shadow-[0_6px_18px_rgba(20,99,86,0.22)] active:scale-[0.99] transition-all cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            className: "w-5 h-5 stroke-[2.5]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HomeView.tsx",
                                            lineNumber: 173,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Tomei agora"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HomeView.tsx",
                                            lineNumber: 174,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/HomeView.tsx",
                                    lineNumber: 168,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>onTriggerTestAlarm(heroDose),
                                    "aria-label": "Testar aviso do alarme",
                                    title: "Testar tela de alarme",
                                    className: "w-12 h-12 rounded-full bg-[#F3EFE8] hover:bg-[#EAE4D9] text-[#57534E] inline-flex items-center justify-center shrink-0 active:scale-95 transition-all cursor-pointer",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2d$ring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BellRing$3e$__["BellRing"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HomeView.tsx",
                                        lineNumber: 184,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HomeView.tsx",
                                    lineNumber: 177,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/HomeView.tsx",
                            lineNumber: 167,
                            columnNumber: 13
                        }, this),
                        totalCount > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pt-1 border-t border-black/[0.05]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setShowAllToday((v)=>!v),
                                    className: "w-full py-1.5 flex items-center justify-between text-[13px] font-medium text-[#6B6560] hover:text-[#1C1917] cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "Hoje: ",
                                                takenCount,
                                                " de ",
                                                totalCount,
                                                " tomados"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/HomeView.tsx",
                                            lineNumber: 195,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                            className: `w-4 h-4 transition-transform ${showAllToday ? 'rotate-180' : ''}`
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HomeView.tsx",
                                            lineNumber: 198,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/HomeView.tsx",
                                    lineNumber: 190,
                                    columnNumber: 17
                                }, this),
                                showAllToday && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-2.5 space-y-2",
                                    children: dosesToday.map((dose)=>{
                                        const isTaken = dose.status === 'taken';
                                        const punct = dose.log ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$scheduleEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPunctualityLabel"])(dose.log.delayMinutes) : null;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between gap-3 py-2.5 px-3 rounded-2xl bg-[#F8F6F2]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[14px] font-semibold text-[#1C1917] truncate",
                                                            children: [
                                                                dose.scheduledTime,
                                                                " · ",
                                                                dose.medication?.name ?? 'Remédio'
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/HomeView.tsx",
                                                            lineNumber: 214,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[12px] text-[#78716C]",
                                                            children: isTaken && dose.log ? `Tomado às ${dose.log.takenTimeDisplay} · ${punct?.label ?? ''}` : dose.dosage
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/HomeView.tsx",
                                                            lineNumber: 217,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/HomeView.tsx",
                                                    lineNumber: 213,
                                                    columnNumber: 27
                                                }, this),
                                                isTaken ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>onUndoDose(dose),
                                                    "aria-label": "Desfazer marcação",
                                                    className: "p-2 rounded-full text-[#78716C] hover:bg-white cursor-pointer",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/HomeView.tsx",
                                                        lineNumber: 230,
                                                        columnNumber: 31
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/HomeView.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 29
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>onMarkTaken(dose),
                                                    className: "px-3.5 py-1.5 rounded-full bg-white border border-black/10 text-[#146356] text-xs font-semibold hover:bg-[#E6F2EF] cursor-pointer",
                                                    children: "Tomar"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/HomeView.tsx",
                                                    lineNumber: 233,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, dose.key, true, {
                                            fileName: "[project]/src/components/HomeView.tsx",
                                            lineNumber: 209,
                                            columnNumber: 25
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HomeView.tsx",
                                    lineNumber: 204,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/HomeView.tsx",
                            lineNumber: 189,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/HomeView.tsx",
                    lineNumber: 119,
                    columnNumber: 11
                }, this) : totalCount > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-[#E8F4EE] rounded-[28px] p-6 border border-[#146356]/10 space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-11 h-11 rounded-full bg-[#146356] text-white flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        className: "w-6 h-6 stroke-[2.5]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HomeView.tsx",
                                        lineNumber: 253,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HomeView.tsx",
                                    lineNumber: 252,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AudioPlayerBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuietListenButton"], {
                                    sectionId: "home-all-done",
                                    playback: playback,
                                    onClick: ()=>toggleSpeak('home-all-done', `Parabéns! Você tomou todos os ${totalCount} remédios programados para hoje certinho.`),
                                    ariaLabel: "Ouvir resumo do dia"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HomeView.tsx",
                                    lineNumber: 255,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/HomeView.tsx",
                            lineNumber: 251,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-[20px] font-bold text-[#0F4F45]",
                                    children: "Tudo certinho hoje"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HomeView.tsx",
                                    lineNumber: 268,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[14px] text-[#146356]/85 mt-1",
                                    children: [
                                        "Você completou ",
                                        takenCount,
                                        " de ",
                                        totalCount,
                                        " doses de hoje."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/HomeView.tsx",
                                    lineNumber: 269,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/HomeView.tsx",
                            lineNumber: 267,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>onOpenHistory(),
                            className: "text-[13px] font-semibold text-[#146356] hover:underline cursor-pointer",
                            children: "Ver horários registrados ›"
                        }, void 0, false, {
                            fileName: "[project]/src/components/HomeView.tsx",
                            lineNumber: 273,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/HomeView.tsx",
                    lineNumber: 250,
                    columnNumber: 11
                }, this) : pausedCycle?.cycle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-[#FDF2F6] rounded-[28px] p-5 border border-[#FBCFE8]/60 space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[12px] font-semibold uppercase tracking-wide text-[#9D174D]",
                            children: [
                                "Dia de pausa · ",
                                pausedCycle.cycle.dayInPhase,
                                " de ",
                                pausedCycle.cycle.phaseLength
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/HomeView.tsx",
                            lineNumber: 283,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-[19px] font-bold text-[#1C1917]",
                            children: [
                                "Hoje não precisa tomar ",
                                pausedCycle.med?.name ?? 'sua cartela'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/HomeView.tsx",
                            lineNumber: 286,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[14px] text-[#6B6560]",
                            children: "O alarme volta automaticamente no início da próxima cartela."
                        }, void 0, false, {
                            fileName: "[project]/src/components/HomeView.tsx",
                            lineNumber: 289,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/HomeView.tsx",
                    lineNumber: 282,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-[28px] p-6 border border-black/[0.05] shadow-[0_6px_28px_rgba(28,25,23,0.04)] space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-[19px] font-bold text-[#1C1917]",
                            children: "Nenhum alarme ativo hoje"
                        }, void 0, false, {
                            fileName: "[project]/src/components/HomeView.tsx",
                            lineNumber: 295,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[14px] text-[#6B6560] leading-relaxed",
                            children: "Crie um lembrete calmo com voz natural para nunca esquecer seu horário."
                        }, void 0, false, {
                            fileName: "[project]/src/components/HomeView.tsx",
                            lineNumber: 296,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onOpenAddAlarm,
                            className: "mt-1 py-3 px-5 rounded-full bg-[#146356] text-white text-[14px] font-semibold inline-flex items-center gap-2 cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HomeView.tsx",
                                    lineNumber: 304,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Criar lembrete"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HomeView.tsx",
                                    lineNumber: 305,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/HomeView.tsx",
                            lineNumber: 299,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/HomeView.tsx",
                    lineNumber: 294,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/HomeView.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                "aria-label": "Sua semana",
                className: "space-y-2.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-[14px] font-semibold text-[#57534E]",
                                children: "Sua semana"
                            }, void 0, false, {
                                fileName: "[project]/src/components/HomeView.tsx",
                                lineNumber: 314,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>onOpenHistory(),
                                className: "text-[13px] font-semibold text-[#146356] hover:underline cursor-pointer",
                                children: "Histórico ›"
                            }, void 0, false, {
                                fileName: "[project]/src/components/HomeView.tsx",
                                lineNumber: 315,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HomeView.tsx",
                        lineNumber: 313,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-[24px] p-4 border border-black/[0.05] shadow-[0_2px_14px_rgba(28,25,23,0.03)] grid grid-cols-7 gap-1",
                        children: last7Days.map((day)=>{
                            const dotCls = day.status === 'complete' ? 'bg-[#146356] text-white' : day.status === 'partial' ? 'bg-[#FEF3DD] text-[#B45309] ring-1 ring-[#F59E0B]/30' : day.status === 'missed' ? 'bg-[#FEECEF] text-[#BE123C]' : 'bg-[#F3EFE8] text-[#A8A29E]';
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>onOpenHistory(day.dateStr),
                                "aria-label": `Ver dia ${day.dayNumber}: ${day.takenCount} de ${day.totalScheduled} tomados`,
                                className: "flex flex-col items-center py-1 rounded-xl hover:bg-[#F6F4EF] transition-colors cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-[11px] font-medium ${day.isToday ? 'text-[#146356] font-bold' : 'text-[#78716C]'}`,
                                        children: day.weekdayShort.slice(0, 3)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HomeView.tsx",
                                        lineNumber: 343,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `mt-1.5 w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold ${dotCls} ${day.isToday ? 'ring-2 ring-[#146356]/30 ring-offset-2' : ''}`,
                                        children: day.status === 'complete' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            className: "w-4 h-4 stroke-[2.6]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HomeView.tsx",
                                            lineNumber: 355,
                                            columnNumber: 48
                                        }, this) : day.dayNumber
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HomeView.tsx",
                                        lineNumber: 350,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, day.dateStr, true, {
                                fileName: "[project]/src/components/HomeView.tsx",
                                lineNumber: 336,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/HomeView.tsx",
                        lineNumber: 324,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/HomeView.tsx",
                lineNumber: 312,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                "aria-label": "Seus remédios",
                className: "space-y-2.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-[14px] font-semibold text-[#57534E]",
                                children: "Seus remédios"
                            }, void 0, false, {
                                fileName: "[project]/src/components/HomeView.tsx",
                                lineNumber: 366,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onOpenAdd,
                                className: "text-[13px] font-semibold text-[#146356] hover:underline cursor-pointer",
                                children: "+ Adicionar"
                            }, void 0, false, {
                                fileName: "[project]/src/components/HomeView.tsx",
                                lineNumber: 367,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HomeView.tsx",
                        lineNumber: 365,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-[24px] border border-black/[0.05] shadow-[0_2px_14px_rgba(28,25,23,0.03)] divide-y divide-black/[0.05] overflow-hidden",
                        children: medications.map((med)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>onSelectMedication(med.id),
                                className: "w-full px-4 py-3.5 flex items-center gap-3.5 text-left hover:bg-[#FAF9F6] active:bg-[#F3EFE8] transition-colors cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MedicationAvatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MedicationAvatar"], {
                                        medication: med,
                                        photoOverride: medicationPhotos[med.id],
                                        size: "sm"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HomeView.tsx",
                                        lineNumber: 384,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0 flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[16px] font-bold text-[#1C1917] truncate",
                                                children: med.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HomeView.tsx",
                                                lineNumber: 390,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[13px] text-[#78716C] truncate mt-0.5",
                                                children: med.purposeSimple
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HomeView.tsx",
                                                lineNumber: 391,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HomeView.tsx",
                                        lineNumber: 389,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        className: "w-4.5 h-4.5 text-[#A8A29E] shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HomeView.tsx",
                                        lineNumber: 393,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, med.id, true, {
                                fileName: "[project]/src/components/HomeView.tsx",
                                lineNumber: 378,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/HomeView.tsx",
                        lineNumber: 376,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/HomeView.tsx",
                lineNumber: 364,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/HomeView.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_s(HomeView, "AyF1JmJa/SuWZX1NIkO8OK/kGoo=");
_c = HomeView;
var _c;
__turbopack_context__.k.register(_c, "HomeView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/MedicationAvatar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MedicationAvatar",
    ()=>MedicationAvatar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
const CATEGORY_SOFT_PALETTE = {
    anticoncepcional: {
        bg: '#FCECF3',
        fg: '#9D174D',
        pill: '#EC4899'
    },
    diabetes: {
        bg: '#EBF3FE',
        fg: '#1D4ED8',
        pill: '#3B82F6'
    },
    pressao: {
        bg: '#E7F5F2',
        fg: '#115E59',
        pill: '#14B8A6'
    },
    estomago: {
        bg: '#F2EEFC',
        fg: '#6D28D9',
        pill: '#8B5CF6'
    },
    tireoide: {
        bg: '#FEF4E6',
        fg: '#B45309',
        pill: '#F59E0B'
    },
    dor_febre: {
        bg: '#EEF6FF',
        fg: '#0369A1',
        pill: '#0EA5E9'
    },
    antibiotico: {
        bg: '#FEEFF0',
        fg: '#BE123C',
        pill: '#F43F5E'
    },
    ansiedade_sono: {
        bg: '#EEF2FF',
        fg: '#4338CA',
        pill: '#6366F1'
    },
    colesterol: {
        bg: '#ECF7F1',
        fg: '#15803D',
        pill: '#22C55E'
    },
    alergia: {
        bg: '#FEF2F6',
        fg: '#BE185D',
        pill: '#EC4899'
    },
    outro: {
        bg: '#EFECE6',
        fg: '#44403C',
        pill: '#78716C'
    }
};
function MedicationAvatar({ medication, photoOverride, size = 'md', className = '' }) {
    const photo = photoOverride || medication.userPhotoUrl;
    const palette = CATEGORY_SOFT_PALETTE[medication.category] ?? CATEGORY_SOFT_PALETTE.outro;
    const boxSize = size === 'sm' ? 'w-12 h-12 rounded-2xl' : size === 'lg' ? 'w-20 h-20 rounded-[26px]' : 'w-14 h-14 rounded-[18px]';
    if (photo) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `${boxSize} overflow-hidden shrink-0 border border-black/5 bg-[#EFECE6] shadow-xs ${className}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: photo,
                alt: `Foto de ${medication.name}`,
                className: "w-full h-full object-cover"
            }, void 0, false, {
                fileName: "[project]/src/components/MedicationAvatar.tsx",
                lineNumber: 51,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/MedicationAvatar.tsx",
            lineNumber: 48,
            columnNumber: 7
        }, this);
    }
    const glyphScale = size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-10 h-10' : 'w-7 h-7';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${boxSize} shrink-0 flex items-center justify-center border border-black/[0.04] ${className}`,
        style: {
            backgroundColor: palette.bg
        },
        "aria-hidden": "true",
        children: medication.pack.style === 'drops-bottle' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 32 32",
            className: glyphScale,
            fill: "none",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M16 4.5C16 4.5 8.5 13.4 8.5 19.2C8.5 23.4 11.9 26.8 16 26.8C20.1 26.8 23.5 23.4 23.5 19.2C23.5 13.4 16 4.5 16 4.5Z",
                    fill: palette.pill,
                    fillOpacity: "0.22",
                    stroke: palette.fg,
                    strokeWidth: "2.1",
                    strokeLinejoin: "round"
                }, void 0, false, {
                    fileName: "[project]/src/components/MedicationAvatar.tsx",
                    lineNumber: 70,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M13 19.5C13 21.2 14.3 22.5 16 22.5",
                    stroke: palette.fg,
                    strokeWidth: "2.1",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/src/components/MedicationAvatar.tsx",
                    lineNumber: 78,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/MedicationAvatar.tsx",
            lineNumber: 69,
            columnNumber: 9
        }, this) : medication.pack.style === 'capsule-box' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 32 32",
            className: glyphScale,
            fill: "none",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                transform: "rotate(-38 16 16)",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "5.5",
                        y: "10.5",
                        width: "21",
                        height: "11",
                        rx: "5.5",
                        fill: "#FFFFFF",
                        stroke: palette.fg,
                        strokeWidth: "2"
                    }, void 0, false, {
                        fileName: "[project]/src/components/MedicationAvatar.tsx",
                        lineNumber: 88,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M16 10.5H21C24.0376 10.5 26.5 12.9624 26.5 16C26.5 19.0376 24.0376 21.5 21 21.5H16V10.5Z",
                        fill: palette.pill,
                        fillOpacity: "0.85"
                    }, void 0, false, {
                        fileName: "[project]/src/components/MedicationAvatar.tsx",
                        lineNumber: 98,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: "16",
                        y1: "10.5",
                        x2: "16",
                        y2: "21.5",
                        stroke: palette.fg,
                        strokeWidth: "1.8"
                    }, void 0, false, {
                        fileName: "[project]/src/components/MedicationAvatar.tsx",
                        lineNumber: 103,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/MedicationAvatar.tsx",
                lineNumber: 87,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/MedicationAvatar.tsx",
            lineNumber: 86,
            columnNumber: 9
        }, this) : medication.category === 'anticoncepcional' ? // Minimalist blister dot calendar motif (immediately recognizable for daily contraceptive)
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 32 32",
            className: glyphScale,
            fill: "none",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "5",
                    y: "6",
                    width: "22",
                    height: "20",
                    rx: "5",
                    fill: "#FFFFFF",
                    stroke: palette.fg,
                    strokeWidth: "1.9"
                }, void 0, false, {
                    fileName: "[project]/src/components/MedicationAvatar.tsx",
                    lineNumber: 109,
                    columnNumber: 11
                }, this),
                [
                    11,
                    16,
                    21
                ].map((cx)=>[
                        12,
                        19.5
                    ].map((cy)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: cx,
                            cy: cy,
                            r: "2.1",
                            fill: cx === 21 && cy === 19.5 ? '#E2E8F0' : palette.pill,
                            fillOpacity: cx === 21 && cy === 19.5 ? 1 : 0.85
                        }, `${cx}-${cy}`, false, {
                            fileName: "[project]/src/components/MedicationAvatar.tsx",
                            lineNumber: 121,
                            columnNumber: 15
                        }, this)))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/MedicationAvatar.tsx",
            lineNumber: 108,
            columnNumber: 9
        }, this) : // Crisp minimalist scored round tablet (Apple Medications aesthetic)
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 32 32",
            className: glyphScale,
            fill: "none",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "16",
                    cy: "16",
                    r: "10.5",
                    fill: "#FFFFFF",
                    stroke: palette.fg,
                    strokeWidth: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/MedicationAvatar.tsx",
                    lineNumber: 135,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "16",
                    cy: "16",
                    r: "7.5",
                    fill: palette.pill,
                    fillOpacity: "0.16"
                }, void 0, false, {
                    fileName: "[project]/src/components/MedicationAvatar.tsx",
                    lineNumber: 143,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "10.2",
                    y1: "21.8",
                    x2: "21.8",
                    y2: "10.2",
                    stroke: palette.fg,
                    strokeWidth: "2",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/src/components/MedicationAvatar.tsx",
                    lineNumber: 144,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/MedicationAvatar.tsx",
            lineNumber: 134,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/MedicationAvatar.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
_c = MedicationAvatar;
var _c;
__turbopack_context__.k.register(_c, "MedicationAvatar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/MedicationDetailView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MedicationDetailView",
    ()=>MedicationDetailView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2d$ring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BellRing$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell-ring.js [app-client] (ecmascript) <export default as BellRing>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.js [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic-off.js [app-client] (ecmascript) <export default as MicOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$aiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/aiClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/voiceEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MedicationAvatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/MedicationAvatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CleanIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CleanIcons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AudioPlayerBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AudioPlayerBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CompararView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CompararView.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function MedicationDetailView({ medication, myMedications, medicationPhotos, schedulesForMed, dosesTodayForMed, selectedUf, activeSubTab, onChangeSubTab, onSelectMedication, onChangeUf, playback, voiceRate, hasNaturalVoiceKey, onSpeak, onStopSpeaking, onToggleRate, onOpenVoiceSettings, onOpenAddAlarm, onToggleScheduleEnabled, onDeleteSchedule, onTriggerTestAlarm, pendingQuestion, onClearPendingQuestion }) {
    _s();
    const [openAccordion, setOpenAccordion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [questionInput, setQuestionInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [aiAnswer, setAiAnswer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [askingAi, setAskingAi] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [listeningQ, setListeningQ] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const toggleSpeak = (id, text)=>{
        if (playback.sectionId === id && playback.status !== 'idle') {
            onStopSpeaking();
        } else {
            onSpeak(id, text);
        }
    };
    const fullSummaryScript = `${medication.name}. ${medication.purposeSimple} ${medication.howToTake.spokenScript} ${medication.whatNotToDo.spokenScript}`;
    const submitQuestion = async (rawQuestion)=>{
        const q = rawQuestion.trim();
        if (!q) return;
        setOpenAccordion('ask');
        setQuestionInput(q);
        setAskingAi(true);
        setAiAnswer(null);
        onClearPendingQuestion?.();
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$aiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["askPharmacistAi"])({
            question: q,
            medicationName: medication.name,
            activeIngredient: medication.activeIngredient,
            contextNotes: `${medication.howToTake.summary} ${medication.genericsHighlight.switchWarningShort}`
        });
        setAskingAi(false);
        setAiAnswer(res.answer);
        if (res.answer) {
            onSpeak('pharmacist-answer', res.answer);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MedicationDetailView.useEffect": ()=>{
            if (pendingQuestion) {
                void submitQuestion(pendingQuestion);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["MedicationDetailView.useEffect"], [
        pendingQuestion
    ]);
    const handleVoiceQuestion = ()=>{
        if (listeningQ) {
            setListeningQ(false);
            return;
        }
        setListeningQ(true);
        const stop = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].startListening({
            onResult: (transcript)=>{
                setListeningQ(false);
                void submitQuestion(transcript);
            },
            onError: ()=>{
                setListeningQ(false);
            },
            onEnd: ()=>{
                setListeningQ(false);
            }
        });
        if (!stop) setListeningQ(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "px-5 pt-2 pb-28 space-y-5",
        children: [
            myMedications.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 overflow-x-auto no-scrollbar",
                children: myMedications.map((med)=>{
                    const active = med.id === medication.id;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>onSelectMedication(med.id),
                        className: `shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold transition-all cursor-pointer ${active ? 'bg-[#1C1917] text-white' : 'bg-white text-[#57534E] border border-black/[0.06] hover:bg-[#F3EFE8]'}`,
                        children: med.name
                    }, med.id, false, {
                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                        lineNumber: 153,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/MedicationDetailView.tsx",
                lineNumber: 149,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MedicationAvatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MedicationAvatar"], {
                                medication: medication,
                                photoOverride: medicationPhotos[medication.id],
                                size: "lg"
                            }, void 0, false, {
                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                lineNumber: 173,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0 flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-[26px] font-bold text-[#1C1917] leading-tight truncate",
                                        children: medication.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                                        lineNumber: 179,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[13.5px] text-[#6B6560] mt-0.5 leading-snug",
                                        children: medication.activeIngredient
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                                        lineNumber: 182,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[13px] text-[#78716C] mt-1",
                                        children: medication.purposeSimple
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                                        lineNumber: 185,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                lineNumber: 178,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AudioPlayerBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AudioPlayerBar"], {
                        label: "Ouvir tudo em voz natural",
                        sectionId: `med-all-${medication.id}`,
                        playback: playback,
                        rate: voiceRate,
                        hasNaturalVoiceKey: hasNaturalVoiceKey,
                        onPlayToggle: ()=>toggleSpeak(`med-all-${medication.id}`, fullSummaryScript),
                        onToggleRate: onToggleRate,
                        onOpenVoiceSettings: onOpenVoiceSettings
                    }, void 0, false, {
                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/MedicationDetailView.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "tablist",
                "aria-label": "Detalhes do medicamento",
                className: "grid grid-cols-3 p-1 rounded-full bg-[#EAE5DC]",
                children: [
                    {
                        id: 'bula',
                        label: 'Bula Fácil'
                    },
                    {
                        id: 'genericos',
                        label: 'Genéricos'
                    },
                    {
                        id: 'alarmes',
                        label: 'Alarmes'
                    }
                ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        role: "tab",
                        "aria-selected": activeSubTab === tab.id,
                        onClick: ()=>onChangeSubTab(tab.id),
                        className: `py-2.5 rounded-full text-[13.5px] font-semibold transition-all cursor-pointer ${activeSubTab === tab.id ? 'bg-white text-[#1C1917] shadow-xs' : 'text-[#6B6560] hover:text-[#1C1917]'}`,
                        children: tab.label
                    }, tab.id, false, {
                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                        lineNumber: 215,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/MedicationDetailView.tsx",
                lineNumber: 203,
                columnNumber: 7
            }, this),
            activeSubTab === 'bula' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "bg-white rounded-[26px] p-5 border border-black/[0.05] shadow-[0_2px_14px_rgba(28,25,23,0.03)] space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-[17px] font-bold text-[#1C1917]",
                                        children: "Como tomar"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                                        lineNumber: 238,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AudioPlayerBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuietListenButton"], {
                                        sectionId: `how-${medication.id}`,
                                        playback: playback,
                                        onClick: ()=>toggleSpeak(`how-${medication.id}`, medication.howToTake.spokenScript),
                                        ariaLabel: "Ouvir como tomar"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                                        lineNumber: 239,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                lineNumber: 237,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-3 gap-2.5",
                                children: medication.howToTake.items.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>toggleSpeak(`how-item-${medication.id}-${idx}`, `${item.shortLabel}. ${item.spokenDetail}`),
                                        className: "flex flex-col items-center text-center p-2.5 rounded-2xl hover:bg-[#F6F4EF] active:scale-95 transition-all cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CleanIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CleanIcon"], {
                                                type: item.icon,
                                                tone: "sage"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                lineNumber: 260,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mt-2 text-[13px] font-semibold text-[#1C1917] leading-tight",
                                                children: item.shortLabel
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                lineNumber: 261,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, `${item.shortLabel}-${idx}`, true, {
                                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                                        lineNumber: 249,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                lineNumber: 247,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[14.5px] text-[#57534E] leading-relaxed",
                                children: medication.howToTake.summary
                            }, void 0, false, {
                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                lineNumber: 268,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                        lineNumber: 236,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "bg-[#FFF6F7] rounded-[26px] p-5 border border-[#BE123C]/10 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-[17px] font-bold text-[#9F1239]",
                                        children: "O que não pode"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                                        lineNumber: 276,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AudioPlayerBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuietListenButton"], {
                                        sectionId: `not-${medication.id}`,
                                        playback: playback,
                                        onClick: ()=>toggleSpeak(`not-${medication.id}`, medication.whatNotToDo.spokenScript),
                                        ariaLabel: "Ouvir o que não pode fazer"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                                        lineNumber: 277,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                lineNumber: 275,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-3 gap-2.5",
                                children: medication.whatNotToDo.items.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>toggleSpeak(`not-item-${medication.id}-${idx}`, `Atenção: ${item.shortLabel}. ${item.spokenDetail}`),
                                        className: "flex flex-col items-center text-center p-2.5 rounded-2xl hover:bg-white/70 active:scale-95 transition-all cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CleanIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CleanIcon"], {
                                                type: item.icon,
                                                tone: "rose"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                lineNumber: 298,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mt-2 text-[13px] font-semibold text-[#881337] leading-tight",
                                                children: item.shortLabel
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                lineNumber: 299,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, `${item.shortLabel}-${idx}`, true, {
                                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                                        lineNumber: 287,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                lineNumber: 285,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[14.5px] text-[#881337]/90 leading-relaxed",
                                children: medication.whatNotToDo.summary
                            }, void 0, false, {
                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                lineNumber: 306,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                        lineNumber: 274,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "bg-white rounded-[26px] border border-black/[0.05] shadow-[0_2px_14px_rgba(28,25,23,0.03)] divide-y divide-black/[0.05] overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setOpenAccordion((v)=>v === 'missed' ? null : 'missed'),
                                        className: "w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#FAF9F6]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[15px] font-semibold text-[#1C1917]",
                                                children: "Esqueci de tomar — e agora?"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                lineNumber: 320,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: `w-4.5 h-4.5 text-[#78716C] transition-transform ${openAccordion === 'missed' ? 'rotate-180' : ''}`
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                lineNumber: 323,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                                        lineNumber: 315,
                                        columnNumber: 15
                                    }, this),
                                    openAccordion === 'missed' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-5 pb-4 flex items-start justify-between gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[14px] text-[#57534E] leading-relaxed",
                                                children: medication.whatYouCanDo.missedDoseTip
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                lineNumber: 331,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AudioPlayerBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuietListenButton"], {
                                                sectionId: `missed-${medication.id}`,
                                                playback: playback,
                                                onClick: ()=>toggleSpeak(`missed-${medication.id}`, medication.whatYouCanDo.missedDoseTip),
                                                ariaLabel: "Ouvir orientação de dose esquecida"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                lineNumber: 334,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                                        lineNumber: 330,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                lineNumber: 314,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setOpenAccordion((v)=>v === 'can' ? null : 'can'),
                                        className: "w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#FAF9F6]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[15px] font-semibold text-[#1C1917]",
                                                children: "O que pode fazer & quando age"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                lineNumber: 353,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: `w-4.5 h-4.5 text-[#78716C] transition-transform ${openAccordion === 'can' ? 'rotate-180' : ''}`
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                lineNumber: 356,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                                        lineNumber: 348,
                                        columnNumber: 15
                                    }, this),
                                    openAccordion === 'can' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-5 pb-4 space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[14px] text-[#57534E] leading-relaxed",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        className: "text-[#1C1917]",
                                                        children: "Início do efeito:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                        lineNumber: 365,
                                                        columnNumber: 21
                                                    }, this),
                                                    ' ',
                                                    medication.whatYouCanDo.onsetTime
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                lineNumber: 364,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: medication.whatYouCanDo.items.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start gap-2.5 text-[13.5px] text-[#57534E]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CleanIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CleanIcon"], {
                                                                type: item.icon,
                                                                tone: "neutral",
                                                                size: "sm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                                lineNumber: 371,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "pt-0.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-semibold text-[#1C1917]",
                                                                        children: item.shortLabel
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                                        lineNumber: 373,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-[13px] text-[#6B6560]",
                                                                        children: item.spokenDetail
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                                        lineNumber: 374,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                                lineNumber: 372,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, idx, true, {
                                                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                        lineNumber: 370,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                lineNumber: 368,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                                        lineNumber: 363,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                lineNumber: 347,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setOpenAccordion((v)=>v === 'ask' ? null : 'ask'),
                                        className: "w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#FAF9F6]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[15px] font-semibold text-[#146356]",
                                                children: [
                                                    "Tirar uma dúvida sobre ",
                                                    medication.name
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                lineNumber: 390,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: `w-4.5 h-4.5 text-[#146356] transition-transform ${openAccordion === 'ask' ? 'rotate-180' : ''}`
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                lineNumber: 393,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                                        lineNumber: 385,
                                        columnNumber: 15
                                    }, this),
                                    openAccordion === 'ask' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-5 pb-5 space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                                onSubmit: (e)=>{
                                                    e.preventDefault();
                                                    void submitQuestion(questionInput);
                                                },
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: handleVoiceQuestion,
                                                        "aria-label": "Falar sua dúvida",
                                                        className: `w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer ${listeningQ ? 'bg-[#BE123C] text-white animate-pulse' : 'bg-[#E6F2EF] text-[#146356] hover:bg-[#D5EBE5]'}`,
                                                        children: listeningQ ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__["MicOff"], {
                                                            className: "w-5 h-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                            lineNumber: 418,
                                                            columnNumber: 37
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                                            className: "w-5 h-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                            lineNumber: 418,
                                                            columnNumber: 70
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                        lineNumber: 408,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: questionInput,
                                                        onChange: (e)=>setQuestionInput(e.target.value),
                                                        placeholder: "Ex: Posso tomar com café?",
                                                        className: "flex-1 min-w-0 px-4 py-2.5 rounded-full bg-[#F6F4EF] text-[14px] text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#146356]/30"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                        lineNumber: 420,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "submit",
                                                        disabled: askingAi || !questionInput.trim(),
                                                        "aria-label": "Enviar dúvida",
                                                        className: "w-11 h-11 rounded-full bg-[#146356] disabled:opacity-40 text-white flex items-center justify-center shrink-0 cursor-pointer",
                                                        children: askingAi ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                            className: "w-4 h-4 animate-spin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                            lineNumber: 434,
                                                            columnNumber: 25
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                            lineNumber: 436,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                        lineNumber: 427,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                lineNumber: 401,
                                                columnNumber: 19
                                            }, this),
                                            aiAnswer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-2xl bg-[#F6F4EF] p-4 space-y-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start justify-between gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[14px] text-[#1C1917] leading-relaxed",
                                                            children: aiAnswer
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                            lineNumber: 444,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AudioPlayerBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuietListenButton"], {
                                                            sectionId: "pharmacist-answer",
                                                            playback: playback,
                                                            onClick: ()=>toggleSpeak('pharmacist-answer', aiAnswer),
                                                            ariaLabel: "Ouvir resposta novamente"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                            lineNumber: 445,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                    lineNumber: 443,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                lineNumber: 442,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                                        lineNumber: 400,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                lineNumber: 384,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                        lineNumber: 312,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11.5px] text-center text-[#A8A29E] px-4",
                        children: "Guia educativo em linguagem simples. Em caso de dúvida clínica, fale com seu médico ou farmacêutico."
                    }, void 0, false, {
                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                        lineNumber: 459,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/MedicationDetailView.tsx",
                lineNumber: 234,
                columnNumber: 9
            }, this),
            activeSubTab === 'genericos' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CompararView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompararView"], {
                medication: medication,
                selectedUf: selectedUf,
                onChangeUf: onChangeUf,
                playback: playback,
                voiceRate: voiceRate,
                hasNaturalVoiceKey: hasNaturalVoiceKey,
                onSpeak: onSpeak,
                onStopSpeaking: onStopSpeaking,
                onToggleRate: onToggleRate,
                onOpenVoiceSettings: onOpenVoiceSettings,
                onAskAboutSwitch: (q)=>{
                    onChangeSubTab('bula');
                    void submitQuestion(q);
                },
                embedded: true
            }, void 0, false, {
                fileName: "[project]/src/components/MedicationDetailView.tsx",
                lineNumber: 467,
                columnNumber: 9
            }, this),
            activeSubTab === 'alarmes' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3.5",
                children: schedulesForMed.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-[26px] p-6 border border-black/[0.05] text-center space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[16px] font-bold text-[#1C1917]",
                            children: [
                                "Sem alarme para ",
                                medication.name
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/MedicationDetailView.tsx",
                            lineNumber: 491,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[14px] text-[#6B6560]",
                            children: "Adicione um horário para o app te lembrar com voz natural."
                        }, void 0, false, {
                            fileName: "[project]/src/components/MedicationDetailView.tsx",
                            lineNumber: 494,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onOpenAddAlarm,
                            className: "py-3 px-6 rounded-full bg-[#146356] text-white text-[14px] font-semibold inline-flex items-center gap-2 cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MedicationDetailView.tsx",
                                    lineNumber: 502,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Criar alarme"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MedicationDetailView.tsx",
                                    lineNumber: 503,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/MedicationDetailView.tsx",
                            lineNumber: 497,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/MedicationDetailView.tsx",
                    lineNumber: 490,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        schedulesForMed.map((sched)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-[24px] p-4 border border-black/[0.05] shadow-[0_2px_14px_rgba(28,25,23,0.03)] flex items-center justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[22px] font-bold text-[#1C1917] leading-none",
                                                children: sched.times.join(' · ')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                lineNumber: 514,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[13px] text-[#6B6560] mt-1.5",
                                                children: [
                                                    sched.dosage,
                                                    " ·",
                                                    ' ',
                                                    sched.cycleMode === '24_4' ? '24 dias + 4 pausa' : sched.cycleMode === '21_7' ? '21 dias + 7 pausa' : 'Todos os dias'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                lineNumber: 517,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                                        lineNumber: 513,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                role: "switch",
                                                "aria-checked": sched.enabled,
                                                "aria-label": "Ativar ou pausar alarme",
                                                onClick: ()=>onToggleScheduleEnabled(sched.id),
                                                className: `w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${sched.enabled ? 'bg-[#146356]' : 'bg-[#D6D3CD]'}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `block w-5 h-5 rounded-full bg-white shadow transition-transform ${sched.enabled ? 'translate-x-5' : 'translate-x-0'}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                    lineNumber: 538,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                lineNumber: 528,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>onDeleteSchedule(sched.id),
                                                "aria-label": "Remover alarme",
                                                className: "w-9 h-9 rounded-full text-[#A8A29E] hover:text-[#BE123C] hover:bg-[#FEECEF] inline-flex items-center justify-center cursor-pointer",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                    lineNumber: 550,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                                lineNumber: 544,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/MedicationDetailView.tsx",
                                        lineNumber: 527,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, sched.id, true, {
                                fileName: "[project]/src/components/MedicationDetailView.tsx",
                                lineNumber: 509,
                                columnNumber: 17
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2.5 pt-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onOpenAddAlarm,
                                    className: "flex-1 py-3.5 rounded-full bg-[#146356] text-white text-[14px] font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/MedicationDetailView.tsx",
                                            lineNumber: 562,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Novo horário"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/MedicationDetailView.tsx",
                                            lineNumber: 563,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/MedicationDetailView.tsx",
                                    lineNumber: 557,
                                    columnNumber: 17
                                }, this),
                                dosesTodayForMed[0] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>onTriggerTestAlarm(dosesTodayForMed[0]),
                                    className: "py-3.5 px-5 rounded-full bg-white border border-black/10 text-[#1C1917] text-[14px] font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2d$ring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BellRing$3e$__["BellRing"], {
                                            className: "w-4 h-4 text-[#146356]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/MedicationDetailView.tsx",
                                            lineNumber: 571,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Testar"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/MedicationDetailView.tsx",
                                            lineNumber: 572,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/MedicationDetailView.tsx",
                                    lineNumber: 566,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/MedicationDetailView.tsx",
                            lineNumber: 556,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/MedicationDetailView.tsx",
                    lineNumber: 507,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/MedicationDetailView.tsx",
                lineNumber: 488,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/MedicationDetailView.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, this);
}
_s(MedicationDetailView, "hEuohO6kFjVLztyvkvw0cmHdu98=");
_c = MedicationDetailView;
var _c;
__turbopack_context__.k.register(_c, "MedicationDetailView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/MeuRemedioApp.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MeuRemedioApp",
    ()=>MeuRemedioApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left-right.js [app-client] (ecmascript) <export default as ArrowLeftRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/camera.js [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-client] (ecmascript) <export default as SlidersHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-2.js [app-client] (ecmascript) <export default as Volume2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$medications$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/medications.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$scheduleEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/scheduleEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/voiceEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$aiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/aiClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HomeView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/HomeView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MedicationDetailView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/MedicationDetailView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CompararView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CompararView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VoiceGuidedOverlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/VoiceGuidedOverlay.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AddMedicationSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AddMedicationSheet.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VoiceAiSettingsSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/VoiceAiSettingsSheet.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AlarmRingingModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AlarmRingingModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AddAlarmSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AddAlarmSheet.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HistorySheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/HistorySheet.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function MeuRemedioApp() {
    _s();
    const [hydrated, setHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "MeuRemedioApp.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDefaultState"])()
    }["MeuRemedioApp.useState"]);
    const [aiKeys, setAiKeys] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [aiStatus, setAiStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        elevenLabsConnected: false,
        elevenLabsSource: 'none',
        geminiConnected: false,
        geminiSource: 'none',
        naturalVoiceProvider: 'none'
    });
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('hoje');
    const [detailSubTab, setDetailSubTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('bula');
    const [showAddSheet, setShowAddSheet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showVoiceSettings, setShowVoiceSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showAddAlarm, setShowAddAlarm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [historySheetDate, setHistorySheetDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pendingQuestion, setPendingQuestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [playback, setPlayback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "MeuRemedioApp.useState": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].getState()
    }["MeuRemedioApp.useState"]);
    const [now, setNow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "MeuRemedioApp.useState": ()=>new Date()
    }["MeuRemedioApp.useState"]);
    const [ringingAlarm, setRingingAlarm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [toast, setToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const dismissedKeysRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    const snoozedUntilRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const ringingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const toastTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const setRinging = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MeuRemedioApp.useCallback[setRinging]": (next)=>{
            ringingRef.current = next;
            setRingingAlarm(next);
        }
    }["MeuRemedioApp.useCallback[setRinging]"], []);
    const showToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MeuRemedioApp.useCallback[showToast]": (msg)=>{
            setToast(msg);
            if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
            toastTimerRef.current = window.setTimeout({
                "MeuRemedioApp.useCallback[showToast]": ()=>setToast(null)
            }["MeuRemedioApp.useCallback[showToast]"], 3200);
        }
    }["MeuRemedioApp.useCallback[showToast]"], []);
    // Hydrate persisted state & check server AI status
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MeuRemedioApp.useEffect": ()=>{
            setState((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadPersistedState"])());
            const keys = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadClientAiKeys"])();
            setAiKeys(keys);
            setHydrated(true);
            void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$aiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAiStatus"])(keys).then(setAiStatus);
        }
    }["MeuRemedioApp.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MeuRemedioApp.useEffect": ()=>{
            if (hydrated) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["savePersistedState"])(state);
        }
    }["MeuRemedioApp.useEffect"], [
        state,
        hydrated
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MeuRemedioApp.useEffect": ()=>{
            const unsub = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].subscribe(setPlayback);
            return ({
                "MeuRemedioApp.useEffect": ()=>{
                    unsub();
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].stop();
                }
            })["MeuRemedioApp.useEffect"];
        }
    }["MeuRemedioApp.useEffect"], []);
    const fullCatalog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MeuRemedioApp.useMemo[fullCatalog]": ()=>[
                ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$medications$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MEDICATIONS_CATALOG"],
                ...state.customMedications
            ]
    }["MeuRemedioApp.useMemo[fullCatalog]"], [
        state.customMedications
    ]);
    const myMedications = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MeuRemedioApp.useMemo[myMedications]": ()=>{
            const map = new Map(fullCatalog.map({
                "MeuRemedioApp.useMemo[myMedications]": (m)=>[
                        m.id,
                        m
                    ]
            }["MeuRemedioApp.useMemo[myMedications]"]));
            const list = state.myMedicationIds.map({
                "MeuRemedioApp.useMemo[myMedications].list": (id)=>map.get(id)
            }["MeuRemedioApp.useMemo[myMedications].list"]).filter({
                "MeuRemedioApp.useMemo[myMedications].list": (m)=>Boolean(m)
            }["MeuRemedioApp.useMemo[myMedications].list"]);
            return list.length > 0 ? list : [
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$medications$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MEDICATIONS_CATALOG"][0]
            ];
        }
    }["MeuRemedioApp.useMemo[myMedications]"], [
        fullCatalog,
        state.myMedicationIds
    ]);
    const activeMedication = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MeuRemedioApp.useMemo[activeMedication]": ()=>fullCatalog.find({
                "MeuRemedioApp.useMemo[activeMedication]": (m)=>m.id === state.activeMedicationId
            }["MeuRemedioApp.useMemo[activeMedication]"]) ?? myMedications[0] ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$medications$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MEDICATIONS_CATALOG"][0]
    }["MeuRemedioApp.useMemo[activeMedication]"], [
        fullCatalog,
        myMedications,
        state.activeMedicationId
    ]);
    const medicationPhotos = state.medicationPhotos ?? {};
    const dosesToday = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MeuRemedioApp.useMemo[dosesToday]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$scheduleEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDosesForDate"])(state.schedules, state.doseLogs, fullCatalog, now, now)
    }["MeuRemedioApp.useMemo[dosesToday]"], [
        state.schedules,
        state.doseLogs,
        fullCatalog,
        now
    ]);
    const last7Days = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MeuRemedioApp.useMemo[last7Days]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$scheduleEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildLast7DaysAdherence"])(state.schedules, state.doseLogs, fullCatalog, now)
    }["MeuRemedioApp.useMemo[last7Days]"], [
        state.schedules,
        state.doseLogs,
        fullCatalog,
        now
    ]);
    const nextUntakenDose = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MeuRemedioApp.useMemo[nextUntakenDose]": ()=>dosesToday.find({
                "MeuRemedioApp.useMemo[nextUntakenDose]": (d)=>d.status === 'due_now'
            }["MeuRemedioApp.useMemo[nextUntakenDose]"]) ?? dosesToday.find({
                "MeuRemedioApp.useMemo[nextUntakenDose]": (d)=>d.status === 'late'
            }["MeuRemedioApp.useMemo[nextUntakenDose]"]) ?? dosesToday.find({
                "MeuRemedioApp.useMemo[nextUntakenDose]": (d)=>d.status === 'upcoming'
            }["MeuRemedioApp.useMemo[nextUntakenDose]"]) ?? null
    }["MeuRemedioApp.useMemo[nextUntakenDose]"], [
        dosesToday
    ]);
    const hasNaturalVoiceKey = aiStatus.naturalVoiceProvider !== 'none' || Boolean(aiKeys.elevenLabsKey) || Boolean(aiKeys.geminiKey);
    const hasGeminiKey = aiStatus.geminiConnected || Boolean(aiKeys.geminiKey);
    const speak = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MeuRemedioApp.useCallback[speak]": (sectionId, text)=>{
            void __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].speak(text, {
                sectionId,
                rate: state.voice.rate,
                voiceProfile: state.voice.voiceProfile ?? 'acolhedora',
                keysOverride: aiKeys
            });
        }
    }["MeuRemedioApp.useCallback[speak]"], [
        state.voice.rate,
        state.voice.voiceProfile,
        aiKeys
    ]);
    const announceAlarm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MeuRemedioApp.useCallback[announceAlarm]": (dose)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].playGentleChime();
            const medName = dose.medication?.name ?? 'seu remédio';
            speak('alarm-ring', `Olá, está na hora do seu remédio. Tome ${dose.dosage} de ${medName}. ${dose.notes ?? ''}`);
        }
    }["MeuRemedioApp.useCallback[announceAlarm]"], [
        speak
    ]);
    // Live clock & alarm check every 15s
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MeuRemedioApp.useEffect": ()=>{
            const tick = {
                "MeuRemedioApp.useEffect.tick": ()=>{
                    const current = new Date();
                    setNow(current);
                    const todayList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$scheduleEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDosesForDate"])(state.schedules, state.doseLogs, fullCatalog, current, current);
                    const due = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$scheduleEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findDueAlarmNow"])(todayList, current, dismissedKeysRef.current, snoozedUntilRef.current, ringingRef.current?.dose.key ?? null);
                    if (due && !ringingRef.current) {
                        delete snoozedUntilRef.current[due.key];
                        setRinging({
                            dose: due,
                            isTest: false
                        });
                        announceAlarm(due);
                    }
                }
            }["MeuRemedioApp.useEffect.tick"];
            const id = window.setInterval(tick, 15000);
            return ({
                "MeuRemedioApp.useEffect": ()=>window.clearInterval(id)
            })["MeuRemedioApp.useEffect"];
        }
    }["MeuRemedioApp.useEffect"], [
        state.schedules,
        state.doseLogs,
        fullCatalog,
        announceAlarm,
        setRinging
    ]);
    const handleMarkTaken = (dose)=>{
        const actionDate = new Date();
        const delayMinutes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$scheduleEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeDelayMinutes"])(dose.scheduledTime, actionDate, dose.dateStr);
        const takenTimeDisplay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$scheduleEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTimeHHMM"])(actionDate);
        const newLog = {
            id: `log-${dose.scheduleId}-${dose.dateStr}-${dose.scheduledTime}-${Date.now()}`,
            scheduleId: dose.scheduleId,
            medicationId: dose.medicationId,
            dateStr: dose.dateStr,
            scheduledTime: dose.scheduledTime,
            status: 'taken',
            actionTimestamp: actionDate.toISOString(),
            takenTimeDisplay,
            delayMinutes
        };
        dismissedKeysRef.current.add(dose.key);
        delete snoozedUntilRef.current[dose.key];
        setRinging(null);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].stop();
        setState((prev)=>({
                ...prev,
                doseLogs: [
                    ...prev.doseLogs.filter((l)=>!(l.scheduleId === dose.scheduleId && l.dateStr === dose.dateStr && l.scheduledTime === dose.scheduledTime)),
                    newLog
                ]
            }));
        showToast(`${dose.medication?.name ?? 'Remédio'} marcado às ${takenTimeDisplay}${Math.abs(delayMinutes) <= 15 ? ' · Certinho!' : ''}`);
    };
    const handleUndoDose = (dose)=>{
        dismissedKeysRef.current.delete(dose.key);
        setState((prev)=>({
                ...prev,
                doseLogs: prev.doseLogs.filter((l)=>!(l.scheduleId === dose.scheduleId && l.dateStr === dose.dateStr && l.scheduledTime === dose.scheduledTime))
            }));
        showToast('Marcação desfeita.');
    };
    const handleSaveSchedule = (input)=>{
        const sched = {
            ...input,
            id: `sched-${input.medicationId}-${Date.now()}`,
            createdAt: new Date().toISOString()
        };
        setState((prev)=>({
                ...prev,
                myMedicationIds: prev.myMedicationIds.includes(input.medicationId) ? prev.myMedicationIds : [
                    input.medicationId,
                    ...prev.myMedicationIds
                ],
                schedules: [
                    ...prev.schedules,
                    sched
                ]
            }));
        setShowAddAlarm(false);
        showToast(`Lembrete salvo (${input.times.join(', ')})`);
    };
    const handleAddExisting = (med, options)=>{
        setState((prev)=>{
            const nextIds = prev.myMedicationIds.includes(med.id) ? prev.myMedicationIds : [
                med.id,
                ...prev.myMedicationIds
            ];
            const nextPhotos = options.photoDataUrl ? {
                ...prev.medicationPhotos ?? {},
                [med.id]: options.photoDataUrl
            } : prev.medicationPhotos ?? {};
            let nextSchedules = prev.schedules;
            if (options.createAlarm) {
                const times = options.alarmTimes && options.alarmTimes.length > 0 ? options.alarmTimes : med.howToTake.defaultTimes;
                nextSchedules = [
                    ...prev.schedules,
                    {
                        id: `sched-${med.id}-${Date.now()}`,
                        medicationId: med.id,
                        dosage: med.howToTake.defaultDosage,
                        times,
                        daysOfWeek: [
                            0,
                            1,
                            2,
                            3,
                            4,
                            5,
                            6
                        ],
                        cycleMode: med.category === 'anticoncepcional' ? '24_4' : 'daily',
                        enabled: true,
                        notes: med.howToTake.summary,
                        createdAt: new Date().toISOString()
                    }
                ];
            }
            return {
                ...prev,
                myMedicationIds: nextIds,
                activeMedicationId: med.id,
                medicationPhotos: nextPhotos,
                schedules: nextSchedules
            };
        });
        if (options.openAfter) {
            setActiveTab('remedios');
            setDetailSubTab('bula');
        }
        showToast(`${med.name} adicionado.`);
    };
    const handleAddNewMedication = (med, alarmTimes, photoDataUrl)=>{
        setState((prev)=>{
            const nextPhotos = photoDataUrl ? {
                ...prev.medicationPhotos ?? {},
                [med.id]: photoDataUrl
            } : prev.medicationPhotos ?? {};
            const nextSchedules = alarmTimes && alarmTimes.length > 0 ? [
                ...prev.schedules,
                {
                    id: `sched-${med.id}-${Date.now()}`,
                    medicationId: med.id,
                    dosage: med.howToTake.defaultDosage,
                    times: alarmTimes,
                    daysOfWeek: [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6
                    ],
                    cycleMode: med.category === 'anticoncepcional' ? '24_4' : 'daily',
                    enabled: true,
                    notes: med.howToTake.summary,
                    createdAt: new Date().toISOString()
                }
            ] : prev.schedules;
            return {
                ...prev,
                customMedications: [
                    ...prev.customMedications,
                    med
                ],
                myMedicationIds: [
                    med.id,
                    ...prev.myMedicationIds
                ],
                activeMedicationId: med.id,
                medicationPhotos: nextPhotos,
                schedules: nextSchedules
            };
        });
        setActiveTab('remedios');
        setDetailSubTab('bula');
        showToast(`${med.name} pronto na sua lista!`);
    };
    const handleSaveAiKeys = async (nextKeys)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveClientAiKeys"])(nextKeys);
        setAiKeys(nextKeys);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].clearCache();
        const updated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$aiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAiStatus"])(nextKeys);
        setAiStatus(updated);
        showToast('Configurações de Voz & IA salvas.');
    };
    const toggleVoiceRate = ()=>{
        const nextRate = state.voice.rate === 'normal' ? 'slow' : 'normal';
        setState((prev)=>({
                ...prev,
                voice: {
                    ...prev.voice,
                    rate: nextRate
                }
            }));
        showToast(nextRate === 'slow' ? 'Ritmo da voz: Calmo (0.85×)' : 'Ritmo da voz: Normal (1×)');
    };
    const toggleGuidedMode = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].stop();
        setState((prev)=>({
                ...prev,
                voice: {
                    ...prev.voice,
                    guidedMode: !prev.voice.guidedMode
                }
            }));
    };
    const isGuided = Boolean(state.voice.guidedMode);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-dvh w-full flex justify-center sm:items-center sm:py-5 sm:px-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-[430px] h-dvh sm:h-[min(860px,92dvh)] bg-[#F6F4EF] sm:rounded-[38px] sm:shadow-[0_28px_70px_rgba(28,25,23,0.14)] sm:border sm:border-white/70 flex flex-col overflow-hidden relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "shrink-0 px-5 pt-4 pb-2.5 flex items-center justify-between gap-2 bg-[#F6F4EF]/90 backdrop-blur-md z-20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-2.5 h-2.5 rounded-full bg-[#146356] shrink-0",
                                    "aria-hidden": "true"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MeuRemedioApp.tsx",
                                    lineNumber: 423,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-[17px] font-bold text-[#1C1917] tracking-tight truncate",
                                    children: "Meu Remédio"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MeuRemedioApp.tsx",
                                    lineNumber: 424,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/MeuRemedioApp.tsx",
                            lineNumber: 422,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: toggleGuidedMode,
                                    "aria-pressed": isGuided,
                                    className: `px-3.5 py-2 rounded-full text-[12.5px] font-semibold inline-flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer ${isGuided ? 'bg-[#146356] text-white shadow-sm' : 'bg-white text-[#1C1917] border border-black/[0.06] hover:bg-[#EFECE6]'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/MeuRemedioApp.tsx",
                                            lineNumber: 441,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: isGuided ? 'Só Voz ON' : 'Só Voz'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/MeuRemedioApp.tsx",
                                            lineNumber: 442,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/MeuRemedioApp.tsx",
                                    lineNumber: 431,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setShowVoiceSettings(true),
                                    "aria-label": "Configurar voz humana e inteligência artificial",
                                    title: "Voz Humana & IA",
                                    className: "relative w-9 h-9 rounded-full bg-white border border-black/[0.06] text-[#57534E] hover:bg-[#EFECE6] inline-flex items-center justify-center cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/MeuRemedioApp.tsx",
                                            lineNumber: 453,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `absolute top-1.5 right-1.5 w-2 h-2 rounded-full ${hasNaturalVoiceKey ? 'bg-[#15803D]' : 'bg-[#D97706]'}`
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/MeuRemedioApp.tsx",
                                            lineNumber: 454,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/MeuRemedioApp.tsx",
                                    lineNumber: 446,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/MeuRemedioApp.tsx",
                            lineNumber: 429,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/MeuRemedioApp.tsx",
                    lineNumber: 421,
                    columnNumber: 9
                }, this),
                toast && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    role: "status",
                    "aria-live": "polite",
                    className: "absolute top-16 left-5 right-5 z-40 px-4 py-2.5 rounded-full bg-[#1C1917] text-white text-[13px] font-medium text-center shadow-lg animate-sheet-up",
                    children: toast
                }, void 0, false, {
                    fileName: "[project]/src/components/MeuRemedioApp.tsx",
                    lineNumber: 465,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "flex-1 overflow-y-auto",
                    children: isGuided ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VoiceGuidedOverlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VoiceGuidedOverlay"], {
                        nextDose: nextUntakenDose,
                        playback: playback,
                        onSpeak: speak,
                        onStopSpeaking: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].stop(),
                        onOpenCameraAdd: ()=>setShowAddSheet(true),
                        onMarkDoseTaken: handleMarkTaken,
                        onCloseGuidedMode: toggleGuidedMode
                    }, void 0, false, {
                        fileName: "[project]/src/components/MeuRemedioApp.tsx",
                        lineNumber: 477,
                        columnNumber: 13
                    }, this) : activeTab === 'hoje' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HomeView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HomeView"], {
                        medications: myMedications,
                        medicationPhotos: medicationPhotos,
                        schedules: state.schedules,
                        dosesToday: dosesToday,
                        last7Days: last7Days,
                        now: now,
                        playback: playback,
                        onSpeak: speak,
                        onStopSpeaking: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].stop(),
                        onMarkTaken: handleMarkTaken,
                        onUndoDose: handleUndoDose,
                        onSelectMedication: (medId)=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].stop();
                            setState((prev)=>({
                                    ...prev,
                                    activeMedicationId: medId
                                }));
                            setDetailSubTab('bula');
                            setActiveTab('remedios');
                        },
                        onOpenAdd: ()=>setShowAddSheet(true),
                        onOpenAddAlarm: ()=>setShowAddAlarm(true),
                        onOpenHistory: (dateStr)=>setHistorySheetDate(dateStr ?? last7Days[last7Days.length - 1]?.dateStr ?? ''),
                        onTriggerTestAlarm: (dose)=>{
                            setRinging({
                                dose,
                                isTest: true
                            });
                            announceAlarm(dose);
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/MeuRemedioApp.tsx",
                        lineNumber: 487,
                        columnNumber: 13
                    }, this) : activeTab === 'remedios' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MedicationDetailView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MedicationDetailView"], {
                        medication: activeMedication,
                        myMedications: myMedications,
                        medicationPhotos: medicationPhotos,
                        schedulesForMed: state.schedules.filter((s)=>s.medicationId === activeMedication.id),
                        dosesTodayForMed: dosesToday.filter((d)=>d.medicationId === activeMedication.id),
                        selectedUf: state.selectedUf,
                        activeSubTab: detailSubTab,
                        onChangeSubTab: (tab)=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].stop();
                            setDetailSubTab(tab);
                        },
                        onSelectMedication: (medId)=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].stop();
                            setState((prev)=>({
                                    ...prev,
                                    activeMedicationId: medId
                                }));
                        },
                        onChangeUf: (uf)=>{
                            setState((prev)=>({
                                    ...prev,
                                    selectedUf: uf
                                }));
                            showToast(`Preços atualizados para ${uf === 'BR' ? 'Média Brasil' : uf}`);
                        },
                        playback: playback,
                        voiceRate: state.voice.rate,
                        hasNaturalVoiceKey: hasNaturalVoiceKey,
                        onSpeak: speak,
                        onStopSpeaking: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].stop(),
                        onToggleRate: toggleVoiceRate,
                        onOpenVoiceSettings: ()=>setShowVoiceSettings(true),
                        onOpenAddAlarm: ()=>setShowAddAlarm(true),
                        onToggleScheduleEnabled: (schedId)=>setState((prev)=>({
                                    ...prev,
                                    schedules: prev.schedules.map((s)=>s.id === schedId ? {
                                            ...s,
                                            enabled: !s.enabled
                                        } : s)
                                })),
                        onDeleteSchedule: (schedId)=>{
                            setState((prev)=>({
                                    ...prev,
                                    schedules: prev.schedules.filter((s)=>s.id !== schedId)
                                }));
                            showToast('Lembrete removido.');
                        },
                        onTriggerTestAlarm: (dose)=>{
                            setRinging({
                                dose,
                                isTest: true
                            });
                            announceAlarm(dose);
                        },
                        pendingQuestion: pendingQuestion,
                        onClearPendingQuestion: ()=>setPendingQuestion(null)
                    }, void 0, false, {
                        fileName: "[project]/src/components/MeuRemedioApp.tsx",
                        lineNumber: 516,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CompararView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompararView"], {
                        medication: activeMedication,
                        allMedications: myMedications,
                        medicationPhotos: medicationPhotos,
                        onSelectMedication: (medId)=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].stop();
                            setState((prev)=>({
                                    ...prev,
                                    activeMedicationId: medId
                                }));
                        },
                        selectedUf: state.selectedUf,
                        onChangeUf: (uf)=>{
                            setState((prev)=>({
                                    ...prev,
                                    selectedUf: uf
                                }));
                            showToast(`Preços atualizados para ${uf === 'BR' ? 'Média Brasil' : uf}`);
                        },
                        playback: playback,
                        voiceRate: state.voice.rate,
                        hasNaturalVoiceKey: hasNaturalVoiceKey,
                        onSpeak: speak,
                        onStopSpeaking: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].stop(),
                        onToggleRate: toggleVoiceRate,
                        onOpenVoiceSettings: ()=>setShowVoiceSettings(true),
                        onAskAboutSwitch: (q)=>{
                            setPendingQuestion(q);
                            setActiveTab('remedios');
                            setDetailSubTab('bula');
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/MeuRemedioApp.tsx",
                        lineNumber: 571,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/MeuRemedioApp.tsx",
                    lineNumber: 475,
                    columnNumber: 9
                }, this),
                !isGuided && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    "aria-label": "Navegação principal",
                    className: "shrink-0 bg-white/95 backdrop-blur-md border-t border-black/[0.06] px-4 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] z-20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-4 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].stop();
                                    setActiveTab('hoje');
                                },
                                "aria-current": activeTab === 'hoje' ? 'page' : undefined,
                                className: `flex flex-col items-center py-1 transition-colors cursor-pointer ${activeTab === 'hoje' ? 'text-[#146356]' : 'text-[#78716C] hover:text-[#1C1917]'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                        className: `w-5.5 h-5.5 ${activeTab === 'hoje' ? 'stroke-[2.4]' : 'stroke-[1.9]'}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MeuRemedioApp.tsx",
                                        lineNumber: 618,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-[11.5px] mt-1 ${activeTab === 'hoje' ? 'font-bold' : 'font-medium'}`,
                                        children: "Hoje"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MeuRemedioApp.tsx",
                                        lineNumber: 619,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MeuRemedioApp.tsx",
                                lineNumber: 607,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].stop();
                                    setActiveTab('remedios');
                                },
                                "aria-current": activeTab === 'remedios' ? 'page' : undefined,
                                className: `flex flex-col items-center py-1 transition-colors cursor-pointer ${activeTab === 'remedios' ? 'text-[#146356]' : 'text-[#78716C] hover:text-[#1C1917]'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                        className: `w-5.5 h-5.5 ${activeTab === 'remedios' ? 'stroke-[2.4]' : 'stroke-[1.9]'}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MeuRemedioApp.tsx",
                                        lineNumber: 635,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-[11.5px] mt-1 ${activeTab === 'remedios' ? 'font-bold' : 'font-medium'}`,
                                        children: "Remédios"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MeuRemedioApp.tsx",
                                        lineNumber: 636,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MeuRemedioApp.tsx",
                                lineNumber: 624,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].stop();
                                    setActiveTab('comparar');
                                },
                                "aria-current": activeTab === 'comparar' ? 'page' : undefined,
                                className: `flex flex-col items-center py-1 transition-colors cursor-pointer ${activeTab === 'comparar' ? 'text-[#146356]' : 'text-[#78716C] hover:text-[#1C1917]'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftRight$3e$__["ArrowLeftRight"], {
                                        className: `w-5.5 h-5.5 ${activeTab === 'comparar' ? 'stroke-[2.4]' : 'stroke-[1.9]'}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MeuRemedioApp.tsx",
                                        lineNumber: 652,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-[11.5px] mt-1 ${activeTab === 'comparar' ? 'font-bold' : 'font-medium'}`,
                                        children: "Comparar"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MeuRemedioApp.tsx",
                                        lineNumber: 653,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MeuRemedioApp.tsx",
                                lineNumber: 641,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].stop();
                                    setShowAddSheet(true);
                                },
                                "aria-label": "Adicionar remédio por foto, voz ou busca",
                                className: "flex flex-col items-center cursor-pointer group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "-mt-6 w-13 h-13 rounded-full bg-[#146356] group-hover:bg-[#0F4F45] text-white shadow-[0_8px_22px_rgba(20,99,86,0.34)] flex items-center justify-center group-active:scale-95 transition-transform",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                            className: "w-6 h-6 stroke-[2.1]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/MeuRemedioApp.tsx",
                                            lineNumber: 668,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MeuRemedioApp.tsx",
                                        lineNumber: 667,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11.5px] mt-1 font-semibold text-[#146356]",
                                        children: "Adicionar"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MeuRemedioApp.tsx",
                                        lineNumber: 670,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MeuRemedioApp.tsx",
                                lineNumber: 658,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/MeuRemedioApp.tsx",
                        lineNumber: 606,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/MeuRemedioApp.tsx",
                    lineNumber: 602,
                    columnNumber: 11
                }, this),
                showAddSheet && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AddMedicationSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddMedicationSheet"], {
                    catalog: fullCatalog,
                    hasGeminiKey: hasGeminiKey,
                    onClose: ()=>setShowAddSheet(false),
                    onOpenVoiceSettings: ()=>setShowVoiceSettings(true),
                    onAddExisting: handleAddExisting,
                    onAddNewMedication: handleAddNewMedication,
                    onSpeak: speak
                }, void 0, false, {
                    fileName: "[project]/src/components/MeuRemedioApp.tsx",
                    lineNumber: 678,
                    columnNumber: 11
                }, this),
                showVoiceSettings && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VoiceAiSettingsSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VoiceAiSettingsSheet"], {
                    keys: aiKeys,
                    status: aiStatus,
                    voiceProfile: state.voice.voiceProfile ?? 'acolhedora',
                    voiceRate: state.voice.rate,
                    onSaveKeys: handleSaveAiKeys,
                    onChangeVoiceProfile: (profile)=>{
                        setState((prev)=>({
                                ...prev,
                                voice: {
                                    ...prev.voice,
                                    voiceProfile: profile
                                }
                            }));
                    },
                    onToggleRate: toggleVoiceRate,
                    onTestVoice: (keysOverride, profile)=>{
                        void __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].speak('Olá! Eu sou a voz do Meu Remédio. Vou explicar cada detalhe do seu tratamento com calma e clareza, no seu ritmo.', {
                            sectionId: 'voice-test',
                            rate: state.voice.rate,
                            voiceProfile: profile,
                            keysOverride
                        });
                    },
                    onClose: ()=>setShowVoiceSettings(false)
                }, void 0, false, {
                    fileName: "[project]/src/components/MeuRemedioApp.tsx",
                    lineNumber: 690,
                    columnNumber: 11
                }, this),
                showAddAlarm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AddAlarmSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddAlarmSheet"], {
                    medications: myMedications,
                    medicationPhotos: medicationPhotos,
                    initialMedicationId: activeMedication.id,
                    onSave: handleSaveSchedule,
                    onClose: ()=>setShowAddAlarm(false)
                }, void 0, false, {
                    fileName: "[project]/src/components/MeuRemedioApp.tsx",
                    lineNumber: 719,
                    columnNumber: 11
                }, this),
                historySheetDate !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HistorySheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HistorySheet"], {
                    last7Days: last7Days,
                    initialDateStr: historySheetDate,
                    schedules: state.schedules,
                    doseLogs: state.doseLogs,
                    medications: fullCatalog,
                    now: now,
                    playback: playback,
                    onSpeak: speak,
                    onStopSpeaking: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].stop(),
                    onClose: ()=>setHistorySheetDate(null)
                }, void 0, false, {
                    fileName: "[project]/src/components/MeuRemedioApp.tsx",
                    lineNumber: 729,
                    columnNumber: 11
                }, this),
                ringingAlarm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AlarmRingingModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlarmRingingModal"], {
                    dose: ringingAlarm.dose,
                    photoOverride: medicationPhotos[ringingAlarm.dose.medicationId],
                    onMarkTaken: ()=>handleMarkTaken(ringingAlarm.dose),
                    onSnooze: ()=>{
                        if (!ringingAlarm.isTest) {
                            snoozedUntilRef.current[ringingAlarm.dose.key] = Date.now() + 15 * 60 * 1000;
                        }
                        setRinging(null);
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].stop();
                        showToast('Lembrete adiado por 15 minutos.');
                    },
                    onDismiss: ()=>{
                        if (!ringingAlarm.isTest) {
                            dismissedKeysRef.current.add(ringingAlarm.dose.key);
                        }
                        setRinging(null);
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].stop();
                    },
                    onReplayVoice: ()=>announceAlarm(ringingAlarm.dose)
                }, void 0, false, {
                    fileName: "[project]/src/components/MeuRemedioApp.tsx",
                    lineNumber: 744,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/MeuRemedioApp.tsx",
            lineNumber: 419,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/MeuRemedioApp.tsx",
        lineNumber: 417,
        columnNumber: 5
    }, this);
}
_s(MeuRemedioApp, "kXolf6WI6mdL1jfPNvhSgpbxBlk=");
_c = MeuRemedioApp;
var _c;
__turbopack_context__.k.register(_c, "MeuRemedioApp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/VoiceAiSettingsSheet.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VoiceAiSettingsSheet",
    ()=>VoiceAiSettingsSheet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-2.js [app-client] (ecmascript) <export default as Volume2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const VOICE_PROFILES = [
    {
        id: 'acolhedora',
        name: 'Acolhedora',
        desc: 'Quente e gentil (Sarah)'
    },
    {
        id: 'clara',
        name: 'Clara',
        desc: 'Articulada e nítida (Lily)'
    },
    {
        id: 'calma',
        name: 'Calma',
        desc: 'Ritmo sereno (Alice)'
    }
];
function VoiceAiSettingsSheet({ keys, status, voiceProfile, voiceRate, onSaveKeys, onChangeVoiceProfile, onToggleRate, onTestVoice, onClose }) {
    _s();
    const [elevenKey, setElevenKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(keys.elevenLabsKey ?? '');
    const [elevenVoiceId, setElevenVoiceId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(keys.elevenLabsVoiceId ?? '');
    const [geminiKey, setGeminiKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(keys.geminiKey ?? '');
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [savedOk, setSavedOk] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSave = async (e)=>{
        e.preventDefault();
        setSaving(true);
        await onSaveKeys({
            elevenLabsKey: elevenKey.trim(),
            elevenLabsVoiceId: elevenVoiceId.trim(),
            geminiKey: geminiKey.trim()
        });
        setSaving(false);
        setSavedOk(true);
        setTimeout(()=>setSavedOk(false), 2200);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "ai-settings-title",
        className: "fixed inset-0 z-50 bg-[#1C1917]/45 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-0 sm:p-4",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            onClick: (e)=>e.stopPropagation(),
            className: "w-full max-w-[430px] max-h-[90dvh] overflow-y-auto bg-[#F6F4EF] rounded-t-[32px] sm:rounded-[32px] p-5 pb-8 shadow-2xl animate-sheet-up space-y-5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    id: "ai-settings-title",
                                    className: "text-[20px] font-bold text-[#1C1917]",
                                    children: "Voz Humana & IA"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[13px] text-[#6B6560]",
                                    children: "Conecte ElevenLabs e Gemini para voz 100% natural e leitura de receitas"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onClose,
                            "aria-label": "Fechar configurações",
                            className: "w-9 h-9 rounded-full bg-white text-[#57534E] hover:bg-[#EAE4D9] inline-flex items-center justify-center cursor-pointer",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                            lineNumber: 77,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "bg-white rounded-[24px] p-4 border border-black/[0.05] space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[14px] font-bold text-[#1C1917] flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
                                            className: "w-4 h-4 text-[#146356]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                            lineNumber: 91,
                                            columnNumber: 15
                                        }, this),
                                        "Tom da voz brasileira"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                    lineNumber: 90,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onToggleRate,
                                    className: "px-3 py-1 rounded-full bg-[#F3EFE8] text-[12px] font-semibold text-[#1C1917] cursor-pointer",
                                    children: voiceRate === 'slow' ? 'Ritmo: Calmo (0.85×)' : 'Ritmo: Normal (1×)'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                    lineNumber: 94,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-3 gap-2",
                            children: VOICE_PROFILES.map((vp)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>onChangeVoiceProfile(vp.id),
                                    className: `p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${voiceProfile === vp.id ? 'border-[#146356] bg-[#E6F2EF]' : 'border-black/[0.06] bg-[#FAF9F6]'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[13px] font-bold text-[#1C1917]",
                                            children: vp.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                            lineNumber: 115,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] text-[#6B6560] mt-0.5 leading-tight",
                                            children: vp.desc
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                            lineNumber: 116,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, vp.id, true, {
                                    fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                    lineNumber: 105,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>onTestVoice({
                                    elevenLabsKey: elevenKey.trim(),
                                    elevenLabsVoiceId: elevenVoiceId.trim(),
                                    geminiKey: geminiKey.trim()
                                }, voiceProfile),
                            className: "w-full py-2.5 px-4 rounded-full bg-[#146356] hover:bg-[#0F4F45] text-white text-[13.5px] font-semibold inline-flex items-center justify-center gap-2 cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                    className: "w-4 h-4 fill-current"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                    lineNumber: 135,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Ouvir teste de voz agora"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                    lineNumber: 136,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSave,
                    className: "space-y-3.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-[24px] p-4 border border-black/[0.05] space-y-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "el-key",
                                            className: "text-[14px] font-bold text-[#1C1917]",
                                            children: "1. ElevenLabs (Voz Humana)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                            lineNumber: 145,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-[11.5px] font-semibold px-2.5 py-0.5 rounded-full ${status.elevenLabsConnected || elevenKey.trim() ? 'bg-[#E6F2EF] text-[#146356]' : 'bg-[#F3EFE8] text-[#78716C]'}`,
                                            children: status.elevenLabsSource === 'env' ? 'Ativa (.env)' : elevenKey.trim() ? 'Conectada' : 'Opcional'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                            lineNumber: 148,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                    lineNumber: 144,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "el-key",
                                    type: "password",
                                    value: elevenKey,
                                    onChange: (e)=>setElevenKey(e.target.value),
                                    placeholder: "sk_... (cole sua chave ElevenLabs)",
                                    className: "w-full px-3.5 py-2.5 rounded-xl bg-[#F6F4EF] text-[13.5px] text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#146356]/30"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                    lineNumber: 162,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: elevenVoiceId,
                                    onChange: (e)=>setElevenVoiceId(e.target.value),
                                    placeholder: "ID de voz personalizado (opcional)",
                                    "aria-label": "ID de voz ElevenLabs opcional",
                                    className: "w-full px-3.5 py-2 rounded-xl bg-[#F6F4EF] text-[12.5px] text-[#57534E] focus:outline-none"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                    lineNumber: 170,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                            lineNumber: 143,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-[24px] p-4 border border-black/[0.05] space-y-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "gm-key",
                                            className: "text-[14px] font-bold text-[#1C1917] flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                    className: "w-4 h-4 text-[#146356]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                                    lineNumber: 184,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "2. Google Gemini (Receitas + Qualquer Remédio)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                            lineNumber: 183,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-[11.5px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${status.geminiConnected || geminiKey.trim() ? 'bg-[#E6F2EF] text-[#146356]' : 'bg-[#F3EFE8] text-[#78716C]'}`,
                                            children: status.geminiSource === 'env' ? 'Ativo (.env)' : geminiKey.trim() ? 'Conectado' : 'Opcional'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                            lineNumber: 187,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                    lineNumber: 182,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "gm-key",
                                    type: "password",
                                    value: geminiKey,
                                    onChange: (e)=>setGeminiKey(e.target.value),
                                    placeholder: "AIza... (cole sua chave Gemini)",
                                    className: "w-full px-3.5 py-2.5 rounded-xl bg-[#F6F4EF] text-[13.5px] text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#146356]/30"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                    lineNumber: 201,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[12px] text-[#78716C] leading-relaxed",
                                    children: "Libera leitura de receitas manuscritas, busca de qualquer remédio do Brasil, dúvidas por voz e voz neural Gemini (se ElevenLabs não estiver conectada)."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                    lineNumber: 209,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                            lineNumber: 181,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: saving,
                            className: "w-full py-3.5 rounded-full bg-[#1C1917] hover:bg-[#292524] text-white font-semibold text-[15px] inline-flex items-center justify-center gap-2 cursor-pointer",
                            children: [
                                saving ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "w-4 h-4 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                    lineNumber: 220,
                                    columnNumber: 15
                                }, this) : savedOk ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                    lineNumber: 222,
                                    columnNumber: 15
                                }, this) : null,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: savedOk ? 'Chaves salvas!' : 'Salvar configurações'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                    lineNumber: 224,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                            lineNumber: 214,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[11.5px] text-center text-[#78716C]",
                            children: [
                                "Para deploy em produção (Vercel), você também pode definir ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                    children: "ELEVENLABS_API_KEY"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                    lineNumber: 228,
                                    columnNumber: 72
                                }, this),
                                " e ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                    children: "GEMINI_API_KEY"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                    lineNumber: 228,
                                    columnNumber: 106
                                }, this),
                                " no arquivo ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                    children: ".env.local"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                                    lineNumber: 228,
                                    columnNumber: 145
                                }, this),
                                "."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                            lineNumber: 227,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
                    lineNumber: 141,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
            lineNumber: 64,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/VoiceAiSettingsSheet.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_s(VoiceAiSettingsSheet, "9gzwlym78A7EGB/Wjx80nsAkpQw=");
_c = VoiceAiSettingsSheet;
var _c;
__turbopack_context__.k.register(_c, "VoiceAiSettingsSheet");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/VoiceGuidedOverlay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VoiceGuidedOverlay",
    ()=>VoiceGuidedOverlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/camera.js [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.js [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic-off.js [app-client] (ecmascript) <export default as MicOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-2.js [app-client] (ecmascript) <export default as Volume2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$aiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/aiClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/voiceEngine.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function VoiceGuidedOverlay({ nextDose, playback, onSpeak, onStopSpeaking, onOpenCameraAdd, onMarkDoseTaken, onCloseGuidedMode }) {
    _s();
    const [listening, setListening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [thinking, setThinking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastSpokenAnswer, setLastSpokenAnswer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const welcomePrompt = nextDose ? `Olá! Estou com você. Seu próximo remédio é ${nextDose.medication?.name ?? 'seu medicamento'}, às ${nextDose.scheduledTime}. Toque no botão grande da câmera para mostrar uma receita, no botão do relógio para marcar que tomou, ou no microfone para me fazer qualquer pergunta.` : 'Olá! Estou com você. Toque no botão grande da câmera para mostrar a foto do seu remédio ou receita, ou toque no microfone para me fazer qualquer pergunta.';
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VoiceGuidedOverlay.useEffect": ()=>{
            onSpeak('guided-welcome', welcomePrompt);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["VoiceGuidedOverlay.useEffect"], []);
    const handleVoiceAsk = ()=>{
        if (listening) {
            setListening(false);
            return;
        }
        onStopSpeaking();
        setListening(true);
        setLastSpokenAnswer(null);
        const stop = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$voiceEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voiceEngine"].startListening({
            onResult: async (transcript)=>{
                setListening(false);
                setThinking(true);
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$aiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["askPharmacistAi"])({
                    question: transcript
                });
                setThinking(false);
                setLastSpokenAnswer(res.answer);
                onSpeak('guided-answer', res.answer);
            },
            onError: (msg)=>{
                setListening(false);
                setLastSpokenAnswer(msg);
                onSpeak('guided-err', msg);
            },
            onEnd: ()=>{
                setListening(false);
            }
        });
        if (!stop) setListening(false);
    };
    const isSpeaking = playback.status === 'playing' || playback.status === 'loading';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "px-5 pt-4 pb-10 min-h-[calc(100dvh-76px)] flex flex-col justify-between gap-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center text-center pt-4 space-y-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            if (isSpeaking) onStopSpeaking();
                            else onSpeak('guided-welcome', welcomePrompt);
                        },
                        "aria-label": "Ouvir orientação por voz",
                        className: `w-28 h-28 rounded-full flex items-center justify-center text-white shadow-xl transition-all cursor-pointer ${listening ? 'bg-[#BE123C] ring-[12px] ring-[#BE123C]/20 animate-pulse' : 'bg-[#146356] animate-calm-breathe'}`,
                        children: thinking || playback.status === 'loading' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "w-11 h-11 animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                            lineNumber: 96,
                            columnNumber: 13
                        }, this) : listening ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                            className: "w-11 h-11"
                        }, void 0, false, {
                            fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                            lineNumber: 98,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
                            className: "w-11 h-11"
                        }, void 0, false, {
                            fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                            lineNumber: 100,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5 max-w-[300px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-[24px] font-bold text-[#1C1917] leading-snug",
                                children: listening ? 'Pode falar, estou ouvindo...' : thinking ? 'Pensando na melhor resposta...' : isSpeaking ? 'Estou falando com você' : 'Como posso te ajudar?'
                            }, void 0, false, {
                                fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this),
                            lastSpokenAnswer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[15px] text-[#57534E] leading-relaxed pt-1",
                                children: lastSpokenAnswer
                            }, void 0, false, {
                                fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                                lineNumber: 115,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            onStopSpeaking();
                            onOpenCameraAdd();
                        },
                        className: "w-full p-5 rounded-[26px] bg-white border border-black/[0.06] shadow-[0_6px_24px_rgba(28,25,23,0.05)] flex items-center gap-4 text-left active:scale-[0.99] transition-all cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-16 h-16 rounded-[20px] bg-[#E6F2EF] text-[#146356] flex items-center justify-center shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                    className: "w-8 h-8 stroke-[2]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                                    lineNumber: 133,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[19px] font-bold text-[#1C1917]",
                                        children: "Mostrar remédio"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                                        lineNumber: 136,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[14px] text-[#6B6560]",
                                        children: "Foto da caixa ou receita"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                                        lineNumber: 137,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            if (nextDose) {
                                onMarkDoseTaken(nextDose);
                                onSpeak('guided-taken', `Muito bem! Marquei que você tomou ${nextDose.medication?.name ?? 'seu remédio'} agora.`);
                            } else {
                                onSpeak('guided-none', 'Você já tomou todos os seus remédios programados para hoje.');
                            }
                        },
                        className: "w-full p-5 rounded-[26px] bg-[#E8F4EE] border border-[#146356]/15 flex items-center gap-4 text-left active:scale-[0.99] transition-all cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-16 h-16 rounded-[20px] bg-[#146356] text-white flex items-center justify-center shrink-0",
                                children: nextDose ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                    className: "w-8 h-8 stroke-[2.5]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                                    lineNumber: 157,
                                    columnNumber: 25
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                    className: "w-8 h-8"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                                    lineNumber: 157,
                                    columnNumber: 70
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[19px] font-bold text-[#0F4F45] truncate",
                                        children: nextDose ? `Tomei ${nextDose.medication?.name ?? ''}` : 'Tudo certinho hoje'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                                        lineNumber: 160,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[14px] text-[#146356]",
                                        children: nextDose ? `Horário das ${nextDose.scheduledTime}` : 'Nenhum remédio pendente'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                                        lineNumber: 163,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: handleVoiceAsk,
                        className: "w-full p-5 rounded-[26px] bg-white border border-black/[0.06] shadow-[0_6px_24px_rgba(28,25,23,0.05)] flex items-center gap-4 text-left active:scale-[0.99] transition-all cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `w-16 h-16 rounded-[20px] flex items-center justify-center shrink-0 ${listening ? 'bg-[#BE123C] text-white' : 'bg-[#FEF3DD] text-[#B45309]'}`,
                                children: listening ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__["MicOff"], {
                                    className: "w-8 h-8"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                                    lineNumber: 179,
                                    columnNumber: 26
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                    className: "w-8 h-8 stroke-[2]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                                    lineNumber: 179,
                                    columnNumber: 59
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[19px] font-bold text-[#1C1917]",
                                        children: listening ? 'Parar de ouvir' : 'Falar minha dúvida'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                                        lineNumber: 182,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[14px] text-[#6B6560]",
                                        children: "Pergunte qualquer coisa por voz"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                                        lineNumber: 185,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                        lineNumber: 169,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>{
                    onStopSpeaking();
                    onCloseGuidedMode();
                },
                className: "mx-auto py-2.5 px-5 rounded-full bg-[#EAE5DC] text-[#57534E] text-[13px] font-semibold inline-flex items-center gap-1.5 cursor-pointer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        className: "w-4 h-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Voltar para a tela normal"
                    }, void 0, false, {
                        fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                        lineNumber: 200,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/VoiceGuidedOverlay.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
_s(VoiceGuidedOverlay, "1FpxvDT5xPXzA3cLyoHGXoR8Tgw=");
_c = VoiceGuidedOverlay;
var _c;
__turbopack_context__.k.register(_c, "VoiceGuidedOverlay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/medications.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MEDICATIONS_CATALOG",
    ()=>MEDICATIONS_CATALOG,
    "MEDICATION_CATEGORIES",
    ()=>MEDICATION_CATEGORIES
]);
const MEDICATIONS_CATALOG = [
    {
        id: 'iumi',
        name: 'Iumi',
        activeIngredient: 'Drospirenona 3 mg + Etinilestradiol 0,02 mg',
        strength: '3 mg + 0,02 mg',
        manufacturer: 'Libbs',
        category: 'anticoncepcional',
        categoryLabel: 'Anticoncepcional',
        aliases: [
            'iumi',
            'yumi',
            'lumi',
            'drospirenona',
            'etinilestradiol',
            'yaz',
            'elani',
            'dalyne',
            'anticoncepcional',
            'pilula'
        ],
        pack: {
            style: 'blister-box',
            primaryColor: '#F3D1E2',
            secondaryColor: '#E8B4CF',
            accentColor: '#9D174D',
            labelText: 'IUMI',
            pillColor: '#F9A8D4',
            stripeType: 'vermelha'
        },
        purposeSimple: 'Anticoncepcional diário para evitar gravidez e regular o ciclo.',
        howToTake: {
            items: [
                {
                    icon: 'pill',
                    shortLabel: '1 por dia',
                    spokenDetail: 'Tome um comprimido por dia, sem mastigar, com um copo de água.'
                },
                {
                    icon: 'clock',
                    shortLabel: 'Mesma hora',
                    spokenDetail: 'Escolha um horário fácil e tome sempre no mesmo horário todos os dias.'
                },
                {
                    icon: 'calendar',
                    shortLabel: '24d + 4 pausa',
                    spokenDetail: 'Tome por 24 dias seguidos e faça 4 dias de pausa antes da próxima cartela.'
                }
            ],
            summary: '1 comprimido todo dia, com água.',
            spokenScript: 'Como tomar o Iumi: tome 1 comprimido por dia, sempre no mesmo horário, com água. Tome os 24 comprimidos da cartela e faça 4 dias de pausa antes de começar a próxima.',
            defaultDosage: '1 comprimido',
            defaultTimes: [
                '21:00'
            ],
            cycleNote: '24 dias tomando + 4 dias de pausa'
        },
        whatNotToDo: {
            items: [
                {
                    icon: 'no-smoking',
                    shortLabel: 'Não fumar',
                    spokenDetail: 'Fumar usando anticoncepcional aumenta o risco de trombose, principalmente acima dos 35 anos.'
                },
                {
                    icon: 'cuts-effect',
                    shortLabel: 'Corta o efeito',
                    spokenDetail: 'Alguns antibióticos, remédios de convulsão e chá de erva-de-são-joão podem cortar o efeito.'
                },
                {
                    icon: 'vomit-warning',
                    shortLabel: 'Vômito até 4h',
                    spokenDetail: 'Se vomitar ou tiver diarreia forte até 4 horas depois de tomar, o corpo pode não ter absorvido o comprimido.'
                }
            ],
            summary: 'Alguns antibióticos e chás cortam o efeito.',
            spokenScript: 'Atenção ao que não pode com o Iumi: não fume, pois aumenta o risco de trombose. Cuidado com alguns antibióticos e chá de erva-de-são-joão, que podem cortar o efeito. Se você vomitar em até 4 horas depois de tomar, pode precisar de outro comprimido.'
        },
        whatYouCanDo: {
            items: [
                {
                    icon: 'food',
                    shortLabel: 'Com ou sem comida',
                    spokenDetail: 'Pode tomar de estômago cheio ou vazio. Se der leve enjoo, tome junto com o jantar.'
                },
                {
                    icon: 'car-ok',
                    shortLabel: 'Pode dirigir',
                    spokenDetail: 'Não dá sono nem atrapalha para dirigir ou trabalhar.'
                },
                {
                    icon: 'shield-check',
                    shortLabel: 'Proteção contínua',
                    spokenDetail: 'Mesmo nos 4 dias de pausa você continua protegida, se tomou a cartela certinho.'
                }
            ],
            missedDoseTip: 'Esqueceu até 12 horas? Tome assim que lembrar e siga normal. Passou de 12 horas? Tome o esquecido, use camisinha por 7 dias e confira a bula ou fale com a farmácia.',
            onsetTime: 'Se começar no 1º dia da menstruação, protege desde o 1º dia.',
            spokenScript: 'O que pode fazer com o Iumi: pode tomar com ou sem comida e pode dirigir normalmente. Se esquecer por menos de 12 horas, tome assim que lembrar. Se passar de 12 horas, tome e use preservativo nos próximos 7 dias.'
        },
        genericsHighlight: {
            sameEffectBadge: 'Mesma proteção',
            switchWarningShort: 'Atenção na troca: revestimento diferente pode dar inchaço',
            spokenScript: 'Sobre genéricos do Iumi: eles têm a mesma proteção contra gravidez e custam bem menos. Porém, atenção na troca: o revestimento do comprimido e os excipientes podem ser diferentes, mudando a velocidade de absorção. Em algumas mulheres isso causa mais inchaço, dor de cabeça ou sensibilidade nos seios que não tinham com o original.'
        },
        equivalents: [
            {
                id: 'iumi-ref',
                name: 'Iumi (Original / Referência)',
                lab: 'Libbs',
                type: 'referencia',
                bioequivalent: true,
                basePriceMin: 66,
                basePriceMax: 84,
                coatingOrTech: 'Película revestida fina de liberação padrão Libbs',
                excipients: {
                    hasLactose: true,
                    hasDyes: true,
                    keyNotes: 'Contém lactose monoidratada e revestimento polimérico específico (álcool polivinílico/macrogol).'
                },
                absorptionNote: 'Curva de absorção de referência usada como padrão para o corpo que já está adaptado ao Iumi.',
                switchingEffects: [],
                switchVerdict: {
                    level: 'tranquila',
                    headline: 'Sua referência atual',
                    explanation: 'Se você já se adaptou bem ao Iumi sem inchaço, este é o padrão de revestimento que seu corpo conhece.'
                },
                spokenSummary: 'Iumi da Libbs é o medicamento de referência. É o padrão de comparação para os genéricos e similares.'
            },
            {
                id: 'iumi-gen-ems',
                name: 'Drospirenona + Etinilestradiol (Genérico)',
                lab: 'EMS',
                type: 'generico',
                bioequivalent: true,
                basePriceMin: 30,
                basePriceMax: 42,
                coatingOrTech: 'Revestimento polimérico alternativo (película diferente da Libbs)',
                excipients: {
                    hasLactose: true,
                    hasDyes: true,
                    keyNotes: 'Contém lactose e excipientes aglutinantes/revestimento diferentes do Iumi original.'
                },
                absorptionNote: 'Bioequivalente pela ANVISA (mesma eficácia contraceptiva), mas o pico de absorção pode variar levemente dentro da faixa permitida (80% a 125%).',
                switchingEffects: [
                    {
                        symptom: 'Inchaço e retenção de líquido',
                        why: 'O revestimento diferente muda o ritmo de absorção da drospirenona e do estrogênio, o que pode gerar retenção de líquido em mulheres sensíveis que não inchavam com o Iumi.',
                        likelihood: 'comum',
                        icon: 'bloating'
                    },
                    {
                        symptom: 'Sensibilidade nos seios ou dor de cabeça na adaptação',
                        why: 'Oscilação leve no pico hormonal nas primeiras 1 a 3 cartelas após trocar de fabricante.',
                        likelihood: 'ocasional',
                        icon: 'headache'
                    }
                ],
                switchVerdict: {
                    level: 'atencao',
                    headline: 'Mesma proteção, mas observe inchaço na troca',
                    explanation: 'Protege igual contra gravidez e economiza bastante. Porém, por ter revestimento e excipientes diferentes, algumas mulheres sentem inchaço ou dor de cabeça que não tinham com o Iumi.'
                },
                spokenSummary: 'Genérico da EMS: tem a mesma proteção contra gravidez e preço bem menor. Mas atenção: o revestimento do comprimido é diferente do Iumi, o que muda um pouco a absorção e pode causar inchaço ou dor de cabeça em quem troca.'
            },
            {
                id: 'iumi-gen-medley',
                name: 'Drospirenona + Etinilestradiol (Genérico)',
                lab: 'Medley',
                type: 'generico',
                bioequivalent: true,
                basePriceMin: 34,
                basePriceMax: 48,
                coatingOrTech: 'Comprimido revestido com película à base de hipromelose',
                excipients: {
                    hasLactose: true,
                    hasDyes: true,
                    keyNotes: 'Excipientes e corantes próprios da linha Medley; contém lactose.'
                },
                absorptionNote: 'Bioequivalente comprovado pela ANVISA. Costuma ter liberação um pouco mais gradual, mas ainda diferente da película do Iumi.',
                switchingEffects: [
                    {
                        symptom: 'Inchaço leve nas pernas ou barriga',
                        why: 'Diferença de excipientes e velocidade de desintegração no estômago em comparação ao original.',
                        likelihood: 'ocasional',
                        icon: 'bloating'
                    },
                    {
                        symptom: 'Leve enjoo se tomado em jejum',
                        why: 'A película diferente dissolve em tempo distinto no estômago vazio.',
                        likelihood: 'ocasional',
                        icon: 'stomach-ache'
                    }
                ],
                switchVerdict: {
                    level: 'atencao',
                    headline: 'Boa economia, atenção aos primeiros ciclos',
                    explanation: 'Mesma eficácia contraceptiva. Se notar inchaço persistente após trocar, vale avisar sua ginecologista ou manter sempre a mesma marca que seu corpo tolera melhor.'
                },
                spokenSummary: 'Genérico da Medley: mesma proteção contra gravidez. A película de revestimento é diferente do Iumi original, podendo causar leve inchaço ou enjoo em jejum durante a troca.'
            },
            {
                id: 'iumi-sim-yaz',
                name: 'Yaz (Referência internacional)',
                lab: 'Bayer',
                type: 'similar',
                bioequivalent: true,
                basePriceMin: 78,
                basePriceMax: 98,
                coatingOrTech: 'Tecnologia original Bayer com película de dissolução rápida',
                excipients: {
                    hasLactose: true,
                    hasDyes: true,
                    keyNotes: 'Contém lactose e óxido de ferro rosa. Possui exatamente a mesma dosagem 3 mg + 0,02 mg em 24 comprimidos.'
                },
                absorptionNote: 'Perfil de absorção muito consistente e próximo ao Iumi.',
                switchingEffects: [
                    {
                        symptom: 'Quase sem diferenças na troca',
                        why: 'Ambas são marcas consolidadas com controle rígido de dissolução; raramente provoca alteração perceptível.',
                        likelihood: 'raro',
                        icon: 'shield-check'
                    }
                ],
                switchVerdict: {
                    level: 'tranquila',
                    headline: 'Troca muito bem tolerada, porém mais cara',
                    explanation: 'Costuma causar menos diferenças de inchaço na troca, mas o preço é mais alto que o próprio Iumi.'
                },
                spokenSummary: 'Yaz da Bayer tem a mesma fórmula do Iumi e troca muito bem tolerada, mas costuma ser mais caro.'
            }
        ]
    },
    {
        id: 'glifage-xr',
        name: 'Glifage XR',
        activeIngredient: 'Cloridrato de Metformina 500 mg (Liberação Prolongada)',
        strength: '500 mg XR',
        manufacturer: 'Merck',
        category: 'diabetes',
        categoryLabel: 'Diabetes',
        aliases: [
            'glifage',
            'glifage xr',
            'glifaji',
            'metformina',
            'metformina xr',
            'diabetes',
            'acucar no sangue',
            'glicemia'
        ],
        pack: {
            style: 'blister-box',
            primaryColor: '#DBEAFE',
            secondaryColor: '#93C5FD',
            accentColor: '#1E40AF',
            labelText: 'GLIFAGE XR',
            pillColor: '#FFFFFF',
            stripeType: 'vermelha'
        },
        purposeSimple: 'Controla o açúcar no sangue (diabetes tipo 2) liberando o remédio devagar.',
        howToTake: {
            items: [
                {
                    icon: 'food',
                    shortLabel: 'Com o jantar',
                    spokenDetail: 'Tome junto com a refeição da noite para proteger o estômago.'
                },
                {
                    icon: 'no-crush',
                    shortLabel: 'Não partir',
                    spokenDetail: 'Engula inteiro. Nunca parta, amasse ou mastigue o comprimido XR.'
                },
                {
                    icon: 'water',
                    shortLabel: 'Com água',
                    spokenDetail: 'Engula com um copo cheio de água.'
                }
            ],
            summary: 'Engula inteiro, junto com o jantar, com água.',
            spokenScript: 'Como tomar o Glifage XR: engula o comprimido inteiro junto com o jantar, com água. Nunca parta nem mastigue o comprimido, porque ele tem uma camada especial para liberar devagar.',
            defaultDosage: '1 comprimido (500 mg XR)',
            defaultTimes: [
                '20:00'
            ]
        },
        whatNotToDo: {
            items: [
                {
                    icon: 'no-alcohol',
                    shortLabel: 'Sem álcool',
                    spokenDetail: 'Evite bebidas alcoólicas em excesso, pois podem causar queda perigosa de açúcar ou mal-estar grave.'
                },
                {
                    icon: 'no-crush',
                    shortLabel: 'Não mastigar',
                    spokenDetail: 'Se quebrar o comprimido XR, ele libera tudo de uma vez e dá muita diarreia.'
                },
                {
                    icon: 'doctor',
                    shortLabel: 'Exame c/ contraste',
                    spokenDetail: 'Avise o médico antes de fazer tomografia ou exame com contraste na veia.'
                }
            ],
            summary: 'Não parta o comprimido e evite álcool.',
            spokenScript: 'O que não pode com Glifage XR: não parta nem mastigue o comprimido. Evite bebidas alcoólicas e avise o médico antes de qualquer exame com contraste.'
        },
        whatYouCanDo: {
            items: [
                {
                    icon: 'stomach-ok',
                    shortLabel: 'Mais suave',
                    spokenDetail: 'A versão XR agride bem menos o intestino do que a metformina comum.'
                },
                {
                    icon: 'car-ok',
                    shortLabel: 'Pode dirigir',
                    spokenDetail: 'Usado sozinho, raramente causa queda brusca de açúcar.'
                },
                {
                    icon: 'heart-check',
                    shortLabel: 'Uso contínuo',
                    spokenDetail: 'Não pare por conta própria mesmo se a glicemia melhorar.'
                }
            ],
            missedDoseTip: 'Se esqueceu no jantar, tome se ainda estiver perto do horário. Se já for no dia seguinte, pule e tome normal à noite. Nunca tome dois de uma vez.',
            onsetTime: 'Começa a agir no 1º dia, com controle completo em cerca de 2 semanas.',
            spokenScript: 'O que pode com Glifage XR: pode dirigir e manter sua rotina normal. Se esquecer uma dose e já estiver perto da próxima, não dobre a quantidade.'
        },
        genericsHighlight: {
            sameEffectBadge: 'Mesmo controle',
            switchWarningShort: 'Atenção na troca: matriz XR diferente pode dar diarreia e gases',
            spokenScript: 'Sobre genéricos do Glifage XR: existe metformina grátis na Farmácia Popular, mas atenção! Se você usa o XR e trocar pela metformina comum ou por um XR de matriz diferente, pode sentir diarreia, gases e dor de barriga que não tinha no original.'
        },
        equivalents: [
            {
                id: 'glifage-ref',
                name: 'Glifage XR (Original / Referência)',
                lab: 'Merck',
                type: 'referencia',
                bioequivalent: true,
                basePriceMin: 24,
                basePriceMax: 38,
                coatingOrTech: 'Matriz patenteada GelShield XR (liberação bem lenta e uniforme)',
                excipients: {
                    hasLactose: false,
                    hasDyes: false,
                    keyNotes: 'Sem lactose e sem corantes. Forma um gel no estômago que solta o remédio aos poucos.'
                },
                absorptionNote: 'Liberação lenta controlada que evita picos no intestino — por isso dá muito menos diarreia.',
                switchingEffects: [],
                switchVerdict: {
                    level: 'tranquila',
                    headline: 'Padrão de conforto intestinal',
                    explanation: 'A tecnologia GelShield XR da Merck costuma ser a mais bem tolerada pelo estômago e intestino.'
                },
                spokenSummary: 'Glifage XR da Merck usa tecnologia especial de gel que libera devagar e protege o intestino.'
            },
            {
                id: 'glifage-gen-xr',
                name: 'Metformina 500 mg XR (Genérico Prolongado)',
                lab: 'EMS / Medley',
                type: 'generico',
                bioequivalent: true,
                basePriceMin: 12,
                basePriceMax: 21,
                coatingOrTech: 'Matriz polimérica alternativa de liberação prolongada',
                excipients: {
                    hasLactose: false,
                    hasDyes: false,
                    keyNotes: 'Usa outro tipo de polímero para segurar a liberação do remédio.'
                },
                absorptionNote: 'Bioequivalente na quantidade absorvida, mas o ritmo de liberação no intestino pode ser um pouco mais rápido em algumas pessoas.',
                switchingEffects: [
                    {
                        symptom: 'Gases, cólica ou fezes mais moles',
                        why: 'A matriz polimérica diferente pode liberar parte da metformina antes do previsto no intestino.',
                        likelihood: 'ocasional',
                        icon: 'stomach-ache'
                    },
                    {
                        symptom: 'Gosto metálico na boca',
                        why: 'Pequena variação no pico plasmático logo após o jantar.',
                        likelihood: 'raro',
                        icon: 'taste'
                    }
                ],
                switchVerdict: {
                    level: 'atencao',
                    headline: 'Confira sempre se a caixa diz XR',
                    explanation: 'Boa economia e funciona igual no açúcar. Apenas observe se o intestino fica mais solto na primeira semana.'
                },
                spokenSummary: 'Genérico Metformina XR: controla o açúcar igual e é mais barato. Como o material de liberação lenta é diferente do Glifage XR, algumas pessoas sentem gases ou dor de barriga leve ao trocar.'
            },
            {
                id: 'glifage-sus-comum',
                name: 'Metformina 500 mg Comum (NÃO é XR)',
                lab: 'Farmácia Popular / SUS',
                type: 'generico',
                bioequivalent: false,
                farmaciaPopularFree: true,
                basePriceMin: 0,
                basePriceMax: 10,
                coatingOrTech: 'Liberação IMEDIATA (sem camada prolongada)',
                excipients: {
                    hasLactose: false,
                    hasDyes: false,
                    keyNotes: 'ATENÇÃO: Não é intercambiável automaticamente com o XR sem falar com o médico.'
                },
                absorptionNote: 'Solta todo o remédio de uma vez no estômago e intestino (pico rápido).',
                switchingEffects: [
                    {
                        symptom: 'Diarreia forte, enjoo e dor de barriga',
                        why: 'Por não ter a tecnologia XR de liberação lenta, irrita muito mais o intestino em quem estava acostumado ao Glifage XR.',
                        likelihood: 'comum',
                        icon: 'stomach-ache'
                    }
                ],
                switchVerdict: {
                    level: 'cuidado_medico',
                    headline: 'Grátis na Farmácia Popular, mas NÃO é XR',
                    explanation: 'É a mesma molécula e sai de graça pelo SUS/Farmácia Popular, mas libera rápido e costuma dar muita diarreia se trocar sem ajustar com o médico.'
                },
                spokenSummary: 'Atenção: a Metformina comum gratuita na Farmácia Popular não é XR. Ela libera tudo de uma vez e costuma causar diarreia e enjoo em quem estava usando Glifage XR. Converse com o médico antes de trocar.'
            }
        ]
    },
    {
        id: 'losartana',
        name: 'Aradois / Losartana',
        activeIngredient: 'Losartana Potássica 50 mg',
        strength: '50 mg',
        manufacturer: 'Biolab / MSD (Cozaar)',
        category: 'pressao',
        categoryLabel: 'Pressão Alta',
        aliases: [
            'losartana',
            'losartan',
            'aradois',
            'cozaar',
            'pressao',
            'pressao alta',
            'hipertensao'
        ],
        pack: {
            style: 'blister-box',
            primaryColor: '#DCFCE7',
            secondaryColor: '#86EFAC',
            accentColor: '#166534',
            labelText: 'LOSARTANA',
            pillColor: '#FFFFFF',
            stripeType: 'vermelha'
        },
        purposeSimple: 'Baixa e controla a pressão alta, protegendo o coração e os rins.',
        howToTake: {
            items: [
                {
                    icon: 'pill',
                    shortLabel: '1 por dia',
                    spokenDetail: 'Tome a dose receitada pelo médico, geralmente 1 vez ao dia.'
                },
                {
                    icon: 'clock',
                    shortLabel: 'Mesma hora',
                    spokenDetail: 'Tome sempre no mesmo horário, de preferência pela manhã.'
                },
                {
                    icon: 'heart-check',
                    shortLabel: 'Todos os dias',
                    spokenDetail: 'Mesmo se a pressão estiver boa hoje, continue tomando todos os dias.'
                }
            ],
            summary: '1 comprimido todo dia, mesmo sem sentir nada.',
            spokenScript: 'Como tomar Losartana: tome todos os dias no mesmo horário, com água, mesmo que você esteja se sentindo bem e com a pressão boa.',
            defaultDosage: '1 comprimido (50 mg)',
            defaultTimes: [
                '08:00'
            ]
        },
        whatNotToDo: {
            items: [
                {
                    icon: 'pregnant-no',
                    shortLabel: 'Proibido grávida',
                    spokenDetail: 'Nunca use se estiver grávida ou suspeitar de gravidez. Avise o médico imediatamente.'
                },
                {
                    icon: 'cuts-effect',
                    shortLabel: 'Evitar anti-infl.',
                    spokenDetail: 'Anti-inflamatórios como ibuprofeno e diclofenaco podem atrapalhar o controle da pressão e forçar os rins.'
                },
                {
                    icon: 'no-alcohol',
                    shortLabel: 'Cuidado álcool',
                    spokenDetail: 'Bebida alcoólica pode baixar demais a pressão e dar tontura ao levantar.'
                }
            ],
            summary: 'Proibido na gravidez. Evite anti-inflamatórios sem receita.',
            spokenScript: 'O que não pode com Losartana: é proibida na gravidez. Evite tomar anti-inflamatórios por conta própria porque cortam o efeito na pressão, e cuidado com bebidas alcoólicas que podem causar tontura.'
        },
        whatYouCanDo: {
            items: [
                {
                    icon: 'food',
                    shortLabel: 'Com ou sem comida',
                    spokenDetail: 'Pode tomar antes ou depois do café da manhã.'
                },
                {
                    icon: 'water',
                    shortLabel: 'Beber água',
                    spokenDetail: 'Manter boa hidratação ajuda os rins e evita tontura.'
                },
                {
                    icon: 'shield-check',
                    shortLabel: 'Grátis no SUS',
                    spokenDetail: 'Disponível gratuitamente na Farmácia Popular com receita e CPF.'
                }
            ],
            missedDoseTip: 'Esqueceu de manhã? Tome assim que lembrar no mesmo dia. Se já for quase a hora do dia seguinte, pule. Nunca tome 2 juntos.',
            onsetTime: 'Começa a baixar em horas, mas o efeito máximo leva de 3 a 6 semanas.',
            spokenScript: 'O que pode com Losartana: pode tomar com ou sem café da manhã. Esse remédio está disponível de graça na Farmácia Popular.'
        },
        genericsHighlight: {
            sameEffectBadge: 'Grátis na Farmácia Popular',
            switchWarningShort: 'Troca segura: diferença costuma ser só amargor ou lactose',
            spokenScript: 'Sobre genéricos da Losartana: a troca é muito segura e existem opções gratuitas na Farmácia Popular. A principal diferença entre marcas é o revestimento mais fino que deixa gosto amargo e a presença de lactose em alguns laboratórios.'
        },
        equivalents: [
            {
                id: 'losartana-ref',
                name: 'Cozaar / Aradois (Referência)',
                lab: 'Organon / Biolab',
                type: 'referencia',
                bioequivalent: true,
                basePriceMin: 34,
                basePriceMax: 52,
                coatingOrTech: 'Comprimido revestido liso (mascara bem o gosto amargo)',
                excipients: {
                    hasLactose: true,
                    hasDyes: false,
                    keyNotes: 'Contém lactose; revestimento firme fácil de engolir.'
                },
                absorptionNote: 'Absorção regular de referência para controle de 24 horas.',
                switchingEffects: [],
                switchVerdict: {
                    level: 'tranquila',
                    headline: 'Referência de mercado',
                    explanation: 'Comprimido liso, fácil de engolir e sem gosto amargo imediato.'
                },
                spokenSummary: 'Cozaar e Aradois são as marcas de referência de Losartana.'
            },
            {
                id: 'losartana-gen-medley',
                name: 'Losartana Potássica 50 mg (Genérico)',
                lab: 'Medley / EMS',
                type: 'generico',
                bioequivalent: true,
                farmaciaPopularFree: true,
                basePriceMin: 0,
                basePriceMax: 12,
                coatingOrTech: 'Película mais fina; alguns lotes são mais quebradiços',
                excipients: {
                    hasLactose: true,
                    hasDyes: false,
                    keyNotes: 'Contém lactose. Disponível de graça na Farmácia Popular com receita válida.'
                },
                absorptionNote: 'Bioequivalente ANVISA com excelente equivalência clínica no controle da pressão.',
                switchingEffects: [
                    {
                        symptom: 'Gosto amargo na boca se demorar a engolir',
                        why: 'O revestimento mais fino dissolve mais rápido na língua.',
                        likelihood: 'ocasional',
                        icon: 'taste'
                    },
                    {
                        symptom: 'Leve tontura ao levantar nos primeiros dias',
                        why: 'Pequena variação no pico inicial de absorção ao trocar de fabricante.',
                        likelihood: 'raro',
                        icon: 'dizziness'
                    }
                ],
                switchVerdict: {
                    level: 'tranquila',
                    headline: 'Troca segura e grátis na Farmácia Popular',
                    explanation: 'Protege o coração igual ao original. A única diferença comum é um leve gosto amargo se não engolir rápido com água.'
                },
                spokenSummary: 'Genérico da Losartana: troca muito segura, protege a pressão igual e sai de graça na Farmácia Popular. A única diferença comum é um gosto um pouco mais amargo se demorar para engolir.'
            },
            {
                id: 'losartana-gen-neo',
                name: 'Losartana Potássica 50 mg (Genérico)',
                lab: 'Neo Química',
                type: 'generico',
                bioequivalent: true,
                farmaciaPopularFree: true,
                basePriceMin: 0,
                basePriceMax: 10,
                coatingOrTech: 'Revestimento simples com dióxido de titânio',
                excipients: {
                    hasLactose: true,
                    hasDyes: false,
                    keyNotes: 'Contém lactose e amido. Grátis pelo programa Farmácia Popular.'
                },
                absorptionNote: 'Mesma eficácia na pressão arterial. Meça a pressão nos primeiros dias se mudar de marca.',
                switchingEffects: [
                    {
                        symptom: 'Comprimido mais áspero ao engolir',
                        why: 'Revestimento menos polido em comparação ao Cozaar.',
                        likelihood: 'ocasional',
                        icon: 'taste'
                    }
                ],
                switchVerdict: {
                    level: 'tranquila',
                    headline: 'Opção econômica e bioequivalente',
                    explanation: 'Funciona igual. Tome com bastante água para descer facilmente.'
                },
                spokenSummary: 'Losartana Neo Química: gratuita na Farmácia Popular e funciona igual ao original. Tome com bastante água porque o comprimido pode ser um pouco mais áspero.'
            }
        ]
    },
    {
        id: 'losec-mups',
        name: 'Losec MUPS',
        activeIngredient: 'Omeprazol Magnésico 20 mg',
        strength: '20 mg',
        manufacturer: 'AstraZeneca',
        category: 'estomago',
        categoryLabel: 'Estômago',
        aliases: [
            'losec',
            'losec mups',
            'omeprazol',
            'peprazol',
            'gastrite',
            'azia',
            'refluxo',
            'estomago'
        ],
        pack: {
            style: 'capsule-box',
            primaryColor: '#EDE9FE',
            secondaryColor: '#C4B5FD',
            accentColor: '#5B21B6',
            labelText: 'LOSEC MUPS',
            pillColor: '#F472B6',
            stripeType: 'vermelha'
        },
        purposeSimple: 'Diminui o ácido do estômago para tratar azia, refluxo e gastrite.',
        howToTake: {
            items: [
                {
                    icon: 'fasting',
                    shortLabel: 'Em jejum',
                    spokenDetail: 'Tome em jejum, de 30 a 60 minutos antes do café da manhã.'
                },
                {
                    icon: 'no-crush',
                    shortLabel: 'Não mastigar',
                    spokenDetail: 'Engula inteiro sem mastigar as bolinhas de dentro.'
                },
                {
                    icon: 'water',
                    shortLabel: 'Com água',
                    spokenDetail: 'Tome com meio copo de água pura, nunca com leite.'
                }
            ],
            summary: 'Em jejum, 30 minutos antes do café da manhã.',
            spokenScript: 'Como tomar Losec MUPS ou Omeprazol: tome em jejum, meia hora antes do café da manhã, com água pura e sem mastigar.',
            defaultDosage: '1 comprimido (20 mg)',
            defaultTimes: [
                '07:00'
            ]
        },
        whatNotToDo: {
            items: [
                {
                    icon: 'no-crush',
                    shortLabel: 'Não mastigar',
                    spokenDetail: 'Se mastigar, o ácido do estômago destrói o remédio antes de funcionar.'
                },
                {
                    icon: 'cuts-effect',
                    shortLabel: 'Misturar c/ remédio',
                    spokenDetail: 'Pode atrapalhar alguns remédios do coração (como clopidogrel) e de tireoide. Dê intervalo.'
                },
                {
                    icon: 'calendar',
                    shortLabel: 'Não usar anos sem médico',
                    spokenDetail: 'Uso por muitos meses sem acompanhamento pode baixar vitamina B12 e magnésio.'
                }
            ],
            summary: 'Não mastigue e não tome junto com o café da manhã.',
            spokenScript: 'O que não pode: não mastigue o comprimido ou as bolinhas da cápsula. Não tome sem acompanhamento médico por muitos meses seguidos.'
        },
        whatYouCanDo: {
            items: [
                {
                    icon: 'stomach-ok',
                    shortLabel: 'Protege o estômago',
                    spokenDetail: 'Alivia queimação e ajuda a cicatrizar a gastrite.'
                },
                {
                    icon: 'car-ok',
                    shortLabel: 'Pode dirigir',
                    spokenDetail: 'Normalmente não dá sono.'
                },
                {
                    icon: 'water',
                    shortLabel: 'MUPS dissolve na água',
                    spokenDetail: 'Diferente da cápsula, o Losec MUPS pode ser disperso em 1 colher de água se você tiver dificuldade para engolir (sem mastigar os grânulos).'
                }
            ],
            missedDoseTip: 'Esqueceu antes do café? Pode tomar antes do almoço ou jantar em jejum. Não tome 2 juntos.',
            onsetTime: 'Alívio inicial no 1º dia; efeito máximo em 3 a 5 dias.',
            spokenScript: 'O que pode com Losec MUPS: se tiver dificuldade para engolir, o Losec MUPS pode ser colocado em uma colher de água sem mastigar os grânulos.'
        },
        genericsHighlight: {
            sameEffectBadge: 'Mesmo princípio ativo',
            switchWarningShort: 'Atenção na troca: cápsula genérica pode abrir diferente e deixar azia',
            spokenScript: 'Sobre genéricos do Losec MUPS: o Omeprazol genérico em cápsula é bem mais barato, mas usa microgrânulos diferentes dos microcomprimidos do Losec MUPS. Algumas pessoas que trocam sentem azia voltando no fim do dia ou peso no estômago.'
        },
        equivalents: [
            {
                id: 'losec-ref',
                name: 'Losec MUPS (Original / Referência)',
                lab: 'AstraZeneca',
                type: 'referencia',
                bioequivalent: true,
                basePriceMin: 72,
                basePriceMax: 95,
                coatingOrTech: 'Tecnologia MUPS (milhares de microcomprimidos revestidos de liberação super uniforme)',
                excipients: {
                    hasLactose: false,
                    hasDyes: true,
                    keyNotes: 'Sem lactose; esvazia de forma uniforme do estômago para o intestino.'
                },
                absorptionNote: 'Proteção ácida muito estável por quase 24 horas mesmo em estômagos sensíveis.',
                switchingEffects: [],
                switchVerdict: {
                    level: 'tranquila',
                    headline: 'Maior estabilidade na proteção ácida',
                    explanation: 'A tecnologia MUPS protege os microgrânulos melhor contra o ácido do estômago.'
                },
                spokenSummary: 'Losec MUPS usa microcomprimidos especiais que protegem melhor o remédio do ácido do estômago.'
            },
            {
                id: 'omeprazol-gen-medley',
                name: 'Omeprazol 20 mg Cápsula (Genérico)',
                lab: 'Medley / EMS / Teuto',
                type: 'generico',
                bioequivalent: true,
                basePriceMin: 11,
                basePriceMax: 22,
                coatingOrTech: 'Cápsula de gelatina com pellets gastrorresistentes comuns',
                excipients: {
                    hasLactose: true,
                    hasDyes: true,
                    keyNotes: 'Muitos genéricos contêm sacarose, lactose e corantes na cápsula de gelatina.'
                },
                absorptionNote: 'Bioequivalente, porém o revestimento dos pellets varia entre fabricantes e pode se romper antes ou depois no estômago.',
                switchingEffects: [
                    {
                        symptom: 'Azia voltando à noite ou efeito mais curto',
                        why: 'Se parte dos pellets abrir cedo demais no estômago, o ácido destrói um pouco da dose.',
                        likelihood: 'comum',
                        icon: 'stomach-ache'
                    },
                    {
                        symptom: 'Sensação de cápsula parada ou gosto amargo',
                        why: 'A cápsula de gelatina é maior que o comprimido MUPS e gruda se tomar com pouca água.',
                        likelihood: 'ocasional',
                        icon: 'taste'
                    }
                ],
                switchVerdict: {
                    level: 'atencao',
                    headline: 'Economia enorme, observe se a azia volta à noite',
                    explanation: 'Funciona muito bem para a maioria e custa até 80% menos. Se sentir a azia voltar após trocar do Losec MUPS, vale testar outro laboratório de genérico ou conversar com o médico.'
                },
                spokenSummary: 'Omeprazol genérico em cápsula custa até 80 por cento menos. Mas como a cápsula usa bolinhas com revestimento diferente do Losec MUPS, algumas pessoas sentem azia voltar no fim do dia ao trocar.'
            }
        ]
    },
    {
        id: 'puran-t4',
        name: 'Puran T4',
        activeIngredient: 'Levotiroxina Sódica 50 mcg',
        strength: '50 mcg',
        manufacturer: 'Sanofi',
        category: 'tireoide',
        categoryLabel: 'Tireoide',
        aliases: [
            'puran',
            'puran t4',
            'puro t4',
            'levotiroxina',
            'euthyrox',
            'levoid',
            'tireoide',
            'hipotireoidismo',
            'tsh'
        ],
        pack: {
            style: 'blister-box',
            primaryColor: '#E0F2FE',
            secondaryColor: '#7DD3FC',
            accentColor: '#0369A1',
            labelText: 'PURAN T4',
            pillColor: '#FFFFFF',
            stripeType: 'vermelha'
        },
        purposeSimple: 'Repõe o hormônio da tireoide para dar energia e regular o metabolismo.',
        howToTake: {
            items: [
                {
                    icon: 'fasting',
                    shortLabel: 'Jejum rigoroso',
                    spokenDetail: 'Tome logo ao acordar, de barriga vazia, esperando 30 a 60 minutos antes do café.'
                },
                {
                    icon: 'water',
                    shortLabel: 'Só com água',
                    spokenDetail: 'Tome apenas com água pura. Café, leite ou suco atrapalham a absorção.'
                },
                {
                    icon: 'clock',
                    shortLabel: 'Mesma marca',
                    spokenDetail: 'Tome todos os dias e evite ficar trocando de marca toda hora.'
                }
            ],
            summary: 'Ao acordar, só com água, 30 a 60 min antes do café.',
            spokenScript: 'Como tomar Puran T4: tome logo ao acordar, em jejum, apenas com água pura. Espere de 30 a 60 minutos antes de tomar café ou comer.',
            defaultDosage: '1 comprimido (50 mcg)',
            defaultTimes: [
                '06:30'
            ]
        },
        whatNotToDo: {
            items: [
                {
                    icon: 'cuts-effect',
                    shortLabel: 'Sem café/leite',
                    spokenDetail: 'Café, leite, soja, cálcio, ferro e omeprazol bloqueiam a absorção se tomados juntos.'
                },
                {
                    icon: 'alert-triangle',
                    shortLabel: 'Não trocar à toa',
                    spokenDetail: 'Trocar de marca sem avisar o médico pode desregular seu exame de tireoide.'
                },
                {
                    icon: 'calendar',
                    shortLabel: 'Não parar só',
                    spokenDetail: 'Não interrompa o uso sem orientação médica.'
                }
            ],
            summary: 'Não misture com café, leite, cálcio, ferro ou omeprazol.',
            spokenScript: 'O que não pode com Puran T4: não tome junto com café, leite, cálcio, ferro ou omeprazol. E muito importante: não fique trocando de marca na farmácia sem avisar seu médico.'
        },
        whatYouCanDo: {
            items: [
                {
                    icon: 'clock',
                    shortLabel: 'Espera de 4h p/ ferro',
                    spokenDetail: 'Vitaminas com ferro ou cálcio podem ser tomadas, mas espere 4 horas depois do Puran T4.'
                },
                {
                    icon: 'car-ok',
                    shortLabel: 'Rotina normal',
                    spokenDetail: 'Depois de esperar o café da manhã, vida totalmente normal.'
                },
                {
                    icon: 'doctor',
                    shortLabel: 'Exame TSH',
                    spokenDetail: 'Se precisar mudar de marca, refaça o exame TSH após 6 a 8 semanas.'
                }
            ],
            missedDoseTip: 'Esqueceu de manhã? Se lembrar no mesmo dia longe de refeição (2h após comer), tome. Se só lembrar no outro dia, tome normal.',
            onsetTime: 'Níveis estabilizam no sangue em cerca de 4 a 6 semanas.',
            spokenScript: 'O que pode com Puran T4: pode tomar vitaminas com ferro ou cálcio, desde que espere 4 horas depois do remédio da tireoide.'
        },
        genericsHighlight: {
            sameEffectBadge: 'Atenção redobrada na troca',
            switchWarningShort: 'Cuidado na troca: pequena mudança de excipiente desregula o TSH',
            spokenScript: 'Atenção especial sobre genéricos do Puran T4: a levotiroxina é um remédio muito sensível. Pequenas diferenças nos excipientes entre marcas mudam quanto seu intestino absorve, podendo dar cansaço, coração acelerado ou mudança no exame TSH. Se trocar de marca, avise o médico!'
        },
        equivalents: [
            {
                id: 'puran-ref',
                name: 'Puran T4 (Referência)',
                lab: 'Sanofi',
                type: 'referencia',
                bioequivalent: true,
                basePriceMin: 16,
                basePriceMax: 26,
                coatingOrTech: 'Comprimido simples com manitol (nova fórmula sem lactose)',
                excipients: {
                    hasLactose: false,
                    hasDyes: false,
                    keyNotes: 'Fórmula à base de manitol e amido, sem lactose.'
                },
                absorptionNote: 'Remédio de índice terapêutico estreito — a constância da marca é essencial.',
                switchingEffects: [],
                switchVerdict: {
                    level: 'tranquila',
                    headline: 'Mantenha sempre a mesma marca se o TSH está bom',
                    explanation: 'O Puran T4 já tem preço acessível; manter a marca evita desregular a tireoide.'
                },
                spokenSummary: 'Puran T4 da Sanofi é a referência e já tem preço acessível. Se seu exame está controlado com ele, o ideal é manter.'
            },
            {
                id: 'euthyrox-sim',
                name: 'Euthyrox 50 mcg (Similar Intercambiável)',
                lab: 'Merck',
                type: 'similar',
                bioequivalent: true,
                basePriceMin: 15,
                basePriceMax: 24,
                coatingOrTech: 'Fórmula reformulada com manitol e ácido cítrico (sem lactose)',
                excipients: {
                    hasLactose: false,
                    hasDyes: false,
                    keyNotes: 'Excipientes diferentes do Puran T4, o que pode alterar levemente a absorção intestinal.'
                },
                absorptionNote: 'Excelente marca, mas como a levotiroxina é muito sensível a excipientes, a troca pode alterar o TSH em alguns pacientes.',
                switchingEffects: [
                    {
                        symptom: 'Cansaço, sono ou coração acelerado após semanas',
                        why: 'Pequena variação na absorção (microgramas!) por causa de excipientes diferentes altera o equilíbrio do TSH.',
                        likelihood: 'ocasional',
                        icon: 'fatigue'
                    },
                    {
                        symptom: 'Mudança no intestino ou humor',
                        why: 'Sinal de que a dose efetivamente absorvida ficou um pouco maior ou menor após a troca.',
                        likelihood: 'ocasional',
                        icon: 'alert-triangle'
                    }
                ],
                switchVerdict: {
                    level: 'cuidado_medico',
                    headline: 'Só troque com aviso ao médico e novo exame TSH',
                    explanation: 'Euthyrox é ótimo, mas para tireoide não se recomenda ficar alternando entre Puran T4, Euthyrox e genéricos sem repetir o exame de sangue em 6 semanas.'
                },
                spokenSummary: 'Euthyrox da Merck é um ótimo remédio, mas atenção: para tireoide, trocar de marca muda um pouco a absorção e pode dar cansaço ou palpitação. Só troque avisando o médico para repetir o exame de sangue.'
            },
            {
                id: 'levo-gen-merck',
                name: 'Levotiroxina Sódica 50 mcg (Genérico)',
                lab: 'Merck / EMS',
                type: 'generico',
                bioequivalent: true,
                basePriceMin: 10,
                basePriceMax: 18,
                coatingOrTech: 'Excipientes variam conforme o laboratório do genérico',
                excipients: {
                    hasLactose: true,
                    hasDyes: false,
                    keyNotes: 'Alguns genéricos ainda contêm lactose, diferente do Puran T4 atual.'
                },
                absorptionNote: 'A economia costuma ser pequena (poucos reais), enquanto ficar mudando de laboratório todo mês pode descompensar a tireoide.',
                switchingEffects: [
                    {
                        symptom: 'Desequilíbrio da tireoide (cansaço ou palpitação)',
                        why: 'Diferença de lactose e compressão do comprimido muda a absorção de microgramas no intestino.',
                        likelihood: 'ocasional',
                        icon: 'fatigue'
                    }
                ],
                switchVerdict: {
                    level: 'cuidado_medico',
                    headline: 'Se escolher genérico, compre sempre do MESMO laboratório',
                    explanation: 'Não misture laboratórios diferentes a cada mês e peça ao médico para checar o TSH após a mudança.'
                },
                spokenSummary: 'Genérico de Levotiroxina: pode conter lactose e alterar a absorção. Se precisar usar genérico, compre sempre do mesmo laboratório e avise o médico.'
            }
        ]
    },
    {
        id: 'novalgina',
        name: 'Novalgina',
        activeIngredient: 'Dipirona Monoidratada 1 g',
        strength: '1 g (ou 500 mg)',
        manufacturer: 'Sanofi',
        category: 'dor_febre',
        categoryLabel: 'Dor e Febre',
        aliases: [
            'novalgina',
            'dipirona',
            'dor',
            'febre',
            'dor de cabeca',
            'analgesico',
            'gotas'
        ],
        pack: {
            style: 'blister-box',
            primaryColor: '#FEF3C7',
            secondaryColor: '#FDE68A',
            accentColor: '#B45309',
            labelText: 'NOVALGINA',
            pillColor: '#FFFFFF',
            stripeType: 'sem_tarja'
        },
        purposeSimple: 'Alivia dores fortes e abaixa a febre rapidamente.',
        howToTake: {
            items: [
                {
                    icon: 'pill',
                    shortLabel: '1 comp. se dor',
                    spokenDetail: 'Tome 1 comprimido quando tiver dor ou febre, com bastante água.'
                },
                {
                    icon: 'clock',
                    shortLabel: 'De 6 em 6h',
                    spokenDetail: 'Respeite o intervalo mínimo de 6 horas entre as doses. Máximo de 4 comprimidos ao dia.'
                },
                {
                    icon: 'water',
                    shortLabel: 'Com água',
                    spokenDetail: 'Engula inteiro sem mastigar, pois é muito amargo.'
                }
            ],
            summary: 'A cada 6 horas, se tiver dor ou febre. Máximo 4 por dia.',
            spokenScript: 'Como tomar Novalgina ou Dipirona: tome 1 comprimido quando tiver dor ou febre, respeitando pelo menos 6 horas de intervalo e no máximo 4 por dia.',
            defaultDosage: '1 comprimido (1 g)',
            defaultTimes: [
                '08:00',
                '14:00',
                '20:00'
            ]
        },
        whatNotToDo: {
            items: [
                {
                    icon: 'alert-triangle',
                    shortLabel: 'Alergia antes?',
                    spokenDetail: 'Nunca tome se já teve alergia, inchaço nos olhos ou falta de ar com dipirona.'
                },
                {
                    icon: 'pregnant-no',
                    shortLabel: 'Evitar gravidez',
                    spokenDetail: 'Não use nos 3 primeiros nem nos 3 últimos meses de gravidez sem médico.'
                },
                {
                    icon: 'no-alcohol',
                    shortLabel: 'Sem álcool',
                    spokenDetail: 'Evite misturar com bebida alcoólica porque potencializa o efeito e pode baixar a pressão.'
                }
            ],
            summary: 'Não tome se já teve alergia a dipirona.',
            spokenScript: 'O que não pode com Dipirona: nunca tome se já teve alergia a dipirona antes. Evite na gravidez sem orientação médica e não misture com álcool.'
        },
        whatYouCanDo: {
            items: [
                {
                    icon: 'time-fast',
                    shortLabel: 'Age em 30 min',
                    spokenDetail: 'Começa a aliviar a dor e a febre entre 30 e 60 minutos.'
                },
                {
                    icon: 'food',
                    shortLabel: 'Com ou sem comida',
                    spokenDetail: 'Pode tomar a qualquer hora, com ou sem alimento.'
                },
                {
                    icon: 'stomach-ok',
                    shortLabel: 'Não irrita estômago',
                    spokenDetail: 'Costuma agredir menos o estômago do que anti-inflamatórios.'
                }
            ],
            missedDoseTip: 'Como costuma ser usada só quando há dor ou febre, não precisa repor se estiver se sentindo bem.',
            onsetTime: '30 a 60 minutos.',
            spokenScript: 'O que pode com Dipirona: começa a fazer efeito em cerca de 30 minutos e pode ser tomada com ou sem comida.'
        },
        genericsHighlight: {
            sameEffectBadge: 'Mesmo alívio',
            switchWarningShort: 'Diferença principal: velocidade de dissolução e sabor (nas gotas)',
            spokenScript: 'Sobre genéricos da Novalgina: a Dipirona genérica alivia dor e febre igual e custa muito menos. A diferença principal é o tempo para dissolver e o gosto bem mais amargo em alguns genéricos ou aromatizante diferente nas gotas.'
        },
        equivalents: [
            {
                id: 'novalgina-ref',
                name: 'Novalgina 1 g (Original / Referência)',
                lab: 'Sanofi',
                type: 'referencia',
                bioequivalent: true,
                basePriceMin: 22,
                basePriceMax: 34,
                coatingOrTech: 'Comprimido de desintegração rápida e acabamento liso',
                excipients: {
                    hasLactose: false,
                    hasDyes: false,
                    keyNotes: 'Sem lactose; dissolve rápido no estômago.'
                },
                absorptionNote: 'Início de ação rápido e consistente (cerca de 25 a 35 minutos).',
                switchingEffects: [],
                switchVerdict: {
                    level: 'tranquila',
                    headline: 'Referência tradicional',
                    explanation: 'Dissolve rápido e deixa menos gosto residual na boca.'
                },
                spokenSummary: 'Novalgina da Sanofi é a referência e dissolve rapidamente.'
            },
            {
                id: 'dipirona-gen-medley',
                name: 'Dipirona Monoidratada 1 g (Genérico)',
                lab: 'Medley / EMS / Prati-Donaduzzi',
                type: 'generico',
                bioequivalent: true,
                basePriceMin: 7,
                basePriceMax: 14,
                coatingOrTech: 'Comprimido simples sem película grossa (esfarela mais fácil na boca)',
                excipients: {
                    hasLactose: false,
                    hasDyes: false,
                    keyNotes: 'Nas versões em gotas, o corante/conservante e saborizante variam bastante entre marcas.'
                },
                absorptionNote: 'Bioequivalente ANVISA; alguns comprimidos podem demorar 10 a 15 minutos a mais para dissolver.',
                switchingEffects: [
                    {
                        symptom: 'Gosto bem mais amargo na hora de engolir',
                        why: 'Sem película protetora lisa, o comprimido começa a soltar o sabor amargo assim que encosta na língua.',
                        likelihood: 'comum',
                        icon: 'taste'
                    },
                    {
                        symptom: 'Enjoo leve na versão em gotas',
                        why: 'O aromatizante e o conservante das gotas genéricas mudam muito de marca para marca.',
                        likelihood: 'ocasional',
                        icon: 'stomach-ache'
                    }
                ],
                switchVerdict: {
                    level: 'tranquila',
                    headline: 'Troca super segura e até 70% mais barata',
                    explanation: 'Alivia a dor e a febre exatamente igual. Só engula rápido com bastante água para não sentir o gosto amargo.'
                },
                spokenSummary: 'Dipirona genérica alivia dor e febre igual à Novalgina e é até 70 por cento mais barata. A única diferença comum é o gosto mais amargo se demorar para engolir.'
            }
        ]
    },
    {
        id: 'amoxicilina',
        name: 'Amoxil / Amoxicilina',
        activeIngredient: 'Amoxicilina Tri-hidratada 500 mg',
        strength: '500 mg',
        manufacturer: 'GSK',
        category: 'antibiotico',
        categoryLabel: 'Antibiótico',
        aliases: [
            'amoxil',
            'amoxicilina',
            'antibiotico',
            'garganta',
            'infeccao',
            'amox'
        ],
        pack: {
            style: 'capsule-box',
            primaryColor: '#FEE2E2',
            secondaryColor: '#FCA5A5',
            accentColor: '#991B1B',
            labelText: 'AMOXICILINA',
            pillColor: '#EF4444',
            stripeType: 'vermelha'
        },
        purposeSimple: 'Antibiótico que mata bactérias em infecções de garganta, ouvido, dente e pulmão.',
        howToTake: {
            items: [
                {
                    icon: 'clock',
                    shortLabel: 'De 8 em 8h',
                    spokenDetail: 'Tome exatamente de 8 em 8 horas para manter o antibiótico ativo no sangue.'
                },
                {
                    icon: 'calendar',
                    shortLabel: 'Até o fim',
                    spokenDetail: 'Tome todos os dias receitados (7 a 10 dias), mesmo se melhorar no 3º dia.'
                },
                {
                    icon: 'water',
                    shortLabel: 'Com água',
                    spokenDetail: 'Engula a cápsula inteira com bastante água.'
                }
            ],
            summary: 'De 8 em 8 horas até terminar todos os dias da receita.',
            spokenScript: 'Como tomar Amoxicilina: tome de 8 em 8 horas certinho, até terminar todos os dias da receita, mesmo que a dor já tenha passado.',
            defaultDosage: '1 cápsula (500 mg)',
            defaultTimes: [
                '07:00',
                '15:00',
                '23:00'
            ]
        },
        whatNotToDo: {
            items: [
                {
                    icon: 'alert-triangle',
                    shortLabel: 'Alergia penicilina',
                    spokenDetail: 'Nunca tome se tiver alergia à penicilina ou amoxicilina.'
                },
                {
                    icon: 'calendar',
                    shortLabel: 'Não parar antes',
                    spokenDetail: 'Se parar antes do fim, a bactéria volta mais forte e resistente.'
                },
                {
                    icon: 'cuts-effect',
                    shortLabel: 'Cuidado pílula',
                    spokenDetail: 'Se tiver diarreia ou vômito pelo antibiótico, o anticoncepcional pode perder efeito.'
                }
            ],
            summary: 'Nunca pare antes do fim do tratamento e cheque alergia à penicilina.',
            spokenScript: 'O que não pode com Amoxicilina: não tome se tiver alergia à penicilina. Nunca pare antes do fim dos dias da receita porque a infecção pode voltar mais forte.'
        },
        whatYouCanDo: {
            items: [
                {
                    icon: 'food',
                    shortLabel: 'Com comida ajuda',
                    spokenDetail: 'Tomar junto com uma refeição ajuda a evitar dor de estômago.'
                },
                {
                    icon: 'water',
                    shortLabel: 'Bastante água',
                    spokenDetail: 'Beber água durante o tratamento ajuda o corpo a se recuperar.'
                },
                {
                    icon: 'car-ok',
                    shortLabel: 'Pode dirigir',
                    spokenDetail: 'Não costuma dar sono.'
                }
            ],
            missedDoseTip: 'Esqueceu uma cápsula? Tome assim que lembrar e reajuste o intervalo de 8h. Nunca tome duas cápsulas de uma vez.',
            onsetTime: 'Melhora dos sintomas em 48 a 72 horas.',
            spokenScript: 'O que pode com Amoxicilina: tomar junto com comida ajuda a proteger o estômago. A melhora costuma aparecer em 2 a 3 dias.'
        },
        genericsHighlight: {
            sameEffectBadge: 'Mesma cura',
            switchWarningShort: 'Diferença: tamanho/corante da cápsula e sabor no xarope infantil',
            spokenScript: 'Sobre genéricos da Amoxicilina: o genérico combate a bactéria exatamente igual e é bem mais barato. A diferença é apenas o tamanho e os corantes da cápsula — ou o sabor no xarope para crianças.'
        },
        equivalents: [
            {
                id: 'amoxil-ref',
                name: 'Amoxil 500 mg (Referência)',
                lab: 'GSK',
                type: 'referencia',
                bioequivalent: true,
                basePriceMin: 36,
                basePriceMax: 52,
                coatingOrTech: 'Cápsula gelatinosa dura padrão GSK',
                excipients: {
                    hasLactose: false,
                    hasDyes: true,
                    keyNotes: 'Sem lactose; cápsula bicolor de fácil deglutição.'
                },
                absorptionNote: 'Absorção completa no trato digestivo.',
                switchingEffects: [],
                switchVerdict: {
                    level: 'tranquila',
                    headline: 'Referência clássica',
                    explanation: 'Excelente qualidade, mas bem mais cara que o genérico.'
                },
                spokenSummary: 'Amoxil da GSK é a referência, mas o genérico tem a mesma eficácia.'
            },
            {
                id: 'amox-gen-medley',
                name: 'Amoxicilina 500 mg (Genérico)',
                lab: 'Medley / EMS / Eurofarma',
                type: 'generico',
                bioequivalent: true,
                basePriceMin: 14,
                basePriceMax: 24,
                coatingOrTech: 'Cápsula de gelatina com corantes próprios do laboratório',
                excipients: {
                    hasLactose: false,
                    hasDyes: true,
                    keyNotes: 'Algumas marcas usam corante amarelo tartrazina/vermelho 40 na casca da cápsula — verifique se tiver alergia a corantes.'
                },
                absorptionNote: 'Bioequivalência excelente; cura a infecção no mesmo prazo.',
                switchingEffects: [
                    {
                        symptom: 'Refluxo com gosto do remédio ou cápsula maior',
                        why: 'Espessura da gelatina da cápsula muda entre fabricantes; tomar com 1 copo cheio de água evita.',
                        likelihood: 'ocasional',
                        icon: 'taste'
                    }
                ],
                switchVerdict: {
                    level: 'tranquila',
                    headline: 'Troca muito segura e econômica',
                    explanation: 'Cura a infecção igual ao Amoxil. Em crianças (suspensão líquida), o sabor muda entre marcas e pode afetar a aceitação.'
                },
                spokenSummary: 'Amoxicilina genérica combate a infecção igual ao Amoxil e custa metade do preço. Apenas observe se há alergia a corantes na cápsula e tome com bastante água.'
            }
        ]
    },
    {
        id: 'rivotril',
        name: 'Rivotril',
        activeIngredient: 'Clonazepam 2,5 mg/mL (Gotas) ou 2 mg',
        strength: '2,5 mg/mL',
        manufacturer: 'Biopas / Roche',
        category: 'ansiedade_sono',
        categoryLabel: 'Ansiedade e Sono',
        aliases: [
            'rivotril',
            'clonazepam',
            'ansiedade',
            'sono',
            'insonia',
            'gotas',
            'tarja preta'
        ],
        pack: {
            style: 'drops-bottle',
            primaryColor: '#E2E8F0',
            secondaryColor: '#CBD5E1',
            accentColor: '#0F172A',
            labelText: 'RIVOTRIL',
            pillColor: '#94A3B8',
            stripeType: 'preta'
        },
        purposeSimple: 'Acalma crises de ansiedade, pânico ou convulsões — remédio controlado (tarja preta).',
        howToTake: {
            items: [
                {
                    icon: 'drops',
                    shortLabel: 'Conte as gotas',
                    spokenDetail: 'Segure o frasco totalmente em pé, na vertical, para cada gota sair do tamanho certo.'
                },
                {
                    icon: 'water',
                    shortLabel: 'Na água',
                    spokenDetail: 'Pingue em uma colher ou copo com um pouco de água, nunca direto na boca.'
                },
                {
                    icon: 'sleep',
                    shortLabel: 'Horário certo',
                    spokenDetail: 'Tome exatamente a quantidade e o horário que o médico receitou.'
                }
            ],
            summary: 'Frasco em pé na vertical. Nunca pingue direto na boca.',
            spokenScript: 'Como tomar Rivotril: segure o frasco totalmente em pé na vertical, conte as gotas em um pouco de água e nunca pingue direto na boca. Tome apenas a dose receitada.',
            defaultDosage: 'Conforme receita (gotas)',
            defaultTimes: [
                '22:00'
            ]
        },
        whatNotToDo: {
            items: [
                {
                    icon: 'no-alcohol',
                    shortLabel: 'Zero álcool',
                    spokenDetail: 'Misturar com bebida alcoólica é muito perigoso e pode causar sedação grave e falta de ar.'
                },
                {
                    icon: 'no-driving',
                    shortLabel: 'Não dirigir',
                    spokenDetail: 'Causa sono e reduz reflexos. Não dirija nem opere máquinas perigosas.'
                },
                {
                    icon: 'alert-triangle',
                    shortLabel: 'Não parar de vez',
                    spokenDetail: 'Parar de repente após uso contínuo causa rebote forte de ansiedade e tremores. Reduza só com médico.'
                }
            ],
            summary: 'Zero bebida alcoólica, não dirija e não pare de repente.',
            spokenScript: 'Atenção máxima com Rivotril: nunca misture com álcool. Não dirija porque dá sono e tira reflexos. Nunca pare de tomar de uma vez sem falar com o médico.'
        },
        whatYouCanDo: {
            items: [
                {
                    icon: 'sleep',
                    shortLabel: 'Tomar à noite',
                    spokenDetail: 'Se o médico receitou 1 vez ao dia, tomar antes de dormir reduz sono durante o dia.'
                },
                {
                    icon: 'doctor',
                    shortLabel: 'Receita azul',
                    spokenDetail: 'Guarde em local seguro, longe de crianças, e renove a receita azul antes de acabar.'
                },
                {
                    icon: 'shield-check',
                    shortLabel: 'Acompanhamento',
                    spokenDetail: 'Converse com o médico se sentir necessidade de aumentar gotas.'
                }
            ],
            missedDoseTip: 'Esqueceu? Não dobre as gotas nem tome dose extra para compensar. Siga no próximo horário normal.',
            onsetTime: '30 a 60 minutos.',
            spokenScript: 'O que pode com Rivotril: mantenha o frasco guardado longe de crianças e nunca dobre as gotas se esquecer uma dose.'
        },
        genericsHighlight: {
            sameEffectBadge: 'Mesma molécula',
            switchWarningShort: 'Atenção na troca: bico conta-gotas e solvente mudam a sensação',
            spokenScript: 'Atenção na troca do Rivotril para genérico: nas gotas, o bico conta-gotas e o líquido solvente mudam entre marcas. Isso pode alterar o tamanho da gota e a velocidade do sono ou dar mais sonolência no dia seguinte.'
        },
        equivalents: [
            {
                id: 'rivotril-ref',
                name: 'Rivotril (Original / Referência)',
                lab: 'Biopas / Roche',
                type: 'referencia',
                bioequivalent: true,
                basePriceMin: 26,
                basePriceMax: 38,
                coatingOrTech: 'Conta-gotas padronizado (25 gotas = 1 mL) e solvente propilenoglicol/aroma pêssego',
                excipients: {
                    hasLactose: false,
                    hasDyes: false,
                    keyNotes: 'Veículo líquido com aroma suave de pêssego e gotejador calibrado.'
                },
                absorptionNote: 'Gotejamento e início de ação bem previsíveis.',
                switchingEffects: [],
                switchVerdict: {
                    level: 'tranquila',
                    headline: 'Padrão de gotejamento',
                    explanation: 'Como a diferença de preço costuma ser moderada, muitos médicos preferem manter a mesma marca em gotas.'
                },
                spokenSummary: 'Rivotril original tem conta-gotas calibrado e ação previsível.'
            },
            {
                id: 'clonazepam-gen-medley',
                name: 'Clonazepam 2,5 mg/mL (Genérico)',
                lab: 'Medley / EMS / Germed',
                type: 'generico',
                bioequivalent: true,
                basePriceMin: 11,
                basePriceMax: 19,
                coatingOrTech: 'Bico conta-gotas e veículo aromatizante próprios do laboratório',
                excipients: {
                    hasLactose: false,
                    hasDyes: false,
                    keyNotes: 'Sabor mais forte/ardido em algumas marcas; segure o frasco sempre 100% na vertical.'
                },
                absorptionNote: 'Bioequivalente, porém variações no conta-gotas ou na curva de absorção podem ser percebidas em pessoas muito sensíveis.',
                switchingEffects: [
                    {
                        symptom: 'Mais sono no dia seguinte ou efeito que demora mais',
                        why: 'Pequena variação no volume da gota e nos excipientes do veículo líquido/comprimido.',
                        likelihood: 'ocasional',
                        icon: 'sleep'
                    },
                    {
                        symptom: 'Sabor ardido ou diferente na boca',
                        why: 'Aromatizante e proporção de propilenoglicol diferentes do Rivotril.',
                        likelihood: 'comum',
                        icon: 'taste'
                    }
                ],
                switchVerdict: {
                    level: 'atencao',
                    headline: 'Observe o conta-gotas e o sono nos primeiros dias',
                    explanation: 'É bioequivalente e mais econômico, mas atenção: sempre confira quantas gotas equivalem a 1 mL na caixinha e evite trocar de laboratório todo mês.'
                },
                spokenSummary: 'Clonazepam genérico tem a mesma molécula e custa menos, mas atenção ao bico conta-gotas e ao sabor diferente. Observe se dá mais sono no dia seguinte ao trocar.'
            }
        ]
    },
    {
        id: 'lipitor',
        name: 'Lipitor / Citalor',
        activeIngredient: 'Atorvastatina Cálcica 20 mg',
        strength: '20 mg',
        manufacturer: 'Viatris / Pfizer',
        category: 'colesterol',
        categoryLabel: 'Colesterol',
        aliases: [
            'lipitor',
            'citalor',
            'atorvastatina',
            'colesterol',
            'gordura no sangue',
            'estatina'
        ],
        pack: {
            style: 'blister-box',
            primaryColor: '#FEF9C3',
            secondaryColor: '#FDE047',
            accentColor: '#854D0E',
            labelText: 'LIPITOR',
            pillColor: '#FFFFFF',
            stripeType: 'vermelha'
        },
        purposeSimple: 'Baixa o colesterol ruim (LDL) e protege as artérias do coração.',
        howToTake: {
            items: [
                {
                    icon: 'pill',
                    shortLabel: '1 por dia',
                    spokenDetail: 'Tome 1 comprimido por dia, de preferência à noite ou no horário que você nunca esquece.'
                },
                {
                    icon: 'clock',
                    shortLabel: 'Mesma hora',
                    spokenDetail: 'Qualquer hora do dia funciona, mas manter o mesmo horário ajuda a lembrar.'
                },
                {
                    icon: 'heart-check',
                    shortLabel: 'Uso contínuo',
                    spokenDetail: 'Continue tomando mesmo depois que o exame de colesterol melhorar.'
                }
            ],
            summary: '1 comprimido todo dia, com ou sem comida.',
            spokenScript: 'Como tomar Lipitor ou Atorvastatina: tome 1 comprimido por dia, sempre no mesmo horário, com ou sem comida.',
            defaultDosage: '1 comprimido (20 mg)',
            defaultTimes: [
                '21:00'
            ]
        },
        whatNotToDo: {
            items: [
                {
                    icon: 'pregnant-no',
                    shortLabel: 'Proibido grávida',
                    spokenDetail: 'Não pode ser usado na gravidez nem na amamentação.'
                },
                {
                    icon: 'no-alcohol',
                    shortLabel: 'Evitar excesso',
                    spokenDetail: 'Excesso de bebida alcoólica sobrecarrega o fígado junto com este remédio.'
                },
                {
                    icon: 'alert-triangle',
                    shortLabel: 'Dor muscular forte',
                    spokenDetail: 'Se sentir dor forte nos músculos sem motivo ou urina muito escura, avise o médico.'
                }
            ],
            summary: 'Proibido na gravidez. Avise o médico se sentir dor muscular forte.',
            spokenScript: 'O que não pode com Atorvastatina: é proibida na gravidez. Evite excesso de álcool e avise o médico se sentir dores musculares fortes sem motivo.'
        },
        whatYouCanDo: {
            items: [
                {
                    icon: 'food',
                    shortLabel: 'Com ou sem comida',
                    spokenDetail: 'Pode tomar de estômago cheio ou vazio.'
                },
                {
                    icon: 'car-ok',
                    shortLabel: 'Pode dirigir',
                    spokenDetail: 'Não causa sono nem tontura na maioria das pessoas.'
                },
                {
                    icon: 'heart-check',
                    shortLabel: 'Ajuda c/ dieta',
                    spokenDetail: 'Combinar com caminhada e menos fritura potencializa a proteção do coração.'
                }
            ],
            missedDoseTip: 'Esqueceu? Tome se ainda faltarem mais de 12 horas para a próxima dose. Caso contrário, pule e siga normal.',
            onsetTime: 'Redução no exame de colesterol aparece em 2 a 4 semanas.',
            spokenScript: 'O que pode com Atorvastatina: pode tomar com ou sem comida e dirigir normalmente.'
        },
        genericsHighlight: {
            sameEffectBadge: 'Mesmo efeito no colesterol',
            switchWarningShort: 'Diferença: tamanho do comprimido, lactose e leve desconforto gástrico',
            spokenScript: 'Sobre genéricos do Lipitor: a Atorvastatina genérica baixa o colesterol igual e custa uma fração do preço. As diferenças mais comuns na troca são o tamanho do comprimido, presença de lactose e leve peso no estômago em pessoas sensíveis.'
        },
        equivalents: [
            {
                id: 'lipitor-ref',
                name: 'Lipitor / Citalor 20 mg (Referência)',
                lab: 'Viatris / Pfizer',
                type: 'referencia',
                bioequivalent: true,
                basePriceMin: 82,
                basePriceMax: 112,
                coatingOrTech: 'Comprimido oval pequeno com revestimento ceroso liso',
                excipients: {
                    hasLactose: true,
                    hasDyes: false,
                    keyNotes: 'Contém lactose e carbonato de cálcio estabilizante; muito fácil de engolir.'
                },
                absorptionNote: 'Dissolução e estabilização padrão de referência.',
                switchingEffects: [],
                switchVerdict: {
                    level: 'tranquila',
                    headline: 'Referência original',
                    explanation: 'Comprimido pequeno e liso, porém com custo bem mais elevado.'
                },
                spokenSummary: 'Lipitor é a referência de Atorvastatina, com comprimido pequeno e preço mais alto.'
            },
            {
                id: 'atorva-gen-ems',
                name: 'Atorvastatina Cálcica 20 mg (Genérico)',
                lab: 'EMS / Medley / Eurofarma',
                type: 'generico',
                bioequivalent: true,
                basePriceMin: 18,
                basePriceMax: 32,
                coatingOrTech: 'Revestimento polimérico diferente e comprimido um pouco maior',
                excipients: {
                    hasLactose: true,
                    hasDyes: false,
                    keyNotes: 'Contém lactose e estabilizantes diferentes para proteger a atorvastatina da acidez.'
                },
                absorptionNote: 'Bioequivalente ANVISA; baixa o colesterol LDL igualmente bem.',
                switchingEffects: [
                    {
                        symptom: 'Leve azia ou peso no estômago',
                        why: 'Diferença no estabilizante (carbonato) e na película de revestimento.',
                        likelihood: 'ocasional',
                        icon: 'stomach-ache'
                    },
                    {
                        symptom: 'Comprimido maior para engolir',
                        why: 'Alguns laboratórios usam formato redondo maior que o Lipitor oval.',
                        likelihood: 'comum',
                        icon: 'pill'
                    }
                ],
                switchVerdict: {
                    level: 'tranquila',
                    headline: 'Economia de até 75% com mesmo resultado',
                    explanation: 'Excelente custo-benefício. Se der leve peso no estômago ao trocar, passe a tomar logo após o jantar.'
                },
                spokenSummary: 'Atorvastatina genérica baixa o colesterol igual ao Lipitor com economia de até 75 por cento. O comprimido costuma ser um pouco maior e em poucas pessoas dá leve peso no estômago.'
            }
        ]
    },
    {
        id: 'allegra',
        name: 'Allegra',
        activeIngredient: 'Cloridrato de Fexofenadina 120 mg',
        strength: '120 mg',
        manufacturer: 'Sanofi',
        category: 'alergia',
        categoryLabel: 'Alergia e Rinite',
        aliases: [
            'allegra',
            'alegra',
            'fexofenadina',
            'alergia',
            'rinite',
            'coceira',
            'antialergico',
            'espirro'
        ],
        pack: {
            style: 'blister-box',
            primaryColor: '#FCE7F3',
            secondaryColor: '#F9A8D4',
            accentColor: '#7E22CE',
            labelText: 'ALLEGRA',
            pillColor: '#FDBA74',
            stripeType: 'sem_tarja'
        },
        purposeSimple: 'Alivia espirros, coriza, coceira no nariz e placas na pele sem dar sono.',
        howToTake: {
            items: [
                {
                    icon: 'pill',
                    shortLabel: '1 por dia',
                    spokenDetail: 'Tome 1 comprimido por dia para rinite alérgica.'
                },
                {
                    icon: 'water',
                    shortLabel: 'Só com água',
                    spokenDetail: 'Tome com água pura, nunca com suco de laranja, maçã ou toranja.'
                },
                {
                    icon: 'clock',
                    shortLabel: 'Antes de comer',
                    spokenDetail: 'De preferência antes de uma refeição.'
                }
            ],
            summary: '1 comprimido por dia, SEMPRE com água (nunca com suco!).',
            spokenScript: 'Como tomar Allegra ou Fexofenadina: tome 1 comprimido por dia com água pura. Nunca tome com suco de laranja ou maçã porque o suco corta o efeito.',
            defaultDosage: '1 comprimido (120 mg)',
            defaultTimes: [
                '08:00'
            ]
        },
        whatNotToDo: {
            items: [
                {
                    icon: 'no-juice',
                    shortLabel: 'Sem suco fruta',
                    spokenDetail: 'Suco de laranja, maçã ou grapefruit bloqueia a entrada do remédio no sangue e corta o efeito!'
                },
                {
                    icon: 'cuts-effect',
                    shortLabel: 'Sem antiácido junto',
                    spokenDetail: 'Antiácidos com alumínio ou magnésio atrapalham; dê 2 horas de intervalo.'
                },
                {
                    icon: 'pregnant-no',
                    shortLabel: 'Falar c/ médico',
                    spokenDetail: 'Gestantes e lactantes devem confirmar com o médico antes de usar.'
                }
            ],
            summary: 'Suco de laranja ou maçã corta o efeito deste remédio!',
            spokenScript: 'Atenção ao que não pode com Allegra: não tome com suco de laranja nem suco de maçã porque corta o efeito! Também dê 2 horas de intervalo para antiácidos.'
        },
        whatYouCanDo: {
            items: [
                {
                    icon: 'car-ok',
                    shortLabel: 'Não dá sono',
                    spokenDetail: 'Pode dirigir e trabalhar normalmente — não dá sono como antialérgicos antigos.'
                },
                {
                    icon: 'time-fast',
                    shortLabel: 'Age em 1 hora',
                    spokenDetail: 'Começa a aliviar espirros e coceira em cerca de 1 hora e dura 24 horas.'
                },
                {
                    icon: 'shield-check',
                    shortLabel: 'Dura 24 horas',
                    spokenDetail: 'Um único comprimido protege o dia inteiro.'
                }
            ],
            missedDoseTip: 'Esqueceu? Tome assim que lembrar. Se estiver perto da próxima dose, pule.',
            onsetTime: 'Cerca de 1 hora.',
            spokenScript: 'O que pode com Allegra: não dá sono, então você pode dirigir e trabalhar normalmente. Um comprimido dura o dia inteiro.'
        },
        genericsHighlight: {
            sameEffectBadge: 'Mesmo alívio sem sono',
            switchWarningShort: 'Troca segura: diferença costuma ser só tamanho do comprimido',
            spokenScript: 'Sobre genéricos do Allegra: a Fexofenadina genérica alivia a alergia igual, também não dá sono e custa bem menos. A diferença costuma ser apenas o tamanho e a cor do revestimento.'
        },
        equivalents: [
            {
                id: 'allegra-ref',
                name: 'Allegra 120 mg (Referência)',
                lab: 'Sanofi',
                type: 'referencia',
                bioequivalent: true,
                basePriceMin: 46,
                basePriceMax: 65,
                coatingOrTech: 'Comprimido oblongo revestido cor pêssego (óxido de ferro)',
                excipients: {
                    hasLactose: false,
                    hasDyes: true,
                    keyNotes: 'Sem lactose; película bem lisa fácil de engolir.'
                },
                absorptionNote: 'Absorção rápida se tomado com água pura.',
                switchingEffects: [],
                switchVerdict: {
                    level: 'tranquila',
                    headline: 'Referência original',
                    explanation: 'Muito bem tolerado e não dá sono.'
                },
                spokenSummary: 'Allegra da Sanofi é a referência sem lactose.'
            },
            {
                id: 'fexo-gen-ems',
                name: 'Cloridrato de Fexofenadina 120 mg (Genérico)',
                lab: 'EMS / Medley / Eurofarma',
                type: 'generico',
                bioequivalent: true,
                basePriceMin: 18,
                basePriceMax: 30,
                coatingOrTech: 'Revestimento diferente e comprimido levemente maior',
                excipients: {
                    hasLactose: false,
                    hasDyes: true,
                    keyNotes: 'Sem lactose na maioria das marcas; corante de revestimento varia.'
                },
                absorptionNote: 'Bioequivalente ANVISA; igualmente sensível a suco de frutas (tome sempre só com água).',
                switchingEffects: [
                    {
                        symptom: 'Demora leve a engolir por tamanho do comprimido',
                        why: 'Alguns genéricos têm comprimido mais espesso que o Allegra.',
                        likelihood: 'ocasional',
                        icon: 'pill'
                    }
                ],
                switchVerdict: {
                    level: 'tranquila',
                    headline: 'Troca muito tranquila e econômica',
                    explanation: 'Alivia rinite e alergia igual sem dar sono, economizando mais da metade. Só lembre de tomar com água pura!'
                },
                spokenSummary: 'Fexofenadina genérica funciona igual ao Allegra, não dá sono e custa menos da metade. A troca é muito tranquila.'
            }
        ]
    },
    {
        id: 'lexapro',
        name: 'Lexapro',
        activeIngredient: 'Oxalato de Escitalopram 10 mg',
        strength: '10 mg',
        manufacturer: 'Lundbeck',
        category: 'ansiedade_sono',
        categoryLabel: 'Ansiedade e Humor',
        aliases: [
            'lexapro',
            'escitalopram',
            'exodus',
            'reconter',
            'depressao',
            'ansiedade',
            'panico'
        ],
        pack: {
            style: 'blister-box',
            primaryColor: '#E0E7FF',
            secondaryColor: '#A5B4FC',
            accentColor: '#3730A3',
            labelText: 'LEXAPRO',
            pillColor: '#FFFFFF',
            stripeType: 'vermelha'
        },
        purposeSimple: 'Trata ansiedade e depressão equilibrando a serotonina no cérebro.',
        howToTake: {
            items: [
                {
                    icon: 'pill',
                    shortLabel: '1 por dia',
                    spokenDetail: 'Tome 1 comprimido por dia, de manhã ou à noite, conforme orientado.'
                },
                {
                    icon: 'clock',
                    shortLabel: 'Mesma hora',
                    spokenDetail: 'Tome sempre no mesmo horário todos os dias para manter o nível estável.'
                },
                {
                    icon: 'calendar',
                    shortLabel: 'Uso contínuo',
                    spokenDetail: 'O efeito completo leva de 2 a 4 semanas. Não desista na primeira semana.'
                }
            ],
            summary: '1 comprimido todo dia, no mesmo horário, com ou sem comida.',
            spokenScript: 'Como tomar Lexapro ou Escitalopram: tome 1 comprimido por dia, sempre no mesmo horário. O efeito completo aparece entre 2 e 4 semanas.',
            defaultDosage: '1 comprimido (10 mg)',
            defaultTimes: [
                '08:00'
            ]
        },
        whatNotToDo: {
            items: [
                {
                    icon: 'alert-triangle',
                    shortLabel: 'Não parar de vez',
                    spokenDetail: 'Parar de repente dá tontura, choque na cabeça e enjoo. Só reduza aos poucos com médico.'
                },
                {
                    icon: 'no-alcohol',
                    shortLabel: 'Evitar álcool',
                    spokenDetail: 'Bebida alcoólica piora a ansiedade, aumenta o sono e atrapalha o tratamento.'
                },
                {
                    icon: 'cuts-effect',
                    shortLabel: 'Chá erva-são-joão',
                    spokenDetail: 'Não misture com erva-de-são-joão ou outros antidepressivos sem avisar o médico.'
                }
            ],
            summary: 'Nunca pare de uma vez e evite bebidas alcoólicas.',
            spokenScript: 'O que não pode com Escitalopram: nunca pare de tomar de repente porque dá tontura forte. Evite álcool e não misture com chá de erva-de-são-joão.'
        },
        whatYouCanDo: {
            items: [
                {
                    icon: 'food',
                    shortLabel: 'Com comida ajuda',
                    spokenDetail: 'Se der leve enjoo no começo, tome logo após o café da manhã.'
                },
                {
                    icon: 'sleep',
                    shortLabel: 'Ajustar horário',
                    spokenDetail: 'Se der sono, pergunte ao médico se pode passar para a noite; se tirar o sono, tome de manhã.'
                },
                {
                    icon: 'doctor',
                    shortLabel: 'Acompanhamento',
                    spokenDetail: 'Converse com o médico se trocar de marca e sentir diferença.'
                }
            ],
            missedDoseTip: 'Esqueceu de manhã? Tome no mesmo dia se lembrar cedo. Se só lembrar à noite ou no outro dia, pule e siga normal.',
            onsetTime: 'Melhora gradual entre 2 e 4 semanas.',
            spokenScript: 'O que pode com Escitalopram: pode tomar após o café para evitar enjoo. Se esquecer uma dose, nunca tome duas juntas.'
        },
        genericsHighlight: {
            sameEffectBadge: 'Mesma molécula',
            switchWarningShort: 'Atenção na troca: sensíveis relatam enjoo ou dor de cabeça por alguns dias',
            spokenScript: 'Sobre genéricos do Lexapro: o Escitalopram genérico tem a mesma molécula e custa bem menos. Porém, algumas pessoas sensíveis notam enjoo leve, dor de cabeça ou alteração no sono durante 1 a 2 semanas ao trocar de marca.'
        },
        equivalents: [
            {
                id: 'lexapro-ref',
                name: 'Lexapro 10 mg (Original / Referência)',
                lab: 'Lundbeck',
                type: 'referencia',
                bioequivalent: true,
                basePriceMin: 118,
                basePriceMax: 155,
                coatingOrTech: 'Comprimido revestido sulcado padrão dinamarquês Lundbeck',
                excipients: {
                    hasLactose: false,
                    hasDyes: false,
                    keyNotes: 'Sem lactose e sem corantes; celulose microcristalina e película fina de hipromelose.'
                },
                absorptionNote: 'Perfil de absorção de referência bem suave no estômago.',
                switchingEffects: [],
                switchVerdict: {
                    level: 'tranquila',
                    headline: 'Referência original',
                    explanation: 'Excelente tolerabilidade, mas tem o maior custo mensal.'
                },
                spokenSummary: 'Lexapro da Lundbeck é o original, sem lactose, porém bem mais caro.'
            },
            {
                id: 'escit-gen-euro',
                name: 'Oxalato de Escitalopram 10 mg (Genérico)',
                lab: 'Eurofarma / Medley / EMS',
                type: 'generico',
                bioequivalent: true,
                basePriceMin: 24,
                basePriceMax: 42,
                coatingOrTech: 'Película revestida e aglutinantes próprios do laboratório nacional',
                excipients: {
                    hasLactose: false,
                    hasDyes: false,
                    keyNotes: 'Geralmente sem lactose, mas a velocidade de desintegração varia entre fabricantes.'
                },
                absorptionNote: 'Bioequivalente ANVISA; pequenas diferenças na curva de pico podem ser percebidas por quem já usa Lexapro há meses.',
                switchingEffects: [
                    {
                        symptom: 'Enjoo leve ou dor de cabeça na 1ª semana',
                        why: 'Variação leve no pico de absorção ao mudar do revestimento do Lexapro para o genérico.',
                        likelihood: 'ocasional',
                        icon: 'headache'
                    },
                    {
                        symptom: 'Leve tontura ou alteração no sono na troca',
                        why: 'O cérebro percebe pequenas oscilações de concentração quando muda de laboratório; costuma estabilizar mantendo o mesmo genérico.',
                        likelihood: 'ocasional',
                        icon: 'dizziness'
                    }
                ],
                switchVerdict: {
                    level: 'atencao',
                    headline: 'Economia de até 75% — escolha um laboratório e mantenha',
                    explanation: 'Funciona igual para ansiedade e depressão. Para evitar oscilações, tente comprar sempre o genérico do mesmo laboratório.'
                },
                spokenSummary: 'Escitalopram genérico economiza até 75 por cento e tem a mesma eficácia. Na troca, algumas pessoas sentem leve enjoo ou dor de cabeça por poucos dias; a dica é manter sempre o mesmo laboratório.'
            }
        ]
    },
    {
        id: 'tylenol',
        name: 'Tylenol / Paracetamol',
        activeIngredient: 'Paracetamol 750 mg',
        strength: '750 mg',
        manufacturer: 'Kenvue / Janssen',
        category: 'dor_febre',
        categoryLabel: 'Dor e Febre',
        aliases: [
            'tylenol',
            'tilenol',
            'paracetamol',
            'dor',
            'febre',
            'gripe',
            'resfriado'
        ],
        pack: {
            style: 'blister-box',
            primaryColor: '#FEE2E2',
            secondaryColor: '#FECACA',
            accentColor: '#B91C1C',
            labelText: 'TYLENOL',
            pillColor: '#FFFFFF',
            stripeType: 'sem_tarja'
        },
        purposeSimple: 'Alivia dores leves a moderadas e abaixa a febre sem irritar o estômago.',
        howToTake: {
            items: [
                {
                    icon: 'pill',
                    shortLabel: '1 comp. se dor',
                    spokenDetail: 'Tome 1 comprimido de 750 mg quando tiver dor ou febre.'
                },
                {
                    icon: 'clock',
                    shortLabel: 'De 6 em 6h',
                    spokenDetail: 'Espere pelo menos 4 a 6 horas. Nunca passe de 5 comprimidos de 750 mg em 24 horas.'
                },
                {
                    icon: 'water',
                    shortLabel: 'Com água',
                    spokenDetail: 'Engula com água, com ou sem comida.'
                }
            ],
            summary: 'A cada 6 horas se precisar. Nunca passe da dose máxima (protege o fígado).',
            spokenScript: 'Como tomar Tylenol ou Paracetamol 750 miligramas: tome 1 comprimido a cada 6 horas se tiver dor ou febre, nunca passando de 5 comprimidos no dia inteiro.',
            defaultDosage: '1 comprimido (750 mg)',
            defaultTimes: [
                '08:00',
                '14:00',
                '20:00'
            ]
        },
        whatNotToDo: {
            items: [
                {
                    icon: 'no-alcohol',
                    shortLabel: 'Sem álcool',
                    spokenDetail: 'Misturar paracetamol com bebida alcoólica faz muito mal para o fígado.'
                },
                {
                    icon: 'alert-triangle',
                    shortLabel: 'Não somar remédios',
                    spokenDetail: 'Cuidado com antigripais (como Benegrip ou Cimegripe) que JÁ têm paracetamol — somar doses sobrecarrega o fígado!'
                },
                {
                    icon: 'doctor',
                    shortLabel: 'Doença do fígado',
                    spokenDetail: 'Quem tem problema grave no fígado deve perguntar ao médico antes de usar.'
                }
            ],
            summary: 'Não misture com álcool nem com antigripais que já contêm paracetamol.',
            spokenScript: 'O que não pode com Paracetamol: não misture com álcool e cuidado ao tomar junto com remédios de gripe, porque muitos já têm paracetamol e a soma faz mal ao fígado.'
        },
        whatYouCanDo: {
            items: [
                {
                    icon: 'stomach-ok',
                    shortLabel: 'Suave p/ estômago',
                    spokenDetail: 'Boa opção para quem tem gastrite e não pode usar anti-inflamatório.'
                },
                {
                    icon: 'time-fast',
                    shortLabel: 'Age em 30 min',
                    spokenDetail: 'Começa a aliviar dor e febre entre 15 e 30 minutos.'
                },
                {
                    icon: 'car-ok',
                    shortLabel: 'Não dá sono',
                    spokenDetail: 'Pode dirigir e trabalhar normalmente.'
                }
            ],
            missedDoseTip: 'Use apenas enquanto tiver dor ou febre; não precisa repor dose se estiver sem sintomas.',
            onsetTime: '15 a 30 minutos.',
            spokenScript: 'O que pode com Paracetamol: é suave para o estômago, não dá sono e começa a agir em 15 a 30 minutos.'
        },
        genericsHighlight: {
            sameEffectBadge: 'Mesmo alívio',
            switchWarningShort: 'Diferença: revestimento liso para engolir e velocidade inicial',
            spokenScript: 'Sobre genéricos do Tylenol: o Paracetamol genérico funciona igual e custa muito menos. A diferença principal é o revestimento liso do Tylenol que facilita engolir sem grudar na garganta.'
        },
        equivalents: [
            {
                id: 'tylenol-ref',
                name: 'Tylenol 750 mg (Original / Referência)',
                lab: 'Kenvue / Janssen',
                type: 'referencia',
                bioequivalent: true,
                basePriceMin: 26,
                basePriceMax: 38,
                coatingOrTech: 'Comprimido oblongo com revestimento liso de deslizamento rápido',
                excipients: {
                    hasLactose: false,
                    hasDyes: false,
                    keyNotes: 'Sem lactose; superfície polida não deixa gosto amargo.'
                },
                absorptionNote: 'Desintegração rápida (15 a 30 minutos).',
                switchingEffects: [],
                switchVerdict: {
                    level: 'tranquila',
                    headline: 'Referência muito fácil de engolir',
                    explanation: 'Comprimido bem liso, mas mais caro que o genérico.'
                },
                spokenSummary: 'Tylenol original tem comprimido bem liso e fácil de engolir.'
            },
            {
                id: 'paracetamol-gen',
                name: 'Paracetamol 750 mg (Genérico)',
                lab: 'Medley / EMS / Prati-Donaduzzi',
                type: 'generico',
                bioequivalent: true,
                basePriceMin: 6,
                basePriceMax: 13,
                coatingOrTech: 'Comprimido branco sem revestimento polido (mais poroso)',
                excipients: {
                    hasLactose: false,
                    hasDyes: false,
                    keyNotes: 'Sem lactose; mais seco na boca se tomar com pouca água.'
                },
                absorptionNote: 'Bioequivalente ANVISA; mesma eficácia na dor e febre.',
                switchingEffects: [
                    {
                        symptom: 'Comprimido gruda ou deixa pó amargo se beber pouca água',
                        why: 'Sem a película polida do Tylenol, o comprimido é mais áspero ao passar pela garganta.',
                        likelihood: 'comum',
                        icon: 'taste'
                    }
                ],
                switchVerdict: {
                    level: 'tranquila',
                    headline: 'Troca totalmente segura e até 75% mais barata',
                    explanation: 'Alivia dor e febre exatamente igual. Basta engolir com um bom gole de água.'
                },
                spokenSummary: 'Paracetamol genérico alivia dor e febre igual ao Tylenol e custa até 75 por cento menos. Apenas tome com bastante água porque o comprimido é mais áspero.'
            }
        ]
    }
];
const MEDICATION_CATEGORIES = [
    {
        id: 'todos',
        label: 'Todos',
        emoji: '💊',
        color: '#0D9488'
    },
    {
        id: 'anticoncepcional',
        label: 'Anticoncepcional',
        emoji: '🌸',
        color: '#DB2777'
    },
    {
        id: 'pressao',
        label: 'Pressão',
        emoji: '❤️',
        color: '#16A34A'
    },
    {
        id: 'diabetes',
        label: 'Diabetes',
        emoji: '🩸',
        color: '#2563EB'
    },
    {
        id: 'estomago',
        label: 'Estômago',
        emoji: '🫁',
        color: '#7C3AED'
    },
    {
        id: 'tireoide',
        label: 'Tireoide',
        emoji: '🦋',
        color: '#0284C7'
    },
    {
        id: 'dor_febre',
        label: 'Dor e Febre',
        emoji: '🌡️',
        color: '#D97706'
    },
    {
        id: 'antibiotico',
        label: 'Infecção',
        emoji: '🛡️',
        color: '#DC2626'
    },
    {
        id: 'ansiedade_sono',
        label: 'Ansiedade/Sono',
        emoji: '🌙',
        color: '#475569'
    },
    {
        id: 'colesterol',
        label: 'Colesterol',
        emoji: '💛',
        color: '#CA8A04'
    },
    {
        id: 'alergia',
        label: 'Alergia',
        emoji: '🤧',
        color: '#9333EA'
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/regions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BRAZILIAN_REGIONS",
    ()=>BRAZILIAN_REGIONS,
    "getRegionByUf",
    ()=>getRegionByUf
]);
const BRAZILIAN_REGIONS = [
    {
        uf: 'BR',
        name: 'Média Brasil',
        regionName: 'Nacional',
        icmsLabel: 'Média nacional',
        priceMultiplier: 1.0
    },
    {
        uf: 'AC',
        name: 'Acre',
        regionName: 'Norte',
        icmsLabel: 'ICMS 19% + frete regional',
        priceMultiplier: 1.1
    },
    {
        uf: 'AL',
        name: 'Alagoas',
        regionName: 'Nordeste',
        icmsLabel: 'ICMS 19% (com FECOEP)',
        priceMultiplier: 1.04
    },
    {
        uf: 'AP',
        name: 'Amapá',
        regionName: 'Norte',
        icmsLabel: 'ICMS 18% + frete regional',
        priceMultiplier: 1.09
    },
    {
        uf: 'AM',
        name: 'Amazonas',
        regionName: 'Norte',
        icmsLabel: 'ICMS 20% + frete regional',
        priceMultiplier: 1.11
    },
    {
        uf: 'BA',
        name: 'Bahia',
        regionName: 'Nordeste',
        icmsLabel: 'ICMS 20,5%',
        priceMultiplier: 1.04
    },
    {
        uf: 'CE',
        name: 'Ceará',
        regionName: 'Nordeste',
        icmsLabel: 'ICMS 20%',
        priceMultiplier: 1.03
    },
    {
        uf: 'DF',
        name: 'Distrito Federal',
        regionName: 'Centro-Oeste',
        icmsLabel: 'ICMS 20%',
        priceMultiplier: 1.02
    },
    {
        uf: 'ES',
        name: 'Espírito Santo',
        regionName: 'Sudeste',
        icmsLabel: 'ICMS 17%',
        priceMultiplier: 0.96
    },
    {
        uf: 'GO',
        name: 'Goiás',
        regionName: 'Centro-Oeste',
        icmsLabel: 'ICMS 19%',
        priceMultiplier: 0.99
    },
    {
        uf: 'MA',
        name: 'Maranhão',
        regionName: 'Nordeste',
        icmsLabel: 'ICMS 22%',
        priceMultiplier: 1.06
    },
    {
        uf: 'MT',
        name: 'Mato Grosso',
        regionName: 'Centro-Oeste',
        icmsLabel: 'ICMS 17%',
        priceMultiplier: 1.02
    },
    {
        uf: 'MS',
        name: 'Mato Grosso do Sul',
        regionName: 'Centro-Oeste',
        icmsLabel: 'ICMS 17%',
        priceMultiplier: 1.0
    },
    {
        uf: 'MG',
        name: 'Minas Gerais',
        regionName: 'Sudeste',
        icmsLabel: 'ICMS 18%',
        priceMultiplier: 0.97
    },
    {
        uf: 'PA',
        name: 'Pará',
        regionName: 'Norte',
        icmsLabel: 'ICMS 19% + frete regional',
        priceMultiplier: 1.08
    },
    {
        uf: 'PB',
        name: 'Paraíba',
        regionName: 'Nordeste',
        icmsLabel: 'ICMS 20%',
        priceMultiplier: 1.03
    },
    {
        uf: 'PR',
        name: 'Paraná',
        regionName: 'Sul',
        icmsLabel: 'ICMS 19,5%',
        priceMultiplier: 0.98
    },
    {
        uf: 'PE',
        name: 'Pernambuco',
        regionName: 'Nordeste',
        icmsLabel: 'ICMS 20,5%',
        priceMultiplier: 1.04
    },
    {
        uf: 'PI',
        name: 'Piauí',
        regionName: 'Nordeste',
        icmsLabel: 'ICMS 21%',
        priceMultiplier: 1.05
    },
    {
        uf: 'RJ',
        name: 'Rio de Janeiro',
        regionName: 'Sudeste',
        icmsLabel: 'ICMS 22% (com FECP)',
        priceMultiplier: 1.08
    },
    {
        uf: 'RN',
        name: 'Rio Grande do Norte',
        regionName: 'Nordeste',
        icmsLabel: 'ICMS 18%',
        priceMultiplier: 1.01
    },
    {
        uf: 'RS',
        name: 'Rio Grande do Sul',
        regionName: 'Sul',
        icmsLabel: 'ICMS 17%',
        priceMultiplier: 0.97
    },
    {
        uf: 'RO',
        name: 'Rondônia',
        regionName: 'Norte',
        icmsLabel: 'ICMS 19,5% + frete regional',
        priceMultiplier: 1.07
    },
    {
        uf: 'RR',
        name: 'Roraima',
        regionName: 'Norte',
        icmsLabel: 'ICMS 20% + frete regional',
        priceMultiplier: 1.11
    },
    {
        uf: 'SC',
        name: 'Santa Catarina',
        regionName: 'Sul',
        icmsLabel: 'ICMS 17%',
        priceMultiplier: 0.95
    },
    {
        uf: 'SP',
        name: 'São Paulo',
        regionName: 'Sudeste',
        icmsLabel: 'ICMS 18% · Alta concorrência',
        priceMultiplier: 0.94
    },
    {
        uf: 'SE',
        name: 'Sergipe',
        regionName: 'Nordeste',
        icmsLabel: 'ICMS 19%',
        priceMultiplier: 1.03
    },
    {
        uf: 'TO',
        name: 'Tocantins',
        regionName: 'Norte',
        icmsLabel: 'ICMS 20%',
        priceMultiplier: 1.05
    }
];
function getRegionByUf(uf) {
    return BRAZILIAN_REGIONS.find((r)=>r.uf === uf) ?? BRAZILIAN_REGIONS[0];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/samplePrescriptions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SAMPLE_PRESCRIPTIONS",
    ()=>SAMPLE_PRESCRIPTIONS
]);
const SAMPLE_PRESCRIPTIONS = [
    {
        id: 'sample-receita-clinico',
        title: 'Receita Médica (Foto)',
        sourceType: 'foto_receita',
        badge: 'Foto de receita',
        doctorOrSender: 'Dra. Mariana Silva · CRM-SP 184.220',
        extractedText: 'USO ORAL\n1) Losartana Potássica 50 mg - Tomar 1 comprimido às 08:00 todos os dias.\n2) Glifage XR 500 mg - Tomar 1 comprimido junto com o jantar às 20:00.\nUso contínuo.',
        previewLines: [
            'USO ORAL — RECEITA SIMPLES',
            '1. Losartana 50 mg — 1 comp às 08:00',
            '2. Glifage XR 500 mg — 1 comp às 20:00'
        ]
    },
    {
        id: 'sample-print-whatsapp',
        title: 'Print de WhatsApp (Telemedicina)',
        sourceType: 'print_whatsapp',
        badge: 'Print de tela',
        doctorOrSender: 'WhatsApp · Dra. Camila (Gineco)',
        extractedText: 'Oi Maria! Pode manter o Iumi (drospirenona 3mg + etinilestradiol) 1 comprimido às 21:00 (24 dias + 4 de pausa). Se tiver dor de cabeça pode tomar Dipirona 1g de 6 em 6h.',
        previewLines: [
            '💬 Dra. Camila (Gineco):',
            '"Manter Iumi 1 comp às 21:00"',
            '"Se dor de cabeça: Dipirona 1g 6/6h"'
        ]
    },
    {
        id: 'sample-foto-caixa',
        title: 'Foto da Caixa (Tireoide + Estômago)',
        sourceType: 'foto_caixa',
        badge: 'Foto da caixa',
        doctorOrSender: 'Caixa fotografada na farmácia',
        extractedText: 'Puran T4 Levotiroxina Sódica 50 mcg Sanofi - 06:30 em jejum. Losec MUPS Omeprazol 20 mg - 07:00 antes do café.',
        previewLines: [
            '📦 PURAN T4 50 mcg (Sanofi)',
            '📦 LOSEC MUPS 20 mg (AstraZeneca)',
            'Jejum pela manhã: 06:30 e 07:00'
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/aiClient.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "askPharmacistAi",
    ()=>askPharmacistAi,
    "fetchAiStatus",
    ()=>fetchAiStatus,
    "lookupAnyBrazilianMedication",
    ()=>lookupAnyBrazilianMedication,
    "scanPrescriptionImage",
    ()=>scanPrescriptionImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/storage.ts [app-client] (ecmascript)");
;
function buildAiHeaders(override) {
    const keys = override ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadClientAiKeys"])();
    const headers = {
        'Content-Type': 'application/json'
    };
    if (keys.elevenLabsKey) headers['x-elevenlabs-key'] = keys.elevenLabsKey;
    if (keys.elevenLabsVoiceId) headers['x-elevenlabs-voice-id'] = keys.elevenLabsVoiceId;
    if (keys.geminiKey) headers['x-gemini-key'] = keys.geminiKey;
    return headers;
}
async function fetchAiStatus(override) {
    const resp = await fetch('/api/status', {
        method: 'GET',
        headers: buildAiHeaders(override)
    });
    if (!resp.ok) {
        return {
            elevenLabsConnected: false,
            elevenLabsSource: 'none',
            geminiConnected: false,
            geminiSource: 'none',
            naturalVoiceProvider: 'none'
        };
    }
    return await resp.json();
}
async function scanPrescriptionImage(payload) {
    const resp = await fetch('/api/scan', {
        method: 'POST',
        headers: buildAiHeaders(),
        body: JSON.stringify(payload)
    });
    const data = await resp.json();
    if (!resp.ok) {
        return {
            provider: 'error',
            rawText: '',
            items: [],
            error: data.error || 'SCAN_ERROR',
            message: data.message || 'Não foi possível ler a imagem agora.'
        };
    }
    return data;
}
async function lookupAnyBrazilianMedication(query) {
    const resp = await fetch('/api/medication', {
        method: 'POST',
        headers: buildAiHeaders(),
        body: JSON.stringify({
            query
        })
    });
    const data = await resp.json();
    if (!resp.ok) {
        return {
            error: data.error || 'LOOKUP_ERROR',
            message: data.message || 'Não foi possível consultar este medicamento.'
        };
    }
    return data;
}
async function askPharmacistAi(payload) {
    const resp = await fetch('/api/ask', {
        method: 'POST',
        headers: buildAiHeaders(),
        body: JSON.stringify(payload)
    });
    const data = await resp.json();
    if (!resp.ok) {
        return {
            answer: data.message || 'Não consegui responder agora. Tente novamente em instantes.',
            provider: 'error'
        };
    }
    return {
        answer: data.answer || '',
        provider: data.provider || 'gemini',
        needsKey: data.needsKey
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/medicationSearch.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createCustomMedication",
    ()=>createCustomMedication,
    "extractTimesFromSnippet",
    ()=>extractTimesFromSnippet,
    "normalizeText",
    ()=>normalizeText,
    "parsePrescriptionText",
    ()=>parsePrescriptionText,
    "searchMedications",
    ()=>searchMedications
]);
function normalizeText(text) {
    return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s:]/g, ' ').replace(/\s+/g, ' ').trim();
}
function escapeRegExp(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
const PRESCRIPTION_ABBREVIATIONS = new Set([
    'comp',
    'cp',
    'caps',
    'gts',
    'dr',
    'dra',
    'mg',
    'ml',
    'mcg',
    'cx',
    'fr',
    'un',
    'amp',
    'env',
    'obs',
    'ex',
    'lab'
]);
const NON_DRUG_STOPWORDS = new Set([
    'dor',
    'sono',
    'gotas',
    'febre',
    'gripe',
    'pressao',
    'estomago',
    'alergia',
    'diabetes',
    'tireoide',
    'infeccao',
    'ansiedade',
    'colesterol',
    'anticoncepcional',
    'antibiotico',
    // Pharmaceutical salt / generic descriptor prefixes that are not unique active ingredients
    'cloridrato',
    'oxalato',
    'maleato',
    'sulfato',
    'tartarato',
    'fosfato',
    'mesilato',
    'besilato',
    'sodio',
    'sodico',
    'sodica',
    'potassica',
    'calcica',
    'medicamento'
]);
function splitPrescriptionLines(rawText) {
    const result = [];
    // First split on hard delimiters (newlines, semicolons, and numbered list items like "1) " / "2. ")
    const blocks = rawText.split(/\n|;|(?=(?:^|\s)\d+\s*[).]\s+)/).map((b)=>b.trim()).filter(Boolean);
    for (const block of blocks){
        let start = 0;
        const sentenceBreakRegex = /([.!?])\s+/g;
        let m;
        while((m = sentenceBreakRegex.exec(block)) !== null){
            const punct = m[1];
            if (punct === '.') {
                const beforeDot = block.slice(start, m.index);
                const lastTokenMatch = /([A-Za-zÀ-ÿ0-9]+)$/.exec(beforeDot);
                const lastTokenNorm = lastTokenMatch ? lastTokenMatch[1].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';
                // Do not split after list numbers ("1. Losartana") or Portuguese prescription abbreviations ("1 comp. 6/6h")
                if (PRESCRIPTION_ABBREVIATIONS.has(lastTokenNorm) || /^\d+$/.test(lastTokenNorm) && beforeDot.trim() === lastTokenNorm) {
                    continue;
                }
            }
            const piece = block.slice(start, m.index + 1).trim();
            if (piece) result.push(piece);
            start = m.index + m[0].length;
        }
        const tail = block.slice(start).trim();
        if (tail) result.push(tail);
    }
    return result;
}
function findClauseSplitOffset(between) {
    // Primary clause separators (commas, conjunctions, pipes, pluses, non-interval slashes)
    // take precedence over spaced dashes (" - "), which often link a time to its own drug
    // (e.g., "08:00 - Losartana 50mg e 20:00 - Glifage XR 500mg").
    const sepRegex = /,|\||\+|\s+[-–—]\s+|\s+(?:e|ou)\s+|\s*\/\s*/gi;
    let lastPrimarySplit = null;
    let lastDashSplit = null;
    let match;
    while((match = sepRegex.exec(between)) !== null){
        const token = match[0];
        const startIdx = match.index;
        const endIdx = startIdx + token.length;
        const left = between.slice(0, startIdx);
        const right = between.slice(endIdx);
        if (/^\s+[-–—]\s+$/.test(token)) {
            lastDashSplit = endIdx;
            continue;
        }
        if (token.includes('/')) {
            // Never split inside slash intervals like "6/6h", "8 / 8h", "8h / 8h" or dates like "8/8/2026"
            const leftEndsIntervalNum = /\b(?:4|6|8|12|24)\s*(?:h|hs|horas?)?$/i.test(left.trimEnd());
            const rightStartsIntervalNum = /^(?:4|6|8|12|24)(?:\s*(?:h|hs|horas?)\b|\b)/i.test(right.trimStart());
            const betweenDigits = /\d$/.test(left.trimEnd()) && /^\d/.test(right.trimStart());
            if (leftEndsIntervalNum && rightStartsIntervalNum || betweenDigits && !right.trimStart().includes(':')) {
                continue;
            }
        }
        if (/^\s+(?:e|ou)\s+$/i.test(token)) {
            // Do not split a paired clock time belonging to the left medication (e.g., "08:00 e 20:00 Amoxicilina 8/8h")
            const leftEndsClockTime = /\b(?:[01]?\d|2[0-3])\s*(?::[0-5]\d|h(?:[0-5]\d)?)\s*$/i.test(left);
            const rightIsBareClockTimeOnly = /^(?:[01]?\d|2[0-3])\s*(?::[0-5]\d|h(?:[0-5]\d)?)\s*$/i.test(right.trim());
            if (leftEndsClockTime && rightIsBareClockTimeOnly) {
                continue;
            }
        }
        lastPrimarySplit = endIdx;
    }
    return lastPrimarySplit ?? lastDashSplit;
}
function stripLeadingPrescriptionHeader(prefix) {
    // Remove leading metadata headers like "Receita 14:00 - " before the first drug so header timestamps
    // aren't misread as medication times, while keeping true pre-drug schedules like "Às 09:00 " or "08:00 - ".
    const dashIdx = prefix.search(/\s+[-–—]\s+/);
    if (dashIdx >= 0) {
        const beforeDash = normalizeText(prefix.slice(0, dashIdx));
        if (/\b(?:receita|prescricao|data|emitida|emitido|consulta|paciente|crm)\b/.test(beforeDash)) {
            return prefix.slice(dashIdx).replace(/^\s+[-–—]\s+/, '');
        }
    }
    return prefix;
}
function buildNormalizedWithIndexMap(raw) {
    let norm = '';
    const indexMap = [];
    let prevWasSpace = true;
    for(let i = 0; i < raw.length; i++){
        const base = raw[i].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (!base) continue;
        for(let j = 0; j < base.length; j++){
            const ch = base[j];
            if (/[a-z0-9:]/.test(ch)) {
                norm += ch;
                indexMap.push(i);
                prevWasSpace = false;
            } else if (!prevWasSpace) {
                norm += ' ';
                indexMap.push(i);
                prevWasSpace = true;
            }
        }
    }
    if (norm.endsWith(' ')) {
        norm = norm.slice(0, -1);
        indexMap.pop();
    }
    return {
        norm,
        indexMap
    };
}
function findNormalizedTermPos(normText, term) {
    if (!term) return -1;
    const escaped = escapeRegExp(term);
    const wordBoundaryMatch = new RegExp(`\\b${escaped}\\b`).exec(normText);
    if (wordBoundaryMatch) return wordBoundaryMatch.index;
    const tokenBoundaryMatch = new RegExp(`(?:^|[^a-z0-9])(${escaped})(?=$|[^a-z0-9])`).exec(normText);
    if (tokenBoundaryMatch) {
        return tokenBoundaryMatch.index + tokenBoundaryMatch[0].indexOf(tokenBoundaryMatch[1]);
    }
    return -1;
}
function levenshtein(a, b) {
    if (a === b) return 0;
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const prev = new Array(b.length + 1);
    const curr = new Array(b.length + 1);
    for(let j = 0; j <= b.length; j++)prev[j] = j;
    for(let i = 1; i <= a.length; i++){
        curr[0] = i;
        for(let j = 1; j <= b.length; j++){
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
        }
        for(let j = 0; j <= b.length; j++)prev[j] = curr[j];
    }
    return prev[b.length];
}
function searchMedications(catalog, query, category = 'todos') {
    const filteredByCategory = category === 'todos' ? catalog : catalog.filter((m)=>m.category === category);
    const q = normalizeText(query);
    if (!q) return filteredByCategory;
    const tokens = q.split(' ').filter((t)=>t.length >= 2);
    if (tokens.length === 0) return filteredByCategory;
    const scored = [];
    for (const med of filteredByCategory){
        const searchableFields = [
            normalizeText(med.name),
            normalizeText(med.activeIngredient),
            normalizeText(med.categoryLabel),
            normalizeText(med.purposeSimple),
            ...med.aliases.map(normalizeText),
            ...med.equivalents.map((e)=>normalizeText(e.name))
        ];
        let score = 0;
        const fullName = searchableFields[0];
        if (fullName === q) score += 100;
        else if (fullName.startsWith(q)) score += 70;
        else if (fullName.includes(q)) score += 50;
        for (const alias of med.aliases.map(normalizeText)){
            if (alias === q) score += 80;
            else if (alias.includes(q) || q.includes(alias)) score += 35;
        }
        for (const token of tokens){
            let tokenMatched = false;
            for (const field of searchableFields){
                if (field.includes(token)) {
                    score += 20;
                    tokenMatched = true;
                    break;
                }
            }
            // Fuzzy tolerance for phonetic / low-literacy spelling mistakes (e.g. "yumi", "losartan", "paracetamo")
            if (!tokenMatched && token.length >= 4) {
                const candidateWords = searchableFields.join(' ').split(' ').filter((w)=>w.length >= 4);
                for (const word of candidateWords){
                    const maxDist = token.length >= 6 ? 2 : 1;
                    if (levenshtein(token, word) <= maxDist) {
                        score += 12;
                        break;
                    }
                }
            }
        }
        if (score > 0) {
            scored.push({
                med,
                score
            });
        }
    }
    return scored.sort((a, b)=>b.score - a.score).map((s)=>s.med);
}
function extractTimesFromSnippet(text) {
    const times = new Set();
    // Match explicit HH:MM or HHhMM or HHh
    const explicitRegex = /\b([01]?\d|2[0-3])\s*(?::|h|hs|horas?)\s*([0-5]\d)?\b/gi;
    let match;
    while((match = explicitRegex.exec(text)) !== null){
        // Avoid capturing intervals/durations like "8 em 8h", "6/6h", "até 4h", "por 4h", "durante 4h", "após 2h"
        const rawPrefix = text.slice(Math.max(0, match.index - 14), match.index);
        const normPrefix = rawPrefix.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (/(?:em\s*|\/\s*|cada\s*|ate\s*|por\s*|durante\s*|apos\s*|depois\s*de\s*)$/.test(normPrefix)) {
            continue;
        }
        // Also skip "de 6 em 6h", "6/6h", and relative durations without ":" like "2h antes" or "4h depois"
        // (Keep explicit clock times with ":" like "07:00 antes do café"!)
        const normSuffix = text.slice(match.index + match[0].length, match.index + match[0].length + 14).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const hasColon = match[0].includes(':');
        if (/^\s*(?:em\s+\d|\/\s*\d)/.test(normSuffix)) continue;
        if (!hasColon && /^\s*(?:antes\b|depois\b|apos\b|atras\b)/.test(normSuffix)) continue;
        const hour = Number(match[1]);
        const min = match[2] ? Number(match[2]) : 0;
        const formatted = `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
        times.add(formatted);
    }
    if (times.size === 0) {
        const lowerNoAccents = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const hasInterval = (n)=>{
            const unit = '(?:h|hs|horas?)';
            // Explicit unit form: "6/6h", "6h/6h", "6hs/6hs", "6 horas / 6 horas", "6 em 6h", "cada 6h"
            const withUnit = new RegExp(`\\b(?:${n}\\s*${unit}?\\s*(?:em|\\/)\\s*${n}|cada\\s+${n})\\s*${unit}\\b`);
            if (withUnit.test(lowerNoAccents)) return true;
            // Unitless form: "6/6", "6 em 6", "cada 6" — guard against calendar dates like "8/8/2026"
            const withoutUnit = new RegExp(`(?<!\\d\\s*\\/)\\b(?:${n}\\s*(?:em|\\/)\\s*${n}|cada\\s+${n})\\b(?!\\s*\\/\\s*\\d)`);
            return withoutUnit.test(lowerNoAccents);
        };
        if (hasInterval(4)) {
            return [
                '06:00',
                '10:00',
                '14:00',
                '18:00',
                '22:00'
            ];
        }
        if (hasInterval(6)) {
            return [
                '06:00',
                '12:00',
                '18:00',
                '00:00'
            ];
        }
        if (hasInterval(8)) {
            return [
                '07:00',
                '15:00',
                '23:00'
            ];
        }
        if (hasInterval(12)) {
            return [
                '08:00',
                '20:00'
            ];
        }
        const norm = normalizeText(text);
        if (/\b(?:jejum|acordar)\b/.test(norm)) {
            times.add('07:00');
        } else if (/\b(?:manha|cafe)\b/.test(norm)) {
            times.add('08:00');
        }
        if (/\b(?:almoco)\b/.test(norm)) {
            times.add('12:00');
        }
        if (/\b(?:jantar)\b/.test(norm)) {
            times.add('20:00');
        }
        if (/\b(?:dormir|noite)\b/.test(norm)) {
            times.add('22:00');
        }
    }
    return Array.from(times).sort();
}
function parsePrescriptionText(rawText, catalog) {
    if (!rawText || !rawText.trim()) return [];
    const lines = splitPrescriptionLines(rawText);
    const normalizedFull = normalizeText(rawText);
    const rawMatches = [];
    for (const med of catalog){
        const terms = Array.from(new Set([
            normalizeText(med.name),
            ...med.name.split('/').map((s)=>normalizeText(s)),
            ...med.aliases.map(normalizeText),
            normalizeText(med.activeIngredient.split(' ')[0] ?? '')
        ])).filter((t)=>t.length >= 4 && !NON_DRUG_STOPWORDS.has(t));
        let bestMatchedTerm = null;
        let confidence = 'media';
        for (const term of terms){
            const regex = new RegExp(`\\b${escapeRegExp(term)}\\b`, 'i');
            if (regex.test(normalizedFull)) {
                bestMatchedTerm = term;
                confidence = 'alta';
                break;
            }
        }
        // Fallback fuzzy token check against words in text (helps noisy OCR like "Ium1", "Losartanna")
        if (!bestMatchedTerm) {
            const textWords = normalizedFull.split(' ').filter((w)=>w.length >= 4);
            const primaryKey = normalizeText(med.name.split('/')[0] ?? med.name).split(' ')[0] ?? '';
            if (primaryKey.length >= 4) {
                for (const word of textWords){
                    const maxDist = primaryKey.length >= 7 ? 2 : 1;
                    if (levenshtein(primaryKey, word) <= maxDist) {
                        bestMatchedTerm = word;
                        confidence = 'media';
                        break;
                    }
                }
            }
        }
        if (bestMatchedTerm && !rawMatches.some((r)=>r.medication.id === med.id)) {
            rawMatches.push({
                medication: med,
                matchedTerm: bestMatchedTerm,
                confidence
            });
        }
    }
    const indexedLines = lines.map((rawLine)=>({
            rawLine,
            ...buildNormalizedWithIndexMap(rawLine)
        }));
    const results = [];
    for (const item of rawMatches){
        const lineIdx = indexedLines.findIndex(({ norm })=>findNormalizedTermPos(norm, item.matchedTerm) >= 0);
        let lineTimes = [];
        if (lineIdx >= 0) {
            const { rawLine, norm: normLine, indexMap } = indexedLines[lineIdx];
            const siblingsOnLine = rawMatches.map((m)=>{
                const normStart = findNormalizedTermPos(normLine, m.matchedTerm);
                if (normStart < 0) return {
                    id: m.medication.id,
                    rawStart: -1,
                    rawEnd: -1
                };
                const rawStart = indexMap[normStart];
                const normEndIdx = Math.min(indexMap.length - 1, normStart + m.matchedTerm.length - 1);
                let rawEnd = (indexMap[normEndIdx] ?? rawStart) + 1;
                while(rawEnd < rawLine.length && /[\u0300-\u036f]/.test(rawLine[rawEnd])){
                    rawEnd += 1;
                }
                return {
                    id: m.medication.id,
                    rawStart,
                    rawEnd
                };
            }).filter((s)=>s.rawStart >= 0).sort((a, b)=>a.rawStart - b.rawStart);
            if (siblingsOnLine.length > 1) {
                const myIdx = siblingsOnLine.findIndex((s)=>s.id === item.medication.id);
                if (myIdx >= 0) {
                    // Compute raw clause boundaries between adjacent medications so both post-drug
                    // ("Dipirona 6/6h e Amoxicilina 8/8h") and pre-drug ("Às 09:00 Losartana e às 18:00 Amoxicilina")
                    // schedules stay scoped to the right medication while preserving raw punctuation like "/".
                    const boundaries = [
                        0
                    ];
                    for(let k = 0; k < siblingsOnLine.length - 1; k++){
                        const leftEnd = Math.min(siblingsOnLine[k].rawEnd, siblingsOnLine[k + 1].rawStart);
                        const rightStart = siblingsOnLine[k + 1].rawStart;
                        const between = rawLine.slice(leftEnd, rightStart);
                        const splitOffset = findClauseSplitOffset(between);
                        boundaries.push(splitOffset !== null ? leftEnd + splitOffset : rightStart);
                    }
                    boundaries.push(rawLine.length);
                    const my = siblingsOnLine[myIdx];
                    const clauseStart = boundaries[myIdx];
                    const clauseEnd = boundaries[myIdx + 1];
                    // Prefer times written after the drug name within its clause; if none, check its pre-drug prefix.
                    const afterDrug = rawLine.slice(my.rawStart, Math.max(my.rawStart, clauseEnd));
                    lineTimes = extractTimesFromSnippet(afterDrug);
                    if (lineTimes.length === 0 && my.rawStart > clauseStart) {
                        const rawPrefix = rawLine.slice(clauseStart, my.rawStart);
                        const cleanPrefix = myIdx === 0 ? stripLeadingPrescriptionHeader(rawPrefix) : rawPrefix;
                        lineTimes = extractTimesFromSnippet(cleanPrefix);
                    }
                }
            } else {
                lineTimes = extractTimesFromSnippet(stripLeadingPrescriptionHeader(rawLine));
            }
        } else {
            lineTimes = extractTimesFromSnippet(rawText);
        }
        // Classic Brazilian 2-line prescription: drug name on line N, dosage/time on line N+1
        if (lineTimes.length === 0 && lineIdx >= 0 && lineIdx + 1 < indexedLines.length) {
            const nextLine = indexedLines[lineIdx + 1];
            const nextLineMentionsOtherMed = rawMatches.some((other)=>other.medication.id !== item.medication.id && findNormalizedTermPos(nextLine.norm, other.matchedTerm) >= 0);
            if (!nextLineMentionsOtherMed) {
                lineTimes = extractTimesFromSnippet(nextLine.rawLine);
            }
        }
        results.push({
            medication: item.medication,
            matchedTerm: item.matchedTerm,
            detectedTimes: lineTimes.length > 0 ? lineTimes : item.medication.howToTake.defaultTimes,
            detectedDosage: item.medication.howToTake.defaultDosage,
            confidence: item.confidence
        });
    }
    return results;
}
function createCustomMedication(input) {
    const cleanName = input.name.trim() || 'Meu Remédio';
    const slug = normalizeText(cleanName).replace(/\s+/g, '-').slice(0, 24) || 'custom';
    const id = `custom-${slug}-${Date.now()}`;
    const themes = {
        teal: {
            primaryColor: '#CCFBF1',
            secondaryColor: '#5EEAD4',
            accentColor: '#0F766E',
            pillColor: '#14B8A6'
        },
        pink: {
            primaryColor: '#FCE7F3',
            secondaryColor: '#F9A8D4',
            accentColor: '#9D174D',
            pillColor: '#F472B6'
        },
        blue: {
            primaryColor: '#DBEAFE',
            secondaryColor: '#93C5FD',
            accentColor: '#1E40AF',
            pillColor: '#3B82F6'
        },
        amber: {
            primaryColor: '#FEF3C7',
            secondaryColor: '#FDE68A',
            accentColor: '#B45309',
            pillColor: '#F59E0B'
        },
        purple: {
            primaryColor: '#EDE9FE',
            secondaryColor: '#C4B5FD',
            accentColor: '#5B21B6',
            pillColor: '#8B5CF6'
        }
    };
    const palette = themes[input.colorTheme ?? 'teal'];
    const dosage = input.dosage?.trim() || '1 comprimido';
    const notes = input.notes?.trim() || 'Siga a receita do seu médico e tome com água.';
    return {
        id,
        name: cleanName,
        activeIngredient: input.activeIngredient?.trim() || 'Medicamento cadastrado por você',
        strength: dosage,
        manufacturer: 'Receita pessoal',
        category: 'outro',
        categoryLabel: 'Meu Cadastro',
        aliases: [
            cleanName.toLowerCase()
        ],
        pack: {
            style: 'blister-box',
            ...palette,
            labelText: cleanName.toUpperCase().slice(0, 11),
            stripeType: 'vermelha'
        },
        purposeSimple: notes,
        howToTake: {
            items: [
                {
                    icon: 'pill',
                    shortLabel: dosage.slice(0, 14),
                    spokenDetail: `Dose cadastrada: ${dosage}.`
                },
                {
                    icon: 'clock',
                    shortLabel: 'No horário',
                    spokenDetail: 'Tome sempre no horário marcado no seu alarme.'
                },
                {
                    icon: 'water',
                    shortLabel: 'Com água',
                    spokenDetail: 'Tome com um copo de água, salvo orientação diferente.'
                }
            ],
            summary: notes,
            spokenScript: `Como tomar ${cleanName}: ${dosage}. ${notes}`,
            defaultDosage: dosage,
            defaultTimes: [
                '08:00'
            ]
        },
        whatNotToDo: {
            items: [
                {
                    icon: 'no-alcohol',
                    shortLabel: 'Evite álcool',
                    spokenDetail: 'Evite bebidas alcoólicas sem perguntar ao médico ou farmacêutico.'
                },
                {
                    icon: 'alert-triangle',
                    shortLabel: 'Não dobre dose',
                    spokenDetail: 'Se esquecer, não tome duas doses de uma vez sem orientação.'
                },
                {
                    icon: 'doctor',
                    shortLabel: 'Confirme bula',
                    spokenDetail: 'Em caso de dúvida ou reação estranha, consulte o médico ou farmacêutico.'
                }
            ],
            summary: 'Nunca dobre a dose se esquecer e evite misturar com álcool.',
            spokenScript: `Cuidados com ${cleanName}: evite álcool, não dobre a dose se esquecer e tire dúvidas com seu médico ou farmacêutico.`
        },
        whatYouCanDo: {
            items: [
                {
                    icon: 'shield-check',
                    shortLabel: 'Use o alarme',
                    spokenDetail: 'Ative o lembrete na aba Horários para não esquecer.'
                },
                {
                    icon: 'doctor',
                    shortLabel: 'Peça o genérico',
                    spokenDetail: 'Na farmácia, pergunte ao farmacêutico se existe genérico bioequivalente e se há diferenças de excipientes.'
                }
            ],
            missedDoseTip: 'Se esquecer uma dose, confira a receita ou pergunte ao farmacêutico. Não dobre a quantidade.',
            onsetTime: 'Conforme orientação da sua receita médica.',
            spokenScript: `Você pode configurar alarmes para ${cleanName} na aba Horários e conferir opções genéricas com seu farmacêutico.`
        },
        genericsHighlight: {
            sameEffectBadge: 'Pergunte na farmácia',
            switchWarningShort: 'Ao trocar de marca, observe excipientes, lactose e revestimento',
            spokenScript: `Para ${cleanName}, pergunte ao farmacêutico se há genérico bioequivalente com a tarja amarela G e fique atento a diferenças de revestimento ou lactose na troca.`
        },
        equivalents: [
            {
                id: `${id}-ref`,
                name: `${cleanName} (Cadastrado)`,
                lab: 'Conforme sua receita',
                type: 'referencia',
                bioequivalent: true,
                basePriceMin: 0,
                basePriceMax: 0,
                coatingOrTech: 'Confira a caixa do seu medicamento',
                excipients: {
                    hasLactose: false,
                    hasDyes: false,
                    keyNotes: 'Verifique na embalagem se contém lactose, açúcar ou corantes caso tenha alergia.'
                },
                absorptionNote: 'Se trocar de marca ou laboratório, observe nos primeiros dias se nota qualquer sintoma novo (como inchaço ou dor de estômago).',
                switchingEffects: [],
                switchVerdict: {
                    level: 'atencao',
                    headline: 'Medicamento cadastrado manualmente',
                    explanation: 'Peça ao farmacêutico a lista de genéricos intercambiáveis registrados na ANVISA para esta molécula.'
                },
                spokenSummary: `${cleanName} foi cadastrado manualmente por você. Pergunte ao farmacêutico sobre genéricos registrados na ANVISA.`
            }
        ],
        isCustom: true
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/pricing.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateRegionalPrice",
    ()=>calculateRegionalPrice,
    "calculateSavingsPercent",
    ()=>calculateSavingsPercent,
    "formatBRL",
    ()=>formatBRL,
    "getLowestGenericPrice",
    ()=>getLowestGenericPrice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$regions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/regions.ts [app-client] (ecmascript)");
;
function calculateRegionalPrice(product, uf) {
    const region = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$regions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRegionByUf"])(uf);
    const isFreeSus = Boolean(product.farmaciaPopularFree && product.basePriceMin === 0);
    if (!isFreeSus && product.basePriceMin <= 0 && product.basePriceMax <= 0) {
        return {
            min: 0,
            max: 0,
            isFreeSus: false,
            formattedMin: 'Consulte farmácia',
            formattedRange: 'Consulte na farmácia'
        };
    }
    const min = isFreeSus ? 0 : Math.max(1, Math.round(product.basePriceMin * region.priceMultiplier));
    const max = Math.max(min, Math.round(product.basePriceMax * region.priceMultiplier));
    const formattedMin = isFreeSus ? 'Grátis (SUS)' : formatBRL(min);
    const formattedRange = isFreeSus ? `Grátis no SUS · ou até ${formatBRL(max)}` : min === max ? formatBRL(min) : `${formatBRL(min)} – ${formatBRL(max)}`;
    return {
        min,
        max,
        isFreeSus,
        formattedMin,
        formattedRange
    };
}
function formatBRL(value) {
    if (!Number.isFinite(value) || value < 0) return 'R$ 0';
    const rounded = Math.round(value);
    return `R$ ${rounded.toLocaleString('pt-BR')}`;
}
function getLowestGenericPrice(medication, uf) {
    const alternatives = medication.equivalents.filter((eq)=>eq.type !== 'referencia');
    const pool = alternatives.length > 0 ? alternatives : medication.equivalents;
    if (pool.length === 0) {
        return {
            priceText: 'Consulte farmácia',
            isFreeSus: false,
            minPrice: 0,
            cheapestProduct: null
        };
    }
    let bestProduct = pool[0];
    let bestRange = calculateRegionalPrice(pool[0], uf);
    for (const eq of pool.slice(1)){
        const range = calculateRegionalPrice(eq, uf);
        if (range.min < bestRange.min) {
            bestProduct = eq;
            bestRange = range;
        }
    }
    const region = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$regions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRegionByUf"])(uf);
    const ufSuffix = region.uf === 'BR' ? 'Brasil' : region.uf;
    if (bestRange.isFreeSus) {
        return {
            priceText: `Grátis no SUS (${ufSuffix})`,
            isFreeSus: true,
            minPrice: 0,
            cheapestProduct: bestProduct
        };
    }
    if (bestRange.min <= 0 && bestRange.max <= 0) {
        return {
            priceText: `Consulte farmácia (${ufSuffix})`,
            isFreeSus: false,
            minPrice: 0,
            cheapestProduct: bestProduct
        };
    }
    return {
        priceText: `A partir de ${bestRange.formattedMin} (${ufSuffix})`,
        isFreeSus: false,
        minPrice: bestRange.min,
        cheapestProduct: bestProduct
    };
}
function calculateSavingsPercent(reference, alternative, uf) {
    if (!reference || reference.id === alternative.id) return null;
    const refPrice = calculateRegionalPrice(reference, uf);
    const altPrice = calculateRegionalPrice(alternative, uf);
    const refAvg = (refPrice.min + refPrice.max) / 2;
    if (refAvg <= 0) return null;
    if (altPrice.isFreeSus) return 100;
    const altAvg = (altPrice.min + altPrice.max) / 2;
    const pct = Math.round((refAvg - altAvg) / refAvg * 100);
    return pct > 0 ? pct : 0;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/scheduleEngine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildLast7DaysAdherence",
    ()=>buildLast7DaysAdherence,
    "computeDelayMinutes",
    ()=>computeDelayMinutes,
    "findDueAlarmNow",
    ()=>findDueAlarmNow,
    "formatLocalDateStr",
    ()=>formatLocalDateStr,
    "formatPunctualityLabel",
    ()=>formatPunctualityLabel,
    "formatTimeHHMM",
    ()=>formatTimeHHMM,
    "getDosesForDate",
    ()=>getDosesForDate,
    "getPeriodForTime",
    ()=>getPeriodForTime,
    "getPeriodMeta",
    ()=>getPeriodMeta,
    "getScheduleCycleInfo",
    ()=>getScheduleCycleInfo,
    "timeToMinutes",
    ()=>timeToMinutes
]);
function formatLocalDateStr(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}
function formatTimeHHMM(date) {
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
}
function timeToMinutes(hhmm) {
    const [hStr, mStr] = hhmm.split(':');
    const h = Number(hStr);
    const m = Number(mStr);
    if (!Number.isFinite(h) || !Number.isFinite(m)) return 0;
    return h * 60 + m;
}
function getPeriodForTime(hhmm) {
    const mins = timeToMinutes(hhmm);
    if (mins >= 300 && mins < 720) return 'manha'; // 05:00 - 11:59
    if (mins >= 720 && mins < 1080) return 'tarde'; // 12:00 - 17:59
    return 'noite'; // 18:00 - 04:59
}
function getPeriodMeta(period) {
    switch(period){
        case 'manha':
            return {
                label: 'Manhã',
                emoji: '🌅',
                range: '05h às 11h59'
            };
        case 'tarde':
            return {
                label: 'Tarde',
                emoji: '☀️',
                range: '12h às 17h59'
            };
        case 'noite':
            return {
                label: 'Noite',
                emoji: '🌙',
                range: '18h em diante'
            };
    }
}
function getScheduleCycleInfo(schedule, targetDate) {
    if (schedule.cycleMode === 'daily') return null;
    const createdDate = new Date(schedule.createdAt);
    if (Number.isNaN(createdDate.getTime())) return null;
    const startUtc = Date.UTC(createdDate.getFullYear(), createdDate.getMonth(), createdDate.getDate());
    const targetUtc = Date.UTC(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
    const daysDiff = Math.round((targetUtc - startUtc) / 86_400_000);
    if (daysDiff < 0) return null;
    const activeDays = schedule.cycleMode === '24_4' ? 24 : 21;
    const pauseDays = schedule.cycleMode === '24_4' ? 4 : 7;
    const cycleLen = activeDays + pauseDays;
    const pos = daysDiff % cycleLen;
    if (pos < activeDays) {
        return {
            isPauseDay: false,
            dayInPhase: pos + 1,
            phaseLength: activeDays,
            activeDays,
            pauseDays
        };
    }
    return {
        isPauseDay: true,
        dayInPhase: pos - activeDays + 1,
        phaseLength: pauseDays,
        activeDays,
        pauseDays
    };
}
function computeDelayMinutes(scheduledTime, actualDate, scheduledDateStr) {
    const [hStr, mStr] = scheduledTime.split(':');
    const schedH = Number(hStr);
    const schedM = Number(mStr);
    if (scheduledDateStr && Number.isFinite(schedH) && Number.isFinite(schedM)) {
        const parts = scheduledDateStr.split('-').map(Number);
        if (parts.length === 3 && parts.every(Number.isFinite)) {
            const scheduledDate = new Date(parts[0], parts[1] - 1, parts[2], schedH, schedM, 0, 0);
            return Math.round((actualDate.getTime() - scheduledDate.getTime()) / 60_000);
        }
    }
    const scheduledMins = timeToMinutes(scheduledTime);
    const actualMins = actualDate.getHours() * 60 + actualDate.getMinutes();
    let diff = actualMins - scheduledMins;
    // Handle midnight wrap-around (e.g., scheduled 23:55 taken at 00:05 = +10 min)
    if (diff < -720) diff += 1440;
    else if (diff > 720) diff -= 1440;
    return diff;
}
function formatPunctualityLabel(delayMinutes) {
    if (Math.abs(delayMinutes) <= 15) {
        return {
            label: 'No horário certinho ✓',
            isOnTime: true
        };
    }
    if (delayMinutes > 15) {
        const hrs = Math.floor(delayMinutes / 60);
        const mins = delayMinutes % 60;
        const duration = hrs > 0 ? `${hrs}h${mins > 0 ? `${mins}min` : ''}` : `${mins} min`;
        return {
            label: `${duration} depois`,
            isOnTime: false
        };
    }
    const absMins = Math.abs(delayMinutes);
    const hrs = Math.floor(absMins / 60);
    const mins = absMins % 60;
    const duration = hrs > 0 ? `${hrs}h${mins > 0 ? `${mins}min` : ''}` : `${mins} min`;
    return {
        label: `${duration} antes`,
        isOnTime: true
    };
}
function getDosesForDate(schedules, logs, medications, targetDate, now = new Date()) {
    const dateStr = formatLocalDateStr(targetDate);
    const todayStr = formatLocalDateStr(now);
    const dayOfWeek = targetDate.getDay();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const medMap = new Map(medications.map((m)=>[
            m.id,
            m
        ]));
    const instances = [];
    for (const schedule of schedules){
        if (!schedule.enabled) continue;
        if (schedule.daysOfWeek.length > 0 && !schedule.daysOfWeek.includes(dayOfWeek)) {
            continue;
        }
        // Do not count dates strictly before the schedule was created unless a log exists for that date
        const createdDate = new Date(schedule.createdAt);
        const createdDateStr = Number.isNaN(createdDate.getTime()) ? null : formatLocalDateStr(createdDate);
        const hasLogOnDate = logs.some((l)=>l.scheduleId === schedule.id && l.dateStr === dateStr);
        if (createdDateStr && dateStr < createdDateStr && !hasLogOnDate) {
            continue;
        }
        // Respect contraceptive/cycle pause days (24+4 or 21+7) unless explicitly logged
        const cycleInfo = getScheduleCycleInfo(schedule, targetDate);
        if (cycleInfo?.isPauseDay && !hasLogOnDate) {
            continue;
        }
        const uniqueTimes = Array.from(new Set(schedule.times));
        for (const scheduledTime of uniqueTimes){
            const log = logs.find((l)=>l.scheduleId === schedule.id && l.dateStr === dateStr && l.scheduledTime === scheduledTime);
            const schedMins = timeToMinutes(scheduledTime);
            const minutesDeltaFromNow = schedMins - nowMinutes;
            let status = 'upcoming';
            if (log?.status === 'taken') {
                status = 'taken';
            } else if (log?.status === 'skipped') {
                status = 'skipped';
            } else if (dateStr < todayStr) {
                status = 'late';
            } else if (dateStr === todayStr) {
                if (minutesDeltaFromNow < -15) {
                    status = 'late';
                } else if (minutesDeltaFromNow <= 15) {
                    status = 'due_now';
                } else {
                    status = 'upcoming';
                }
            }
            instances.push({
                key: `${schedule.id}__${dateStr}__${scheduledTime}`,
                scheduleId: schedule.id,
                medicationId: schedule.medicationId,
                medication: medMap.get(schedule.medicationId),
                dosage: schedule.dosage,
                dateStr,
                scheduledTime,
                period: getPeriodForTime(scheduledTime),
                status,
                log,
                minutesDeltaFromNow,
                notes: schedule.notes
            });
        }
    }
    return instances.sort((a, b)=>timeToMinutes(a.scheduledTime) - timeToMinutes(b.scheduledTime));
}
const WEEKDAYS_PT = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sáb'
];
function buildLast7DaysAdherence(schedules, logs, medications, now = new Date()) {
    const result = [];
    const todayStr = formatLocalDateStr(now);
    for(let offset = -6; offset <= 0; offset++){
        const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
        const dateStr = formatLocalDateStr(d);
        const doses = getDosesForDate(schedules, logs, medications, d, now);
        const totalScheduled = doses.length;
        const taken = doses.filter((item)=>item.status === 'taken');
        const skipped = doses.filter((item)=>item.status === 'skipped');
        const onTimeCount = taken.filter((item)=>Math.abs(item.log?.delayMinutes ?? 0) <= 15).length;
        let status = 'none';
        if (totalScheduled === 0) {
            status = 'none';
        } else if (taken.length === totalScheduled) {
            status = 'complete';
        } else if (taken.length > 0) {
            status = 'partial';
        } else if (dateStr === todayStr && doses.some((item)=>item.status === 'upcoming' || item.status === 'due_now')) {
            status = 'partial';
        } else {
            status = 'missed';
        }
        result.push({
            dateStr,
            weekdayShort: WEEKDAYS_PT[d.getDay()],
            dayNumber: d.getDate(),
            totalScheduled,
            takenCount: taken.length,
            onTimeCount,
            skippedCount: skipped.length,
            isToday: dateStr === todayStr,
            status
        });
    }
    return result;
}
function findDueAlarmNow(dosesToday, now, dismissedKeys, snoozedUntilMap, activeRingingKey = null) {
    const currentHHMM = formatTimeHHMM(now);
    const nowMs = now.getTime();
    for (const dose of dosesToday){
        if (dose.status === 'taken' || dose.status === 'skipped') continue;
        if (dismissedKeys.has(dose.key)) continue;
        if (activeRingingKey && dose.key === activeRingingKey) continue;
        const snoozedUntil = snoozedUntilMap[dose.key];
        if (snoozedUntil) {
            if (nowMs >= snoozedUntil) {
                return dose;
            }
            continue;
        }
        if (dose.scheduledTime === currentHHMM) {
            return dose;
        }
    }
    return null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/storage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AI_KEYS_STORAGE_KEY",
    ()=>AI_KEYS_STORAGE_KEY,
    "STORAGE_KEY",
    ()=>STORAGE_KEY,
    "createDefaultState",
    ()=>createDefaultState,
    "loadClientAiKeys",
    ()=>loadClientAiKeys,
    "loadPersistedState",
    ()=>loadPersistedState,
    "saveClientAiKeys",
    ()=>saveClientAiKeys,
    "savePersistedState",
    ()=>savePersistedState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$scheduleEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/scheduleEngine.ts [app-client] (ecmascript)");
;
const STORAGE_KEY = 'meu_remedio_state_v1';
const AI_KEYS_STORAGE_KEY = 'meu_remedio_ai_keys_v2';
function createDefaultState(now = new Date()) {
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    const yesterdayStr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$scheduleEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatLocalDateStr"])(yesterday);
    return {
        version: 1,
        selectedUf: 'SP',
        voice: {
            enabled: true,
            rate: 'normal',
            guidedMode: false,
            voiceProfile: 'acolhedora'
        },
        myMedicationIds: [
            'iumi',
            'losartana',
            'glifage-xr'
        ],
        activeMedicationId: 'iumi',
        customMedications: [],
        medicationPhotos: {},
        schedules: [
            {
                id: 'sched-losartana-default',
                medicationId: 'losartana',
                dosage: '1 comprimido (50 mg)',
                times: [
                    '08:00'
                ],
                daysOfWeek: [
                    0,
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ],
                cycleMode: 'daily',
                enabled: true,
                notes: 'Com água pela manhã',
                createdAt: yesterday.toISOString()
            },
            {
                id: 'sched-iumi-default',
                medicationId: 'iumi',
                dosage: '1 comprimido',
                times: [
                    '21:00'
                ],
                daysOfWeek: [
                    0,
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ],
                cycleMode: '24_4',
                enabled: true,
                notes: '24 dias + 4 dias de pausa, sempre no mesmo horário',
                createdAt: yesterday.toISOString()
            }
        ],
        doseLogs: [
            {
                id: 'log-seed-1',
                scheduleId: 'sched-losartana-default',
                medicationId: 'losartana',
                dateStr: yesterdayStr,
                scheduledTime: '08:00',
                status: 'taken',
                actionTimestamp: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 8, 3).toISOString(),
                takenTimeDisplay: '08:03',
                delayMinutes: 3
            },
            {
                id: 'log-seed-2',
                scheduleId: 'sched-iumi-default',
                medicationId: 'iumi',
                dateStr: yesterdayStr,
                scheduledTime: '21:00',
                status: 'taken',
                actionTimestamp: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 21, 2).toISOString(),
                takenTimeDisplay: '21:02',
                delayMinutes: 2
            }
        ]
    };
}
function getSafeLocalStorage() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const ls = window.localStorage;
        if (ls && typeof ls.getItem === 'function' && typeof ls.setItem === 'function') {
            return ls;
        }
    } catch  {
        return null;
    }
    return null;
}
function loadPersistedState() {
    const storage = getSafeLocalStorage();
    if (!storage) {
        return createDefaultState();
    }
    try {
        const raw = storage.getItem(STORAGE_KEY);
        if (!raw) return createDefaultState();
        const parsed = JSON.parse(raw);
        const defaults = createDefaultState();
        return {
            version: 1,
            selectedUf: typeof parsed.selectedUf === 'string' ? parsed.selectedUf : defaults.selectedUf,
            voice: {
                enabled: typeof parsed.voice?.enabled === 'boolean' ? parsed.voice.enabled : defaults.voice.enabled,
                rate: parsed.voice?.rate === 'slow' ? 'slow' : 'normal',
                guidedMode: Boolean(parsed.voice?.guidedMode),
                voiceProfile: parsed.voice?.voiceProfile === 'clara' || parsed.voice?.voiceProfile === 'calma' ? parsed.voice.voiceProfile : 'acolhedora'
            },
            myMedicationIds: Array.isArray(parsed.myMedicationIds) && parsed.myMedicationIds.length > 0 ? parsed.myMedicationIds : defaults.myMedicationIds,
            activeMedicationId: typeof parsed.activeMedicationId === 'string' && parsed.activeMedicationId ? parsed.activeMedicationId : defaults.activeMedicationId,
            customMedications: Array.isArray(parsed.customMedications) ? parsed.customMedications : [],
            medicationPhotos: parsed.medicationPhotos && typeof parsed.medicationPhotos === 'object' ? parsed.medicationPhotos : {},
            schedules: Array.isArray(parsed.schedules) ? parsed.schedules : defaults.schedules,
            doseLogs: Array.isArray(parsed.doseLogs) ? parsed.doseLogs : defaults.doseLogs
        };
    } catch  {
        return createDefaultState();
    }
}
function savePersistedState(state) {
    const storage = getSafeLocalStorage();
    if (!storage) return;
    try {
        storage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch  {
    // Ignore storage quota errors
    }
}
function loadClientAiKeys() {
    const storage = getSafeLocalStorage();
    if (!storage) return {};
    try {
        const raw = storage.getItem(AI_KEYS_STORAGE_KEY);
        if (!raw) return {};
        const parsed = JSON.parse(raw);
        return {
            elevenLabsKey: typeof parsed.elevenLabsKey === 'string' ? parsed.elevenLabsKey.trim() : '',
            elevenLabsVoiceId: typeof parsed.elevenLabsVoiceId === 'string' ? parsed.elevenLabsVoiceId.trim() : '',
            geminiKey: typeof parsed.geminiKey === 'string' ? parsed.geminiKey.trim() : ''
        };
    } catch  {
        return {};
    }
}
function saveClientAiKeys(keys) {
    const storage = getSafeLocalStorage();
    if (!storage) return;
    try {
        storage.setItem(AI_KEYS_STORAGE_KEY, JSON.stringify({
            elevenLabsKey: keys.elevenLabsKey?.trim() || '',
            elevenLabsVoiceId: keys.elevenLabsVoiceId?.trim() || '',
            geminiKey: keys.geminiKey?.trim() || ''
        }));
    } catch  {
    // Ignore storage quota errors
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/voiceEngine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "voiceEngine",
    ()=>voiceEngine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/storage.ts [app-client] (ecmascript)");
;
class NaturalVoiceEngine {
    state = {
        status: 'idle',
        sectionId: null,
        provider: null,
        needsNaturalKeyNotice: false
    };
    listeners = new Set();
    runId = 0;
    audioEl = null;
    abortController = null;
    blobCache = new Map();
    activeUtterance = null;
    subscribe(listener) {
        this.listeners.add(listener);
        listener(this.state);
        return ()=>{
            this.listeners.delete(listener);
        };
    }
    getState() {
        return this.state;
    }
    emit(partial) {
        this.state = {
            ...this.state,
            ...partial
        };
        for (const listener of this.listeners){
            listener(this.state);
        }
    }
    stop() {
        this.runId += 1;
        if (this.abortController) {
            this.abortController.abort();
            this.abortController = null;
        }
        if (this.audioEl) {
            this.audioEl.onended = null;
            this.audioEl.onerror = null;
            this.audioEl.pause();
            this.audioEl.currentTime = 0;
            this.audioEl = null;
        }
        if (this.activeUtterance) {
            this.activeUtterance.onend = null;
            this.activeUtterance.onerror = null;
            this.activeUtterance = null;
        }
        if (("TURBOPACK compile-time value", "object") !== 'undefined' && 'speechSynthesis' in window) {
            try {
                window.speechSynthesis.cancel();
            } catch  {
            // Ignore browser cancel errors
            }
        }
        this.emit({
            status: 'idle',
            sectionId: null
        });
    }
    clearCache() {
        for (const entry of this.blobCache.values()){
            URL.revokeObjectURL(entry.url);
        }
        this.blobCache.clear();
    }
    async speak(text, options) {
        const cleanText = text.trim();
        if (!cleanText) return;
        this.stop();
        const myRunId = this.runId;
        const rate = options.rate ?? 'normal';
        const voiceProfile = options.voiceProfile ?? 'acolhedora';
        const keys = options.keysOverride ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadClientAiKeys"])();
        const cacheKey = `${voiceProfile}:${rate}:${keys.elevenLabsVoiceId || ''}:${cleanText}`;
        // Instant replay from client blob cache
        const cached = this.blobCache.get(cacheKey);
        if (cached) {
            this.playAudioUrl(cached.url, cached.provider, options.sectionId, myRunId, options.onEnd);
            return;
        }
        this.emit({
            status: 'loading',
            sectionId: options.sectionId
        });
        const controller = new AbortController();
        this.abortController = controller;
        try {
            const headers = {
                'Content-Type': 'application/json'
            };
            if (keys.elevenLabsKey) headers['x-elevenlabs-key'] = keys.elevenLabsKey;
            if (keys.elevenLabsVoiceId) headers['x-elevenlabs-voice-id'] = keys.elevenLabsVoiceId;
            if (keys.geminiKey) headers['x-gemini-key'] = keys.geminiKey;
            const resp = await fetch('/api/tts', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    text: cleanText,
                    rate,
                    voiceProfile
                }),
                signal: controller.signal
            });
            if (this.runId !== myRunId) return;
            if (resp.ok) {
                const providerHeader = resp.headers.get('X-TTS-Provider');
                const provider = providerHeader === 'gemini' ? 'gemini' : 'elevenlabs';
                const blob = await resp.blob();
                if (this.runId !== myRunId) return;
                const url = URL.createObjectURL(blob);
                if (this.blobCache.size > 40) {
                    const oldest = this.blobCache.keys().next().value;
                    if (oldest) {
                        const oldEntry = this.blobCache.get(oldest);
                        if (oldEntry) URL.revokeObjectURL(oldEntry.url);
                        this.blobCache.delete(oldest);
                    }
                }
                this.blobCache.set(cacheKey, {
                    url,
                    provider
                });
                this.emit({
                    needsNaturalKeyNotice: false
                });
                this.playAudioUrl(url, provider, options.sectionId, myRunId, options.onEnd);
                return;
            }
            // 501 = no natural TTS key yet; fallback gracefully and let UI offer 1-tap setup
            this.emit({
                needsNaturalKeyNotice: true
            });
            this.speakBrowserFallback(cleanText, options.sectionId, rate, myRunId, options.onEnd);
        } catch (err) {
            if (err?.name === 'AbortError' || this.runId !== myRunId) return;
            this.emit({
                needsNaturalKeyNotice: true
            });
            this.speakBrowserFallback(cleanText, options.sectionId, rate, myRunId, options.onEnd);
        }
    }
    playAudioUrl(url, provider, sectionId, myRunId, onEnd) {
        if (this.runId !== myRunId) return;
        const audio = new Audio(url);
        this.audioEl = audio;
        this.emit({
            status: 'playing',
            sectionId,
            provider,
            needsNaturalKeyNotice: false
        });
        audio.onended = ()=>{
            if (this.runId === myRunId) {
                this.audioEl = null;
                this.emit({
                    status: 'idle',
                    sectionId: null
                });
                onEnd?.();
            }
        };
        audio.onerror = ()=>{
            if (this.runId === myRunId) {
                this.audioEl = null;
                this.emit({
                    status: 'idle',
                    sectionId: null
                });
            }
        };
        audio.play().catch(()=>{
            if (this.runId === myRunId) {
                this.audioEl = null;
                this.emit({
                    status: 'idle',
                    sectionId: null
                });
            }
        });
    }
    speakBrowserFallback(text, sectionId, rate, myRunId, onEnd) {
        if (("TURBOPACK compile-time value", "object") === 'undefined' || !('speechSynthesis' in window) || typeof window.SpeechSynthesisUtterance === 'undefined') {
            this.emit({
                status: 'idle',
                sectionId: null,
                provider: null
            });
            onEnd?.();
            return;
        }
        const utterance = new window.SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR';
        utterance.rate = rate === 'slow' ? 0.82 : 0.96;
        utterance.pitch = 1.0;
        const voices = window.speechSynthesis.getVoices();
        const bestVoice = voices.find((v)=>v.lang.toLowerCase() === 'pt-br' && /google|enhanced|premium|natural|francisca|thalita|fernanda/i.test(v.name)) ?? voices.find((v)=>v.lang.toLowerCase() === 'pt-br') ?? voices.find((v)=>v.lang.toLowerCase().startsWith('pt'));
        if (bestVoice) utterance.voice = bestVoice;
        utterance.onend = ()=>{
            if (this.runId === myRunId) {
                this.activeUtterance = null;
                this.emit({
                    status: 'idle',
                    sectionId: null
                });
                onEnd?.();
            }
        };
        utterance.onerror = ()=>{
            if (this.runId === myRunId) {
                this.activeUtterance = null;
                this.emit({
                    status: 'idle',
                    sectionId: null
                });
            }
        };
        this.activeUtterance = utterance;
        this.emit({
            status: 'playing',
            sectionId,
            provider: 'browser'
        });
        window.speechSynthesis.speak(utterance);
    }
    isRecognitionSupported() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const w = window;
        return Boolean(w.SpeechRecognition || w.webkitSpeechRecognition);
    }
    startListening(callbacks) {
        if (!this.isRecognitionSupported()) {
            callbacks.onError('Seu navegador não liberou o microfone. Você pode digitar ou tirar uma foto.');
            return null;
        }
        this.stop();
        const w = window;
        const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
        if (!Ctor) return null;
        const recognition = new Ctor();
        recognition.lang = 'pt-BR';
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.onresult = (event)=>{
            const transcript = event.results?.[0]?.[0]?.transcript?.trim() ?? '';
            if (transcript) {
                callbacks.onResult(transcript);
            } else {
                callbacks.onError('Não consegui ouvir com clareza. Tente falar mais perto.');
            }
        };
        recognition.onerror = (event)=>{
            if (event.error === 'not-allowed') {
                callbacks.onError('Permita o uso do microfone no navegador para falar com o app.');
            } else if (event.error === 'no-speech') {
                callbacks.onError('Não ouvi nenhuma fala. Toque novamente e fale o nome do remédio.');
            } else {
                callbacks.onError('Não consegui captar o áudio agora. Tente novamente.');
            }
        };
        recognition.onend = ()=>{
            callbacks.onEnd?.();
        };
        try {
            recognition.start();
        } catch  {
            callbacks.onError('Não foi possível abrir o microfone.');
            return null;
        }
        return ()=>{
            try {
                recognition.stop();
            } catch  {
            // Ignore
            }
        };
    }
    /**
   * Soft, warm spa-like double chime (Headspace/Apple Health feel instead of harsh beep)
   */ playGentleChime() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            const w = window;
            const Ctx = w.AudioContext ?? w.webkitAudioContext;
            if (!Ctx) return;
            const ctx = new Ctx();
            const now = ctx.currentTime;
            const notes = [
                523.25,
                659.25,
                783.99
            ]; // C5 -> E5 -> G5 soft major triad
            notes.forEach((freq, idx)=>{
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + idx * 0.16);
                gain.gain.setValueAtTime(0.001, now + idx * 0.16);
                gain.gain.exponentialRampToValueAtTime(0.11, now + idx * 0.16 + 0.04);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.16 + 0.55);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + idx * 0.16);
                osc.stop(now + idx * 0.16 + 0.58);
            });
        } catch  {
        // Ignore autoplay restrictions
        }
    }
}
const voiceEngine = new NaturalVoiceEngine();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0jt586ymbx3ei._.js.map