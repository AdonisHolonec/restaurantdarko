export default {
  name: "felMeniu",
  title: "Fel de mâncare",
  type: "object",
  fields: [
    { name: "denumire", title: "Denumire", type: "string", validation: (R) => R.required() },
    {
      name: "gramaj", title: "Gramaj", type: "string",
      description: 'Ex. „400 g”, „50 ml”, „2 buc”.'
    },
    {
      name: "pret", title: "Preț (lei)", type: "number",
      description: "Doar cifra. „lei” se adaugă automat pe site.",
      validation: (R) => R.required().min(0)
    },
    {
      name: "ascuns", title: "Ascuns temporar", type: "boolean", initialValue: false,
      description: "Pentru feluri care momentan nu se gătesc. Rămâne salvat, dar nu apare pe site."
    }
  ],
  preview: {
    select: { title: "denumire", gramaj: "gramaj", pret: "pret", ascuns: "ascuns" },
    prepare: ({ title, gramaj, pret, ascuns }) => ({
      title: (ascuns ? "· " : "") + title,
      subtitle: [gramaj, pret != null ? pret + " lei" : null].filter(Boolean).join(" · ")
    })
  }
};
