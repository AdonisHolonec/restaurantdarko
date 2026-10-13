# Orizont — structura de conținut pentru CMS

Panoul din `Panou Administrare.dc.html` salvează conținutul în browser (localStorage).
Acest folder conține structura necesară pentru a muta același conținut într-un CMS real,
astfel încât modificările făcute de proprietar să se vadă pentru toți vizitatorii.

CMS recomandat: **Sanity** (plan gratuit generos, editor bun pe telefon, API rapid, fără server de întreținut).
Modelul de mai jos este însă neutru — se poate implementa identic în Strapi, Directus sau WordPress headless.

---

## 1. Modelul de conținut

### `setari` (un singur document, tip „singleton”)
| Câmp | Tip | Unde apare pe site |
|---|---|---|
| `programZilnic` | text scurt | hero („Deschis zilnic”), footer |
| `programBucatarie` | text scurt | hero („Bucătăria”), footer |
| `programDescriere` | text | secțiunea „De ce Orizont”, punctul 01 |
| `programTelefonOre` | text scurt | secțiunea Evenimente, sub telefon |
| `telefon` | text scurt | toate butoanele de apel, WhatsApp, footer |
| `adresa` | text scurt | footer, link Google Maps |
| `oras` | text scurt | footer |
| `facebook` | url | footer, buton Facebook |

### `categorieMeniu` (câte un document per categorie — 20 la pornire)
| Câmp | Tip | Note |
|---|---|---|
| `nume` | text scurt | ex. „Ciorbe” |
| `slug` | slug | folosit ca ancoră în indexul lateral (`#ciorbe`) |
| `nota` | text scurt, opțional | ex. „Pâine, smântână și ardei iute incluse în preț” |
| `ordine` | număr | ordinea în meniu (10, 20, 30…) |
| `ascunsa` | boolean | ascunde categoria de pe site fără a o șterge |
| `feluri` | listă de `felMeniu` | |

### `felMeniu` (obiect în interiorul categoriei)
| Câmp | Tip | Note |
|---|---|---|
| `denumire` | text | ex. „Ciorbă de burtă” |
| `gramaj` | text scurt | ex. „400 g”, „50 ml”, „2 buc” |
| `pret` | număr | doar cifra; „lei” se adaugă automat pe site |
| `ascuns` | boolean | pentru feluri temporar indisponibile |

### `imagineSite` (câte un document per poziție de fotografie — 18 la pornire)
| Câmp | Tip | Note |
|---|---|---|
| `cheie` | text scurt | trebuie să corespundă id-ului din pagină: `orizont-hero`, `orizont-dish-1`, `orizont-atm-3`, `orizont-eveniment-2` etc. |
| `descriere` | text scurt | ce ar trebui să arate fotografia (ghid pentru proprietar) |
| `imagine` | image (hotspot activat) | fotografia propriu-zisă |
| `alt` | text scurt | text alternativ, pentru accesibilitate și SEO |

Cheile pentru cele 18 poziții:
`orizont-hero`, `orizont-dish-1..3`, `orizont-platou-1..3`, `orizont-atm-1..4`,
`orizont-menu-1..3`, `orizont-eveniment-1..3`, `orizont-rezervare`.

---

## 2. Punerea în funcțiune (Sanity)

```bash
npm create sanity@latest -- --template clean --create-project "Orizont" --dataset production
# copiați folderul cms/sanity/schemaTypes/ în proiectul creat, peste cel existent
npm run dev        # editorul pornește pe http://localhost:3333
npx sanity deploy  # editor public: https://orizont.sanity.studio
```

Import al conținutului actual (programul, contactul și cele 20 de categorii / 171 de feluri din `seed.json`):

```bash
export SANITY_PROJECT_ID=xxxxxxxx
export SANITY_TOKEN=<token cu drept de scriere>
node cms/seed.mjs
```

CORS: în sanity.io/manage → API → CORS origins, adăugați domeniul site-ului (fără credentials).

---

## 3. Legarea site-ului

Înlocuiți în `Orizont Homepage.dc.html`, în `<helmet>`:

```html
<script src="./orizont-content.js"></script>
```

cu:

```html
<script src="./cms/orizont-cms.js" data-project-id="xxxxxxxx" data-dataset="production"></script>
```

`orizont-cms.js` expune exact același `window.ORIZONT` (`load`, `paint`, `menu`), deci pagina
nu are nevoie de nicio altă modificare. Citește din CDN-ul Sanity, ține un cache local
pentru afișare instantanee și reîmprospătează în fundal.

Fotografiile vin din CMS prin `data-cms-img="orizont-hero"` pus pe `<image-slot>`;
adaptorul le înlocuiește cu `<img>` optimizat (`?w=2000&auto=format&fit=crop`).

---

## 4. Ce se schimbă pentru proprietar

| Acum (localStorage) | După CMS |
|---|---|
| Modificările se văd doar pe calculatorul lui | Se văd pentru toți vizitatorii |
| Fără parolă | Cont propriu, cu parolă; se pot da drepturi și altei persoane |
| Fotografiile stau în browser | Fotografiile stau în CMS, redimensionate automat |
| Copie de siguranță manuală | Istoric automat al modificărilor, cu revenire la o versiune anterioară |

Panoul actual rămâne util ca *previzualizare* și ca variantă de rezervă: dacă CMS-ul nu răspunde,
site-ul folosește automat ultimul conținut salvat local.
