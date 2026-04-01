import React from 'react';
import { Mail, MapPin, Users, Briefcase } from 'lucide-react';
import { ContactItem } from './ContactItem';

export function ContactSection() {
    return (
        <section id="contact-section" className="max-w-7xl mx-auto px-8 py-32 border-t border-gray-100 scroll-mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                <div>
                    <h2 className="text-5xl font-playfair mb-10 leading-tight">Commençons par échanger</h2>
                    <p className="text-[#01001e]/80 mb-12 font-light leading-relaxed italic">
                        Les situations que nous accompagnons sont souvent sensibles et engagent les personnes comme les organisations. Les échanges sont, par nature, strictement confidentiels.
                    </p>
                    <div className="space-y-8 mb-12">
                        <ContactItem icon={<Mail className="w-4 h-4" />} label="Email direct" value="contact@immer-executive.com" href="mailto:contact@immer-executive.com" />
                        <ContactItem icon={<MapPin className="w-4 h-4" />} label="Siège Paris" value="66 avenue des Champs-Élysées, 75008, Paris" />
                    </div>
                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-base font-semibold text-[#01001e] mb-5">Vous êtes un candidat ou manager de transition ?</p>
                        <div className="space-y-4">
                            <a
                                href="mailto:contact@immer-executive.com?subject=Candidature — Base de données Immer Executive"
                                className="flex items-center gap-3 text-sm font-bold text-[#0000a3] hover:text-[#01001e] transition-colors"
                            >
                                <Users className="w-4 h-4 shrink-0" />
                                Candidats — Enregistrez-vous dans notre base
                            </a>
                            <a
                                href="https://airtable.com/appAQmwJcnBdjw1MG/shrdSG2artqa0Kqqz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-sm font-bold text-[#0000a3] hover:text-[#01001e] transition-colors"
                            >
                                <Briefcase className="w-4 h-4 shrink-0" />
                                Managers de transition — Enregistrez-vous dans notre base
                            </a>
                        </div>
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
    );
}
