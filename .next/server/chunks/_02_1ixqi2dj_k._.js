module.exports=[58757,e=>{"use strict";var t=e.i(47909),a=e.i(74017),o=e.i(96250),r=e.i(59756),i=e.i(61916),s=e.i(74677),n=e.i(69741),l=e.i(16795),c=e.i(87718),u=e.i(95169),d=e.i(47587),p=e.i(66012),m=e.i(70101),x=e.i(26937),f=e.i(10372),h=e.i(93695),g=e.i(9580);e.i(52474);var v=e.i(220);let b=new t.AppRouteRouteModule({definition:{kind:a.f.APP_ROUTE,page:"/api/medication/route",pathname:"/api/medication",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/src/app/api/medication/route.ts",nextConfigOutput:"",userland:()=>e.r(90389),...{}}),{workAsyncStorage:w,workUnitAsyncStorage:y,serverHooks:R}=b;async function E(e,t,a){a.requestMeta&&(0,r.R)(e,a.requestMeta),b.isDev&&(0,r.i)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let o="/api/medication/route";o=o.replace(/\/index$/,"")||"/";let{instrumentation:s}=await b.ensureInstrumentation(e,{deferSpans:!0});return b.traceRequest(e,{tracer:(0,i.v)(),spanName:`${e.method||"GET"} ${o}`,httpTarget:e.url,instrumentation:s},(r,i)=>S(e,t,a,o,!1,r,i))}async function S(e,t,o,w,y,R,E){let S=await b.prepare(e,t,{srcPage:w,multiZoneDraftMode:y});if(!S)return t.statusCode=400,t.end("Bad Request"),null==o.waitUntil||o.waitUntil.call(o,Promise.resolve()),null;let{buildId:T,deploymentId:C,params:N,nextConfig:k,parsedUrl:A,isDraftMode:P,prerenderManifest:q,routerServerContext:D,isOnDemandRevalidate:O,revalidateOnlyGenerated:L,resolvedPathname:M,clientReferenceManifest:I,serverActionsManifest:U,previewProps:F}=S,j=(0,n.f)(w),_=!!q.routes[M]&&(b.isDev||(0,g.f)(M,b.cacheOwner,q.routes[M])),G=!!(q.dynamicRoutes[j]||_),H=async()=>((null==D?void 0:D.render404)?await D.render404(e,t,A,!1):t.end("This page could not be found"),null);if(G&&!P){let e=q.dynamicRoutes[j];if(e&&!1===e.fallback&&!_){if(k.adapterPath)return await H();throw new h.NoFallbackError}}let z=null;!G||b.isDev||P||(z="/index"===(z=M)?"/":z),U&&I&&(0,s.f)({page:w,clientReferenceManifest:I,serverActionsManifest:U});let $=e.method||"GET",B=(0,i.v)(),V=!!(null==D?void 0:D.isWrappedByNextServer),K=!!(0,r.w)(e,"minimalMode"),Y=(0,r.w)(e,"incrementalCache")||await b.getIncrementalCache(e,k,F,q,K);null==Y||Y.resetRequestCache(),globalThis.__incrementalCache=Y;let J={params:N,previewProps:F,renderOpts:{experimental:{authInterrupts:!!k.experimental.authInterrupts,useCacheTimeout:k.experimental.useCacheTimeout,durableUseCacheEntries:!!k.experimental.durableUseCacheEntries},cacheComponents:!!k.cacheComponents,validationLevel:k.experimental.instantInsights.validationLevel,isDraftMode:P,incrementalCache:Y,hmrRefreshHash:(0,r.w)(e,"hmrRefreshHash"),cacheLifeProfiles:k.cacheLife,staticPageGenerationTimeout:k.staticPageGenerationTimeout,waitUntil:o.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0},sharedContext:{buildId:T,deploymentId:C}},Q=new l.x(e),W=new l.e(t),X=c.k.fromNodeNextRequest(Q,(0,c.t)(t)),Z=async({previousCacheEntry:a})=>{try{if(!K&&O&&L&&!a)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let r=null===z?await b.handle(X,J):await b.prerender(X,J);e.fetchMetrics=J.renderOpts.fetchMetrics;let i=J.renderOpts.pendingWaitUntil;i&&o.waitUntil&&(o.waitUntil(i),i=void 0);let s=J.renderOpts.collectedTags;if(!G)return await (0,p.f)(Q,W,r,i),null;{let e=await r.blob(),t=(0,m.S)(r.headers);s&&(t[f.M]=s),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let a=void 0!==J.renderOpts.collectedRevalidate&&!(J.renderOpts.collectedRevalidate>=f.Q)&&J.renderOpts.collectedRevalidate,o=void 0===J.renderOpts.collectedExpire||J.renderOpts.collectedExpire>=f.Q?!1!==a&&a>0?k.expireTime:void 0:J.renderOpts.collectedExpire;return{value:{kind:v.x.APP_ROUTE,status:r.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:a,expire:o}}}}catch(t){throw(null==a?void 0:a.isStale)&&await b.onRequestError(e,t,{routerKind:"App Router",routePath:w,routeType:"route",revalidateReason:(0,d.f)({isStaticGeneration:null!==z,isOnDemandRevalidate:O})},!1,D),t}},ee=async r=>{try{var s,n;let r=await b.handleResponse({req:e,nextConfig:k,cacheKey:z,routeKind:a.f.APP_ROUTE,isFallback:!1,previewProps:F,prerenderManifest:q,isRoutePPREnabled:!1,isOnDemandRevalidate:O,revalidateOnlyGenerated:L,responseGenerator:Z,waitUntil:o.waitUntil,isMinimalMode:K});if(null!==r&&"error"in r)throw r.error;if(!G)return;if((null==r||null==(s=r.value)?void 0:s.kind)!==v.x.APP_ROUTE)throw Error(`Invariant: app-route received invalid cache entry ${null==r||null==(n=r.value)?void 0:n.kind}`);K||t.setHeader("x-nextjs-cache",O?"REVALIDATED":r.isMiss?"MISS":r.isStale?"STALE":"HIT"),P&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let i=(0,m.G)(r.value.headers);K&&G||i.delete(f.M),!r.cacheControl||t.getHeader("Cache-Control")||i.get("Cache-Control")||i.set("Cache-Control",(0,x.f)(r.cacheControl)),await (0,p.f)(Q,W,new Response(r.value.body,{headers:i,status:r.value.status||200}));return}catch(a){if(a instanceof h.NoFallbackError||await b.onRequestError(e,a,{routerKind:"App Router",routePath:j,routeType:"route",revalidateReason:(0,d.f)({isStaticGeneration:null!==z,isOnDemandRevalidate:O})},!1,D),G)throw a;if(t.headersSent){if(r){let e=a instanceof Error?a:Error("Unknown app route error");r.recordException(e),r.setStatus({code:i.J.ERROR,message:e.message}),r.setAttribute("error.type",e.name)}t.writableEnded||t.destroyed||t.end()}else await (0,p.f)(Q,W,new Response(null,{status:500}));return}finally{(()=>{if(!r)return;let e=t.statusCode;r.setAttributes({"http.status_code":e,"next.rsc":!1}),e&&e>=500&&(r.setStatus({code:i.J.ERROR}),r.setAttribute("error.type",e.toString()));let a=B.getRootSpanAttributes();if(!a)return;if(a.get("next.span_type")!==u.q.handleRequest)return console.warn(`Unexpected root span type '${a.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let o=a.get("next.route")||j,s=`${$} ${o}`;r.setAttributes({"next.route":o,"http.route":o,"next.span_name":s}),r.updateName(s),E&&E!==r&&(E.setAttribute("http.route",o),E.updateName(s))})()}};V||void 0===e.url||null==R||R.setAttribute("http.target",e.url),await ee(R)}e.s(["handler",0,E,"patchFetch",0,function(){return(0,o.f)({workAsyncStorage:w,workUnitAsyncStorage:y})},"routeModule",0,b,"serverHooks",0,R,"workAsyncStorage",0,w,"workUnitAsyncStorage",0,y])},90389,e=>{"use strict";var t=e.i(89171),a=e.i(8395),o=e.i(82708),r=e.i(25301);async function i(e){let i;try{i=await e.json()}catch{return t.NextResponse.json({error:"INVALID_BODY"},{status:400})}let s=(i.query??"").trim();if(!s)return t.NextResponse.json({error:"EMPTY_QUERY"},{status:400});let n=(0,o.N)(a.f,s),l=n.find(e=>e.name.toLowerCase()===s.toLowerCase()||e.aliases.some(e=>e.toLowerCase()===s.toLowerCase()));if(l)return t.NextResponse.json({provider:"catalog",medication:l});let c=(0,r.K)(e);if(!c.geminiKey)return n.length>0?t.NextResponse.json({provider:"catalog",medication:n[0]}):t.NextResponse.json({error:"NO_GEMINI_KEY",message:'Este remédio não está na base offline. Adicione sua chave Gemini em "Voz & IA" para consultar qualquer medicamento vendido no Brasil.'},{status:501});let u=`Voc\xea \xe9 um farmac\xeautico cl\xednico brasileiro especialista em bulas da ANVISA, bioequival\xeancia e excipientes.
O usu\xe1rio buscou o medicamento: "${s}".
Gere um objeto JSON completo, rigoroso, em portugu\xeas do Brasil MUITO simples e acolhedor (compreens\xedvel at\xe9 para quem tem pouca escolaridade).

IMPORTANTE sobre "equivalents" e "switchingEffects":
- Liste o medicamento de Refer\xeancia (original no Brasil) + 2 a 3 op\xe7\xf5es bioequivalentes reais vendidas no Brasil (Gen\xe9ricos como EMS, Medley, Eurofarma, Cimed e/ou Similares intercambi\xe1veis, e marque "farmaciaPopularFree": true se for gratuito no SUS/Farm\xe1cia Popular).
- Em "switchingEffects", N\xc3O liste efeitos colaterais gen\xe9ricos da mol\xe9cula! Foque EXCLUSIVAMENTE nas diferen\xe7as pr\xe1ticas AO TROCAR do original para aquele equivalente espec\xedfico: revestimento/pel\xedcula, excipientes (lactose, corantes, s\xf3dio, sabor amargo), matriz de libera\xe7\xe3o (ex: XR vs comum, ent\xe9rico), formato da cartela ou pequenas varia\xe7\xf5es de velocidade de absor\xe7\xe3o dentro da faixa de 80% a 125% da ANVISA e o sintoma pr\xe1tico que ESSA troca pode causar (ex: incha\xe7o, estufamento, desconforto g\xe1strico, oscila\xe7\xe3o de efeito).

Retorne APENAS JSON v\xe1lido seguindo exatamente esta estrutura:
{
  "name": "Nome comercial principal (ex: Selozok)",
  "activeIngredient": "Princ\xedpio ativo + dosagem padr\xe3o (ex: Succinato de Metoprolol 50 mg)",
  "strength": "50 mg",
  "manufacturer": "Laborat\xf3rio de refer\xeancia",
  "category": "anticoncepcional | diabetes | estomago | tireoide | pressao | dor_febre | antibiotico | ansiedade_sono | colesterol | alergia | outro",
  "categoryLabel": "R\xf3tulo curto (ex: Cora\xe7\xe3o e Press\xe3o)",
  "purposeSimple": "1 frase curta e muito clara explicando para que serve",
  "packStyle": "blister-box | capsule-box | drops-bottle | pill-bottle",
  "stripeType": "vermelha | preta | amarela | sem_tarja",
  "accentHex": "#146356",
  "howToTake": {
    "items": [
      { "icon": "pill", "shortLabel": "1 por dia", "spokenDetail": "Frase curta falada" },
      { "icon": "clock", "shortLabel": "Mesma hora", "spokenDetail": "Frase curta falada" },
      { "icon": "water", "shortLabel": "Com \xe1gua", "spokenDetail": "Frase curta falada" }
    ],
    "summary": "1 frase direta de como tomar",
    "spokenScript": "Texto calmo e natural para leitura em voz alta explicando como tomar",
    "defaultDosage": "1 comprimido",
    "defaultTimes": ["08:00"]
  },
  "whatNotToDo": {
    "items": [
      { "icon": "no-alcohol", "shortLabel": "Sem \xe1lcool", "spokenDetail": "Frase curta" },
      { "icon": "cuts-effect", "shortLabel": "Intera\xe7\xf5es", "spokenDetail": "Frase curta" },
      { "icon": "alert-triangle", "shortLabel": "Sinal de alerta", "spokenDetail": "Frase curta" }
    ],
    "summary": "1 frase direta do principal cuidado",
    "spokenScript": "Texto claro para leitura em voz alta sobre o que n\xe3o pode fazer"
  },
  "whatYouCanDo": {
    "items": [
      { "icon": "food", "shortLabel": "Com comida", "spokenDetail": "Frase curta" },
      { "icon": "car-ok", "shortLabel": "Rotina normal", "spokenDetail": "Frase curta" },
      { "icon": "shield-check", "shortLabel": "Uso seguro", "spokenDetail": "Frase curta" }
    ],
    "missedDoseTip": "Explica\xe7\xe3o simples do que fazer se esquecer uma dose",
    "onsetTime": "Quando come\xe7a a fazer efeito",
    "spokenScript": "Texto calmo explicando o que pode fazer e o que fazer se esquecer"
  },
  "genericsHighlight": {
    "sameEffectBadge": "Mesmo efeito",
    "switchWarningShort": "Frase curta sobre o principal cuidado na troca entre marcas",
    "spokenScript": "Explica\xe7\xe3o falada sobre os gen\xe9ricos dispon\xedveis e cuidados na troca"
  },
  "equivalents": [
    {
      "id": "ref-1",
      "name": "Nome do Refer\xeancia",
      "lab": "Laborat\xf3rio",
      "type": "referencia",
      "bioequivalent": true,
      "farmaciaPopularFree": false,
      "basePriceMin": 40,
      "basePriceMax": 58,
      "coatingOrTech": "Descri\xe7\xe3o simples do revestimento ou tecnologia",
      "excipients": { "hasLactose": false, "hasDyes": false, "keyNotes": "Nota simples dos excipientes" },
      "absorptionNote": "Como se comporta a absor\xe7\xe3o",
      "switchingEffects": [],
      "switchVerdict": { "level": "tranquila", "headline": "Refer\xeancia original", "explanation": "Padr\xe3o de compara\xe7\xe3o." },
      "spokenSummary": "Resumo curto falado"
    },
    {
      "id": "gen-1",
      "name": "Princ\xedpio Ativo (Gen\xe9rico)",
      "lab": "EMS",
      "type": "generico",
      "bioequivalent": true,
      "farmaciaPopularFree": false,
      "basePriceMin": 18,
      "basePriceMax": 28,
      "coatingOrTech": "Revestimento / base do gen\xe9rico",
      "excipients": { "hasLactose": true, "hasDyes": false, "keyNotes": "Diferen\xe7a real nos excipientes" },
      "absorptionNote": "Diferen\xe7a poss\xedvel na velocidade de absor\xe7\xe3o dentro da faixa ANVISA",
      "switchingEffects": [
        { "symptom": "Sintoma espec\xedfico da troca", "why": "Por que a diferen\xe7a de revestimento/excipiente pode causar isso na troca", "likelihood": "ocasional", "icon": "bloating" }
      ],
      "switchVerdict": { "level": "atencao", "headline": "Mesmo efeito, observe a adapta\xe7\xe3o", "explanation": "Explica\xe7\xe3o direta" },
      "spokenSummary": "Resumo curto falado explicando o que muda na troca"
    }
  ]
}`;try{let e=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(c.geminiKey)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:u}]}],generationConfig:{responseMimeType:"application/json",temperature:.2}})});if(!e.ok){let a=await e.text().catch(()=>"");return t.NextResponse.json({error:"GEMINI_LOOKUP_ERROR",message:"Não foi possível consultar este medicamento pelo Gemini.",detail:a.slice(0,200)},{status:401===e.status||403===e.status?401:502})}let a=await e.json(),o=a.candidates?.[0]?.content?.parts?.[0]?.text??"{}",i=(0,r.F)(o),n="string"==typeof i.name&&i.name.trim()?i.name.trim():s,l=n.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),d="string"==typeof i.accentHex&&/^#[0-9a-f]{6}$/i.test(i.accentHex)?i.accentHex:"#146356",p={id:`ai-${l||Date.now()}`,name:n,activeIngredient:String(i.activeIngredient??n),strength:String(i.strength??""),manufacturer:String(i.manufacturer??"Referência"),category:i.category||"outro",categoryLabel:String(i.categoryLabel??"Medicamento"),aliases:[n.toLowerCase(),s.toLowerCase()],pack:{style:i.packStyle||"blister-box",primaryColor:"#E6F2EF",secondaryColor:"#B8DDD4",accentColor:d,labelText:n.toUpperCase().slice(0,12),pillColor:d,stripeType:i.stripeType||"vermelha"},purposeSimple:String(i.purposeSimple??"Medicamento receitado pelo médico."),howToTake:i.howToTake,whatNotToDo:i.whatNotToDo,whatYouCanDo:i.whatYouCanDo,genericsHighlight:i.genericsHighlight,equivalents:Array.isArray(i.equivalents)?i.equivalents:[],aiGenerated:!0};return t.NextResponse.json({provider:"gemini",medication:p})}catch{return t.NextResponse.json({error:"LOOKUP_FAILED",message:"Não consegui montar a ficha desse medicamento agora."},{status:500})}}e.s(["POST",0,i])}];

//# sourceMappingURL=_02_1ixqi2dj_k._.js.map