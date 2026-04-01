import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Icon } from '../common/Icon';

export function ServiceDetailView({ serviceId, targetPrestation, fullServicesContent, onBack }) {
    const serviceData = fullServicesContent[serviceId];

    useEffect(() => {
        if (targetPrestation) {
            const element = document.getElementById(targetPrestation);
            if (element) {
                setTimeout(() => element.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [targetPrestation, serviceId]);

    if (!serviceData) return null;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-7xl mx-auto px-8 py-20">
            <button onClick={onBack} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-600 hover:text-[#01001e] mb-16 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Retour aux services
            </button>

            <div className="max-w-4xl mb-32 border-l-4 border-[#01001e] pl-10">
<h1 className="text-6xl md:text-8xl font-playfair mb-10 text-[#01001e] leading-none">{serviceData.title}</h1>
                <p className="text-2xl text-[#01001e]/80 font-light leading-relaxed">
                    {serviceData.intro}
                </p>
            </div>

            <div className="space-y-48">
                {serviceData.prestations.map((p) => (
                    <section key={p.id} id={p.id} className="relative scroll-mt-32">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                            <div className="lg:col-span-4 sticky top-32">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-4 bg-gray-50 rounded-full text-[#01001e] shadow-sm border border-[#01001e]/5">
                                        <Icon name={p.iconName} className="w-6 h-6" />
                                    </div>
                                    <div className="h-[1px] flex-1 bg-gray-100" />
                                </div>
                                <h2 className="text-3xl font-bold uppercase tracking-tighter mb-8 leading-tight text-[#01001e]">{p.title}</h2>
                                <p className="text-base text-[#01001e]/70 font-light leading-relaxed">{p.intro}</p>
                            </div>

                            <div className="lg:col-span-8 bg-white border border-gray-100 p-10 md:p-16 shadow-xl rounded-sm">
                                <div className="grid md:grid-cols-2 gap-16 mb-16">
                                    <div className="space-y-6">
                                        <h4 className="text-[11px] uppercase tracking-[0.3em] font-black text-[#01001e]/40">La Situation</h4>
                                        <p className="text-base text-gray-700 leading-relaxed font-medium">{p.situation}</p>
                                    </div>
                                    <div className="space-y-6">
                                        <h4 className="text-[11px] uppercase tracking-[0.3em] font-black text-[#01001e]/40">L'Intervention</h4>
                                        <p className="text-base text-[#01001e]/80 leading-relaxed font-light">{p.intervention}</p>
                                    </div>
                                </div>

                                <div className="pt-12 border-t border-gray-100">
                                    <div className="mb-10">
                                        <h4 className="text-[11px] uppercase tracking-[0.3em] font-black text-[#0000a3] mb-4">L'Effet mesurable</h4>
                                        <p className="text-lg italic text-[#01001e]/90 leading-relaxed font-light">{p.effet}</p>
                                    </div>

                                    <div className="flex justify-end">
                                        <a
                                            href="mailto:contact@immer-executive.com"
                                            className="px-10 py-5 bg-[#01001e] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#0000a3] transition-all shrink-0 shadow-lg"
                                        >
                                            Parlons-en
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
