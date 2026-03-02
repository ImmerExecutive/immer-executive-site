export const SERVICES_DATA = [
    {
        id: 'soutenir',
        title: 'Soutenir le dirigeant',
        description: 'Être présent dans la solitude décisionnelle du dirigeant face aux enjeux sensibles.',
        iconName: 'UserCircle',
        items: [
            { id: 'sparring', label: 'Sparring partnership' },
            { id: 'mediation', label: 'Médiation d’associés' }
        ]
    },
    {
        id: 'construire',
        title: 'Construire l’équipe',
        description: 'Sécuriser les rôles clés pour permettre l’exécution des décisions stratégiques.',
        iconName: 'Search',
        items: [
            { id: 'chasse', label: 'Chasse de tête' },
            { id: 'transition', label: 'Management de transition' },
            { id: 'ia', label: 'Hybridation humaines & IA' }
        ]
    },
    {
        id: 'reactiver',
        title: 'Réactiver le collectif',
        description: 'Remettre un Codir ou Comex en capacité de décider et d’agir ensemble.',
        iconName: 'Users',
        items: [
            { id: 'diagnostic', label: 'Diagnostic d’organisations' },
            { id: 'unite', label: 'Restaurer l’unité' },
            { id: 'projet', label: 'Projet d’entreprise' }
        ]
    },
    {
        id: 'renforcer',
        title: 'Renforcer l’opérationnel',
        description: 'Sécuriser les ressources et alliances pour franchir un cap de croissance.',
        iconName: 'TrendingUp',
        items: [
            { id: 'levee', label: 'Levée de fonds' },
            { id: 'partenaires', label: 'Partenariats BtoB' },
            { id: 'partage', label: 'Direction à temps partagé' },
            { id: 'analyse-donnees', label: 'Analyse et exploitation des données' }
        ]
    }
];

export const FULL_SERVICES_CONTENT = {
    'soutenir': {
        subtitle: 'Axe 01',
        title: 'Soutenir le dirigeant',
        intro: 'Soutenir le dirigeant consiste à créer un espace de travail exigeant et protégé, là où certaines décisions ne peuvent être partagées ni avec le Codir, ni avec les actionnaires, ni avec les conseils habituels.',
        prestations: [
            {
                id: 'sparring',
                title: 'Sparring partnership',
                iconName: 'Swords',
                intro: 'Le sparring partnership est un travail en tête-à-tête avec le dirigeant. Il permet de confronter les décisions à venir et de clarifier les arbitrages.',
                situation: 'Un dirigeant s’apprête à engager un passage de cap stratégique : évolution du positionnement, réorganisation interne, changement d’équipe. Les enjeux sont élevés.',
                intervention: 'Travail régulier en 1:1, inscrit dans le temps, pour analyser les options, confronter les scénarios, anticiper les réactions internes et externes.',
                effet: 'La décision est prise avec lucidité. Elle est portée sans ambiguïté. Le dirigeant est aligné with son choix et capable d’en assumer les conséquences.'
            },
            {
                id: 'mediation',
                title: 'Médiation d’associés',
                iconName: 'Handshake',
                intro: 'La médiation d’associés intervient lorsque la relation entre associés devient un point de fragilité pour l’entreprise.',
                situation: 'Deux ou plusieurs associés traversent un désaccord stratégique, financier ou de gouvernance. Les discussions deviennent tendues.',
                intervention: 'Mise en place d’un cadre structuré et neutre permettant à chaque associé d’exprimer sa lecture sans escalade.',
                effet: 'Le face-à-face est désamorcé. La discussion baisse en intensité émotionnelle et se réoriente vers l’entreprise.'
            }
        ]
    },
    'construire': {
        subtitle: 'Axe 02',
        title: 'Construire l’équipe',
        intro: 'Une décision stratégique ne produit ses effets que si l’équipe capable de l’exécuter est en place. Construire l’équipe dirigeante consiste à sécuriser les rôles clés.',
        prestations: [
            {
                id: 'chasse',
                title: 'Chasse de tête',
                iconName: 'UserPlus',
                intro: 'Recruter un dirigeant ne consiste pas uniquement à identifier une compétence. Il s’agit d’intégrer une personne capable d’assumer un périmètre, de transformer son environnement.',
                situation: 'Un rôle stratégique devient vacant ou doit être créé pour accompagner un changement d’échelle. L’entreprise a besoin d’une compétence précise.',
                intervention: 'Définition précise du périmètre réel du poste. Entretiens individuels avec l’équipe directe et le Codir. Évaluation approfondie de la capacité d’appartenance.',
                effet: 'Un recrutement sécurisé. Un dirigeant opérationnel rapidement. Une intégration fluide, sans fracture interne.'
            },
            {
                id: 'transition',
                title: 'Management de transition',
                iconName: 'Briefcase',
                intro: 'Certaines situations exigent une compétence immédiate sans engager un recrutement durable.',
                situation: 'Un départ brutal, une crise opérationnelle, une fonction stratégique désorganisée. L’entreprise a besoin d’une prise en main rapide.',
                intervention: 'Sélection d’un manager de transition adapté au contexte réel. Accompagnement actif du trinôme : clarification des attentes, régulation des tensions.',
                effet: 'Une fonction stabilisée rapidement. Un manager concentré sur l’opérationnel. La transition devient un levier.'
            },
            {
                id: 'ia',
                title: 'Hybridation Humains & IA',
                iconName: 'Cpu',
                intro: 'L’enjeu de l’intégration des agents IA n’est pas uniquement technologique. Il est humain et organisationnel.',
                situation: 'Une entreprise souhaite intégrer des outils IA dans ses processus clés. Les gains potentiels sont identifiés, mais les rôles deviennent flous.',
                intervention: 'Clarification des objectifs réels de l’intégration IA. Définition des périmètres respectifs entre l’humain et l’agent.',
                effet: 'Une organisation augmentée, non fragmentée. Des responsabilités claires. La technologie sert la stratégie.'
            }
        ]
    },
    'reactiver': {
        subtitle: 'Axe 03',
        title: 'Réactiver le collectif',
        intro: 'Un collectif dirigeant peut perdre en efficacité sans que la compétence individuelle soit en cause. Nous restaurons la clarté et la dynamique d’action.',
        prestations: [
            {
                id: "diagnostic",
                title: "Diagnostic d’organisations",
                iconName: 'ClipboardCheck',
                intro: "Avant d’agir, il faut comprendre précisément ce qui dysfonctionne. Ce diagnostic identifie les points de blocage.",
                situation: "Une équipe dirigeante compétente, mais dont les décisions prennent du temps. Des incompréhensions récurrentes entre départements.",
                intervention: "Entretiens individuels confidentiels, observation des instances décisionnelles, analyse des périmètres.",
                effet: "Une lecture partagée des dysfonctionnements. Des responsabilités clarifiées. Un fonctionnement plus fluide."
            },
            {
                id: "unite",
                title: "Restaurer l’unité",
                iconName: 'Zap',
                intro: "Un collectif peut être compétent et pourtant fragmenté. Restaurer l’unité consiste à recréer les conditions d’un dialogue en vérité.",
                situation: "Un Codir ou un collège d’associés traverse des désaccords stratégiques récurrents. La paix apparente masque des non-dits.",
                intervention: "Séminaires fondations hors du cadre habituel. Cadre structuré de parole en vérité, clarification de la mission commune.",
                effet: "Les sujets structurants sont remis sur la table. La décision redevient collective et lisible. L’unité est restaurée."
            },
            {
                id: "projet",
                title: "Projet d’entreprise",
                iconName: 'Target',
                intro: "Un collectif sans projet explicite finit par fonctionner en réaction. Élaborer un projet consiste à aligner les équipes autour d’un cap commun.",
                situation: "L’organisation a grandi ou évolué. La stratégie existe, mais n’est plus explicitement partagée.",
                intervention: "Travail collectif pour expliciter la mission, clarifier les ambitions et hiérarchiser les priorités.",
                effet: "Une direction claire. Des décisions alignées. Un engagement renforcé autour d’une mission partagée."
            }
        ]
    },
    'renforcer': {
        subtitle: 'Axe 04',
        title: 'Renforcer l’opérationnel',
        intro: 'Une stratégie claire et une équipe solide ne suffisent pas si l’exécution manque de moyens. Renforcer l’opérationnel consiste à sécuriser les ressources.',
        prestations: [
            {
                id: 'levee',
                title: 'Levée de fonds',
                iconName: 'Coins',
                intro: 'Lever des fonds ne consiste pas uniquement à convaincre des investisseurs. Il s’agit de structurer un projet crédible.',
                situation: 'L’entreprise doit financer une phase de croissance ou un pivot. Le dossier manque de structuration ou le dirigeant est isolé.',
                intervention: 'Clarification du besoin réel. Structuration du dossier d’investissement. Préparation du dirigeant aux échanges.',
                effet: 'Une levée structurée, cohérente with la stratégie. Un dirigeant préparé et sécurisé.'
            },
            {
                id: 'partenaires',
                title: 'Partenariats BtoB',
                iconName: 'Building2',
                intro: 'Certaines phases de développement exigent des alliances structurantes. Identifier un partenariat demande une lecture fine des intérêts.',
                situation: 'L’entreprise souhaite accélérer son développement. Les enjeux de dépendance et d’alignement sont complexes.',
                intervention: 'Clarification des objectifs et des points non négociables. Identification et qualification des partenaires potentiels.',
                effet: 'Un partenariat structuré et aligné with la trajectoire. Une relation sécurisée.'
            },
            {
                id: 'partage',
                title: 'Direction à temps partagé',
                iconName: 'Clock',
                intro: 'Accédez à une expertise stratégique de haut niveau with une intensité adaptée au besoin réel (Marketing, Export, Commercial).',
                situation: 'L’entreprise entre dans une phase de structuration mais ne dispose ni du volume d’activité ni du budget pour un temps plein.',
                intervention: 'Définition du périmètre. Mise à disposition d’un dirigeant expérimenté intégré comme membre de l’équipe.',
                effet: 'Une expertise de haut niveau mobilisée sans déséquilibrer la structure. La fonction stratégique est sécurisée.'
            },
            {
                id: 'analyse-donnees',
                title: 'Analyse et exploitation des données',
                iconName: 'Database',
                intro: 'L’enjeu est d’extraire et d’interpréter les données existantes qui constituent un trésor stratégique pour révéler des opportunités.',
                situation: 'L’entreprise a perdu le contact with des matériaux clients basiques (mails, devis, SAV...) trop abondants pour être traités.',
                intervention: 'Cartographie et collecte des données. Traitement par LLM et restitution d’outils de décision opérationnels.',
                effet: 'Compréhension nouvelle des parties prenantes. Identification de besoins non traités et de marchés potentiels.'
            }
        ]
    }
};
