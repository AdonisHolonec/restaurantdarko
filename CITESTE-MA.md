# Folder pregătit pentru Netlify

Conține site-ul gata de publicat. Nu editați fișierele de aici — sunt generate din proiect;
modificările se fac în `Orizont Homepage.dc.html`, `Termeni si Confidentialitate.dc.html`
și `Panou Administrare.dc.html`, apoi folderul se regenerează.

> **Link-urile interne (`/`, `/admin/`, `/termeni-si-confidentialitate.html`) nu funcționează
> în previzualizarea din proiect** — sunt adrese de site, corecte doar după publicare pe Netlify.
> Pentru verificări locale folosiți fișierele originale din rădăcina proiectului.

## ⚠ Fotografiile trebuie încărcate în Sanity ÎNAINTE de publicare

Fotografiile pe care le-ați pus în editor nu sunt fișiere în proiect — ele trăiesc în editorul de
design. În site-ul public, cele 15 poziții de fotografie se alimentează din CMS. Dacă publicați
înainte de a le încărca în Sanity, paginile apar cu locurile de fotografii goale.

Ordinea corectă: **Sanity mai întâi** (pașii 1–2), **Netlify după** (pasul 3).

---

## Pasul 1 — Sanity

```bash
npm create sanity@latest -- --template clean --create-project "Restaurant Darko" --dataset production
# copiați cms/sanity/schemaTypes/ peste folderul cu același nume din proiectul creat
npx sanity deploy      # editor public: https://restaurant-darko.sanity.studio
```

Import al meniului (20 categorii, 171 feluri) — vezi `PUBLICARE.md` din rădăcina proiectului.

## Pasul 2 — Fotografiile

În editorul Sanity, la **„Fotografie de pe site"**, creați un document pentru fiecare poziție.
Încărcați aceleași fotografii pe care le-ați pus în editorul de design (le aveți pe calculator);
Sanity le redimensionează automat pentru web.

Cele 15 poziții folosite în pagină:

| Cheie | Unde apare |
|---|---|
| `orizont-hero` | fotografia mare de sus |
| `orizont-dish-1` … `-3` | semnăturile casei: sarmale, berbecuț, creveți |
| `orizont-platou-1` … `-3` | platouri: haiducesc, al casei, tava Orizont |
| `orizont-atm-1` … `-4` | atmosferă: sala dimineața, terasa, sala seara, bucătăria |
| `orizont-menu-1` … `-3` | meniu: ciorbe, pizza, desert |
| `orizont-rezervare` | secțiunea de rezervări |

Cheia trebuie scrisă exact — se alege din listă, nu se tastează.

## Pasul 3 — Netlify

1. În `index.html`, înlocuiți `INLOCUIESTE_CU_ID_SANITY` cu id-ul proiectului Sanity
   (o singură apariție, în `<head>`). Spuneți-mi id-ul și o fac eu.
2. Cont gratuit pe netlify.com → **Add new site → Deploy manually**, trageți **acest folder**.
3. **Site configuration → Environment variables**:
   - `ADMIN_USER` — ex. `orizont`
   - `ADMIN_PASS` — o parolă lungă, dată proprietarului

   Până când sunt puse, `/admin/` rămâne blocat pentru toți — intenționat.
4. **Domain management → Add a domain** → `restaurantdarko.site`, apoi instrucțiunile DNS.
   Certificatul HTTPS se emite automat.
5. În **sanity.io/manage → API → CORS origins** adăugați `https://restaurantdarko.site`
   (fără credentials). Fără acest pas, site-ul public nu poate citi conținutul din CMS.

## Adrese

| Adresă | Ce este |
|---|---|
| `/` | Prima pagină |
| `/termeni-si-confidentialitate.html` (sau `/termeni`) | Informații legale |
| `/admin/` | Panou de administrare — cere utilizator și parolă |

Panoul publicat administrează programul, contactul, datele firmei și meniul.
Fotografiile se administrează doar din Sanity.
