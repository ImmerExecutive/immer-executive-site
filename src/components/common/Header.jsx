import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

export function Header({ currentPage, setCurrentPage, navigateToHomeSection, navigateToService, navigateToPage, services }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);

    const closeMobile = () => { setMobileOpen(false); setServicesOpen(false); };

    return (
        <nav className="border-b border-gray-100 py-4 px-8 flex justify-between items-center fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 h-24">
            <div
                className="cursor-pointer"
                onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); closeMobile(); }}
            >
                <img src="/logo.png" alt="Immer Executive" className="h-16 w-auto" />
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-10 text-[15px] uppercase tracking-[0.2em] font-semibold text-gray-700">
                <button
                    onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={currentPage === 'home' ? 'text-[#01001e]' : 'hover:text-[#01001e]'}
                >
                    Accueil
                </button>

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
                                className="w-full text-left px-6 py-3 hover:bg-gray-50 text-[10px] uppercase tracking-widest text-gray-600 hover:text-[#01001e]"
                            >
                                {s.title}
                            </button>
                        ))}
                    </div>
                </div>

                <button onClick={() => navigateToHomeSection('candidats-section')} className="hover:text-[#01001e]">Candidats</button>
                <button onClick={() => navigateToHomeSection('equipe-section')} className="hover:text-[#01001e]">Équipe</button>
                <button onClick={() => navigateToHomeSection('contact-section')} className="hover:text-[#01001e]">Contact</button>
            </div>

            {/* Mobile burger */}
            <button
                className="md:hidden p-2 text-[#01001e]"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
            >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="absolute top-24 left-0 right-0 bg-white border-b border-gray-100 shadow-xl z-50 md:hidden">
                    <div className="flex flex-col px-8 py-6 gap-1 text-[11px] uppercase tracking-[0.2em] font-semibold text-gray-700">
                        <button
                            onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); closeMobile(); }}
                            className="text-left py-3 border-b border-gray-50 hover:text-[#01001e]"
                        >
                            Accueil
                        </button>

                        <button
                            onClick={() => setServicesOpen(!servicesOpen)}
                            className="text-left py-3 border-b border-gray-50 flex items-center justify-between hover:text-[#01001e]"
                        >
                            Services <ChevronDown className={`w-3 h-3 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {servicesOpen && (
                            <div className="pl-4 flex flex-col gap-1 pb-2">
                                {services.map((s) => (
                                    <button
                                        key={s.id}
                                        onClick={() => { navigateToService(s.id); closeMobile(); }}
                                        className="text-left py-2 text-[10px] text-gray-500 hover:text-[#01001e]"
                                    >
                                        {s.title}
                                    </button>
                                ))}
                            </div>
                        )}

                        <button
                            onClick={() => { navigateToHomeSection('candidats-section'); closeMobile(); }}
                            className="text-left py-3 border-b border-gray-50 hover:text-[#01001e]"
                        >
                            Candidats
                        </button>
                        <button
                            onClick={() => { navigateToHomeSection('equipe-section'); closeMobile(); }}
                            className="text-left py-3 border-b border-gray-50 hover:text-[#01001e]"
                        >
                            Équipe
                        </button>
                        <button
                            onClick={() => { navigateToHomeSection('contact-section'); closeMobile(); }}
                            className="text-left py-3 hover:text-[#01001e]"
                        >
                            Contact
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
