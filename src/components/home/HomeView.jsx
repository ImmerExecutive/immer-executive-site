import React from 'react';
import { ValueCard } from './ValueCard';
import { Hero } from './Hero';
import { Axes } from './Axes';
import { ContactSection } from '../contact/ContactSection';

export function HomeView({ services, partners, onNavigatePrestation }) {
    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const navigateToContact = () => scrollToSection('contact-section');

    return (
        <div className="font-lato text-bleu-nuit">
            <Hero onDiscover={() => scrollToSection('services-axes')} onContact={navigateToContact} />

            {/* Valeurs */}
            <section id="valeurs-section" className="max-w-7xl mx-auto px-4 sm:px-8 py-24 md:py-32 scroll-mt-20">
                <h2 className="font-cormorant font-semibold text-4xl md:text-5xl leading-tight mb-16 max-w-3xl">Posture & Valeurs</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    <ValueCard
                        title="Confiance"
                        subtitle="La confiance n'est pas un climat. Elle est une solidité."
                        desc="Nos relations reposent sur des équipes stables et dédiées. Les partners qui s'engagent auprès de vous restent présents dans le temps. Vous savez à qui vous parlez. Et cette personne reste engagée."
                    />
                    <ValueCard
                        title="Confidentialité"
                        subtitle="La confidentialité n'est pas un argument. Elle est une discipline."
                        desc="Les situations que nous accompagnons engagent des équilibres stratégiques, humains et parfois personnels. La confidentialité crée un lieu protégé. Ce cadre permet une parole réellement libre. Pour cette raison, nos clients ne sont jamais identifiés sur notre site. Ni logos. Ni témoignages attribués."
                    />
                    <ValueCard
                        title="Souci de la personne"
                        subtitle="Une organisation ne tient pas uniquement par sa stratégie. Elle tient par la solidité humaine de ceux qui la portent."
                        desc="Un dirigeant fragilisé, isolé ou contraint de décider sans espace de recul finit par affecter son organisation par le risque d'un épuisement silencieux. L'isolement altère la lucidité. L'usure altère le discernement. Et ces altérations, même invisibles au départ, finissent par peser sur les décisions. Nous portons une attention particulière à la personne du dirigeant et à la qualité du collectif. Unité et équilibre personnels favorisent la performance durable."
                    />
                </div>
            </section>

            <Axes services={services} onNavigate={onNavigatePrestation} />

            {/* Équipe */}
            <section id="equipe-section" className="max-w-7xl mx-auto px-4 sm:px-8 py-24 md:py-32 scroll-mt-20">
                <div className="max-w-3xl mb-16">
                    <h2 className="font-cormorant font-semibold text-4xl md:text-5xl leading-tight mb-6">Un collectif engagé</h2>
                    <p className="text-lg leading-[1.7] text-bleu-nuit/80">
                        Nos expertises sont complémentaires. Nous sommes unis par la manière de travailler ensemble : parole franche, confiance, responsabilité.
                    </p>
                </div>

                {[
                    { label: 'Chasse de tête / Transition', category: 'Chasse de tête & Transition' },
                    { label: 'Accompagnement', category: 'Accompagnement' },
                    { label: 'Soutien opérationnel', category: 'Soutien opérationnel' },
                ].map(({ label, category }) => {
                    const group = partners.filter(p => p.category === category);
                    if (!group.length) return null;
                    return (
                        <div key={category} className="mb-16 last:mb-0">
                            <div className="flex items-center gap-6 mb-10">
                                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-bleu-immer whitespace-nowrap">{label}</span>
                                <div className="h-px flex-1 bg-poudre" />
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12">
                                {group.map((p) => (
                                    <div key={p.name}>
                                        <div className="aspect-square bg-ivoire flex items-center justify-center mb-5 overflow-hidden">
                                            {p.photo ? (
                                                <img src={p.photo} alt={p.name} loading="lazy" className="w-full h-full object-cover grayscale-[30%]" />
                                            ) : (
                                                <span className="font-cormorant text-5xl text-bleu-immer/20 select-none">{p.initial}</span>
                                            )}
                                        </div>
                                        <h4 className="font-cormorant font-semibold text-xl leading-tight text-bleu-nuit">{p.name}</h4>
                                        <p className="mt-1 text-[13px] leading-snug text-bleu-nuit/60">{p.role}</p>
                                        {p.linkedin && (
                                            <a
                                                href={p.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-bleu-immer hover:text-bleu-nuit transition-colors duration-200"
                                                aria-label={`LinkedIn de ${p.name}`}
                                            >
                                                LinkedIn
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
                <div className="mt-20">
                    <button
                        onClick={navigateToContact}
                        className="w-full sm:w-auto px-8 py-4 text-[10px] font-bold uppercase tracking-[0.25em] border border-bleu-immer text-bleu-immer hover:bg-bleu-immer hover:text-white transition-colors duration-200"
                    >
                        Prendre contact avec l'équipe
                    </button>
                </div>
            </section>

            <ContactSection />
        </div>
    );
}
