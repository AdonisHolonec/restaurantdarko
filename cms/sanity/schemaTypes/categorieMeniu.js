export default {
  name: "categorieMeniu",
  title: "Categorie de meniu",
  type: "document",
  fields: [
    { name: "nume", title: "Nume", type: "string", validation: (R) => R.required() },
    {
      name: "slug", title: "Identificator (link)", type: "slug",
      options: { source: "nume", maxLength: 40 },
      description: "Se generează automat. Folosit de indexul lateral din meniul complet.",
      validation: (R) => R.required()
    },
    {
      name: "nota", title: "Notă", type: "string",
      description: 'Opțional, ex. „Pâine, smântână și ardei iute incluse în preț”.'
    },
    {
      name: "ordine", title: "Ordine", type: "number", initialValue: 100,
      description: "Numere mai mici apar mai sus (10, 20, 30…).",
      validation: (R) => R.required()
    },
    {
      name: "ascunsa", title: "Categorie ascunsă", type: "boolean", initialValue: false,
      description: "Ascunde toată categoria de pe site, fără a o șterge."
    },
    { name: "feluri", title: "Feluri", type: "array", of: [{ type: "felMeniu" }] }
  ],
  orderings: [{ title: "Ordinea din meniu", name: "ordine", by: [{ field: "ordine", direction: "asc" }] }],
  preview: {
    select: { title: "nume", nota: "nota", feluri: "feluri", ascunsa: "ascunsa" },
    prepare: ({ title, nota, feluri, ascunsa }) => ({
      title: (ascunsa ? "· " : "") + title,
      subtitle: [(feluri || []).length + " feluri", nota].filter(Boolean).join(" · ")
    })
  }
};
