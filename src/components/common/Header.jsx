import React from 'react';
import { ChevronDown } from 'lucide-react';

export function Header({ currentPage, setCurrentPage, navigateToHomeSection, navigateToService, services }) {
    return (
        <nav className="border-b border-gray-100 py-4 px-8 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-md z-50 h-20">
            <div
                className="text-2xl font-bold uppercase tracking-tighter italic cursor-pointer hover:text-[#0000a3] transition-colors font-playfair"
                onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
                Immer Executive
            </div>

            <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] font-semibold text-gray-500">
                <button onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={currentPage === 'home' ? 'text-[#01001e]' : 'hover:text-[#01001e]'}>Accueil</button>

                <div className="relative group h-20 flex items-center">
                    <button
                        onClick={() => navigateToHomeSection('services-axes')}
                        className={`flex items-center gap-1 transition-colors ${currentPage === 'service-detail' ? 'text-[#01001e] font-bold' : 'hover:text-[#01001e]'}`}
                    >
                        Services <ChevronDown className="w-3 h-3" />
                    </button>
                    <div className="absolute top-[80px] left-[-20px] w-64 bg-white border border-gray-100 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 rounded-sm py-4 border-t-2 border-[#01001e]">
                        {services.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => navigateToService(s.id)}
                                className="w-full text-left px-6 py-3 hover:bg-gray-50 text-[10px] uppercase tracking-widest text-gray-400 hover:text-[#01001e]"
                            >
                                {s.title}
                            </button>
                        ))}
                    </div>
                </div>

                <button onClick={() => navigateToHomeSection('equipe-section')} className="hover:text-[#01001e]">Équipe</button>
                <button onClick={() => navigateToHomeSection('contact-section')} className="hover:text-[#01001e]">Contact</button>
            </div>
        </nav>
    );
}
