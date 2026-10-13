/*
 * Importă conținutul actual (cms/seed.json) în Sanity.
 *   export SANITY_PROJECT_ID=xxxxxxxx
 *   export SANITY_TOKEN=<token cu drept de scriere>
 *   node cms/seed.mjs [--dataset production] [--dry]
 */
import { readFile } from "node:fs/promises";

const PROJECT = process.env.SANITY_PROJECT_ID;
const TOKEN = process.env.SANITY_TOKEN;
const DATASET = process.argv.includes("--dataset")
  ? process.argv[process.argv.indexOf("--dataset") + 1]
  : "production";
const DRY = process.argv.includes("--dry");

if (!PROJECT || (!TOKEN && !DRY)) {
  console.error("Lipsesc SANITY_PROJECT_ID sau SANITY_TOKEN.");
  process.exit(1);
}

const seed = JSON.parse(await readFile(new URL("./seed.json", import.meta.url), "utf8"));

const mutations = [
  {
    createOrReplace: {
      _id: "setari",
      _type: "setari",
      programZilnic: seed.program.zilnic,
      programBucatarie: seed.program.bucatarie,
      programDescriere: seed.program.descriere,
      programTelefonOre: seed.program.telefonOre,
      telefon: seed.contact.telefon,
      adresa: seed.contact.adresa,
      oras: seed.contact.oras,
      facebook: seed.contact.facebook
    }
  },
  ...seed.menu.map((cat) => ({
    createOrReplace: {
      _id: "cat-" + cat.id,
      _type: "categorieMeniu",
      nume: cat.name,
      slug: { _type: "slug", current: cat.id },
      nota: cat.note || undefined,
      ordine: cat.ordine,
      ascunsa: !!cat.hidden,
      feluri: cat.items.map((it, i) => ({
        _key: cat.id + "-" + i,
        _type: "felMeniu",
        denumire: it.n,
        gramaj: it.g || undefined,
        pret: Number(it.p),
        ascuns: !!it.hidden
      }))
    }
  }))
];

console.log(`${mutations.length} documente · ${seed.menu.reduce((t, c) => t + c.items.length, 0)} feluri`);
if (DRY) { console.log(JSON.stringify(mutations[1], null, 2)); process.exit(0); }

const res = await fetch(
  `https://${PROJECT}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ mutations })
  }
);
const out = await res.json();
if (!res.ok) { console.error(out); process.exit(1); }
console.log("Gata:", out.results?.length ?? 0, "documente scrise.");
console.log("Fotografiile se încarcă din editor, câte un document „Fotografie de pe site” per poziție.");
