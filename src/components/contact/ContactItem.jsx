import React from 'react';

export function ContactItem({ label, value, href }) {
    return (
        <div>
            <span className="block mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-bleu-immer">{label}</span>
            {href ? (
                <a href={href} className="text-base text-bleu-nuit hover:text-bleu-immer transition-colors duration-200">{value}</a>
            ) : (
                <span className="text-base text-bleu-nuit">{value}</span>
            )}
        </div>
    );
}
