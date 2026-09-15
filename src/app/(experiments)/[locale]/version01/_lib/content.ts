import type { Locale } from './data';

// Menu structure mirrors src/components/Header.tsx defaultMenu — reused per
// the brief ("logo and menu structure are the only elements that need to be
// reused"), everything else is restyled.
export function getNavItems(locale: Locale) {
    const isEn = locale === 'en';
    return {
        apps: [
            {
                title: isEn ? 'Property management software' : 'Vastgoedbeheer software',
                path: '/apps/vastgoedbeheer-software',
                description: isEn
                    ? 'Core SaaS module for portfolio management.'
                    : 'De core SaaS-module voor vastgoedmanagement.',
            },
            {
                title: isEn ? 'Tenant portal' : 'Huurdersportaal',
                path: '/apps/huurdersportaal',
                description: isEn
                    ? 'Self-service portal for communication & tickets.'
                    : 'Self-service portaal voor communicatie & meldingen.',
            },
            {
                title: isEn ? 'Payment software' : 'Payment software',
                path: '/apps/payment-software',
                description: isEn
                    ? 'Automated payment transactions & bank reconciliation.'
                    : 'Geautomatiseerde betalingstransacties & bankaflettering.',
            },
        ],
        flat: [
            { title: 'Box3-check ⚡', path: '/box3-check' },
            {
                title: isEn ? 'Partner software' : 'Partners software',
                path: '/partners-software',
            },
            { title: isEn ? 'Pricing' : 'Prijzen', path: '/prijzen' },
            { title: isEn ? 'References' : 'Referenties', path: '/referenties' },
            { title: isEn ? 'About us' : 'Over ons', path: '/over-ons' },
            { title: isEn ? 'News' : 'Nieuws', path: '/nieuws' },
        ],
    };
}

export function withLocale(path: string, locale: Locale) {
    if (locale === 'nl') return path;
    return `/en${path === '/' ? '' : path}`;
}

// Fallback copy used only when a Sanity field is empty — keeps version01
// resilient without hand-duplicating the CMS content.
export function heroFallback(locale: Locale) {
    const isEn = locale === 'en';
    return {
        label: isEn
            ? 'THE STANDARD FOR MODERN PROPERTY MANAGEMENT'
            : 'DE STANDAARD VOOR MODERN VASTGOEDBEHEER',
        title: isEn
            ? 'Your real estate portfolio, always *audit-ready* by default'
            : 'Uw vastgoedportefeuille, altijd *automatisch* aangifte-klaar',
        subtitle: isEn
            ? 'Provision automated CPI indexation, Box 3 tax compliance and rent collection — natively inside Microsoft Dynamics 365 Business Central.'
            : 'Automatische CPI-indexatie, Box 3-aflettering en huurincasso — native binnen Microsoft Dynamics 365 Business Central.',
        ctaLabel: isEn ? 'Request free demo' : 'Gratis demo aanvragen',
        secondaryCtaLabel: isEn ? 'Explore modules' : 'Bekijk modules',
        proof: isEn
            ? [
                  'No implementation lock-in',
                  '30 days free trial access',
                  '99.9% platform availability',
              ]
            : [
                  'Geen implementatie lock-in',
                  '30 dagen gratis proefperiode',
                  '99,9% platform-beschikbaarheid',
              ],
        stats: [
            { label: isEn ? 'Occupancy rate' : 'Bezettingsgraad', value: '97,4%' },
            { label: isEn ? 'Rent income (mo.)' : 'Huurinkomsten (mnd)', value: '€ 842K' },
            { label: isEn ? 'Managed units' : 'Aantal panden', value: '1.284' },
            { label: 'Box 3', value: isEn ? 'Ready' : 'Gereed' },
        ],
        log: isEn
            ? [
                  '$ emlinked sync --entity business-central',
                  '✔ CPI indexation applied to 1.284 contracts',
                  '✔ SEPA collection batch posted (€ 142.500,-)',
                  '→ Ledger entry validated in Dynamics 365 BC',
              ]
            : [
                  '$ emlinked sync --entity business-central',
                  '✔ CPI-indexatie toegepast op 1.284 contracten',
                  '✔ SEPA-incassobatch verwerkt (€ 142.500,-)',
                  '→ Journaalpost gevalideerd in Dynamics 365 BC',
              ],
    };
}

type ModuleFallback = {
    _key: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaLink?: string;
};

export function modulesFallback(locale: Locale): ModuleFallback[] {
    const isEn = locale === 'en';
    return isEn
        ? [
              {
                  _key: 'vgb',
                  title: 'Property management software',
                  description:
                      'Central portfolio ledger with automated CPI indexation and Box 3 reporting.',
                  ctaLabel: 'Explore module',
              },
              {
                  _key: 'huur',
                  title: 'Tenant portal',
                  description: 'Self-service portal for tickets, documents and communication.',
                  ctaLabel: 'Explore module',
              },
              {
                  _key: 'pay',
                  title: 'Payment software',
                  description: 'Automated SEPA collection and bank reconciliation.',
                  ctaLabel: 'Explore module',
              },
          ]
        : [
              {
                  _key: 'vgb',
                  title: 'Vastgoedbeheer software',
                  description:
                      'Centraal portefeuillegrootboek met automatische CPI-indexatie en Box 3-rapportage.',
                  ctaLabel: 'Bekijk module',
              },
              {
                  _key: 'huur',
                  title: 'Huurdersportaal',
                  description: 'Self-service portaal voor meldingen, documenten en communicatie.',
                  ctaLabel: 'Bekijk module',
              },
              {
                  _key: 'pay',
                  title: 'Payment software',
                  description: 'Geautomatiseerde SEPA-incasso en bankaflettering.',
                  ctaLabel: 'Bekijk module',
              },
          ];
}

export type PersonaSegment = {
    key: string;
    label: string;
    headline: string;
    copy: string;
};

export function personaFallback(locale: Locale) {
    const isEn = locale === 'en';
    return {
        prefix: isEn ? 'I am a' : 'Ik ben een',
        segments: (isEn
            ? [
                  {
                      key: 'belegger',
                      label: 'investor',
                      headline: 'built for return on a growing portfolio.',
                      copy: 'Track yield, valuation and Box 3 exposure per property, per entity — without exporting a single spreadsheet.',
                  },
                  {
                      key: 'beheerder',
                      label: 'property manager',
                      headline: 'built to run your day-to-day without friction.',
                      copy: 'Leases, indexation, maintenance tickets and owner reporting — one workflow, one source of truth.',
                  },
                  {
                      key: 'eigenaar',
                      label: 'owner-occupier landlord',
                      headline: 'built to keep you audit-ready year round.',
                      copy: 'Automated CPI indexation and Box 3 reporting mean tax season is a formality, not a fire drill.',
                  },
              ]
            : [
                  {
                      key: 'belegger',
                      label: 'belegger',
                      headline: 'gebouwd voor rendement op een groeiende portefeuille.',
                      copy: 'Volg rendement, waardering en Box 3-blootstelling per pand, per entiteit — zonder ook maar één spreadsheet te exporteren.',
                  },
                  {
                      key: 'beheerder',
                      label: 'vastgoedbeheerder',
                      headline: 'gebouwd om uw dagelijkse werk zonder wrijving te laten lopen.',
                      copy: 'Huurcontracten, indexatie, meldingen en eigenaarsrapportage — één workflow, één bron van waarheid.',
                  },
                  {
                      key: 'eigenaar',
                      label: 'particuliere verhuurder',
                      headline: 'gebouwd om u het hele jaar aangifte-klaar te houden.',
                      copy: 'Automatische CPI-indexatie en Box 3-rapportage maken van het belastingseizoen een formaliteit, geen brandje.',
                  },
              ]) as PersonaSegment[],
    };
}

export function storiesFallback(locale: Locale) {
    const isEn = locale === 'en';
    return isEn
        ? [
              {
                  _key: 'overhagen',
                  tag: 'Portfolio management',
                  title: 'Van Overhagen digitizes its entire rental administration',
                  description:
                      'Manual CPI indexation and Excel-based reporting replaced by one automated workflow inside Business Central.',
                  image: '/emlinked/referenties/adviesgesprek.jpg',
                  href: '/referenties',
              },
              {
                  _key: 'beheerders',
                  tag: 'Tenant experience',
                  title: 'Professional managers cut ticket handling time in half',
                  description:
                      'The self-service tenant portal routes maintenance requests directly into the operational workflow.',
                  image: '/emlinked/referenties/beheerders_referencties.jpg',
                  href: '/referenties',
              },
          ]
        : [
              {
                  _key: 'overhagen',
                  tag: 'Portefeuillebeheer',
                  title: 'Van Overhagen digitaliseert de volledige huuradministratie',
                  description:
                      'Handmatige CPI-indexatie en Excel-rapportages vervangen door één geautomatiseerde workflow binnen Business Central.',
                  image: '/emlinked/referenties/adviesgesprek.jpg',
                  href: '/referenties',
              },
              {
                  _key: 'beheerders',
                  tag: 'Huurderservaring',
                  title: 'Professionele beheerders halveren afhandeltijd van meldingen',
                  description:
                      'Het self-service huurdersportaal stuurt onderhoudsmeldingen direct de operationele workflow in.',
                  image: '/emlinked/referenties/beheerders_referencties.jpg',
                  href: '/referenties',
              },
          ];
}

export function mapFallback(locale: Locale) {
    const isEn = locale === 'en';
    return {
        tag: isEn ? 'Portfolio spread' : 'Portefeuillespreiding',
        title: isEn
            ? 'Active across the Netherlands, one ledger for every region'
            : 'Actief door heel Nederland, één grootboek per regio',
        subtitle: isEn
            ? 'From Amsterdam to Maastricht — every managed unit reports into the same Business Central environment.'
            : 'Van Amsterdam tot Maastricht — elk beheerd pand rapporteert in dezelfde Business Central-omgeving.',
        stats: [
            { label: isEn ? 'Provinces active' : 'Actieve provincies', value: '12' },
            { label: isEn ? 'Managed units' : 'Beheerde panden', value: '1.284' },
            { label: isEn ? 'Occupancy rate' : 'Bezettingsgraad', value: '97,4%' },
            { label: 'Box 3', value: isEn ? 'Ready' : 'Gereed' },
        ],
    };
}

export function feedbackFallback(locale: Locale) {
    const isEn = locale === 'en';
    return {
        question: isEn
            ? 'Ready to see your own portfolio in emlinked?'
            : 'Klaar om uw eigen portefeuille in emlinked te zien?',
        subtitle: isEn
            ? 'Book a 30-minute walkthrough — no obligation, no slideware.'
            : 'Plan een rondleiding van 30 minuten — vrijblijvend, geen slides.',
        yes: isEn ? 'Yes, plan a demo' : 'Ja, plan een demo',
        no: isEn ? 'Not yet' : 'Nog niet',
        thanksYes: isEn
            ? "Great — we'll reach out within one business day."
            : 'Top — we nemen binnen één werkdag contact op.',
        thanksNo: isEn
            ? 'No problem. The modules stay one scroll up whenever you are ready.'
            : 'Geen probleem. De modules staan één scroll hierboven zodra u wel klaar bent.',
    };
}
