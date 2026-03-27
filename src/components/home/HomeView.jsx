import React from 'react';
import { ChevronRight, Linkedin } from 'lucide-react';
import { ValueCard } from './ValueCard';
import { ContactSection } from '../contact/ContactSection';
import { Icon } from '../common/Icon';

export function HomeView({ services, partners, onNavigatePrestation }) {
    const navigateToContact = () => {
        const el = document.getElementById('contact-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="animate-in fade-in duration-1000">
            {/* Hero */}
            <section className="max-w-7xl mx-auto px-8 pt-32 pb-24 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-10">
                    <img src="/favicon.svg" alt="" className="h-6 w-6 shrink-0 opacity-60" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#01001e]/40">Immer Executive</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-playfair mb-12 leading-[1.1] tracking-tight text-[#01001e]">
                    Renforcer les organisations <br /> dans la durée.
                </h1>
                <div className="max-w-2xl border-l-2 border-[#0000a3] pl-6">
                    <p className="text-lg text-[#01001e]/75 leading-relaxed font-light">
                        Immer Executive est depuis près de dix ans un cabinet de conseil et de chasse de tête en France et à l'international.
                        Nous intervenons dans le cadre d'une relation bilatérale aux côtés du dirigeant pour renforcer les organisations dans les situations qui les engagent durablement.
                    </p>
                </div>
            </section>

            {/* Valeurs */}
            <div className="bg-gray-50 border-b border-gray-100">
            <section id="valeurs-section" className="max-w-7xl mx-auto px-8 py-32 scroll-mt-20">
                <div className="flex items-center gap-6 mb-20">
                    <span className="text-xs font-bold uppercase tracking-[0.4em] text-gray-500 whitespace-nowrap">Posture & Valeurs</span>
                    <div className="h-[1px] flex-1 bg-gray-100"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
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
            </div>

            {/* Services Grid */}
            <section id="services-axes" className="max-w-7xl mx-auto px-4 md:px-8 py-32 bg-[#01001e] text-white scroll-mt-20 rounded-sm">
                <div className="max-w-2xl mb-20">
                    <h2 className="text-4xl md:text-5xl font-playfair mb-6 leading-tight">Nos quatre axes <br /> d'intervention</h2>
                    <p className="text-gray-400 font-light tracking-wide">Des solutions sur-mesure pour chaque niveau de l'organisation dirigeante.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((axe) => (
                        <div key={axe.id} className="group flex flex-col bg-white text-[#01001e] border border-white/10 p-8 hover:border-[#0000a3]/30 transition-all duration-300 rounded-sm">
                            <div className="text-[#0000a3] mb-6">
                                <Icon name={axe.iconName} className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold uppercase tracking-tight mb-4 md:min-h-[3.5rem] border-b border-[#01001e]/10 pb-2">{axe.title}</h3>
                            <p className="text-sm text-gray-600 mb-8 leading-relaxed line-clamp-3 font-light md:min-h-[5rem]">{axe.description}</p>
                            <div className="pt-6 border-t border-[#01001e]/10 flex flex-col gap-4">
                                {axe.items.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => item.contactOnly
                                            ? document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                            : onNavigatePrestation(axe.id, item.id)
                                        }
                                        className="flex items-center justify-between w-full text-left text-[11px] font-bold uppercase tracking-widest text-[#01001e]/50 hover:text-[#0000a3] transition-colors group/item"
                                    >
                                        {item.label}
                                        <ChevronRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-all translate-x-[-4px] group-hover/item:translate-x-0" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Équipe */}
            <section id="equipe-section" className="max-w-7xl mx-auto px-8 py-32 scroll-mt-20">
                <div className="max-w-3xl mb-16">
                    <h2 className="text-5xl font-playfair mb-8 text-[#01001e]">Un collectif de partners engagés</h2>
                    <p className="text-[#01001e]/80 leading-relaxed font-light">
                        Nos expertises sont complémentaires. Nous sommes unis par la manière de travailler ensemble : parole franche, confiance, responsabilité.
                    </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
                    {partners.map((p, i) => (
                        <div key={i} className="group">
                            <div className="aspect-square bg-gray-50 flex items-center justify-center border border-gray-100 mb-4 rounded-sm overflow-hidden relative">
                                {p.photo ? (
                                    <img
                                        src={p.photo}
                                        alt={p.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <span className="text-[#01001e]/10 font-playfair text-5xl select-none">{p.initial}</span>
                                )}
                                <div className="absolute inset-0 bg-[#01001e] opacity-0 group-hover:opacity-10 transition-opacity" />
                            </div>
                            <h4 className="text-xs font-bold uppercase tracking-[0.15em] mb-1 text-[#01001e] leading-tight">{p.name}</h4>
                            <p className="text-xs text-gray-500 uppercase tracking-wider leading-tight mb-2">{p.role}</p>
                            {p.linkedin && (
                                <a
                                    href={p.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block text-gray-300 hover:text-[#0000a3] transition-colors"
                                    aria-label={`LinkedIn de ${p.name}`}
                                >
                                    <Linkedin className="w-3 h-3" />
                                </a>
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-16 flex justify-center">
                    <button
                        onClick={navigateToContact}
                        className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-[#01001e] font-bold transition-colors border-b border-gray-200 hover:border-[#01001e] pb-1"
                    >
                        Prendre contact avec l'équipe
                    </button>
                </div>
            </section>

            <ContactSection />
        </div>
    );
}
