import React from 'react';

export function ContactItem({ icon, label, value }) {
    return (
        <div className="flex items-start gap-5 group">
            <div className="text-gray-300 mt-1 group-hover:text-[#0000a3] transition-colors">{icon}</div>
            <div>
                <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest block mb-1">{label}</span>
                <span className="text-base text-[#01001e] font-semibold">{value}</span>
            </div>
        </div>
    );
}
