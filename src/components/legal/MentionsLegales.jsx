import React from 'react';

export function MentionsLegales({ onBack }) {
    return (
        <div className="max-w-4xl mx-auto px-8 py-24">
            <button
                onClick={onBack}
                className="text-[11px] uppercase tracking-widest font-bold text-gray-400 hover:text-[#01001e] transition-colors mb-16 flex items-center gap-2"
            >
                ← Retour
            </button>

            <h1 className="text-5xl font-playfair text-[#01001e] mb-16">Mentions légales</h1>

            <div className="space-y-12 text-[#01001e]/80 font-light leading-relaxed">

                <div>
                    <h2 className="text-lg font-bold text-[#01001e] uppercase tracking-tight mb-4">1. Éditeur du site</h2>
                    <p>Le site www.immer-executive.com est édité par :</p>
                    <ul className="mt-3 space-y-1 text-sm">
                        <li><span className="font-semibold">Dénomination sociale :</span> ImmerConsulting</li>
                        <li><span className="font-semibold">Forme juridique :</span> Société par Actions Simplifiée (SAS)</li>
                        <li><span className="font-semibold">Capital social :</span> 1 000,00 €</li>
                        <li><span className="font-semibold">Siège social :</span> 66 avenue des Champs-Élysées, 75008 Paris</li>
                        <li><span className="font-semibold">SIREN :</span> 881 299 135</li>
                        <li><span className="font-semibold">SIRET (siège) :</span> 881 299 135 00015</li>
                        <li><span className="font-semibold">RCS :</span> 881 299 135 R.C.S. Paris</li>
                        <li><span className="font-semibold">N° de TVA intracommunautaire :</span> FR39881299135</li>
                        <li><span className="font-semibold">E-mail :</span> <a href="mailto:contact@immer-executive.com" className="text-[#0000a3] hover:underline">contact@immer-executive.com</a></li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-[#01001e] uppercase tracking-tight mb-4">2. Directeur de la publication</h2>
                    <p className="text-sm">Le directeur de la publication est le Président de la société ImmerConsulting.</p>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-[#01001e] uppercase tracking-tight mb-4">3. Hébergement</h2>
                    <p className="text-sm">Le site est hébergé par :</p>
                    <ul className="mt-3 space-y-1 text-sm">
                        <li><span className="font-semibold">Société :</span> Vercel Inc.</li>
                        <li><span className="font-semibold">Adresse :</span> 340 Pine Street, Suite 900, San Francisco, CA 94104, États-Unis</li>
                        <li><span className="font-semibold">Site web :</span> www.vercel.com</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-[#01001e] uppercase tracking-tight mb-4">4. Propriété intellectuelle</h2>
                    <p className="text-sm">L'ensemble des contenus figurant sur le site www.immer-executive.com (textes, images, graphismes, logo, icônes, sons, logiciels, etc.) est la propriété exclusive d'ImmerConsulting ou de ses partenaires, et est protégé par les dispositions du Code de la propriété intellectuelle.</p>
                    <p className="text-sm mt-3">Toute reproduction, représentation, modification, publication, adaptation ou exploitation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable d'ImmerConsulting. Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient est susceptible de constituer une contrefaçon passible de poursuites judiciaires.</p>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-[#01001e] uppercase tracking-tight mb-4">5. Données personnelles</h2>
                    <p className="text-sm">Conformément au Règlement (UE) 2016/679 du 27 avril 2016 relatif à la protection des données à caractère personnel (RGPD) et à la loi n° 78-17 du 6 janvier 1978 modifiée (loi Informatique et Libertés), ImmerConsulting est susceptible de collecter des données personnelles vous concernant, notamment via le formulaire de contact disponible sur le site.</p>
                    <ul className="mt-4 space-y-2 text-sm">
                        <li><span className="font-semibold">Responsable du traitement :</span> ImmerConsulting, 66 avenue des Champs-Élysées, 75008 Paris.</li>
                        <li><span className="font-semibold">Finalité :</span> Traitement des demandes de contact et de renseignements.</li>
                        <li><span className="font-semibold">Base légale :</span> Intérêt légitime du responsable du traitement (réponse aux demandes entrantes).</li>
                        <li><span className="font-semibold">Durée de conservation :</span> Les données sont conservées pour la durée nécessaire au traitement de la demande, et au maximum trois (3) ans à compter du dernier contact.</li>
                    </ul>
                    <p className="text-sm mt-4">Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation du traitement, de portabilité et d'opposition concernant vos données personnelles, dans les conditions prévues par la réglementation applicable. Pour exercer ces droits ou pour toute question relative à la protection de vos données, vous pouvez contacter ImmerConsulting à l'adresse suivante : <a href="mailto:contact@immer-executive.com" className="text-[#0000a3] hover:underline">contact@immer-executive.com</a>.</p>
                    <p className="text-sm mt-3">Si vous estimez que le traitement de vos données à caractère personnel constitue une violation de la réglementation applicable, vous disposez du droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) — <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#0000a3] hover:underline">www.cnil.fr</a>.</p>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-[#01001e] uppercase tracking-tight mb-4">6. Cookies</h2>
                    <p className="text-sm">Le site www.immer-executive.com est susceptible d'utiliser des cookies afin d'améliorer l'expérience utilisateur. Conformément à la réglementation en vigueur, votre consentement est recueilli préalablement au dépôt de tout cookie non strictement nécessaire au fonctionnement du site.</p>
                    <p className="text-sm mt-3">Vous pouvez à tout moment modifier vos préférences en matière de cookies via les paramètres de votre navigateur ou le gestionnaire de consentement disponible sur le site.</p>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-[#01001e] uppercase tracking-tight mb-4">7. Liens hypertextes</h2>
                    <p className="text-sm">Le site www.immer-executive.com peut contenir des liens vers des sites tiers. ImmerConsulting n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou à leurs pratiques en matière de protection des données personnelles.</p>
                    <p className="text-sm mt-3">La mise en place d'un lien hypertexte vers le site www.immer-executive.com est subordonnée à l'accord préalable écrit d'ImmerConsulting.</p>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-[#01001e] uppercase tracking-tight mb-4">8. Limitation de responsabilité</h2>
                    <p className="text-sm">ImmerConsulting s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur le site. Toutefois, ImmerConsulting ne peut garantir l'exactitude, la complétude ou l'actualité des informations publiées et décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site.</p>
                    <p className="text-sm mt-3">ImmerConsulting ne saurait être tenu responsable des dommages directs ou indirects résultant de l'accès au site ou de l'utilisation des informations qui y sont publiées.</p>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-[#01001e] uppercase tracking-tight mb-4">9. Droit applicable et juridiction compétente</h2>
                    <p className="text-sm">Les présentes mentions légales sont régies par le droit français. En cas de litige relatif à leur interprétation ou à leur exécution, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.</p>
                </div>

                <p className="text-xs text-gray-400 pt-8 border-t border-gray-100">Dernière mise à jour : avril 2026</p>
            </div>
        </div>
    );
}
