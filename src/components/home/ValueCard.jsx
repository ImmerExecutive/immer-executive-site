import React from 'react';

export function ValueCard({ title, subtitle, desc }) {
    return (
        <div className="border-l-2 border-[#01001e]/10 pl-8 group hover:border-[#01001e] transition-colors duration-700">
            <h3 className="text-xl font-bold uppercase tracking-tight mb-2 text-[#01001e]">{title}</h3>
            <p className="text-[11px] text-[#0000a3] italic mb-6 uppercase tracking-widest font-semibold">{subtitle}</p>
            <p className="text-base text-[#01001e]/80 leading-relaxed font-light">{desc}</p>
        </div>
    );
}
