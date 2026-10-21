# Folder publicat pe Vercel

Conține site-ul public al restaurantului Orizont, găzduit pe Vercel la
**https://restaurantorizontarad.website**. Nu editați fișierele de aici — sunt generate din proiect;
modificările se fac în `Orizont Homepage.dc.html`, `Termeni si Confidentialitate.dc.html`
și `Panou Administrare.dc.html`, apoi folderul se regenerează.

> **Link-urile interne (`/`, `/admin/`, `/termeni-si-confidentialitate`) nu funcționează
> în previzualizarea din proiect** — sunt adrese de site, corecte doar după publicare pe Vercel.
> Pentru verificări locale folosiți fișierele originale din rădăcina proiectului.

## Cum este legat totul

| Piesă | Unde | Ce face |
|---|---|---|
| Codul site-ului | GitHub: `AdonisHolonec/restaurantdarko`, ramura `main` | sursa pentru Vercel |
| Găzduire | Vercel, proiectul `restaurantorizontarad` | publică automat fiecare `git push` pe `main` |
| Conținut | Sanity, proiectul `bbf8md42`, dataset `production` | program, contact, meniu, fotografii |
| Editor de conținut | https://restaurant-darko.sanity.studio | aici se fac modificările de conținut |

Site-ul este static (fără build): Vercel publică folderul așa cum este. Conținutul din Sanity se
citește direct din browser, deci o modificare făcută în editor apare pe site fără republicare.

---

## Publicarea unei versiuni noi

```bash
git add .
git commit -m "descrierea modificării"
git push origin main
```

Vercel publică automat în câteva secunde. Istoricul publicărilor și revenirea la o versiune
anterioară („Instant Rollback") sunt în **vercel.com → restaurantorizontarad → Deployments**.

Configurația de găzduire este în `vercel.json`:
- `/termeni` → `/termeni-si-confidentialitate` (redirect 301);
- adrese fără `.html` (`cleanUrls`);
- headere de securitate pe toate paginile;
- cache de un an pentru `/assets/` — la înlocuirea unei imagini de acolo, folosiți un nume nou de fișier;
- `/admin/` nu este indexat de motoarele de căutare.

## Domeniul

`restaurantorizontarad.website` este administrat de Vercel (DNS și certificat HTTPS automate).
`www.restaurantorizontarad.website` redirecționează către adresa fără `www`.

Dacă domeniul se schimbă vreodată:
1. **Vercel → restaurantorizontarad → Settings → Domains** → adăugați domeniul nou.
2. În `index.html`, `sitemap.xml` și `robots.txt`, înlocuiți adresa veche cu cea nouă.
3. În **sanity.io/manage → bbf8md42 → API → CORS origins** adăugați noul domeniu
   (fără credentials). **Fără acest pas, site-ul apare fără meniu, program și fotografii.**

Adrese CORS actuale: `https://restaurantorizontarad.website`, `https://restaurantorizontarad.vercel.app`
și `http://localhost:3333` (editorul Sanity rulat local).

---

## Conținutul din Sanity

Schema conținutului este în `cms/sanity/schemaTypes/`. După o modificare a schemei, copiați folderul
în proiectul Sanity Studio și rulați `npx sanity deploy`. Meniul inițial (20 categorii, 171 feluri)
se poate reimporta cu `cms/seed.mjs` — vezi `cms/README.md`.

### Fotografiile

În editorul Sanity, la **„Fotografie de pe site"**, există câte un document pentru fiecare poziție.
Sanity redimensionează automat fotografiile pentru web.

Cele 15 poziții folosite în pagină:

| Cheie | Unde apare |
|---|---|
| `orizont-hero` | fotografia mare de sus |
| `orizont-dish-1` … `-3` | semnăturile casei: sarmale, berbecuț, creveți |
| `orizont-platou-1` … `-3` | platouri: haiducesc, al casei, tava Orizont |
| `orizont-atm-1` … `-4` | atmosferă: sala dimineața, terasa, sala seara, bucătăria |
| `orizont-menu-1` … `-3` | meniu: ciorbe, pizza, desert — caruseluri, pot avea mai multe fotografii |
| `orizont-rezervare` | secțiunea de rezervări |

Cheia trebuie scrisă exact — se alege din listă, nu se tastează. Pentru o fotografie în plus într-un
carusel, creați încă un document cu aceeași cheie; câmpul `ordine` stabilește ordinea.

## Adrese

| Adresă | Ce este |
|---|---|
| `/` | Prima pagină |
| `/termeni-si-confidentialitate` (sau `/termeni`) | Informații legale |
| `/admin/` | Deschide editorul Sanity — cere autentificare cu contul Sanity |
