import type { Bilingual } from "./company";

export const legalSections: { heading: Bilingual; body: Bilingual[] }[] = [
  {
    heading: { fr: "Éditeur du site", en: "Site publisher" },
    body: [
      {
        fr: "Le présent site est édité par FN Partners, cabinet de conseil en expertise comptable, audit et finance, dont le siège est situé au 4, Meridian Office, Rue Makkah, 5ème étage, Bureau 5.3, Oasis, Casablanca, Maroc.",
        en: "This site is published by FN Partners, a consulting firm specializing in accounting, audit, and finance, headquartered at 4, Meridian Office, Makkah Street, 5th floor, Office 5.3, Oasis, Casablanca, Morocco.",
      },
      {
        fr: "Directrice de la publication : Fedoua Nasri, Associée Gérante.",
        en: "Publication director: Fedoua Nasri, Managing Partner.",
      },
      {
        fr: "Contact : +212 661 49 44 30 — contact@fnpartners.ma.",
        en: "Contact: +212 661 49 44 30 — contact@fnpartners.ma.",
      },
    ],
  },
  {
    heading: { fr: "Hébergement", en: "Hosting" },
    body: [
      {
        fr: "Ce site est hébergé par Render (Render Services, Inc.), société basée aux États-Unis. Pour plus d'informations : render.com.",
        en: "This site is hosted by Render (Render Services, Inc.), a company based in the United States. For more information: render.com.",
      },
    ],
  },
  {
    heading: { fr: "Propriété intellectuelle", en: "Intellectual property" },
    body: [
      {
        fr: "L'ensemble des contenus présents sur ce site (textes, logos, images, mise en page) est la propriété de FN Partners, sauf mention contraire, et ne peut être reproduit, distribué ou exploité sans autorisation écrite préalable.",
        en: "All content on this site (text, logos, images, layout) is the property of FN Partners, unless stated otherwise, and may not be reproduced, distributed, or used without prior written authorization.",
      },
    ],
  },
  {
    heading: { fr: "Limitation de responsabilité", en: "Limitation of liability" },
    body: [
      {
        fr: "FN Partners s'efforce d'assurer l'exactitude des informations diffusées sur ce site, sans garantir l'absence d'erreur ou d'omission. Les informations présentées ont une valeur informative et ne constituent pas un conseil personnalisé ; toute décision doit faire l'objet d'un échange direct avec notre équipe.",
        en: "FN Partners strives to ensure the accuracy of the information published on this site, without guaranteeing the absence of errors or omissions. The information provided is for general information purposes only and does not constitute personalized advice; any decision should be discussed directly with our team.",
      },
    ],
  },
  {
    heading: { fr: "Droit applicable", en: "Governing law" },
    body: [
      {
        fr: "Le présent site et ses conditions d'utilisation sont soumis au droit marocain. Tout litige relatif à leur interprétation ou leur exécution relève de la compétence exclusive des tribunaux de Casablanca.",
        en: "This site and its terms of use are governed by Moroccan law. Any dispute relating to their interpretation or execution falls under the exclusive jurisdiction of the courts of Casablanca.",
      },
    ],
  },
];
