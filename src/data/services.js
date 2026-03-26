export const SERVICES_DATA = [
    {
        id: 'soutenir',
        title: 'Soutenir le dirigeant',
        description: 'Être présent dans la solitude décisionnelle du dirigeant face aux enjeux sensibles.',
        iconName: 'UserCircle',
        items: [
            { id: 'sparring', label: 'Sparring partnership' },
            { id: 'coaching', label: 'Coaching individuel', contactOnly: true },
            { id: 'conseil-strategique', label: 'Conseil stratégique', contactOnly: true },
            { id: 'mediation', label: 'Médiation d\'associés' }
        ]
    },
    {
        id: 'construire',
        title: 'Construire l\'équipe',
        description: 'Sécuriser les rôles clés pour permettre l\'exécution des décisions stratégiques.',
        iconName: 'Search',
        items: [
            { id: 'chasse', label: 'Chasse de tête' },
            { id: 'transition', label: 'Management de transition' },
            { id: 'ia', label: 'Hybridation d\'équipes humaines et d\'agents IA' }
        ]
    },
    {
        id: 'reactiver',
        title: 'Réactiver le collectif',
        description: 'Remettre un Codir ou Comex en capacité de décider et d\'agir ensemble.',
        iconName: 'Users',
        items: [
            { id: 'diagnostic', label: 'Diagnostic d\'organisations humaines' },
            { id: 'unite', label: 'Restaurer l\'unité' },
            { id: 'projet', label: 'Élaboration du projet d\'entreprise' }
        ]
    },
    {
        id: 'renforcer',
        title: 'Renforcer l\'opérationnel',
        description: 'Sécuriser les ressources et alliances pour franchir un cap de croissance.',
        iconName: 'TrendingUp',
        items: [
            { id: 'levee', label: 'Levée de fonds' },
            { id: 'partenaires', label: 'Recherche de partenaires BtoB' },
            { id: 'partage', label: 'Directions à temps partagé' },
            { id: 'analyse-donnees', label: 'IA / Data — Analyse et exploitation des données' }
        ]
    }
];

export const FULL_SERVICES_CONTENT = {
    'soutenir': {
        subtitle: 'Axe 01',
        title: 'Soutenir le dirigeant',
        intro: 'Soutenir le dirigeant consiste à créer un espace de travail exigeant et protégé, là où certaines décisions ne peuvent être partagées ni avec le Codir, ni avec les actionnaires, ni avec les conseils habituels. Nous intervenons en 1:1 lorsque la décision se construit encore, et entre associés lorsque la relation devient un enjeu stratégique en soi.',
        prestations: [
            {
                id: 'sparring',
                title: 'Sparring partnership',
                iconName: 'Swords',
                intro: 'Le sparring partnership est un travail en tête-à-tête avec le dirigeant. Il permet de confronter les décisions à venir, d\'ajuster la posture face aux évolutions stratégiques et organisationnelles, et de clarifier les arbitrages avant qu\'ils ne soient exposés. Dans un environnement mouvant, le dirigeant doit adapter sa manière de décider sans se dissocier de lui-même. Le sparring crée cet espace de recul, structuré et exigeant.',
                situation: 'Un dirigeant s\'apprête à engager un passage de cap stratégique : évolution du positionnement, réorganisation interne, changement d\'équipe, acquisition ou recentrage d\'activité. Les enjeux sont élevés. Les impacts humains sont sensibles. Les équilibres internes risquent d\'être modifiés. Il ne peut pas tester librement ses hypothèses auprès de son Codir ou de ses actionnaires sans créer de signaux prématurés.',
                intervention: 'Travail régulier en 1:1, inscrit dans le temps, pour analyser les options, confronter les scénarios, anticiper les réactions internes et externes, et clarifier les conséquences organisationnelles. Le sparring permet de questionner les évidences, d\'identifier les angles morts, d\'explorer les risques politiques et humains, et d\'ajuster la posture du dirigeant face aux transformations envisagées.',
                effet: 'La décision est prise avec lucidité. Elle est portée sans ambiguïté. Le dirigeant est aligné avec son choix et capable d\'en assumer les conséquences. La trajectoire devient lisible pour l\'organisation. La décision tient dans le temps.',
                partnerContact: { name: 'Thierry', email: 'thierry.serrano-guerra@immer-executive.com' }
            },
            {
                id: 'mediation',
                title: 'Médiation d\'associés',
                iconName: 'Handshake',
                intro: 'La médiation d\'associés intervient lorsque la relation entre associés devient un point de fragilité pour l\'entreprise, qu\'il s\'agisse de tensions latentes ou de conflits déclarés. Notre approche ne consiste pas à organiser un face-à-face. Elle vise à repositionner la personne morale au centre pour sortir d\'une logique d\'opposition individuelle.',
                situation: 'Deux ou plusieurs associés traversent un désaccord stratégique, financier ou de gouvernance. Les discussions deviennent tendues, les positions se rigidifient, et les équipes commencent à percevoir les divergences. Que le conflit soit ouvert ou diffus, il s\'installe une paralysie décisionnelle.',
                intervention: 'Mise en place d\'un cadre structuré et neutre permettant à chaque associé d\'exprimer sa lecture de la situation sans escalade. Repositionnement systématique des échanges autour de la personne morale pour éviter le face-à-face : quels sont les intérêts de l\'entreprise ? quelles sont les responsabilités respectives ? quelles solutions permettent de préserver l\'activité et les équipes ? Nous facilitons la clarification des enjeux réels, distinguons les sujets émotionnels des sujets structurants et ouvrons des scénarios alternatifs : écoute mutuelle, ajustement de gouvernance, redéfinition des rôles, sortie organisée si nécessaire.',
                effet: 'Le face-à-face est désamorcé. La discussion baisse en intensité émotionnelle et se réoriente vers l\'entreprise. Dans certains cas, la relation est stabilisée et clarifiée. Dans d\'autres, une réorganisation ou une séparation est structurée sans rupture destructrice. Dans tous les cas, l\'entreprise est protégée.',
                partnerContact: { name: 'Henry', email: 'henry.destremau@immer-executive.com' }
            }
        ]
    },
    'construire': {
        subtitle: 'Axe 02',
        title: 'Construire l\'équipe',
        intro: 'Une décision stratégique ne produit ses effets que si l\'équipe capable de l\'exécuter est en place. Construire l\'équipe dirigeante consiste à sécuriser les rôles clés, ajuster les équilibres et intégrer les compétences nécessaires au bon moment, sans fragiliser le collectif existant.',
        prestations: [
            {
                id: 'chasse',
                title: 'Chasse de tête',
                iconName: 'UserPlus',
                intro: 'Recruter un dirigeant ne consiste pas uniquement à identifier une compétence. Il s\'agit d\'intégrer une personne capable d\'assumer un périmètre, de transformer son environnement et de s\'inscrire durablement dans un collectif. Nous travaillons autant la dimension technique que la capacité d\'appartenance : se sentir légitime dans son rôle et reconnu par l\'équipe.',
                situation: 'Un rôle stratégique devient vacant ou doit être créé pour accompagner un changement d\'échelle. L\'entreprise a besoin d\'une compétence précise, mais aussi d\'une personnalité capable d\'intégrer un collectif déjà structuré. Le risque n\'est pas seulement technique : il est culturel, relationnel et politique. Un mauvais recrutement à ce niveau fragilise durablement la trajectoire.',
                intervention: 'Définition précise du périmètre réel du poste : responsabilités, marges de manœuvre, attentes implicites. Entretiens individuels avec l\'équipe directe et le Codir pour les intégrer au projet. Évaluation approfondie de la capacité des candidats à s\'inscrire dans le collectif existant. Accompagnement dans la décision finale et dans l\'intégration.',
                effet: 'Un recrutement sécurisé. Un dirigeant opérationnel rapidement. Une intégration fluide, sans fracture interne.',
                partnerContact: { name: 'Thierry', email: 'thierry.serrano-guerra@immer-executive.com' }
            },
            {
                id: 'transition',
                title: 'Management de transition',
                iconName: 'Briefcase',
                intro: 'Certaines situations exigent une compétence immédiate sans engager un recrutement durable. Le management de transition permet d\'assurer la continuité, de stabiliser une fonction ou de débloquer une situation critique, dans un cadre temporaire et structuré. Notre rôle s\'inscrit dans un trinôme clair : entreprise, manager de transition, cabinet.',
                situation: 'Un départ brutal, une crise opérationnelle, une fonction stratégique désorganisée. L\'entreprise a besoin d\'une prise en main rapide, mais le climat est tendu. Les équipes sont sous pression, les attentes sont fortes et le manager de transition doit agir sans disposer immédiatement de toutes les clés relationnelles.',
                intervention: 'Sélection d\'un manager de transition adapté au contexte réel, pas seulement au périmètre technique. Accompagnement actif du trinôme : clarification des attentes, régulation des tensions, médiation lorsque cela est nécessaire. Nous facilitons les échanges pour éviter les malentendus et sécuriser l\'action dans une période de forte intensité opérationnelle et émotionnelle.',
                effet: 'Une fonction stabilisée rapidement. Un manager concentré sur l\'opérationnel plutôt que sur la gestion des tensions. La transition devient un levier, pas une source supplémentaire d\'instabilité.',
                partnerContact: { name: 'Sandrine', email: 'sandrine.compagnie@immer-executive.com' }
            },
            {
                id: 'ia',
                title: 'Hybridation d\'équipes humaines et d\'agents IA',
                iconName: 'Cpu',
                intro: 'Les organisations intègrent progressivement des agents IA dans leurs processus décisionnels et opérationnels. L\'enjeu n\'est pas uniquement technologique. Il est humain, organisationnel et stratégique. Hybridation signifie structurer la coopération entre compétences humaines et systèmes intelligents, sans fragiliser les responsabilités.',
                situation: 'Une entreprise souhaite intégrer des outils ou agents IA dans ses processus clés : RH, marketing, finance, opérations ou support décisionnel. Les gains potentiels sont parfois identifiés, mais les rôles deviennent flous. Les équipes s\'interrogent sur leur place, et le dirigeant doit arbitrer entre performance, responsabilité et cohérence organisationnelle.',
                intervention: 'Clarification des objectifs réels de l\'intégration IA. Définition des périmètres respectifs : ce qui relève de l\'humain, ce qui peut être confié à un agent, et où se situe la responsabilité finale. Accompagnement du dirigeant et de l\'équipe dans l\'ajustement des rôles, des rituels et des modes de décision.',
                effet: 'Une organisation augmentée, non fragmentée. Des responsabilités claires. Une performance améliorée sans perte de cohérence collective. La technologie sert la stratégie, sans déstabiliser l\'équipe.',
                partnerContact: { name: 'Raphaël', email: 'raphael.besson@immer-executive.com' }
            }
        ]
    },
    'reactiver': {
        subtitle: 'Axe 03',
        title: 'Réactiver le collectif',
        intro: 'Un collectif dirigeant peut perdre en efficacité sans que la compétence individuelle soit en cause. Tensions latentes, responsabilités floues, désalignements stratégiques ou perte de sens fragilisent la capacité à décider ensemble. Réactiver le collectif consiste à restaurer la clarté, la cohésion et la dynamique d\'action.',
        prestations: [
            {
                id: 'diagnostic',
                title: 'Diagnostic d\'organisations humaines',
                iconName: 'ClipboardCheck',
                intro: 'Avant d\'agir, il faut comprendre précisément ce qui dysfonctionne. Le diagnostic d\'organisation humaine permet d\'identifier les points de blocage : responsabilités mal définies, chevauchements de périmètre, tensions implicites, défaut de rituels décisionnels ou perte de lisibilité stratégique.',
                situation: 'Une équipe dirigeante compétente, mais dont les décisions prennent du temps. Des incompréhensions récurrentes entre départements. Des tensions diffuses qui ne s\'expriment pas ouvertement, mais qui ralentissent l\'action. Le dirigeant perçoit un manque de fluidité sans pouvoir en identifier clairement l\'origine.',
                intervention: 'Entretiens individuels confidentiels, observation des instances décisionnelles, analyse des périmètres et des modes de fonctionnement. Identification des zones de chevauchement, des responsabilités implicites, des sujets évités et des désalignements stratégiques. Restitution structurée au dirigeant, puis travail collectif.',
                effet: 'Une lecture partagée des dysfonctionnements. Des responsabilités clarifiées. Un fonctionnement plus fluide et des décisions accélérées. Le collectif retrouve de la cohérence.',
                partnerContact: { name: 'Henry', email: 'henry.destremau@immer-executive.com' }
            },
            {
                id: 'unite',
                title: 'Restaurer l\'unité',
                iconName: 'Zap',
                intro: 'Un collectif peut être compétent et pourtant fragmenté et donc dysfonctionnel. Restaurer l\'unité consiste à recréer les conditions d\'un dialogue en vérité, à traiter collectivement les tensions apparentes ou silencieuses, et à repositionner le dirigeant au centre d\'une équipe capable d\'agir ensemble.',
                situation: 'Un Codir traverse des désaccords stratégiques récurrents. Les échanges deviennent prudents ou, au contraire, tendus. Les décisions sont retardées ou contournées. Les équipes perçoivent une fracture. La paix apparente masque parfois des non-dits persistants. Le Codir est devenu une épreuve récurrente pour chacun, et de plus en plus stérile pour l\'organisation…',
                intervention: 'Organisation d\'un séminaire fondations hors du cadre habituel, pour créer la distance nécessaire. Rencontre préparatoire individuelle des parties prenantes. Mise en place d\'un cadre structuré de parole en vérité, clarification de la mission commune, révision des périmètres selon le principe de subsidiarité. Travail sur les rituels décisionnels et sur la posture du dirigeant dans le collectif. Travail collectif sur l\'identification et le traitement des blocages.',
                effet: 'Les sujets structurants sont remis sur la table. Les responsabilités sont assumées. La décision redevient collective et lisible. L\'unité est restaurée, non par consensus, mais par clarté.',
                partnerContact: { name: 'Marc', email: 'marc.debriancon@immer-executive.com' }
            },
            {
                id: 'projet',
                title: 'Élaboration du projet d\'entreprise',
                iconName: 'Target',
                intro: 'Un collectif sans projet explicite finit par fonctionner en réaction plutôt qu\'en direction. Élaborer ou actualiser un projet d\'entreprise consiste à clarifier la mission, la trajectoire et les priorités partagées. Ce travail aligne les équipes autour d\'un cap commun et structure les décisions.',
                situation: 'L\'organisation a grandi, évolué ou traversé des transformations successives. La stratégie existe, mais elle n\'est plus explicitement partagée. Les équipes exécutent sans toujours comprendre la finalité commune. Le risque est une perte progressive d\'engagement et de cohérence.',
                intervention: 'Travail collectif avec le dirigeant et l\'équipe clé pour expliciter la mission, clarifier les ambitions, hiérarchiser les priorités. Formulation d\'un projet d\'entreprise structurant, traduisible opérationnellement dans chaque département. Accompagnement du déploiement pour éviter que le projet ne reste théorique.',
                effet: 'Une direction claire. Des décisions alignées. Un engagement renforcé autour d\'une mission partagée. Le collectif agit en cohérence avec un cap explicite.',
                partnerContact: { name: 'Bernard', email: 'bernard.gindre@immer-executive.com' }
            }
        ]
    },
    'renforcer': {
        subtitle: 'Axe 04',
        title: 'Renforcer l\'opérationnel',
        intro: 'Une stratégie claire et une équipe solide ne suffisent pas si l\'exécution manque de moyens ou d\'appuis structurants. Renforcer l\'opérationnel consiste à sécuriser les ressources financières, les alliances stratégiques et les compétences clés nécessaires pour passer un cap sans déséquilibrer l\'organisation.',
        prestations: [
            {
                id: 'levee',
                title: 'Levée de fonds',
                iconName: 'Coins',
                intro: 'Lever des fonds ne consiste pas uniquement à convaincre des investisseurs. Il s\'agit de structurer un projet crédible, cohérent et aligné avec la trajectoire de l\'entreprise. Nous accompagnons le dirigeant dans la préparation stratégique, la mise en cohérence du discours et la sécurisation des étapes clés du processus.',
                situation: 'L\'entreprise doit financer une phase de croissance, une acquisition, un développement international ou un pivot stratégique. Les besoins financiers sont identifiés, mais le dossier manque de structuration ou le dirigeant ne souhaite pas aborder seul les discussions avec les investisseurs. La levée devient un enjeu stratégique autant qu\'un enjeu financier.',
                intervention: 'Clarification du besoin réel de financement et de ses implications sur la gouvernance. Conseils sur la rédaction du dossier d\'investissement : vision stratégique, trajectoire financière, articulation des risques et des opportunités. Préparation du dirigeant aux échanges avec les investisseurs. Mise en relation avec un réseau qualifié d\'investisseurs (Privés, Family offices, Fonds d\'Investissement).',
                effet: 'Une levée structurée, cohérente avec la stratégie. Un dirigeant préparé et sécurisé dans ses échanges. Des partenaires financiers alignés avec la trajectoire de l\'entreprise. La levée devient un levier de croissance, non une contrainte subie.',
                partnerContact: { name: 'Hugues', email: 'hugues.franc@immer-executive.com' }
            },
            {
                id: 'partenaires',
                title: 'Recherche de partenaires BtoB',
                iconName: 'Building2',
                intro: 'Certaines phases de développement exigent des alliances structurantes. Identifier et formaliser un partenariat BtoB demande une lecture fine des intérêts réciproques, des équilibres de pouvoir et des implications opérationnelles. Nous accompagnons le dirigeant dans la sécurisation de ces relations stratégiques.',
                situation: 'L\'entreprise souhaite accélérer son développement par un partenariat industriel, commercial ou technologique. Les opportunités sont identifiées, mais les enjeux de dépendance, d\'alignement stratégique et de partage de la valeur sont complexes.',
                intervention: 'Clarification des objectifs réels du partenariat et des points non négociables. Identification et qualification des partenaires potentiels. Prises de contacts et organisation des rendez-vous. Préparation des discussions et accompagnement dans la structuration de l\'accord.',
                effet: 'Un partenariat structuré, équilibré et aligné avec la trajectoire de l\'entreprise. Une relation sécurisée, capable de produire des résultats sans fragiliser l\'autonomie stratégique. Le développement s\'appuie sur une alliance maîtrisée.',
                partnerContact: { name: 'Hugues', email: 'hugues.franc@immer-executive.com' }
            },
            {
                id: 'partage',
                title: 'Directions à temps partagé',
                iconName: 'Clock',
                intro: 'Toutes les organisations n\'ont pas le besoin, ni la capacité, d\'intégrer des profils de dirigeants opérationnels à plein temps. Marketing, export international, commercial, etc. Les directions à temps partagé permettent d\'accéder à une expertise stratégique de haut niveau, dans la durée, sur le terrain, avec une intensité adaptée au besoin réel — et surtout dans un format souple de ½ journée à plusieurs jours par semaine. Il s\'agit d\'intégrer une compétence structurante sans alourdir l\'organisation.',
                situation: 'L\'entreprise entre dans une phase de structuration : croissance, diversification, réorganisation, internationalisation. Elle a besoin d\'une direction marketing, financière ou commerciale expérimentée, mais ne dispose ni du volume d\'activité ni du budget pour un poste à plein temps. Elle a besoin de faire grandir l\'équipe et de la rendre autonome. Le risque est de repousser une structuration pourtant nécessaire.',
                intervention: 'Définition précise du périmètre et du niveau d\'intervention requis. Mise à disposition d\'un dirigeant expérimenté intervenant à temps partiel, intégré comme membre de l\'équipe, avec des responsabilités clairement définies. Accompagnement du dirigeant principal pour articuler cette ressource dans le collectif existant.',
                effet: 'Une expertise de haut niveau mobilisée sans déséquilibrer la structure. Une organisation qui se professionnalise progressivement. La fonction stratégique est sécurisée, avec une intensité adaptée.',
                partners: [
                    { label: 'Direction Communication et Marketing', name: 'Bernard', email: 'bernard.gindre@immer-executive.com' },
                    { label: 'Direction Export et Internationale', name: 'Stéphane', email: 'stephane.thomas@immer-executive.com' },
                    { label: 'Direction Commerciale', name: 'Pierre', email: 'pierre.desurville@immer-executive.com' },
                ]
            },
            {
                id: 'analyse-donnees',
                title: 'IA / Data — Analyse et exploitation opérationnelle des données',
                iconName: 'Database',
                intro: 'Les organisations disposent souvent de données brutes nombreuses, mais peu exploitées stratégiquement car non synthétiques, ou ne rentrant pas dans les formats d\'analyse classiques (excel, compta…). L\'enjeu n\'est pas d\'en produire davantage, mais d\'extraire, structurer et interpréter celles qui existent déjà et qui constituent un véritable trésor stratégique, permettant de révéler des opportunités surprenantes. Nous intervenons pour proposer, à partir de l\'analyse structurée d\'un volume d\'informations, des stratégies et des plans d\'action immédiatement opérationnels.',
                situation: 'Travaillant sur la base de tableaux et de synthèses déjà formatés, l\'entreprise a perdu le contact avec des matériaux commerciaux et de relation clients basiques, mais diffus et trop abondants pour être traités humainement : mails, devis, appels d\'offres, échanges SAV. On perçoit des signaux faibles, mais trop diffus pour être objectivés, voire même pour déclencher des décisions.',
                intervention: 'Cartographie et collecte des données existantes. Traitement par LLM des données, analyses et restitution d\'outils de décision et d\'actions opérationnelles immédiates.',
                effet: 'Une compréhension nouvelle des parties prenantes au-delà des données chiffrées. Identification de besoins non traités, de clients délaissés, de points forts non valorisés, de marchés potentiels. Recommandation d\'actions individualisées ou stratégiques.',
                partnerContact: { name: 'Raphaël', email: 'raphael.besson@immer-executive.com' }
            }
        ]
    }
};
