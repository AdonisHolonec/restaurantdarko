export default {
  name: "setari",
  title: "Program și contact",
  type: "document",
  // singleton: se creează un singur document, cu _id fix "setari"
  fields: [
    {
      name: "programZilnic", title: "Restaurantul, deschis zilnic", type: "string",
      description: 'Ex. „08:00 — 00:00”. Apare sus pe prima pagină și în footer.',
      validation: (R) => R.required()
    },
    {
      name: "programBucatarie", title: "Bucătăria", type: "string",
      description: 'Ex. „10:00 — 22:00”.',
      validation: (R) => R.required()
    },
    {
      name: "programDescriere", title: "Fraza despre program", type: "text", rows: 2,
      description: "Apare în secțiunea „De ce Orizont”, la punctul 01."
    },
    {
      name: "programTelefonOre", title: "Ore pentru rezervări telefonice", type: "string",
      description: 'Ex. „Zilnic, între 08:00 și 22:00”.'
    },
    {
      name: "telefon", title: "Telefon", type: "string",
      description: "Se folosește automat și pentru butonul de WhatsApp.",
      validation: (R) => R.required()
    },
    { name: "adresa", title: "Stradă și număr", type: "string", validation: (R) => R.required() },
    { name: "oras", title: "Oraș și țară", type: "string" },
    { name: "facebook", title: "Pagina de Facebook", type: "url" }
  ],
  preview: {
    select: { title: "telefon", subtitle: "programZilnic" },
    prepare: ({ title, subtitle }) => ({ title: "Program și contact", subtitle: subtitle + " · " + title })
  }
};
