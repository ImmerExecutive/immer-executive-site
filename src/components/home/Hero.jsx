import React from 'react';

// Symbole Immer en filigrane, très agrandi et coupé par le bord droit.
// Teinte pleine plutôt que transparence : la charte réserve la transparence aux fonds bleu nuit.
function Watermark() {
    const mask = 'url(/forme-immer.svg) center / contain no-repeat';
    return (
        <div
            aria-hidden="true"
            className="absolute aspect-square pointer-events-none w-[150vw] sm:w-[110vw] lg:w-[64vw] left-[62%] sm:left-[58%] lg:left-[64%] top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ backgroundColor: '#EEF2F7', WebkitMask: mask, mask }}
        />
    );
}

export function Hero({ onDiscover, onContact }) {
    return (
        <section className="relative overflow-hidden font-lato bg-white text-bleu-nuit border-b border-poudre">
            <Watermark />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-8 min-h-[calc(100svh-6rem)] flex flex-col justify-center pt-20 pb-12">
                <div className="max-w-4xl">
                    <h1 className="font-cormorant font-medium text-5xl sm:text-7xl lg:text-8xl leading-[1.05] tracking-tight">
                        Renforcer les organisations <br className="hidden sm:block" />dans la durée.
                    </h1>

                    <p className="mt-10 max-w-2xl text-lg leading-[1.7] text-bleu-nuit/80">
                        Immer Executive est depuis près de dix ans un cabinet de conseil et de chasse de tête en France et à l'international.
                        Nous intervenons dans le cadre d'une relation bilatérale aux côtés du dirigeant pour renforcer les organisations dans les situations qui les engagent durablement.
                    </p>

                    <div className="mt-12 flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={onDiscover}
                            className="w-full sm:w-auto px-8 py-4 text-[10px] font-bold uppercase tracking-[0.25em] bg-bleu-immer text-white hover:bg-bleu-nuit transition-colors duration-200"
                        >
                            Découvrir nos axes
                        </button>
                        <button
                            onClick={onContact}
                            className="w-full sm:w-auto px-8 py-4 text-[10px] font-bold uppercase tracking-[0.25em] border border-bleu-immer text-bleu-immer hover:bg-bleu-immer hover:text-white transition-colors duration-200"
                        >
                            Prendre contact
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
