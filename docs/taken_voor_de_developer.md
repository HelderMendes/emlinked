# Emlinked homepage — taken voor de developer

Oct 13, 2026 · @Raymond Perridon

## Samenvatting

De teksten van de homepage staan in Sanity en zijn bijgewerkt. Wat overblijft zit in de frontend-code. Er zijn vijf blokkers: een ongeteste demo-aanvraag, de taalredirect, een verkeerde canonical, ontbrekende hreflang en ontbrekende JSON-LD. Daarnaast staan er nog Engelse en technische labels hard in de componenten.

## Prioriteiten

| Prio | Betekenis                                                              |
| ---- | ---------------------------------------------------------------------- |
| P0   | Blokkeert livegang of kost direct leads of rankings                    |
| P1   | Hard-coded tekst die de boodschap tegenspreekt of onprofessioneel oogt |
| P2   | Afwerking en consistentie                                              |

- **Preview:** https://emlinked-git-version02-helder-mendes-projects.vercel.app/ (branch version02)
- **Sanity:** project `rqeokhhk`, dataset `production`. NL-homepage `c8071896-4119-41e3-b095-ab5d2134d27f`, instellingen `siteSettings-nl`.
- Gecontroleerd op 13 oktober 2026: de server-HTML van `/` (NL) en `/en`, en de gepubliceerde Sanity-documenten.

---

## P0 — vóór livegang

- [ ] **Demo-aanvraag testen voor livegang.** `#demo` opent de pop-up met het formulier, dat werkt. Stuur een testaanvraag en controleer waar die terechtkomt (mail of CRM) en of de bezoeker een bevestiging ziet. Het snelformulier in de footer (knop "Stuur") staat niet in een `<form>`. Test dat apart, of vervang het door een knop die de pop-up opent.

- [ ] **Minder verplichte velden in de demo-pop-up.** Nu zijn 5 van de 7 velden verplicht. Elk verplicht veld kost aanvragen, een verplicht telefoonnummer het meest. Pas het zo aan:

| Veld                | Nu        | Nieuw                                                      |
| ------------------- | --------- | ---------------------------------------------------------- |
| Voornaam            | Verplicht | Verplicht                                                  |
| Achternaam          | Verplicht | Optioneel, of samenvoegen met voornaam tot één veld "Naam" |
| E-mailadres         | Verplicht | Verplicht                                                  |
| Telefoonnummer      | Verplicht | Optioneel, met de hint "Liever gebeld? Vul je nummer in"   |
| Organisatie         | Verplicht | Optioneel                                                  |
| Omvang portefeuille | Optioneel | Optioneel                                                  |
| Bericht / vraag     | Optioneel | Optioneel                                                  |

Laat de sterretjes alleen bij de verplichte velden staan. De kwalificatievragen stelt sales in het demogesprek. Meet na livegang hoeveel bezoekers de pop-up openen en hoeveel er een aanvraag versturen.

- [ ] **Taalredirect op `/`.** Een browser met Engels als eerste taal wordt van `/` naar `/en` gestuurd, ook als de cookie `emlinked_locale=nl` staat. De cookie moet voorgaan. Beter nog: geen automatische redirect op de root, alleen een taalkeuze. Googlebot moet `/` altijd als NL-pagina zien.

- [ ] **Canonical klopt niet.** Die wijst nu naar een andere deployment (`emlinked-gp4vzsth2-...vercel.app`). Maak de canonical relatief aan het eigen domein. Bij livegang wordt dat `https://www.emlinked.nl/` en `https://www.emlinked.nl/en`.

- [ ] **Geen hreflang.** Voeg `<link rel="alternate" hreflang="nl">`, `hreflang="en"` en `hreflang="x-default"` (verwijzend naar NL) toe aan elke pagina die in twee talen bestaat.

- [ ] **lang-attribuut op EN-pagina's.** `/en` geeft nu `<html lang="nl">`. Dat moet `lang="en"` zijn.

- [ ] **JSON-LD ontbreekt.** De homepage bevat geen `application/ld+json`. Bouw de structured data in uit het eerder aangeleverde document (Organization, WebSite, SoftwareApplication).

- [ ] **301-redirects van de oude WordPress-URL's.** Dit staat al op de P0-lijst uit de eerdere overdracht en is het grootste risico bij livegang. Zonder redirects verdwijnen rankings en backlinks.

---

## P1 — hard-coded teksten in componenten

Deze teksten staan niet in Sanity, dus de redactie kan ze niet aanpassen. Het beste is ze naar Sanity-velden te verplaatsen. Lukt dat niet, vervang ze dan in de code zoals hieronder. Labels die de boodschap "native in Business Central, geen koppelingen" tegenspreken moeten weg.

| Plek                        | Nu                                             | Nieuw                                                      |
| --------------------------- | ---------------------------------------------- | ---------------------------------------------------------- |
| Hero-mockup                 | € 2,45M / Portefeuillewaarde                   | Laten staan, of vervangen door een echte productscreenshot |
| Hero-mockup                 | Bankaflettering / 100% Synced                  | Bankaflettering / Automatisch                              |
| Integratie Business Central | Direct DB Schema · 2-Way Sync                  | Weghalen, of: Microsoft-platform                           |
| Integratie Document Capture | Inbound Feed                                   | Weghalen (Continia OCR Engine mag blijven)                 |
| Integratie Direct Banking   | PSD2 / ISO 20022 · Realtime Feed               | PSD2 · Ponto                                               |
| Aanvraagblok (footer)       | Vraag vrijblijvend een demo aan                | Plan een demo van 30 minuten                               |
| Aanvraagblok                | Direct contact                                 | Laten staan                                                |
| Aanvraagblok, knop          | Stuur                                          | Verstuur aanvraag                                          |
| Footer, Integraties         | Dynamics 365 ERP Sync                          | Business Central                                           |
| Footer, Integraties         | Box 3 Calculator ⚡                            | Box 3-check                                                |
| Footer, Product             | Vastgoedbeheer Software · Payment Software     | Vastgoedbeheer software · Paylinked                        |
| Footer, Organisatie         | Het Team · Nieuws & Blog · Contact Opnemen     | Het team · Nieuws · Contact opnemen                        |
| Footer, Support             | Documentatie center · Help & Ondersteuning     | Documentatiecenter · Help en ondersteuning                 |
| Box 3-blok, featuretitels   | De component zet er automatisch een ":" achter | Geen automatische dubbele punt toevoegen                   |

Ook de EN-footer heeft hard-coded tekst. Neem die mee in dezelfde aanpassing: "Dynamics 365 ERP Sync" wordt "Business Central", "Docs Portal" wordt "Documentation".

---

## P2 — afwerking

- [ ] **"Mijn emlinked"** linkt naar `/docs`. Moet dit naar de klantlogin? Wacht op het antwoord van Raymond.

- [ ] **Calendly.** Het veld `calendlyUrl` in de instellingen bevat nu alleen `https://calendly.com`. Laat zien welke component dit veld gebruikt. Toon geen Calendly-knop zolang er geen echte link in staat.

- [ ] **Nadruk in de H1.** De H1 gebruikt `*...*` voor nadruk. Controleer dat de sterretjes nooit als tekst te zien zijn, ook niet in de alt-tekst van de hero-afbeelding. Die bevat nu de titel met sterretjes.

- [ ] **Emoji's in de navigatie.** Verwijder ⚡ uit menu en footer zodra de redactie het menu-item heeft aangepast.

- [ ] **Merknaam.** De logo-title zegt "emlinked" en `og:site_name` is "emlinked". Maak beide "Emlinked", gelijk aan de rest van de site.

- [ ] **Paginatitel EN.** "emlinked — Professional Real Estate Management Software for Microsoft BC" bevat "Microsoft BC". Dat wordt "Business Central". Komt de titel uit code, zet hem dan in het SEO-veld in Sanity.

---

## Open vragen en klaar-wanneer

### Open vragen aan Raymond

- Waar moet "Mijn emlinked" naartoe: `/docs` of de klantlogin?
- Waar moeten demo-aanvragen terechtkomen: welk mailadres of welk CRM?
- Welk adres hoort in de footer? NL zegt Gooimeer 12, Naarden. EN zegt Keizersgracht 241, Amsterdam.

### De homepage is klaar als

1. Elke demo-knop op `/` opent de demo-pop-up, ook op `/contact`. Een testaanvraag komt binnen en de bezoeker ziet een bevestiging.
2. Een Engelstalige browser die `/` opent, blijft op de NL-pagina, of krijgt een taalkeuze zonder automatische redirect.
3. De bron van `/` toont: een canonical naar het eigen domein, hreflang nl/en/x-default, `lang="nl"` en minstens één `application/ld+json`-blok. `/en` toont `lang="en"`.
4. In de HTML van `/` komen "Synced", "Sync", "Direct DB Schema", "Inbound Feed" en "Realtime Feed" niet meer voor.
5. De [Rich Results Test](https://search.google.com/test/rich-results) herkent de structured data zonder fouten.

---

## Reactie van Helder — 15 oktober 2026

Status per punt, geverifieerd tegen de huidige code en de live preview-omgeving (`localhost`, branch `version02`). Legenda: ✅ al opgelost · ⏳ nog te doen · ❓ open vraag / besluit nodig · ⚠️ tegenspraak of correctie op dit document.

### P0 — vóór livegang

- **Demo-aanvraag testen.** ✅/❓ Het snelformulier in de footer staat wél al in een echte `<form onSubmit=...>` met eigen handler — die constatering in dit document klopt niet (meer). **3) Reactie op jouw punt:** het ontvangende adres is al een env-variabele (`MAIL_TO_EMAIL`, met `MAIL_FROM_EMAIL`/`MAIL_FROM_NAME`) in zowel het demo- als het offerte-formulier — geen code nodig, alleen invullen in Vercel zodra het definitieve adres vaststaat (support/admin/info@emlinked.nl of .com). Een los testaccount bij Resend is niet nodig: het ontvangende adres (`to`) mag elk bestaand postvak zijn, bijvoorbeeld je eigen `@herderdesign.nl`-adres. Wat wél geregeld moet zijn in Resend: het verzendende domein (`MAIL_FROM_EMAIL`) moet daar als domein geverifieerd staan (SPF/DKIM-records), anders weigert Resend de mail. Is `herderdesign.nl` daar al geverifieerd?
- **Verplichte velden in de demo-pop-up.** ✅ Geïmplementeerd (15 okt) — alleen voornaam en e-mail zijn nu nog verplicht. Telefoon heeft de hint "Liever gebeld? Vul je nummer in".
- **Taalredirect op `/`.** ✅ Al opgelost. Getest met `Accept-Language: en` + cookie `emlinked_locale=nl`: de pagina blijft NL. Zonder cookie en met Engelse taalvoorkeur wordt wél naar `/en` gestuurd, maar de cookie wint altijd als die er is. Googlebot (geen cookie, meestal geen Accept-Language) krijgt `/` als NL-pagina via een server-side rewrite, geen redirect.
- **Canonical.** ✅ Logica is al correct — de canonical is al relatief aan het eigen domein (`NEXT_PUBLIC_SITE_URL`, valt terug op `emlinked.com`). **1) Bevestigd door Helder:** migratie gaat naar `.com`, niet `.nl`. Geen codewijziging nodig — zorg bij de productie-deploy dat `NEXT_PUBLIC_SITE_URL=https://emlinked.com` in Vercel staat, dan kloppen canonical/hreflang/redirects automatisch.
- **Hreflang.** ✅ Geïmplementeerd (15 okt) — `hreflang nl/en/x-default` staat nu op elke pagina, automatisch afgeleid uit de canonical-URL (werkt ook meteen voor alle bestaande en toekomstige pagina's, geen aparte wiring per pagina nodig).
- **lang-attribuut EN-pagina's.** ✅ Opgelost (15 okt). `/en` geeft nu `lang="en"`, `/` geeft `lang="nl"`. Oorzaak was dat dit attribuut hardcoded in de root layout stond; de locale wordt nu via een request-header vanuit de proxy doorgegeven.
- **JSON-LD.** ✅ Basis geïmplementeerd (15 okt) — homepage toont nu een `application/ld+json`-blok (Organization, WebSite, SoftwareApplication) met de bedrijfsgegevens uit Sanity (adres, telefoon, LinkedIn). ⚠️ Correctie op het eerdere advies: Vercel genereert geen structured data automatisch — dat moet altijd expliciet in de pagina worden gebouwd, ongeacht hosting-platform. Dat eerdere advies was dus niet juist. Nog te doen: dit uitbreiden naar de overige paginatypes (Product/FAQ) en langs de [Rich Results Test](https://search.google.com/test/rich-results) halen.
- **301-redirects oude WordPress-URL's.** ✅ grotendeels klaar — er ligt al een `redirects.json` met 200+ gemapte oude URL's naar `emlinked.com`, en de proxy vangt het oude `.nl`-domein sitebreed af (alles wat niet expliciet gemapt is, valt automatisch terug naar `.com`). Wat nog moet: definitief maken zodra het productiedomein vaststaat, en controleren of de lijst volledig is tegenover Search Console/Analytics.

### P1 — hard-coded teksten

Status gecheckt per rij uit de tabel. Op 15 oktober doorgevoerd:

| Plek | Status |
| --- | --- |
| Hero-mockup € 2,45M / Portefeuillewaarde | Bewust laten staan (een van de twee opties uit dit document) |
| Hero-mockup 100% Synced → Automatisch | ✅ Gedaan, inclusief dezelfde "Synced"-claim op de Box3-check- en partnerspagina |
| Direct DB Schema · 2-Way Sync → Microsoft-platform | ✅ Gedaan |
| Inbound Feed | ✅ Weggehaald |
| PSD2/ISO 20022 → PSD2 · Ponto | ✅ Gedaan |
| Aanvraagblok footer-titel → "Plan een demo van 30 minuten" | ✅ Gedaan |
| Aanvraagblok, knop "Stuur" → "Verstuur aanvraag" | ✅ Gedaan |
| Footer Integraties: Dynamics 365 ERP Sync → Business Central | ✅ Gedaan (NL + EN) |
| Footer Integraties: Box 3 Calculator ⚡ → Box 3-check | ✅ Gedaan, emoji ook weg in het hoofdmenu (NL + EN) |
| Footer Product: Payment Software → Paylinked | ⏳ Nog niet doorgevoerd — zie **4)** hieronder |
| Footer Organisatie: Het Team · Nieuws & Blog · Contact Opnemen | ✅ Gedaan |
| Footer Support: Documentatie center · Help & Ondersteuning | ✅ Gedaan |
| Box 3-blok, automatische ":" | ✅ Gevonden en gefixt (15 okt) — zie **7)** hieronder |

> **4) Paylinked — reactie op "waar staat dit?":** dit komt letterlijk uit Raymonds eigen P1-tabel bovenaan dit document, rij "Footer, Product": `Vastgoedbeheer Software · Payment Software` → `Vastgoedbeheer software · Paylinked`. Ik heb het zelf niet verzonnen, alleen nog niet doorgevoerd omdat ik niet weet of "Paylinked" al de definitieve productnaam is. Raymond, kun je bevestigen?

> **7) Box 3-blok ":" — reactie op "wat bedoel je?":** gevonden in `src/components/blocks/PageBlockRenderer.tsx`, de "Portfolio Health"-featurelijst (gebruikt in de Box 3-check lead-magnet-sectie). De code voegde achter elke featuretitel hardcoded een `:` toe (`{feature.title}:`), los van wat de redacteur in Sanity typt. Weggehaald (15 okt) — als een titel in Sanity zelf een ":" moet hebben, typt de redacteur die er nu zelf bij.

> **Bijvangst tijdens deze ronde — update:** bevestigd door Helder, de homepage-hero heeft bewust 3 floating chips, geen testcontent. De "Synced"-claim in chip 3 is wel meegenomen in dezelfde opschoning (zie hieronder). Het label "extra text" is nog een placeholder — Raymond, wat moet hier komen te staan?

> **3) Hard-coded teksten — reactie op jouw punt:** klopt, het grootste deel is al gedaan. De twee uitzonderingen die je noemt (prijzen-calculatie en Box 3-check-calculatie) staan inderdaad nog hardcoded in de code, dat bevestig ik. Besloten: deze blijven bewust in code (rekenlogica, geen tekst) — geen actie nodig.

### P2 — afwerking

- **"Mijn emlinked".** ❓ Nog steeds hardcoded naar `/docs` op twee plekken in de header.
  **2) Over het klantlogin-vraagstuk — belangrijke correctie:** ik heb de login-pagina (`/login`) nagekeken en die is op dit moment pure UI-simulatie. E-mail/wachtwoord-velden staan uitgeschakeld met een vast nepadres erin, en de knop zet alleen een cookie zonder enige controle — er wordt nergens een wachtwoord gecontroleerd. Er is dus geen bestaand authenticatiesysteem om tegen te vergelijken; dit moet nog gebouwd worden.
  Goed nieuws: met jouw toegang tot de WordPress-database kan dit zonder wachtwoord-reset voor bestaande gebruikers. Aanpak: een echte login-route bouwen die inlogpogingen rechtstreeks tegen de `wp_users`-tabel verifieert (WordPress gebruikt meestal het phpass-formaat, sinds WP 6.8 soms bcrypt — te zien aan het prefix `$P$`/`$2y$` in `user_pass`). Geen migratie nodig, geen reset-mail, bestaande klanten loggen gewoon in met hun huidige gegevens.
  Dit is een nieuwe feature, geen kleine tekstfix — graag voordat ik begin: (a) bevestiging dat dit de gewenste richting is, (b) toegang tot de WP-database (read-only volstaat) of de relevante tabel-export, (c) WordPress-versie zodat ik het juiste hash-formaat gebruik.
- **Calendly.** ✅ Verwijderd (15 okt) — **5) bevestigd door Raymond.** Veld `calendlyUrl` volledig weggehaald uit het Sanity-schema en de ongebruikte referenties in de code opgeruimd (was toch nergens zichtbaar).
- **Nadruk in de H1.** ✅ Opgelost (15 okt) — de sterretjes werden alleen in de zichtbare H1 gestript, niet in de `alt`-tekst van de hero-afbeelding. Dat laatste is nu ook gefixt.
- **Emoji's in de navigatie.** ✅ Opgelost (15 okt) — ⚡ overal verwijderd uit footer- en menulabels (NL + EN).
- **Merknaam.** ⚠️ **5) Reactie op jouw punt:** eens — de huisstijl is bewust kleine letter "emlinked", niet "Emlinked". Dat is al zo geïmplementeerd in `og:site_name` en de logo-title. Ik stel voor dit P2-punt van Raymond niet door te voeren, tenzij hij bevestigt dat hij hier bewust van de eerdere afspraak wil afwijken.
- **Paginatitel EN.** ⏳ Bevestigd: "Microsoft BC" staat er nog, maar niet waar het document het verwacht. De tekst komt uit Sanity (SEO-veld), niet uit hardcoded code — dit is dus een contentwijziging die Raymond zelf in Sanity Studio kan doorvoeren, geen developer-taak. Ik pas voor de zekerheid wel de hardcoded fallback-tekst in de code aan, voor het geval het SEO-veld ooit leeg is.

### Open vragen — status

- Mijn emlinked → `/docs` of klantlogin: **nog open**, zie puntje 2 hierboven (incl. wat ik nodig heb om de echte login te bouwen).
- Demo-aanvragen → welk mailadres: **bijna rond** — zie puntje 3 hierboven. Nog te bevestigen: definitief `MAIL_TO_EMAIL`-adres, en of `herderdesign.nl` al als verzenddomein geverifieerd staat in Resend.
- Adres in de footer: **opgelost** — NL én EN tonen nu allebei "Gooimeer 12, 1411 DE Naarden".
- Productiedomein: **opgelost** — `.com`, zie puntje 1 hierboven.
- **Paylinked-naamgeving:** zie puntje 4 hierboven.

### Dingen die in Raymonds document ontbreken

- De uiteindelijke lijst van oude WordPress-URL's voor de 301-redirects — is de huidige `redirects.json` (200+ regels) compleet, of komt er nog een aanvulling vanuit Search Console/Analytics?
- Geen vermelding van reCAPTCHA-sitesleutels voor productie (apart traject, inmiddels v3 geïmplementeerd) — geen actie nodig vanuit dit document, alleen ter info.
