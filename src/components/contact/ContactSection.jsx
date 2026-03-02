import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { ContactItem } from './ContactItem';

export function ContactSection() {
    return (
        <section id="contact-section" className="max-w-7xl mx-auto px-8 py-32 border-t border-gray-100 scroll-mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                <div>
                    <h2 className="text-5xl font-playfair italic mb-10 leading-tight">Commençons par échanger en toute confidentialité.</h2>
                    <p className="text-gray-500 mb-16 font-light leading-relaxed italic">Les situations que nous accompagnons sont sensibles. Les échanges sont strictement confidentiels.</p>
                    <div className="space-y-10">
                        <ContactItem icon={<Mail className="w-4 h-4" />} label="Email direct" value="contact@immer-executive.com" />
                        <ContactItem icon={<MapPin className="w-4 h-4" />} label="Siège Paris" value="66 avenue des Champs-Élysées, 75008, Paris" />
                    </div>
                </div>
                <div className="bg-white border border-gray-100 p-12 rounded-sm shadow-sm relative border-t-4 border-[#01001e]">
                    <div className="space-y-10">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest">Nom complet</label>
                                <input className="w-full border-b border-gray-100 py-3 text-sm focus:border-[#01001e] outline-none transition-colors bg-transparent placeholder:text-gray-200" placeholder="Votre nom" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest">Email</label>
                                <input className="w-full border-b border-gray-100 py-3 text-sm focus:border-[#01001e] outline-none transition-colors bg-transparent placeholder:text-gray-200" placeholder="Votre email" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest">Votre situation</label>
                            <textarea className="w-full border-b border-gray-100 py-3 text-sm focus:border-[#01001e] outline-none transition-colors bg-transparent min-h-[120px] placeholder:text-gray-200 resize-none" placeholder="Décrivez brièvement le contexte..." />
                        </div>
                        <button className="w-full py-5 bg-[#01001e] text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#0000a3] transition-colors shadow-lg">
                            Envoyer ma demande
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
