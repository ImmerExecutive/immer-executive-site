import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

export function Header({ currentPage, setCurrentPage, navigateToHomeSection, navigateToService, navigateToPage, services }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);

    const closeMobile = () => { setMobileOpen(false); setServicesOpen(false); };

    return (
        <nav className="border-b border-poudre py-4 px-4 sm:px-8 flex justify-between items-center fixed top-0 left-0 right-0 bg-white z-50 h-24 font-lato">
            <div
                className="cursor-pointer"
                onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); closeMobile(); }}
            >
                <img src="/logo.png" alt="Immer Executive" className="h-16 w-auto" />
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.25em] font-bold text-bleu-nuit/70">
                <button
                    onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`transition-colors duration-200 ${currentPage === 'home' ? 'text-bleu-immer' : 'hover:text-bleu-immer'}`}
                >
                    Accueil
                </button>

                <div className="relative group h-20 flex items-center">
                    <button
                        onClick={() => navigateToHomeSection('services-axes')}
                        className={`flex items-center gap-1 transition-colors ${currentPage === 'service-detail' ? 'text-bleu-immer' : 'hover:text-bleu-immer'}`}
                    >
                        Services <ChevronDown className="w-3 h-3" />
                    </button>
                    <div className="absolute top-[80px] left-[-20px] w-72 bg-white border border-poudre border-t-bleu-immer opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 py-4">
                        {services.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => navigateToService(s.id)}
                                className="w-full text-left px-6 py-3 hover:bg-ivoire text-[10px] uppercase tracking-[0.2em] text-bleu-nuit/70 hover:text-bleu-immer transition-colors duration-200"
                            >
                                {s.title}
                            </button>
                        ))}
                    </div>
                </div>

                <button onClick={() => navigateToHomeSection('candidats-section')} className="hover:text-bleu-immer">Candidats</button>
                <button onClick={() => navigateToHomeSection('equipe-section')} className="hover:text-bleu-immer">Équipe</button>
                <button onClick={() => navigateToHomeSection('contact-section')} className="hover:text-bleu-immer">Contact</button>
            </div>

            {/* Mobile burger */}
            <button
                className="md:hidden p-2 text-bleu-nuit"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
            >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="absolute top-24 left-0 right-0 bg-white border-b border-poudre z-50 md:hidden">
                    <div className="flex flex-col px-4 sm:px-8 py-6 gap-1 text-[11px] uppercase tracking-[0.25em] font-bold text-bleu-nuit/70">
                        <button
                            onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); closeMobile(); }}
                            className="text-left py-3 border-b border-poudre hover:text-bleu-immer"
                        >
                            Accueil
                        </button>

                        <button
                            onClick={() => setServicesOpen(!servicesOpen)}
                            className="text-left py-3 border-b border-poudre flex items-center justify-between hover:text-bleu-immer"
                        >
                            Services <ChevronDown className={`w-3 h-3 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {servicesOpen && (
                            <div className="pl-4 flex flex-col gap-1 pb-2">
                                {services.map((s) => (
                                    <button
                                        key={s.id}
                                        onClick={() => { navigateToService(s.id); closeMobile(); }}
                                        className="text-left py-2 text-[10px] text-bleu-nuit/60 hover:text-bleu-immer"
                                    >
                                        {s.title}
                                    </button>
                                ))}
                            </div>
                        )}

                        <button
                            onClick={() => { navigateToHomeSection('candidats-section'); closeMobile(); }}
                            className="text-left py-3 border-b border-poudre hover:text-bleu-immer"
                        >
                            Candidats
                        </button>
                        <button
                            onClick={() => { navigateToHomeSection('equipe-section'); closeMobile(); }}
                            className="text-left py-3 border-b border-poudre hover:text-bleu-immer"
                        >
                            Équipe
                        </button>
                        <button
                            onClick={() => { navigateToHomeSection('contact-section'); closeMobile(); }}
                            className="text-left py-3 hover:text-bleu-immer"
                        >
                            Contact
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
