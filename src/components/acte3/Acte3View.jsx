import React, { useEffect } from 'react';
import { ArrowLeft, ArrowDown, Mail, Plus } from 'lucide-react';
import {
    ACTE3_CONTACT_EMAIL,
    ACTE3_META,
    ACTE3_PHASES,
    ACTE3_FORMAT,
    ACTE3_DIRECTORS,
    ACTE3_FAQ,
} from '../../data/acte3';

const NAVY = '#121a2e';
const INK = '#1e3365';
const MAILTO = `mailto:${ACTE3_CONTACT_EMAIL}?subject=${encodeURIComponent('Acte III — Demande d\'information')}`;

// Applique titre, description, canonical et balises Open Graph le temps de la visite de /acte3.
function usePageMeta({ title, description }) {
    useEffect(() => {
        const previousTitle = document.title;
        document.title = title;

        const touched = [];
        const setTag = (selector, create, attr, value) => {
            let el = document.head.querySelector(selector);
            const existed = !!el;
            if (!el) {
                el = create();
                document.head.appendChild(el);
            }
            touched.push({ el, existed, attr, previous: el.getAttribute(attr) });
            el.setAttribute(attr, value);
        };
        const meta = (key, keyAttr) => () => {
            const el = document.createElement('meta');
            el.setAttribute(keyAttr, key);
            return el;
        };
        const url = 'https://www.immer-executive.com/acte3';

        setTag('meta[name="description"]', meta('description', 'name'), 'content', description);
        setTag('link[rel="canonical"]', () => {
            const el = document.createElement('link');
            el.setAttribute('rel', 'canonical');
            return el;
        }, 'href', url);
        setTag('meta[property="og:title"]', meta('og:title', 'property'), 'content', title);
        setTag('meta[property="og:description"]', meta('og:description', 'property'), 'content', description);
        setTag('meta[property="og:url"]', meta('og:url', 'property'), 'content', url);
        setTag('meta[property="og:type"]', meta('og:type', 'property'), 'content', 'website');

        return () => {
            document.title = previousTitle;
            touched.forEach(({ el, existed, attr, previous }) => {
                if (existed && previous !== null) el.setAttribute(attr, previous);
                else el.remove();
            });
        };
    }, [title, description]);
}

// Symbole Immer en filigrane, cadré comme sur la couverture de la plaquette :
// très agrandi et coupé par les bords. La taille et la position viennent de className.
function Watermark({ className = '' }) {
    const mask = 'url(/forme-immer.svg) center / contain no-repeat';
    return (
        <div
            aria-hidden="true"
            className={`absolute aspect-square -translate-x-1/2 -translate-y-1/2 pointer-events-none ${className}`}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', WebkitMask: mask, mask }}
        />
    );
}

function Eyebrow({ children, light = false, centered = false }) {
    return (
        <div className={`mb-10 ${centered ? 'flex flex-col items-center' : ''}`}>
            <p className={`font-lato text-[11px] font-bold uppercase tracking-[0.25em] ${light ? 'text-white/70' : ''}`} style={light ? undefined : { color: INK }}>
                {children}
            </p>
            <div className={`mt-3 h-px w-10 ${light ? 'bg-white/40' : ''}`} style={light ? undefined : { backgroundColor: INK }} />
        </div>
    );
}

export function Acte3View({ onHome, navigateToPage }) {
    usePageMeta(ACTE3_META);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    const goHome = (e) => {
        e.preventDefault();
        onHome();
    };

    return (
        <div className="font-lato text-[#121a2e] bg-white">
            {/* Bandeau minimal */}
            <header className="absolute top-0 left-0 right-0 z-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
                    <a href="/" onClick={goHome} aria-label="Immer Executive — accueil">
                        <img src="/logo.png" alt="Immer Executive" className="h-12 w-auto brightness-0 invert opacity-90" />
                    </a>
                    <a
                        href="/"
                        onClick={goHome}
                        className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-bold text-white/70 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Le cabinet</span>
                    </a>
                </div>
            </header>

            {/* Couverture */}
            <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-8 text-center text-white" style={{ backgroundColor: NAVY }}>
                <Watermark className="w-[175vw] left-[82%] top-[40%] landscape:w-[125vh] landscape:left-[74%] landscape:top-[42%]" />
                <div className="relative z-10 max-w-3xl pt-24 pb-16">
                    <p className="font-lato text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] text-white/60 mb-14">
                        Parcours individuel de douze mois
                    </p>
                    <p className="font-cormorant italic text-2xl sm:text-3xl leading-snug text-white/90">
                        Les trente années qui viennent valent autant<br className="hidden sm:block" /> que les trente années qui précèdent.
                    </p>
                    <div className="mx-auto my-12 h-px w-10 bg-white/40" />
                    <h1 className="font-cormorant font-medium text-7xl sm:text-8xl md:text-9xl tracking-[0.04em] leading-none">
                        ACTE III
                    </h1>
                    <p className="font-cormorant italic text-2xl sm:text-3xl mt-6 text-white/90">
                        La liberté ? Pour quoi faire ?
                    </p>
                    <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="#parcours"
                            className="w-full sm:w-auto px-8 py-4 bg-white text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-[#d9e2ee] transition-colors"
                            style={{ color: NAVY }}
                        >
                            Découvrir le parcours
                        </a>
                        <a
                            href={MAILTO}
                            className="w-full sm:w-auto px-8 py-4 border border-white/40 text-[10px] font-bold uppercase tracking-[0.25em] text-white hover:bg-white/10 transition-colors"
                        >
                            Nous écrire
                        </a>
                    </div>
                </div>
                <a href="#constat" aria-label="Lire la suite" className="absolute bottom-8 text-white/50 hover:text-white transition-colors">
                    <ArrowDown className="w-5 h-5 animate-bounce" />
                </a>
            </section>

            {/* Le constat */}
            <section id="constat" className="px-4 sm:px-8 py-24 md:py-32">
                <div className="max-w-3xl mx-auto">
                    <p className="font-cormorant italic text-2xl md:text-[2rem] leading-relaxed" style={{ color: NAVY }}>
                        Lorsque l'on s'apprête à « rendre les clefs », à quitter définitivement son poste de dirigeant, à tourner la page d'une vie professionnelle accomplie, une fausse évidence peut s'installer à bas bruit : « ma carrière est derrière moi, ma vie aussi. »
                    </p>
                    <p className="mt-10 text-lg leading-relaxed text-[#121a2e]/80">
                        Pourtant s'ouvre à nous une terre inconnue : l'absence nouvelle de contraintes financières et de responsabilités opérationnelles, managériales ou stratégiques. Une liberté réelle. Pour les trente ans qui viennent.
                    </p>
                    <p className="mt-6 font-cormorant italic text-2xl" style={{ color: INK }}>
                        Une saison à habiter pleinement.
                    </p>
                </div>
            </section>

            {/* Le parcours */}
            <section id="parcours" className="px-4 sm:px-8 py-24 md:py-32 bg-[#f3f5f8] scroll-mt-4">
                <div className="max-w-6xl mx-auto">
                    <Eyebrow>Un parcours · Quatre phases, douze mois</Eyebrow>
                    <div className="max-w-3xl mb-16">
                        <h2 className="font-cormorant font-semibold text-4xl md:text-5xl leading-tight mb-6" style={{ color: NAVY }}>
                            Décider librement de ce que nous voulons faire des trente années qui viennent.
                        </h2>
                        <p className="text-lg leading-relaxed text-[#121a2e]/80">
                            Douze mois, douze rendez-vous entre dirigeants, pour prendre le temps de choisir sa vie à partir de ce que nous sommes, et de la mener.
                        </p>
                    </div>

                    <ol className="grid gap-6 md:gap-8 md:grid-cols-2 md:auto-rows-fr">
                        {ACTE3_PHASES.map((phase, phaseIndex) => (
                            <li key={phase.numeral} className="flex flex-col bg-white border border-[#121a2e]/10 shadow-sm">
                                <div className="relative p-7 md:p-9" style={{ backgroundColor: phase.bg, color: phase.fg }}>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">
                                        Phase {phase.numeral} · {phase.months}
                                    </p>
                                    <h3 className="font-cormorant font-semibold text-3xl mt-3">{phase.title}</h3>
                                    <p className="font-cormorant italic text-lg opacity-90">{phase.tagline}</p>
                                </div>
                                <div className="flex-1 p-7 md:p-9 flex flex-col">
                                    <p className="text-[15px] leading-relaxed text-[#121a2e]/80">{phase.text}</p>
                                    <ul className="mt-8 pt-6 border-t border-[#121a2e]/10 space-y-6">
                                        {phase.sessions.map((session, i) => (
                                            <li key={session.title} className="flex items-baseline gap-4">
                                                <span className="font-cormorant text-lg w-9 shrink-0" style={{ color: INK }}>S{phaseIndex * 3 + i + 1}</span>
                                                <div>
                                                    <h4 className="font-cormorant font-semibold text-xl leading-snug" style={{ color: NAVY }}>{session.title}</h4>
                                                    <p className="mt-1 text-[14px] leading-relaxed text-[#121a2e]/75">{session.text}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Déroulement */}
            <section className="px-4 sm:px-8 py-24 md:py-32">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-5">
                        <Eyebrow>Déroulement des séances</Eyebrow>
                        <h2 className="font-cormorant font-semibold text-4xl md:text-5xl leading-tight mb-8" style={{ color: NAVY }}>
                            De la page qui se tourne à la vie qui commence.
                        </h2>
                        <p className="text-lg leading-relaxed text-[#121a2e]/80">
                            Chaque séance porte un thème précis, de « Qui suis-je ? » à « Ma promesse ». Entre deux rendez-vous, le travail se poursuit : une réflexion à mûrir, des proches à interroger, des rencontres à provoquer.
                        </p>
                    </div>
                    <dl className="lg:col-span-7 grid sm:grid-cols-2 gap-px bg-[#121a2e]/10 self-start">
                        {ACTE3_FORMAT.map((item) => (
                            <div key={item.label} className="bg-white p-8">
                                <dt className="font-cormorant font-medium text-6xl leading-none" style={{ color: INK }}>{item.figure}</dt>
                                <dd className="mt-4 text-[15px] leading-relaxed text-[#121a2e]/80">{item.label}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* Objectif */}
            <section className="px-4 sm:px-8 pb-24 md:pb-32">
                <div className="max-w-4xl mx-auto bg-[#f3f5f8] border-l-4 px-6 sm:px-12 py-12 text-center" style={{ borderColor: INK }}>
                    <p className="text-[11px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: INK }}>Objectif</p>
                    <p className="text-[#121a2e]/80">À l'issue du parcours, le participant doit pouvoir dire :</p>
                    <p className="font-cormorant italic text-3xl md:text-4xl mt-4 leading-snug" style={{ color: NAVY }}>
                        « J'ai défini un projet de vie qui m'anime, et je l'ai lancé. »
                    </p>
                </div>
            </section>

            {/* Directeurs */}
            <section className="relative overflow-hidden px-4 sm:px-8 py-24 md:py-32 text-white" style={{ backgroundColor: NAVY }}>
                <Watermark className="w-[130vw] left-[8%] top-1/2 landscape:w-auto landscape:h-[115%] landscape:left-[12%]" />
                <div className="relative max-w-6xl mx-auto">
                    <Eyebrow light>Les directeurs du parcours</Eyebrow>
                    <div className="grid md:grid-cols-2 gap-12">
                        {ACTE3_DIRECTORS.map((d) => (
                            <article key={d.name} className="flex flex-col sm:flex-row gap-6">
                                <img src={d.photo} alt={d.name} loading="lazy" className="w-28 h-28 sm:w-32 sm:h-32 object-cover grayscale-[30%] shrink-0" />
                                <div>
                                    <h3 className="font-cormorant font-semibold text-3xl">{d.name}</h3>
                                    <p className="mt-3 text-[15px] leading-relaxed text-white/80">{d.bio}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                    <p className="mt-16 max-w-3xl text-sm leading-relaxed text-white/60">
                        Bernard et Marc dirigent Acte III. Selon les parcours, certaines séances peuvent être conduites par d'autres partners d'<em>Immer Executive</em>, tous dirigeants ou entrepreneurs aguerris, sous leur supervision directe.
                    </p>
                </div>
            </section>

            {/* Questions */}
            <section className="px-4 sm:px-8 py-24 md:py-32">
                <div className="max-w-3xl mx-auto">
                    <Eyebrow>Questions fréquentes</Eyebrow>
                    <div className="border-t border-[#121a2e]/15">
                        {ACTE3_FAQ.map((item) => (
                            <details key={item.question} className="group border-b border-[#121a2e]/15">
                                <summary className="flex items-center justify-between gap-6 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                                    <span className="font-cormorant font-semibold text-2xl" style={{ color: NAVY }}>{item.question}</span>
                                    <Plus className="w-5 h-5 shrink-0 transition-transform group-open:rotate-45" style={{ color: INK }} />
                                </summary>
                                <p className="pb-6 -mt-1 text-[15px] leading-relaxed text-[#121a2e]/80">{item.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Immer Executive et contact */}
            <section className="px-4 sm:px-8 py-24 md:py-32 bg-[#f3f5f8]">
                <div className="max-w-3xl mx-auto text-center">
                    <Eyebrow centered>Immer Executive</Eyebrow>
                    <p className="text-lg leading-relaxed text-[#121a2e]/80">
                        Depuis près de dix ans, Immer Executive accompagne dirigeants, conseils d'administration et fonds d'investissement dans les moments décisifs de leur trajectoire. Nos partners sont eux-mêmes d'anciens dirigeants et entrepreneurs ; ils interviennent en pairs.
                    </p>
                    <p className="mt-6 font-cormorant italic text-2xl leading-snug" style={{ color: NAVY }}>
                        Acte III prolonge cet engagement : accompagner le dirigeant non plus dans l'exercice de ses fonctions, mais au moment où il les quitte.
                    </p>
                    <div className="mt-16 pt-16 border-t border-[#121a2e]/10">
                        <h2 className="font-cormorant font-semibold text-4xl" style={{ color: NAVY }}>Vous souhaitez en savoir plus ?</h2>
                        <p className="mt-4 text-[#121a2e]/80">Écrivez-nous, en toute confidentialité.</p>
                        <a
                            href={MAILTO}
                            className="mt-10 inline-flex items-center gap-3 px-8 py-4 text-white text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-[#364f86] transition-colors"
                            style={{ backgroundColor: NAVY }}
                        >
                            <Mail className="w-4 h-4" /> {ACTE3_CONTACT_EMAIL}
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
