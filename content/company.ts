// Contenu réel extrait des plaquettes commerciales FN Partners (FR + EN) — voir le
// plan de session pour la source. Les champs marqués [provisoire] n'existent pas
// dans les plaquettes et ont été rédigés pour rester cohérents en attendant une
// relecture du cabinet ; tout le reste est repris tel quel.

export interface Bilingual {
  fr: string;
  en: string;
}

export const company = {
  name: "FN Partners",
  tagline: {
    fr: "Conseil dans les métiers de l'expertise comptable et de la finance",
    en: "Advisory services in finance and accounting",
  } satisfies Bilingual,
  about: {
    fr: "FN Partners est un cabinet de conseil spécialisé dans les métiers de la finance et de l'expertise comptable. Notre assistance porte sur un large spectre de sujets préoccupant les dirigeants des entreprises et des groupes marocains. De l'étude des investissements au transfert du savoir-faire aux équipes, nous accompagnons les entreprises marocaines dans les différents défis liés à la gestion comptable et financière.",
    en: "FN Partners is a consulting firm specializing in finance and accounting professions. We provide advisory services across a broad range of strategic and operational issues faced by leaders of Moroccan companies and business groups. From investment analysis to the transfer of know-how to in-house teams, we support Moroccan companies in addressing the various challenges related to accounting and financial management.",
  } satisfies Bilingual,
};

export const contact = {
  addressLines: {
    fr: ["4, Meridian Office", "Rue Makkah, 5ème étage, Bureau 5.3, Oasis", "Casablanca, Maroc"],
    en: ["4, Meridian Office", "Makkah Street, 5th floor, Office 5.3, Oasis", "Casablanca, Morocco"],
  } satisfies { fr: string[]; en: string[] },
  phone: "+212 661 49 44 30",
  phoneHref: "tel:+212661494430",
  email: "f.nasri@fnpartners.ma",
};

export const strengths: { title: Bilingual; description: Bilingual }[] = [
  {
    title: { fr: "Expertise technique", en: "Specialized technical expertise" },
    description: {
      fr: "Connaissances approfondies dans les différents domaines de la comptabilité et de la finance.",
      en: "Comprehensive knowledge of accounting and financial disciplines.",
    },
  },
  {
    title: { fr: "Équipe dédiée", en: "Dedicated advisory team" },
    description: {
      fr: "Qui travaille dans une parfaite collaboration avec vos équipes.",
      en: "Operating in perfect harmony with your teams.",
    },
  },
  {
    title: { fr: "Maîtrise des systèmes d'information", en: "Information systems expertise" },
    description: {
      fr: "Les systèmes d'information de consolidation et de contrôle de gestion.",
      en: "Systems for financial consolidation and management control.",
    },
  },
  {
    title: { fr: "Formation", en: "Capacity building" },
    description: {
      fr: "Une longue expérience dans la formation des équipes financières et dans l'enseignement dans de prestigieuses écoles de commerce.",
      en: "Extensive experience in training finance teams and teaching at prestigious business schools.",
    },
  },
  {
    title: { fr: "Expérience probante en Corporate Finance", en: "A proven track record in Corporate Finance" },
    description: {
      fr: "Plusieurs missions de planification financière et d'évaluation de projets d'investissement et d'entreprises.",
      en: "Numerous assignments in financial planning and in the evaluation of investment projects and companies.",
    },
  },
  {
    title: { fr: "Diversité des expériences professionnelles", en: "A diversity of professional backgrounds" },
    description: {
      fr: "Une expérience de 20 ans réalisée dans un cabinet international d'audit et de conseil, dans l'industrie et dans les métiers de la promotion immobilière.",
      en: "20 years of experience gained in an international audit and consulting firm, in the industrial sector, and in real estate development activities.",
    },
  },
];

export const values: { title: Bilingual; points: Bilingual[] }[] = [
  {
    title: { fr: "Partenaire de confiance", en: "Trusted partner" },
    points: [
      { fr: "Pragmatisme et transparence", en: "Pragmatism and transparency" },
      {
        fr: "Intégrité et respect strict de la confidentialité",
        en: "Integrity and strict respect for confidentiality",
      },
    ],
  },
  {
    title: { fr: "Respect des délais et des échéances", en: "Commitment to deadlines and schedules" },
    points: [
      { fr: "Optimisation du temps dédié aux travaux", en: "Optimizing the time spent on tasks" },
      {
        fr: "Respect des échéances de remontée et des délais légaux de communication financière",
        en: "Ensuring compliance with reporting deadlines and legal financial communication timelines",
      },
    ],
  },
  {
    title: { fr: "Valeur ajoutée", en: "Added value" },
    points: [
      {
        fr: "Implication et création de la valeur ajoutée dans vos process",
        en: "Engagement and value creation in your processes",
      },
      { fr: "Capitalisation sur les expériences", en: "Leveraging on experience" },
    ],
  },
  {
    title: { fr: "Travail d'équipe", en: "Collaborative work" },
    points: [
      {
        fr: "Parfaite intégration avec vos équipes pour optimiser les résultats",
        en: "Seamless integration with your teams to optimize results",
      },
      { fr: "Transmission du savoir-faire à vos équipes", en: "Transferring know-how to your teams" },
    ],
  },
];

export interface ServicePole {
  slug: string;
  name: Bilingual;
  summary: Bilingual;
  items: Bilingual[];
  /** [provisoire] non présent dans les plaquettes */
  benefits: Bilingual[];
  /** [provisoire] non présent dans les plaquettes */
  process: Bilingual[];
  /** [provisoire] non présent dans les plaquettes */
  faq: { question: Bilingual; answer: Bilingual }[];
}

export const servicePoles: ServicePole[] = [
  {
    slug: "corporate-finance",
    name: { fr: "Corporate Finance", en: "Corporate Finance" },
    summary: {
      fr: "Conseil dans les métiers de la finance et de la gestion des investissements.",
      en: "Providing advisory services in finance and investment management.",
    },
    items: [
      { fr: "Consolidation et normes IFRS", en: "Consolidation and IFRS Standards" },
      { fr: "Communication financière", en: "Financial communication" },
      { fr: "Analyse et modélisation financière", en: "Financial analysis and modeling" },
      { fr: "Évaluation des entreprises", en: "Company valuation" },
      { fr: "Planification financière", en: "Strategic financial planning" },
      { fr: "Contrôle de gestion", en: "Management control" },
    ],
    benefits: [
      {
        fr: "Une lecture financière fiable pour éclairer vos décisions d'investissement",
        en: "Reliable financial insight to inform your investment decisions",
      },
      {
        fr: "Une communication financière conforme aux standards internationaux (IFRS)",
        en: "Financial communication aligned with international (IFRS) standards",
      },
      {
        fr: "Un pilotage de la performance structuré et adapté à votre organisation",
        en: "Performance management structured and tailored to your organization",
      },
    ],
    process: [
      { fr: "Diagnostic initial et cadrage des besoins", en: "Initial diagnosis and scoping of needs" },
      { fr: "Analyse financière et modélisation", en: "Financial analysis and modeling" },
      {
        fr: "Restitution des conclusions et recommandations",
        en: "Presentation of findings and recommendations",
      },
      {
        fr: "Accompagnement à la mise en œuvre auprès de vos équipes",
        en: "Support for implementation with your teams",
      },
    ],
    faq: [
      {
        question: {
          fr: "Intervenez-vous ponctuellement ou dans la durée ?",
          en: "Do you work on one-off assignments or ongoing engagements?",
        },
        answer: {
          fr: "Les deux — une mission de consolidation ou d'évaluation peut être ponctuelle, tandis qu'un accompagnement en contrôle de gestion s'inscrit souvent dans la durée.",
          en: "Both — a consolidation or valuation assignment can be a one-off engagement, while management-control support is often ongoing.",
        },
      },
      {
        question: {
          fr: "Travaillez-vous avec des groupes présents hors du Maroc ?",
          en: "Do you work with groups operating outside Morocco?",
        },
        answer: {
          fr: "Oui, nous avons réalisé des missions au Maroc, en France, en Algérie et en Afrique de l'Ouest (Sénégal, Guinée, Côte d'Ivoire).",
          en: "Yes, we have carried out assignments in Morocco, France, Algeria, and West Africa (Senegal, Guinea, Ivory Coast).",
        },
      },
    ],
  },
  {
    slug: "audit-revision",
    name: { fr: "Audit et Révision", en: "Financial Audit and Review" },
    summary: {
      fr: "Mission de revue comptable et d'audit contractuel.",
      en: "Accounting review and contractual audit engagements.",
    },
    items: [
      { fr: "Révision des comptes", en: "Accounting review" },
      { fr: "Revue des procédures", en: "Procedures review" },
      { fr: "Revue de l'audit interne", en: "Internal audit review" },
      { fr: "Due diligences", en: "Financial due diligence" },
      { fr: "Audit contractuel", en: "Contractual audit" },
    ],
    benefits: [
      {
        fr: "Une assurance raisonnable sur la fiabilité de vos comptes et procédures",
        en: "Reasonable assurance on the reliability of your accounts and procedures",
      },
      {
        fr: "Une identification claire des zones de risque avant une opération stratégique",
        en: "Clear identification of risk areas ahead of a strategic transaction",
      },
      {
        fr: "Des recommandations opérationnelles, pas seulement un constat",
        en: "Operational recommendations, not just findings",
      },
    ],
    process: [
      { fr: "Cadrage de la mission et du périmètre", en: "Scoping the engagement and its perimeter" },
      { fr: "Travaux de revue et tests sur site", en: "Review procedures and on-site testing" },
      { fr: "Synthèse des constats", en: "Summary of findings" },
      {
        fr: "Rapport détaillé et plan d'actions correctives",
        en: "Detailed report and corrective action plan",
      },
    ],
    faq: [
      {
        question: {
          fr: "Quelle est la différence entre audit contractuel et commissariat aux comptes ?",
          en: "What's the difference between a contractual audit and a statutory audit?",
        },
        answer: {
          fr: "L'audit contractuel répond à un besoin spécifique défini avec vous (due diligence, revue ciblée), sans les contraintes réglementaires d'un mandat légal.",
          en: "A contractual audit addresses a specific need defined with you (due diligence, targeted review), without the regulatory constraints of a statutory mandate.",
        },
      },
      {
        question: {
          fr: "Combien de temps dure une mission de due diligence ?",
          en: "How long does a due diligence engagement take?",
        },
        answer: {
          fr: "Cela dépend du périmètre et de la taille de la cible ; nous cadrons un calendrier précis dès le premier échange.",
          en: "It depends on the scope and size of the target; we agree on a precise timeline from our first conversation.",
        },
      },
    ],
  },
  {
    slug: "management-organisation",
    name: { fr: "Management et Organisation", en: "Management & Organisation" },
    summary: {
      fr: "Assistance dans l'organisation des fonctions comptables et financières.",
      en: "Supporting the organization of accounting and finance functions.",
    },
    items: [
      { fr: "Organisation", en: "Organizational structure" },
      { fr: "Formation", en: "Professional training" },
      { fr: "Recrutement et gestion des carrières", en: "Talent acquisition and career management" },
      { fr: "Communication interne", en: "Internal communication" },
      { fr: "Systèmes d'information", en: "Information systems" },
      { fr: "Procédures internes", en: "Internal processes and procedures" },
    ],
    benefits: [
      {
        fr: "Des fonctions comptables et financières mieux structurées et plus efficientes",
        en: "Better structured and more efficient accounting and finance functions",
      },
      {
        fr: "Des équipes montées en compétence durablement",
        en: "Teams with lasting skill development",
      },
      {
        fr: "Des procédures internes documentées et appropriables",
        en: "Documented, easily-owned internal procedures",
      },
    ],
    process: [
      { fr: "Diagnostic de l'organisation actuelle", en: "Diagnosis of the current organization" },
      { fr: "Définition de la cible et des priorités", en: "Defining the target and priorities" },
      {
        fr: "Déploiement (formation, procédures, systèmes)",
        en: "Rollout (training, procedures, systems)",
      },
      { fr: "Suivi et ajustements", en: "Follow-up and adjustments" },
    ],
    faq: [
      {
        question: {
          fr: "Proposez-vous des formations sur mesure ?",
          en: "Do you offer tailor-made training?",
        },
        answer: {
          fr: "Oui, nos formations s'appuient sur une longue expérience de l'enseignement dans des écoles de commerce et sont adaptées à vos équipes.",
          en: "Yes, our training draws on extensive teaching experience at business schools and is tailored to your teams.",
        },
      },
      {
        question: {
          fr: "Intervenez-vous sur le recrutement de profils financiers ?",
          en: "Do you assist with recruiting finance profiles?",
        },
        answer: {
          fr: "Nous accompagnons la définition des besoins et la structuration de la fonction, en lien avec vos process de recrutement.",
          en: "We support defining needs and structuring the function, in coordination with your recruitment process.",
        },
      },
    ],
  },
];

export const references: { name: string; missions: Bilingual[] }[] = [
  {
    name: "Groupe ADDOHA",
    missions: [
      {
        fr: "Consolidation des comptes du groupe en normes IFRS",
        en: "Consolidating group accounts in accordance with IFRS",
      },
      {
        fr: "Gestion de la communication financière et des relations investisseurs",
        en: "Managing financial communication and investor relations",
      },
      {
        fr: "Assistance dans les opérations sur le marché financier (equity et dette)",
        en: "Supporting equity and debt market transactions",
      },
      {
        fr: "Planification financière des opérations d'investissement stratégique",
        en: "Financial planning for strategic investment initiatives",
      },
    ],
  },
  {
    name: "Marjane Holding",
    missions: [
      { fr: "Formation sur la finance pour les non-financiers", en: "Finance courses for non-financial staff" },
      {
        fr: "Formation sur les modes de financement des grandes structures",
        en: "Training on financing solutions for large enterprises",
      },
    ],
  },
  {
    name: "Forafric Maroc",
    missions: [
      { fr: "Revue des procédures et des process", en: "Assessing procedures and processes" },
      { fr: "Missions d'audit opérationnel", en: "Operational audit assignments" },
    ],
  },
  {
    name: "Novancy Consulting",
    missions: [
      { fr: "Diagnostic financier des comptes", en: "Financial diagnosis of accounts" },
      { fr: "Établissement du business plan de la société", en: "Preparation of the company's business plan" },
      { fr: "Valorisation de l'entreprise", en: "Business valuation" },
    ],
  },
  {
    name: "Webeuz",
    missions: [
      { fr: "Établissement du business plan de la société", en: "Preparation of the company's business plan" },
      { fr: "Évaluation de la société", en: "Business valuation" },
    ],
  },
];

export const founder = {
  name: "Fedoua Nasri",
  title: { fr: "Associée Gérante, Expert-Comptable", en: "Managing Partner, Certified Public Accountant" } satisfies Bilingual,
  experience: [
    {
      organization: "Groupe ADDOHA",
      duration: { fr: "14 ans", en: "14 years" } satisfies Bilingual,
      highlights: [
        {
          fr: "Internalisation de la fonction de consolidation et mise en place des normes IFRS",
          en: "Internalization of the consolidation function and implementation of IFRS standards",
        },
        {
          fr: "Structuration du contrôle de gestion et de la communication financière",
          en: "Structuring management control and financial communication",
        },
        {
          fr: "Gestion des opérations sur le marché financier (equity et dette)",
          en: "Managing equity and debt market operations",
        },
        {
          fr: "Coordination du développement en Afrique de l'Ouest",
          en: "Coordinating development in West Africa",
        },
      ],
    },
    {
      organization: "Deloitte Audit",
      duration: { fr: "2 ans", en: "2 years" } satisfies Bilingual,
      highlights: [
        { fr: "Audit contractuel", en: "Contractual audit" },
        { fr: "Commissariat aux comptes", en: "Statutory audit" },
        { fr: "Audit des comptes consolidés", en: "Consolidated accounts audit" },
      ],
    },
    {
      organization: "Deloitte Conseil",
      duration: { fr: "2 ans", en: "2 years" } satisfies Bilingual,
      highlights: [
        {
          fr: "Assistance à la production des comptes consolidés",
          en: "Support for the preparation of consolidated accounts",
        },
        { fr: "Mise en place des normes IFRS", en: "Implementation of IFRS standards" },
      ],
    },
    {
      organization: "Groupe MANAGEM",
      duration: { fr: "2 ans", en: "2 years" } satisfies Bilingual,
      highlights: [
        {
          fr: "Conduite du projet de mise en place des normes IFRS",
          en: "Leading the IFRS implementation project",
        },
      ],
    },
  ],
};

export const geography = ["Maroc", "France", "Algérie", "Sénégal", "Guinée", "Côte d'Ivoire"];

/** [provisoire] Secteurs génériques du cahier des charges — à confronter aux vrais
 * secteurs clients du cabinet (immobilier, distribution, agroalimentaire, conseil
 * confirmés par les références réelles ci-dessus). */
export const sectors: { value: string; label: Bilingual }[] = [
  { value: "industrie", label: { fr: "Industrie", en: "Industry" } },
  { value: "btp_immobilier", label: { fr: "BTP et promotion immobilière", en: "Construction & real estate" } },
  { value: "distribution", label: { fr: "Distribution et commerce", en: "Retail & distribution" } },
  { value: "agroalimentaire", label: { fr: "Agroalimentaire", en: "Agrifood" } },
  { value: "services_conseil", label: { fr: "Services et conseil", en: "Services & consulting" } },
  { value: "pme_startup", label: { fr: "PME et start-up", en: "SMEs & start-ups" } },
  { value: "autre", label: { fr: "Autre", en: "Other" } },
];
