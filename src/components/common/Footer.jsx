import React from 'react';

export function Footer() {
    return (
        <footer className="border-t border-gray-200 py-12 px-8 mt-20 bg-[#01001e] text-white">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-[10px] text-gray-400 uppercase tracking-widest leading-loose text-center md:text-left">
                    <span className="text-white font-bold">Immer Executive</span> — Cabinet de conseil de direction<br />
                    66 avenue des Champs-Élysées, 75008, Paris
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white border-b border-white/30 pb-1">
                    immer-executive.com
                </div>
            </div>
        </footer>
    );
}
