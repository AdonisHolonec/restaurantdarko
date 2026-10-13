const POZITII = [
  ["orizont-hero", "Prima imagine — sala plină, seara"],
  ["orizont-dish-1", "Semnături — sarmale"],
  ["orizont-dish-2", "Semnături — disc de berbecuț"],
  ["orizont-dish-3", "Semnături — creveți în tavă de lut"],
  ["orizont-platou-1", "Platouri — platou haiducesc"],
  ["orizont-platou-2", "Platouri — platoul casei"],
  ["orizont-platou-3", "Platouri — tava Orizont"],
  ["orizont-atm-1", "Atmosferă — sala, dimineața"],
  ["orizont-atm-2", "Atmosferă — terasa"],
  ["orizont-atm-3", "Atmosferă — sala, seara"],
  ["orizont-atm-4", "Atmosferă — bucătăria"],
  ["orizont-menu-1", "Meniu — ciorbe (carusel: oricâte fotografii)"],
  ["orizont-menu-2", "Meniu — pizza și paste (carusel: oricâte fotografii)"],
  ["orizont-menu-3", "Meniu — desert (carusel: oricâte fotografii)"],
  ["orizont-eveniment-1", "Evenimente — sală aranjată"],
  ["orizont-eveniment-2", "Evenimente — mese festive"],
  ["orizont-eveniment-3", "Evenimente — invitați la masă"],
  ["orizont-rezervare", "Rezervări — masă pregătită"]
];

export default {
  name: "imagineSite",
  title: "Fotografie de pe site",
  type: "document",
  fields: [
    {
      name: "cheie", title: "Poziția pe site", type: "string",
      options: { list: POZITII.map(([value, title]) => ({ value, title })) },
      validation: (R) => R.required()
    },
    {
      name: "imagine", title: "Fotografie", type: "image",
      options: { hotspot: true },
      description: "Orizontală, minim 2000 px lățime, JPG.",
      validation: (R) => R.required()
    },
    {
      name: "alt", title: "Descriere pentru accesibilitate", type: "string",
      description: "Ce se vede în fotografie, într-o propoziție.",
      validation: (R) => R.required()
    },
    {
      name: "ordine", title: "Ordinea în carusel", type: "number",
      description: "Doar pentru pozițiile marcate „carusel”: 1 apare prima, apoi 2, 3… Fără număr, fotografiile apar în ordinea adăugării.",
      validation: (R) => R.integer().min(1)
    }
  ],
  preview: {
    select: { title: "cheie", subtitle: "alt", media: "imagine" },
    prepare: ({ title, subtitle, media }) => {
      const p = POZITII.find(([v]) => v === title);
      return { title: p ? p[1] : title, subtitle, media };
    }
  }
};
