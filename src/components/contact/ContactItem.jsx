import React from 'react';

export function ContactItem({ icon, label, value, href }) {
    return (
        <div className="flex items-start gap-5 group">
            <div className="text-gray-500 mt-1 group-hover:text-[#0000a3] transition-colors">{icon}</div>
            <div>
                <span className="text-[10px] uppercase text-gray-600 font-bold tracking-widest block mb-1">{label}</span>
                {href ? (
                    <a href={href} className="text-base text-[#01001e] font-semibold hover:text-[#0000a3] transition-colors">{value}</a>
                ) : (
                    <span className="text-base text-[#01001e] font-semibold">{value}</span>
                )}
            </div>
        </div>
    );
}
