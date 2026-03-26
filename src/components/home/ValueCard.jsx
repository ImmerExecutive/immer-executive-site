import React from 'react';

export function ValueCard({ title, subtitle, desc }) {
    return (
        <div className="border-l-2 border-[#01001e]/10 pl-8 group hover:border-[#01001e] transition-colors duration-700">
            <h3 className="text-xl font-bold uppercase tracking-tight mb-2 text-[#01001e]">{title}</h3>
            <p className="text-sm text-[#0000a3] mb-6 font-semibold leading-snug">{subtitle}</p>
            <p className="text-base text-[#01001e]/80 leading-relaxed font-light">{desc}</p>
        </div>
    );
}
