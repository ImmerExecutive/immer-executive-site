import React, { useState } from 'react';

const NUMERALS = ['I', 'II', 'III', 'IV', 'V'];

// Les axes d'intervention en onglets : la liste à gauche, le détail de l'axe choisi à droite.
export function Axes({ services, onNavigate }) {
    const [active, setActive] = useState(0);
    const axe = services[active];

    return (
        <section id="services-axes" className="bg-ivoire border-y border-poudre scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-24 md:py-32">
                <div className="max-w-3xl mb-16">
                    <h2 className="font-cormorant font-semibold text-4xl md:text-5xl leading-tight mb-6">Nos cinq axes d'intervention</h2>
                    <p className="text-lg leading-[1.7] text-bleu-nuit/80">Des solutions sur-mesure pour chaque niveau de l'organisation dirigeante.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    <div className="lg:col-span-5 border-t border-poudre" role="tablist" aria-orientation="vertical">
                        {services.map((s, i) => (
                            <button
                                key={s.id}
                                id={`axe-tab-${s.id}`}
                                role="tab"
                                aria-selected={i === active}
                                aria-controls="axe-panel"
                                onClick={() => setActive(i)}
                                className={`w-full flex items-baseline gap-6 py-5 pl-5 text-left border-b border-poudre border-l-2 transition-colors duration-200 ${i === active ? 'border-l-bleu-immer bg-white text-bleu-nuit' : 'border-l-transparent text-bleu-nuit/60 hover:text-bleu-nuit'}`}
                            >
                                <span className="font-cormorant text-2xl w-8 shrink-0 text-bleu-immer">{NUMERALS[i]}</span>
                                <span className="font-cormorant font-semibold text-2xl leading-tight">{s.title}</span>
                            </button>
                        ))}
                    </div>
                    <article
                        id="axe-panel"
                        role="tabpanel"
                        aria-labelledby={`axe-tab-${axe.id}`}
                        className="lg:col-span-7 bg-white border border-poudre p-8 md:p-12 flex flex-col"
                    >
                        <h3 className="font-cormorant font-semibold text-3xl md:text-4xl leading-tight text-bleu-nuit">{axe.title}</h3>
                        <p className="mt-2 font-cormorant italic text-2xl leading-snug text-bleu-immer">{axe.description}</p>
                        <ul className="mt-10 border-t border-poudre">
                            {axe.items.map((item) => (
                                <li key={item.id} className="py-4 border-b border-poudre text-[15px] text-bleu-nuit">{item.label}</li>
                            ))}
                        </ul>
                        <button
                            onClick={() => onNavigate(axe.id)}
                            className="mt-10 self-start px-8 py-4 border border-bleu-immer text-[10px] font-bold uppercase tracking-[0.25em] text-bleu-immer hover:bg-bleu-immer hover:text-white transition-colors duration-200"
                        >
                            En savoir plus
                        </button>
                    </article>
                </div>
            </div>
        </section>
    );
}
