import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ValueCard } from './ValueCard';
import { ContactSection } from '../contact/ContactSection';
import { Icon } from '../common/Icon';

export function HomeView({ services, partners, onNavigatePrestation }) {
    return (
        <div className="animate-in fade-in duration-1000">
            {/* Hero */}
            <section className="max-w-7xl mx-auto px-8 pt-32 pb-24 border-b border-gray-100">
                <h1 className="text-6xl md:text-8xl font-playfair italic mb-12 leading-[1.1] tracking-tight text-[#01001e]">
                    Renforcer les organisations <br /> dans la durée.
                </h1>
                <div className="max-w-3xl">
                    <p className="text-xl text-gray-500 leading-relaxed font-light">
                        Immer Executive est depuis près de dix ans un cabinet de conseil et de chasse de tête en France et à l’international.
                        Nous intervenons dans le cadre d’une relation bilatérale aux côtés du dirigeant.
                    </p>
                </div>
            </section>

            {/* Valeurs */}
            <section id="valeurs-section" className="max-w-7xl mx-auto px-8 py-32 scroll-mt-20">
                <div className="flex items-center gap-6 mb-20">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-300 italic whitespace-nowrap">Posture & Valeurs</span>
                    <div className="h-[1px] flex-1 bg-gray-100"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    <ValueCard title="Confiance" subtitle="Une solidité, pas un climat." desc="Nos relations ne reposent pas sur des équipes stables. Les partners s'engagent personnellement et restent présents." />
                    <ValueCard title="Confidentialité" subtitle="Une discipline absolue." desc="Un cadre protégé permettant une parole réellement libre. Ni logos, ni témoignages identifiés sur notre site." />
                    <ValueCard title="Souci de la personne" subtitle="L'équilibre fait la performance." desc="L'isolement altère la lucidité. Nous portons une attention particulière à la vitalité humaine du dirigeant." />
                </div>
            </section>

            {/* Services Grid */}
            <section id="services-axes" className="max-w-7xl mx-auto px-8 py-32 bg-[#01001e] text-white scroll-mt-20 rounded-sm mx-4">
                <div className="max-w-2xl mb-20">
                    <h2 className="text-4xl md:text-5xl font-playfair italic mb-6 leading-tight">Nos quatre axes <br /> d'intervention</h2>
                    <p className="text-gray-400 font-light tracking-wide">Des solutions sur-mesure pour chaque niveau de l'organisation dirigeante.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((axe) => (
                        <div key={axe.id} className="group flex flex-col bg-[#ffffff08] border border-white/10 p-8 hover:bg-white hover:text-[#01001e] transition-all duration-500 rounded-sm">
                            <div className="text-gray-400 group-hover:text-[#01001e] transition-colors mb-6">
                                <Icon name={axe.iconName} className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold uppercase tracking-tight mb-4 md:min-h-[3.5rem] border-b border-white/10 group-hover:border-[#01001e]/10 pb-2">{axe.title}</h3>
                            <p className="text-sm text-gray-400 group-hover:text-gray-600 mb-8 leading-relaxed line-clamp-3 font-light md:min-h-[5rem]">{axe.description}</p>
                            <div className="pt-6 border-t border-white/5 group-hover:border-[#01001e]/10 flex flex-col gap-4">
                                {axe.items.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => onNavigatePrestation(axe.id, item.id)}
                                        className="flex items-center justify-between w-full text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-[#0000a3] transition-colors group/item"
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
                    <h2 className="text-5xl font-playfair italic mb-8 text-[#01001e]">Un collectif de partners engagés</h2>
                    <p className="text-gray-500 leading-relaxed font-light">
                        Nos expertises sont complémentaires. Nous sommes unis par la manière de travailler ensemble : parole franche, confiance, responsabilité.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
                    {partners.map((p, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="aspect-[3/4] bg-gray-50 flex items-center justify-center border border-gray-100 mb-6 rounded-sm overflow-hidden relative">
                                <span className="text-[#01001e]/10 font-playfair italic text-6xl group-hover:scale-110 group-hover:text-[#0000a3]/20 transition-all duration-1000 select-none">{p.initial}</span>
                                <div className="absolute inset-0 bg-[#01001e] opacity-0 group-hover:opacity-5 transition-opacity" />
                            </div>
                            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-1 text-[#01001e]">{p.name}</h4>
                            <p className="text-[9px] text-gray-400 uppercase tracking-widest italic">{p.role}</p>
                        </div>
                    ))}
                    <div className="flex items-center justify-center border border-dashed border-gray-200 aspect-[3/4] rounded-sm group hover:border-[#01001e] transition-colors cursor-pointer">
                        <button className="text-[10px] uppercase tracking-widest text-gray-300 group-hover:text-[#01001e] font-bold transition-colors underline underline-offset-8">Voir toute l'équipe</button>
                    </div>
                </div>
            </section>

            <ContactSection />
        </div>
    );
}
