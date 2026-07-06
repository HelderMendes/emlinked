import React from 'react';
import { client } from '@/sanity/client';

interface DocPageProps {
    params: Promise<{ slug?: string[] }>;
}

interface SanityDocResult {
    title: string;
    category: string;
    body?: any[];
}

const slugToTitleMap = new Map<string, string>([
    ['releasenotes-emlinked-23', 'ReleaseNotes Emlinked 23'],
    ['releasenotes-emlinked-23009', 'ReleaseNotes Emlinked 23.009'],
    ['releasenotes-emlinked-23010', 'ReleaseNotes Emlinked 23.010'],
    ['aanmaken-huurcontract', 'Aanmaken huurcontract'],
    ['aanmaken-object', 'Aanmaken object'],
    ['aanmaken-verhuureenheid', 'Aanmaken Verhuureenheid'],
    ['beheer-factuur-maken', 'Beheer factuur maken'],
    ['creditnota-aanmaken', 'Creditnota aanmaken'],
    [
        'huurcontract-op-meerdere-verhuureenheden',
        'Huurcontract op meerdere verhuureenheden',
    ],
    ['huurcontractindexatie', 'Huurcontractindexatie'],
    ['huurindexatie-terugdraaien', 'Huurindexatie terugdraaien'],
    ['huurprolongatie', 'Huurprolongatie'],
    ['kosten-factuur-maken', 'Kosten factuur maken'],
    [
        'nieuwe-functionaliteit-kopieeren-kostenverdeling',
        'Nieuwe functionaliteit kopieëren kostenverdeling',
    ],
    ['rentefactuur', 'Rentefactuur'],
    ['vermelding-indexatie-percentage', 'Vermelding indexatie percentage'],
    [
        'aanpassing-onderwerp-regel-inkooporder',
        'Aanpassing onderwerp regel inkooporder',
    ],
    ['betalingsverplichtingen-beheren', 'Betalingsverplichtingen beheren'],
    ['btw-verlegging', 'BTW-Verlegging'],
    [
        'het-grootboek-en-het-rekeningschema-begrijpen',
        'Het grootboek en het rekeningschema begrijpen',
    ],
    ['rdlc-of-word-rapport', 'RDLC of Word rapport'],
    ['tegoed-beheren', 'Tegoed beheren'],
    [
        'telebankieren-betaling-klaar-zetten',
        'Telebankieren betaling klaar zetten',
    ],
    ['vooruitbetalingen-factureren', 'Vooruitbetalingen factureren'],
    ['aanmaningen-maken-en-versturen', 'Aanmaningen maken en versturen'],
    [
        'instructies-inlezen-of-bijwerken-wvs-puntentellinglijst',
        'Instructies inlezen of bijwerken WVS puntentellinglijst',
    ],
    ['nieuwe-contacten', 'Nieuwe contacten'],
    ['nieuwe-eigenaar-registreren', 'Nieuwe eigenaar registreren'],
    ['nieuwe-huurder-registreren', 'Nieuwe huurder registreren'],
    ['verkopen-factureren', 'Verkopen factureren'],
    [
        'verschillende-e-mailadressen-gebruiken',
        'Verschillende e-mailadressen gebruiken',
    ],
    [
        'betalingen-aanmaken-enof-leveranciers-betalen',
        'Betalingen aanmaken en/of leveranciers betalen',
    ],
    ['inkopen-vastleggen', 'Inkopen vastleggen'],
    ['kosten-doorbelasten-toewijzen', 'Kosten doorbelasten toewijzen'],
    ['service-kosten-afrekenfactuur', 'Service kosten afrekenfactuur'],
    ['aanmaken-service-registratie', 'Aanmaken service registratie'],
    ['een-inkoop-order-maken', 'Een inkoop order maken'],
    ['meldingen-registreren', 'Meldingen registreren'],
    ['beheer-van-bcc', 'Beheer van BCC'],
    ['betalingsmethoden-instellen', 'Betalingsmethoden instellen'],
    ['boekingsgroepen-instellen', 'Boekingsgroepen instellen'],
    ['de-rekeningschemas-instellen', 'De rekeningschema’s instellen'],
    [
        'emlinked-op-uw-mobiele-apparaat-krijgen',
        'EMLinked op uw mobiele apparaat krijgen',
    ],
]);

export default async function DocPage({ params }: DocPageProps) {
    const resolvedParams = await params;
    const slugArray = resolvedParams.slug || [];

    // 1. Render Docs Landing/Index Page if no path segments are provided
    if (slugArray.length === 0) {
        return (
            <div className='space-y-8'>
                <div className='border-b border-border pb-6'>
                    <h1 className='text-3xl font-bold tracking-tight text-foreground'>
                        Documentation Center
                    </h1>
                    <p className='text-sm text-muted-foreground mt-2'>
                        Welkom bij de Emlinked documentatie. Hier vindt u alle
                        instructies en handleidingen voor het instellen, beheren
                        en automatiseren van uw vastgoedportefeuille.
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                    <div className='p-6 rounded-lg border border-border bg-card'>
                        <h3 className='text-sm font-semibold text-foreground'>
                            Vastgoed Beheer
                        </h3>
                        <p className='text-xs text-muted-foreground mt-1'>
                            Lessen over het aanmaken van objecten, huureenheden,
                            contracten en indexatie-cycli.
                        </p>
                    </div>
                    <div className='p-6 rounded-lg border border-border bg-card'>
                        <h3 className='text-sm font-semibold text-foreground'>
                            Financieel Beheer
                        </h3>
                        <p className='text-xs text-muted-foreground mt-1'>
                            Volledige debiteuren/crediteuren flow, aanmaningen,
                            btw-verlegging en telebankieren.
                        </p>
                    </div>
                    <div className='p-6 rounded-lg border border-border bg-card'>
                        <h3 className='text-sm font-semibold text-foreground'>
                            Kosten & Service
                        </h3>
                        <p className='text-xs text-muted-foreground mt-1'>
                            Beheer servicekosten, aannemersinkopen en
                            doorbelastingen.
                        </p>
                    </div>
                    <div className='p-6 rounded-lg border border-border bg-card'>
                        <h3 className='text-sm font-semibold text-foreground'>
                            Instellen
                        </h3>
                        <p className='text-xs text-muted-foreground mt-1'>
                            Configuratie van boekingsgroepen,
                            rekeningschema&apos;s en mobiele apparaten.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Extract category and actual slug from dynamic path array
    const category = slugArray[0] || '';
    const itemSlug = slugArray[1] || '';

    let sanityDoc: SanityDocResult | null = null;

    try {
        sanityDoc = await client.fetch<SanityDocResult | null>(
            `*[_type == "doc" && category == $category && slug.current == $itemSlug][0] {
        title,
        category,
        body
      }`,
            { category, itemSlug },
        );
    } catch (err) {
        console.error('Sanity doc fetch error, rendering fallback page:', err);
    }

    // 2. Render content from Sanity if found
    if (sanityDoc) {
        return (
            <div className='space-y-6'>
                <div className='border-b border-border pb-6'>
                    <div className='text-[10px] font-bold tracking-widest text-primary uppercase mb-1'>
                        {sanityDoc.category.replace('-', ' ')}
                    </div>
                    <h1 className='text-3xl font-bold tracking-tight text-foreground'>
                        {sanityDoc.title}
                    </h1>
                </div>

                {/* Render body content (portable text renderers can be plugged here) */}
                <article className='prose dark:prose-invert text-sm max-w-none leading-relaxed text-muted-foreground space-y-4'>
                    {sanityDoc.body ? (
                        <div>[Portable Text Content]</div>
                    ) : (
                        <p>Geen inhoud beschikbaar.</p>
                    )}
                </article>
            </div>
        );
    }

    // 3. Render rich placeholder page if not yet created in Sanity
    const fallbackTitle =
        slugToTitleMap.get(itemSlug) || itemSlug.replace(/-/g, ' ');
    const categoryLabel = category.replace(/-/g, ' ');

    return (
        <div className='space-y-6'>
            <div className='border-b border-border pb-6'>
                <div className='text-[10px] font-bold tracking-widest text-primary uppercase mb-1'>
                    {categoryLabel}
                </div>
                <h1 className='text-3xl font-bold tracking-tight text-foreground'>
                    {fallbackTitle}
                </h1>
            </div>

            <article className='prose dark:prose-invert text-sm max-w-none leading-relaxed text-muted-foreground space-y-6'>
                <p>
                    Dit artikel (<strong>{fallbackTitle}</strong>) is momenteel
                    in voorbereiding en wordt gesynchroniseerd vanuit de
                    WordPress database.
                </p>

                <div className='p-4 rounded-md bg-muted/30 border border-border space-y-3'>
                    <h4 className='font-semibold text-foreground text-xs uppercase tracking-wide'>
                        Inhoudsopgave Details
                    </h4>
                    <ul className='list-disc list-inside text-xs space-y-1'>
                        <li>
                            <strong>Categorie:</strong> {categoryLabel}
                        </li>
                        <li>
                            <strong>Slug URL:</strong> /docs/{category}/
                            {itemSlug}
                        </li>
                        <li>
                            <strong>Status:</strong> Geïmporteerd uit wordpress
                            (klaar voor review)
                        </li>
                    </ul>
                </div>

                <div className='space-y-3'>
                    <h3 className='text-lg font-bold text-foreground'>
                        Standaard Werkwijze (Concept)
                    </h3>
                    <p>
                        Voor het correct uitvoeren van deze actie binnen
                        Emlinked doorloopt u de volgende stappen:
                    </p>
                    <ol className='list-decimal list-inside space-y-2 text-xs'>
                        <li>Navigeer naar uw Emlinked dashboard.</li>
                        <li>
                            Selecteer de module <strong>{categoryLabel}</strong>{' '}
                            in het navigatiepaneel.
                        </li>
                        <li>
                            Klik op de actieknop behorend bij &apos;
                            {fallbackTitle}&apos;.
                        </li>
                        <li>
                            Controleer de invoergegevens en klik op{' '}
                            <strong>Bevestigen</strong> of{' '}
                            <strong>Verwerken</strong>.
                        </li>
                    </ol>
                </div>
            </article>
        </div>
    );
}
