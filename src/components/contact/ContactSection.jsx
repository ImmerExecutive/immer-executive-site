import React from 'react';
import { Mail, MapPin, Globe, Users, Briefcase, ChevronRight } from 'lucide-react';
import { ContactItem } from './ContactItem';

export function ContactSection() {
    return (
        <>
        <section id="contact-section" className="max-w-7xl mx-auto px-8 py-32 border-t border-gray-100 scroll-mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                <div>
                    <h2 className="text-5xl font-playfair mb-10 leading-tight">Commençons par échanger</h2>
                    <p className="text-[#01001e]/80 mb-12 font-light leading-relaxed italic">
                        Les situations que nous accompagnons sont souvent sensibles et engagent les personnes comme les organisations. Les échanges sont, par nature, strictement confidentiels.
                    </p>
                    <div className="space-y-8">
                        <ContactItem icon={<Mail className="w-4 h-4" />} label="Email direct" value="contact@immer-executive.com" href="mailto:contact@immer-executive.com" />
                        <ContactItem icon={<MapPin className="w-4 h-4" />} label="Siège Paris" value="66 avenue des Champs-Élysées, 75008, Paris" />
                        <ContactItem icon={<Globe className="w-4 h-4" />} label="Présence régionale" value="Nantes · Angers · Lyon · Aix-en-Provence · Marseille" />
                    </div>
                </div>
                <div className="bg-white border border-gray-100 p-12 rounded-sm shadow-sm relative border-t-4 border-[#01001e]">
                    <div className="space-y-10">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-gray-600 tracking-widest">Nom complet</label>
                                <input className="w-full border-b border-gray-100 py-3 text-sm focus:border-[#01001e] outline-none transition-colors bg-transparent placeholder:text-gray-400" placeholder="Votre nom" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-gray-600 tracking-widest">Email</label>
                                <input className="w-full border-b border-gray-100 py-3 text-sm focus:border-[#01001e] outline-none transition-colors bg-transparent placeholder:text-gray-400" placeholder="Votre email" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-600 tracking-widest">Votre situation</label>
                            <textarea className="w-full border-b border-gray-100 py-3 text-sm focus:border-[#01001e] outline-none transition-colors bg-transparent min-h-[120px] placeholder:text-gray-300 resize-none" placeholder="Décrivez brièvement le contexte..." />
                        </div>
                        <button className="w-full py-5 bg-[#01001e] text-white text-xs uppercase tracking-[0.3em] font-bold hover:bg-[#0000a3] transition-colors shadow-lg">
                            Envoyer ma demande
                        </button>
                    </div>
                </div>
            </div>
        </section>

        {/* Section Candidats / Managers de transition */}
        <section id="candidats-section" className="border-t border-gray-100 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-8 py-24">
                <h2 className="text-5xl font-playfair mb-4 text-[#01001e]">Vous êtes candidat ou manager de transition ?</h2>
                <p className="text-[#01001e]/70 font-light mb-16 max-w-2xl">
                    Rejoignez notre base et soyez identifié lors de nos prochaines missions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <a
                        href="mailto:contact@immer-executive.com?subject=Candidature — Base de données Immer Executive"
                        className="group flex flex-col justify-between border border-gray-200 hover:border-[#0000a3] p-10 transition-all duration-300 rounded-sm"
                    >
                        <div>
                            <div className="w-10 h-10 rounded-full bg-[#01001e]/5 flex items-center justify-center mb-8 group-hover:bg-[#0000a3]/10 transition-colors">
                                <Users className="w-5 h-5 text-[#01001e] group-hover:text-[#0000a3] transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-[#01001e] mb-3">Candidats</h3>
                            <p className="text-sm text-gray-500 font-light leading-relaxed">Dirigeants, managers, experts — enregistrez-vous dans notre base pour être identifié lors de nos recherches.</p>
                        </div>
                        <div className="flex items-center gap-2 mt-10 text-[11px] font-bold uppercase tracking-widest text-[#0000a3] group-hover:text-[#01001e] transition-colors">
                            Enregistrez-vous dans notre base
                            <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </div>
                    </a>
                    <a
                        href="https://airtable.com/appAQmwJcnBdjw1MG/shrdSG2artqa0Kqqz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col justify-between border border-gray-200 hover:border-[#0000a3] p-10 transition-all duration-300 rounded-sm"
                    >
                        <div>
                            <div className="w-10 h-10 rounded-full bg-[#01001e]/5 flex items-center justify-center mb-8 group-hover:bg-[#0000a3]/10 transition-colors">
                                <Briefcase className="w-5 h-5 text-[#01001e] group-hover:text-[#0000a3] transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-[#01001e] mb-3">Managers de transition</h3>
                            <p className="text-sm text-gray-500 font-light leading-relaxed">Directeurs expérimentés disponibles pour des missions — intégrez notre réseau de managers de transition.</p>
                        </div>
                        <div className="flex items-center gap-2 mt-10 text-[11px] font-bold uppercase tracking-widest text-[#0000a3] group-hover:text-[#01001e] transition-colors">
                            Enregistrez-vous dans notre base
                            <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </div>
                    </a>
                </div>
            </div>
        </section>
        </>
    );
}
