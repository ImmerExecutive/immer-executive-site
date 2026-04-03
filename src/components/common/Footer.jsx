import React from 'react';

export function Footer({ navigateToPage }) {
    return (
        <footer className="border-t border-gray-200 py-12 px-8 bg-[#01001e] text-white">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-[10px] text-gray-300 uppercase tracking-widest leading-loose text-center md:text-left">
                    <span className="text-white font-bold">Immer Executive</span> — Cabinet de conseil de direction<br />
                    66 avenue des Champs-Élysées, 75008, Paris
                </div>
                <div className="flex items-center gap-8">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                        immer-executive.com
                    </span>
                    <button
                        onClick={() => navigateToPage('mentions-legales')}
                        className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-gray-300 transition-colors"
                    >
                        Mentions légales
                    </button>
                </div>
            </div>
        </footer>
    );
}
