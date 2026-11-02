import React, { useState } from 'react';
import { ContactItem } from './ContactItem';

const FIELD = 'w-full border-b border-poudre py-3 text-[15px] text-bleu-nuit bg-transparent outline-none focus:border-bleu-immer transition-colors duration-200 placeholder:text-bleu-nuit/35';
const FIELD_LABEL = 'block text-[10px] font-bold uppercase tracking-[0.25em] text-bleu-immer';

function CandidateTile({ href, external, title, text }) {
    return (
        <a
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="group flex flex-col bg-white border border-poudre hover:border-bleu-immer p-8 md:p-10 transition-colors duration-200"
        >
            <h3 className="font-cormorant font-semibold text-3xl text-bleu-nuit">{title}</h3>
            <p className="mt-4 text-[15px] leading-[1.7] text-bleu-nuit/75">{text}</p>
            <span className="mt-auto pt-10 text-[10px] font-bold uppercase tracking-[0.25em] text-bleu-immer group-hover:text-bleu-nuit transition-colors duration-200">
                Enregistrez-vous dans notre base
            </span>
        </a>
    );
}

export function ContactSection() {
    const [form, setForm] = useState({ name: '', email: '', message: '', website: '' });
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus('success');
                setForm({ name: '', email: '', message: '', website: '' });
            } else {
                setStatus('error');
                setErrorMsg(data.error || 'Une erreur est survenue.');
            }
        } catch {
            setStatus('error');
            setErrorMsg('Impossible d\'envoyer le message. Veuillez réessayer.');
        }
    };

    return (
        <>
        <section id="contact-section" className="bg-ivoire border-y border-poudre scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                <div>
                    <h2 className="font-cormorant font-semibold text-4xl md:text-5xl leading-tight mb-8">Commençons par échanger</h2>
                    <p className="font-cormorant italic text-2xl leading-snug text-bleu-immer mb-14">
                        Les situations que nous accompagnons sont souvent sensibles et engagent les personnes comme les organisations. Les échanges sont, par nature, strictement confidentiels.
                    </p>
                    <div className="space-y-8">
                        <ContactItem label="Email direct" value="contact@immer-executive.com" href="mailto:contact@immer-executive.com" />
                        <ContactItem label="Siège Paris" value="66 avenue des Champs-Élysées, 75008 Paris" />
                        <ContactItem label="Présence régionale" value="Nantes · Angers · Lyon · Aix-en-Provence · Marseille" />
                    </div>
                </div>
                <div className="bg-white border border-poudre p-8 md:p-12">
                    {status === 'success' ? (
                        <div className="flex flex-col justify-center h-full gap-6 py-12">
                            <h3 className="font-cormorant font-semibold text-3xl text-bleu-nuit">Message envoyé</h3>
                            <p className="text-[15px] leading-[1.7] text-bleu-nuit/75">Nous vous répondrons dans les meilleurs délais.</p>
                            <button onClick={() => setStatus('idle')} className="self-start text-[10px] font-bold uppercase tracking-[0.25em] text-bleu-immer hover:text-bleu-nuit transition-colors duration-200">
                                Envoyer un autre message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-10">
                            {/* Champ piège invisible pour écarter les robots */}
                            <input type="text" name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label htmlFor="contact-name" className={FIELD_LABEL}>Nom complet</label>
                                    <input id="contact-name" name="name" value={form.name} onChange={handleChange} required className={FIELD} placeholder="Votre nom" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="contact-email" className={FIELD_LABEL}>Email</label>
                                    <input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange} required className={FIELD} placeholder="Votre email" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="contact-message" className={FIELD_LABEL}>Votre situation</label>
                                <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} required className={`${FIELD} min-h-[120px] resize-none`} placeholder="Décrivez brièvement le contexte" />
                            </div>
                            {status === 'error' && (
                                <p className="pl-4 border-l-2 border-bordeaux text-sm text-bordeaux">{errorMsg}</p>
                            )}
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full py-5 bg-bleu-immer text-white text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-bleu-nuit transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? 'Envoi en cours…' : 'Envoyer ma demande'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>

        {/* Section Candidats / Managers de transition */}
        <section id="candidats-section" className="scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-24 md:py-32">
                <div className="max-w-3xl mb-16">
                    <h2 className="font-cormorant font-semibold text-4xl md:text-5xl leading-tight mb-6">Vous êtes candidat ou manager de transition ?</h2>
                    <p className="text-lg leading-[1.7] text-bleu-nuit/80">
                        Rejoignez notre base et soyez identifié lors de nos prochaines missions.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <CandidateTile
                        href="mailto:contact@immer-executive.com?subject=Candidature · Base de données Immer Executive"
                        title="Candidats"
                        text="Dirigeants, managers, experts : enregistrez-vous dans notre base pour être identifié lors de nos recherches."
                    />
                    <CandidateTile
                        href="https://airtable.com/appAQmwJcnBdjw1MG/shrdSG2artqa0Kqqz"
                        external
                        title="Managers de transition"
                        text="Directeurs expérimentés disponibles pour des missions : intégrez notre réseau de managers de transition."
                    />
                </div>
            </div>
        </section>
        </>
    );
}
