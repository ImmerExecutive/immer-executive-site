import React from 'react';

export function Footer({ navigateToPage, showTagline = true }) {
    return (
        <footer className="py-12 px-4 sm:px-8 bg-bleu-nuit text-white font-lato">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-[10px] text-white/70 uppercase tracking-[0.2em] leading-loose text-center md:text-left">
                    {showTagline && (
                        <>
                            <span className="text-white font-bold">Immer Executive</span> · Advisory & Headhunting<br />
                        </>
                    )}
                    66 avenue des Champs-Élysées · 75008 Paris
                </div>
                <div className="flex items-center gap-8">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                        immer-executive.com
                    </span>
                    <button
                        onClick={() => navigateToPage('mentions-legales')}
                        className="text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-200"
                    >
                        Mentions légales
                    </button>
                </div>
            </div>
        </footer>
    );
}
