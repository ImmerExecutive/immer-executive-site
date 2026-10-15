// Contenu de la page dédiée /acte3, repris de la plaquette Acte III.
// Volontairement partiel : les phases sont décrites, les séances ne sont que nommées.

export const ACTE3_CONTACT_EMAIL = 'acte3@immer-executive.com';

export const ACTE3_META = {
    title: 'Acte III — La liberté ? Pour quoi faire ? | Immer Executive',
    description: 'Acte III, parcours individuel de douze mois pour le dirigeant qui s\'apprête à rendre les clefs : quatre phases, douze rendez-vous entre pairs, pour décider librement de ce que nous voulons faire des trente années qui viennent.',
};

export const ACTE3_PHASES = [
    {
        numeral: 'I',
        months: 'Mois 1 à 3',
        title: 'Préparation',
        tagline: 'Le temps du regard',
        text: 'S\'arrêter pour regarder d\'où nous venons. Reconnaître ce qui s\'achève, recueillir ce que nous emportons.',
        sessions: ['Qui suis-je ?', 'Déposer les armes', 'Ce que j\'emporte'],
        bg: '#d9e2ee',
        fg: '#1e3365',
    },
    {
        numeral: 'II',
        months: 'Mois 4 à 6',
        title: 'Exploration',
        tagline: 'Choisir de chercher',
        text: 'Écouter ce qui n\'a pas eu droit de parole. Identifier nos désirs propres, poser les fondations d\'une vie choisie.',
        sessions: ['Ce que je veux, librement', 'Me voir par leurs yeux', 'Poser les fondations'],
        bg: '#8a9fc0',
        fg: '#1e3365',
    },
    {
        numeral: 'III',
        months: 'Mois 7 à 9',
        title: 'Construction',
        tagline: 'Bâtir ce qui nous appartient',
        text: 'Explorer les possibles, les confronter au réel. Composer une vie plurielle, trouver les pairs qui nous reconnaissent.',
        sessions: ['Et si je…', 'Rencontrer pour éprouver', 'Choisir ses voies'],
        bg: '#364f86',
        fg: '#ffffff',
    },
    {
        numeral: 'IV',
        months: 'Mois 10 à 12',
        title: 'Engagement',
        tagline: 'Se déployer pour transmettre',
        text: 'Transformer nos voies en actes. Nommer notre legs. Prendre l\'engagement de la vie qui commence.',
        sessions: ['Me lancer', 'Ce que je transmets au monde', 'Ma promesse'],
        bg: '#121a2e',
        fg: '#ffffff',
    },
];

export const ACTE3_FORMAT = [
    { figure: '12', label: 'séances, à raison d\'une par mois' },
    { figure: '2 h', label: 'par séance, en face-à-face ou par visioconférence' },
    { figure: '4', label: 'phases de trois mois, un seul mouvement' },
    { figure: '1', label: 'directeur de parcours, joignable entre les séances' },
];

export const ACTE3_DIRECTORS = [
    {
        name: 'Bernard Gindre',
        photo: '/team/bernard-gindre.jpg',
        bio: 'Entrepreneur, fondateur et dirigeant d\'agences de communication pendant trente ans. A vécu de l\'intérieur la transition du dirigeant propriétaire.',
    },
    {
        name: 'Marc de Briançon',
        photo: '/team/marc-de-briancon.png',
        bio: 'Vice-amiral d\'escadre, trente-neuf années dans la Marine nationale. A commandé l\'École navale, l\'École de guerre et la flotte de surface.',
    },
];

export const ACTE3_FAQ = [
    {
        question: 'À qui s\'adresse Acte III ?',
        answer: 'Aux dirigeants qui s\'apprêtent à « rendre les clefs » : quitter définitivement leur poste, tourner la page d\'une vie professionnelle accomplie, et disposer d\'une liberté nouvelle, sans contraintes financières ni responsabilités opérationnelles, managériales ou stratégiques.',
    },
    {
        question: 'À quel moment entreprendre le parcours ?',
        answer: 'Au moment où l\'on quitte ses fonctions. Acte III prolonge l\'engagement d\'Immer Executive : accompagner le dirigeant non plus dans l\'exercice de ses fonctions, mais au moment où il les quitte.',
    },
    {
        question: 'Comment se déroulent les séances ?',
        answer: 'Douze séances de deux heures, à raison d\'une par mois, en face-à-face ou par visioconférence. Chaque séance porte un thème précis et s\'appuie sur la précédente, pour que les douze mois forment un seul mouvement.',
    },
    {
        question: 'Où et quand ont lieu les rendez-vous ?',
        answer: 'Le lieu et le calendrier sont convenus directement entre le participant et son directeur de parcours.',
    },
    {
        question: 'Que se passe-t-il entre deux séances ?',
        answer: 'Le travail se poursuit : une réflexion à mûrir, des proches à interroger, des rencontres à provoquer. Le directeur de parcours reste joignable par téléphone, à la demande.',
    },
    {
        question: 'Qui conduit les séances ?',
        answer: 'Bernard Gindre et Marc de Briançon dirigent Acte III. Selon les parcours, certaines séances peuvent être conduites par d\'autres partners d\'Immer Executive, tous dirigeants ou entrepreneurs aguerris, sous leur supervision directe.',
    },
];
