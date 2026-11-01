import React from 'react';

export function ValueCard({ title, subtitle, desc }) {
    return (
        <div className="pt-8 border-t border-poudre">
            <h3 className="font-cormorant font-semibold text-3xl text-bleu-nuit mb-4">{title}</h3>
            <p className="font-cormorant italic text-xl leading-snug text-bleu-immer mb-6">{subtitle}</p>
            <p className="text-[15px] leading-[1.7] text-bleu-nuit/80">{desc}</p>
        </div>
    );
}
