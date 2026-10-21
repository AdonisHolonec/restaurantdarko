(function () {
  var RAW = [
      ["mic-dejun", "Mic dejun", "Servit de la 10:00", [
        ["Meniu ouă ochiuri cu bacon, roșii și telemea", "250 g", 25],
        ["Omletă cu cașcaval și ciuperci", "250 g", 25],
        ["Omletă cu cașcaval și șuncă", "250 g", 25],
        ["Omletă simplă cu telemea și roșii", "200 g", 19]
      ]],
      ["aperitive", "Aperitive", "", [
        ["Bruschete cu somon", "250 g", 30],
        ["Bruschete cu ton", "250 g", 30],
        ["Bruschete cu prosciutto", "250 g", 30],
        ["Bruschete cu feta și roșii", "250 g", 30],
        ["Bruschete cu pastă de jumări", "250 g", 27]
      ]],
      ["ciorbe", "Ciorbe", "Pâine, smântână și ardei iute incluse în preț", [
        ["Ciorbă de burtă", "400 g", 32],
        ["Ciorbă țărănească de vacuță", "400 g", 32],
        ["Ciorbă de perișoare", "400 g", 30],
        ["Ciorbă rădăuțeană", "400 g", 30],
        ["Ciorbă de pui a la grec", "400 g", 30],
        ["Supă de pui", "400 g", 25],
        ["Ciorbă de legume", "400 g", 25]
      ]],
      ["specialitati", "Specialitatea casei", "", [
        ["Creveți în tavă de lut, serviți cu baghete", "350 g", 68],
        ["Coaste de porc cu cartofi wedges și sos sweet chilli", "700 g", 65],
        ["Ciolan cu fasole și ceapă roșie", "800 g", 65],
        ["Carne de scoici în sos mediteranean, unt și usturoi", "300 g", 59],
        ["Disc de berbecuț cu orez", "500 g", 58],
        ["Mușchiuleț de porc cu sos porcini", "450 g", 57],
        ["Disc de vită cu orez", "500 g", 55],
        ["Pui Sichuan cu orez", "500 g", 55],
        ["Gulaș de vită cu mămăligă", "400 g", 50],
        ["Disc de pui cu orez", "500 g", 45],
        ["Disc ceafă de porc cu orez", "500 g", 45],
        ["Vită în tavă de lut la cuptor, cu cartofi", "550 g", 45],
        ["Ciulama de pui cu ciuperci și mămăligă", "500 g", 45],
        ["Sarmale cu mămăliguță și bacon, 5 buc", "500 g", 40],
        ["Mămăliguță cu brânză, smântână, bacon și ou", "400 g", 35]
      ]],
      ["fel-principal", "Fel principal", "", [
        ["Mușchiuleț de porc cu cartofi și sos de piper verde", "450 g", 57],
        ["Șnițel de porc sau pui cu cartofi", "450 g", 45],
        ["Aripioare picante cu cartofi", "500 g", 42],
        ["Crispy pui cu cartofi prăjiți", "450 g", 40],
        ["Ceafă la tigaie pe pat de legume", "400 g", 39],
        ["Cașcaval pane cu cartofi prăjiți", "350 g", 35],
        ["Meniu mititei, 3 buc, cu muștar", "250 g", 28],
        ["Ceafă de porc la grătar", "200 g", 28],
        ["Piept de pui la grătar", "200 g", 28],
        ["Pulpă dezosată la grătar", "200 g", 28]
      ]],
      ["platouri-meniu", "Platouri", "", [
        ["Platou haiducesc, 6 persoane", "5 kg", 360],
        ["Platoul casei, 4 persoane", "2,6 kg", 260],
        ["Tava Orizont, 2 persoane", "1,4 kg", 110],
        ["Platou țărănesc", "700 g", 65],
        ["Mix grill", "650 g", 58]
      ]],
      ["pizza", "Pizza", "Blat făcut în casă", [
        ["Quattro formaggi — gorgonzola, brie, parmezan", "650 g", 42],
        ["Orizont — șuncă, ciuperci, bacon, salam, porumb", "690 g", 39],
        ["Țărănească — salam, bacon, cârnăciori, ceapă", "700 g", 39],
        ["Crudo e rucola — prosciutto, rucola, parmezan", "600 g", 39],
        ["Pui — piept de pui, ardei gras", "650 g", 39],
        ["Capricciosa — șuncă, ciuperci, măsline, anghinare", "650 g", 37],
        ["Diavola — salam picant, ardei iute", "600 g", 37],
        ["Bambino — șuncă, porumb", "600 g", 34],
        ["Vegetariană — ciuperci, dovlecel, vinete, măsline", "600 g", 34],
        ["Margherita", "400 g", 25]
      ]],
      ["paste", "Paste", "", [
        ["Gamberi e salmone — creveți, somon, sos rose", "350 g", 52],
        ["Gamberi e zucchini — creveți, sos rose, usturoi", "350 g", 49],
        ["Orizont — piept de pui, sos rose, ciuperci, măsline", "350 g", 39],
        ["Carbonara — smântână, pancetta afumată, ou", "350 g", 39],
        ["Quattro formaggi — cedar, mozzarella, camembert, gorgonzola", "350 g", 39],
        ["Bologneze — ragu de vită, sos de roșii", "350 g", 39]
      ]],
      ["burger", "Burger", "Toți burgerii se servesc cu cartofi", [
        ["Burger Orizont — vită, cedar, ceapă caramelizată, bacon", "500 g", 50],
        ["Cheeseburger — vită, cedar, cașcaval", "500 g", 50],
        ["Burger crispy — piept de pui în fulgi de porumb", "450 g", 50],
        ["Burger halloumi", "460 g", 50]
      ]],
      ["salate", "Salate", "", [
        ["Salata Caesar — pui, parmezan, bacon, crutoane", "380 g", 39],
        ["Salata crispy, servită cu baghetă", "420 g", 39],
        ["Salata grecească, servită cu baghetă", "400 g", 39],
        ["Salată de roșii cu brânză feta", "250 g", 19],
        ["Salată de ardei copți", "200 g", 15],
        ["Salată coleslaw", "200 g", 15],
        ["Salată mixtă", "200 g", 12],
        ["Salată de murături de sezon", "200 g", 12],
        ["Salată de varză", "200 g", 9],
        ["Salată de ceapă roșie cu pătrunjel", "200 g", 9]
      ]],
      ["garnituri", "Garnituri", "", [
        ["Cartofi cu sos cheddar și bacon", "250 g", 35],
        ["Legume la grătar", "250 g", 19],
        ["Cartofi aurii", "200 g", 15],
        ["Cartofi wedges", "200 g", 15],
        ["Orez cu tăiței și unt", "200 g", 15],
        ["Iahnie de fasole", "350 g", 15],
        ["Cartofi piure", "200 g", 12],
        ["Cartofi natur", "200 g", 12],
        ["Cartofi prăjiți", "200 g", 12],
        ["Mămăligă", "200 g", 10]
      ]],
      ["sosuri", "Sosuri", "", [
        ["Sos gorgonzola", "150 g", 17],
        ["Sos piper verde", "150 g", 17],
        ["Sos cedar", "150 g", 17],
        ["Sos tzatziki", "150 g", 15],
        ["Sos de usturoi cu smântână", "150 g", 15],
        ["Sos de ciuperci", "150 g", 15],
        ["Sos 1000 de insule", "150 g", 15],
        ["Sos mujdei", "100 g", 6],
        ["Smântână", "40 g", 6],
        ["Ketchup", "40 g", 5]
      ]],
      ["desert", "Desert", "", [
        ["Papanași cu afine și smântână", "250 g", 32],
        ["Clătite cu brânză dulce și sos de vanilie", "2 buc", 28],
        ["Clătite cu Nutella și sos de vanilie", "2 buc", 26],
        ["Clătite cu banane, Nutella și biscuite", "2 buc", 26],
        ["Clătite cu Nutella", "2 buc", 19],
        ["Clătite cu gem", "2 buc", 19],
        ["Tiramisu", "130 g", 18]
      ]],
      ["limonade", "Limonade", "Stoarse la comandă", [
        ["Fructul pasiunii", "450 ml", 23],
        ["Căpșuni", "450 ml", 23],
        ["Fructe de pădure", "450 ml", 23],
        ["Mango", "450 ml", 23],
        ["Kiwi", "450 ml", 23],
        ["Pepene galben", "450 ml", 23],
        ["Clasică", "450 ml", 20],
        ["Mentă", "450 ml", 20]
      ]],
      ["cafea", "Cafea și lapte", "", [
        ["Milkshake — vanilie, căpșuni, banane sau ciocolată", "200 ml", 18],
        ["Ciocolată caldă, neagră sau albă", "200 ml", 18],
        ["Frappé", "200 ml", 15],
        ["Latte macchiato", "200 ml", 14],
        ["Cappuccino", "80 ml", 12],
        ["Cappuccino vienez", "80 ml", 12],
        ["Espresso Columbia", "40 ml", 12],
        ["Ceai cald", "250 ml", 12],
        ["Espresso", "40 ml", 10],
        ["Extra aromă", "10 ml", 2]
      ]],
      ["racoritoare", "Fresh și răcoritoare", "", [
        ["Fresh de portocale", "300 ml", 22],
        ["Fresh de grapefruit", "300 ml", 22],
        ["Red Bull", "250 ml", 15],
        ["Carpatica plată sau carbogazoasă", "750 ml", 15],
        ["Prigat — portocale, kiwi, piersici, căpșuni-banane", "250 ml", 13],
        ["Pepsi vintage", "250 ml", 12],
        ["Pepsi, Mirinda, 7Up, Evervess", "250 ml", 11],
        ["Carpatica plată sau carbogazoasă", "330 ml", 10]
      ]],
      ["bere", "Bere", "", [
        ["Paulaner 5,5%", "500 ml", 18],
        ["Corona 4,5%", "355 ml", 15],
        ["Draft Carlsberg 5,2%", "400 ml", 15],
        ["Carlsberg 5,2%", "330 / 500 ml", 14],
        ["Cidru Somersby 4,5%", "330 ml", 14],
        ["Draft Bucur 5,2%", "400 ml", 14],
        ["Bucur 5,2%", "350 ml", 13],
        ["Tuborg 5,2%", "330 / 500 ml", 12],
        ["Tuborg fără alcool", "330 ml", 12],
        ["Draft Tuborg 5,2%", "400 ml", 12]
      ]],
      ["cocktail", "Cocktail", "", [
        ["Campari orange", "300 ml", 33],
        ["Spritz Aperol", "250 ml", 30],
        ["Hugo", "200 ml", 30],
        ["Gin tonic", "300 ml", 30],
        ["Cuba libre", "300 ml", 30],
        ["Sex on the beach", "300 ml", 30],
        ["Screwdriver", "300 ml", 30],
        ["Green apple", "200 ml", 25],
        ["Safe sex", "200 ml", 25]
      ]],
      ["vinuri", "Vinuri", "Domeniile Sâmburești și Chateau Valvis", [
        ["Prosecco extra dry 11%", "750 ml", 160],
        ["Chateau Valvis — Chardonnay, Rosé sau Merlot", "750 ml", 120],
        ["Dradara Fetească Neagră & Merlot", "750 ml", 120],
        ["Prosecco 10,5%", "750 ml", 90],
        ["Carpathia — Chardonnay sau Fetească Neagră", "750 ml", 80],
        ["Miranic Cabernet Sauvignon", "750 ml", 70],
        ["Sâmburești — Cabernet, Chardonnay sau Rozé", "750 ml", 65],
        ["Vin la carafă, alb, roșu sau rosé", "1000 ml", 65],
        ["Vin la carafă, alb, roșu sau rosé", "500 ml", 35],
        ["Vin la pahar", "200 ml", 18],
        ["Vin fiert", "250 ml", 18]
      ]],
      ["spirtoase", "Băuturi spirtoase", "", [
        ["Hennessy 40%", "50 ml", 35],
        ["Courvoisier 40%", "50 ml", 35],
        ["Chivas Regal 12 ani", "50 ml", 28],
        ["Bacardi Carta Blanca sau Black", "50 ml", 22],
        ["Jack Daniel’s 40%", "50 ml", 20],
        ["Coniacul casei 40%", "50 ml", 20],
        ["Johnnie Walker 40%", "50 ml", 19],
        ["Campari 25%", "50 ml", 18],
        ["Jidvei, Martini, Sheridan’s, Captain Morgan, Wembley", "50 ml", 17],
        ["Absolut, Stalinskaya, Finlandia, Alexandrion, J&B", "50 ml", 15],
        ["Ballantine’s, Teacher’s, Jägermeister, Unicum", "50 ml", 15],
        ["Țuică de prune 52%, lichior de vișine", "50 ml", 15]
      ]]
    ];

  var DEFAULTS = {
    program: {
      zilnic: "08:00 — 00:00",
      bucatarie: "10:00 — 22:00",
      descriere: "Zilnic, 08:00 — 00:00. Bucătăria gătește între 10:00 și 22:00, inclusiv sâmbăta și duminica.",
      telefonOre: "Zilnic, între 08:00 și 22:00"
    },
    contact: {
      telefon: "0740 306 758",
      adresa: "Strada Sighișoara 6",
      oras: "Arad, România",
      facebook: "https://www.facebook.com/RestaurantOrizontArad",
      email: ""
    },
    firma: {
      denumire: "",
      cui: "",
      regcom: "",
      sediu: "",
      pastrareRezervari: "30 de zile",
      retinereMasa: "20 de minute",
      gazduire: "Netlify, Inc., Statele Unite ale Americii",
      cmsFurnizor: "Sanity AS, Norvegia",
      actualizat: ""
    },
    menu: RAW.map(function (c) {
      return {
        id: c[0], name: c[1], note: c[2], hidden: false,
        items: c[3].map(function (i) { return { n: i[0], g: i[1], p: String(i[2]), hidden: false }; })
      };
    })
  };

  var KEY = "orizont-content-v1";
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function digits(t) { return String(t || "").replace(/[^0-9]/g, "").replace(/^0/, "40"); }

  function load() {
    var d = clone(DEFAULTS);
    try {
      var s = JSON.parse(localStorage.getItem(KEY) || "null");
      if (!s) return d;
      if (s.program) Object.assign(d.program, s.program);
      if (s.contact) Object.assign(d.contact, s.contact);
      if (s.firma) {
        Object.keys(s.firma).forEach(function (k) {
          // un câmp golit de proprietar nu trebuie să șteargă o valoare implicită utilă
          if (String(s.firma[k] || "").trim() || !d.firma[k]) d.firma[k] = s.firma[k];
        });
      }
      if (Array.isArray(s.menu) && s.menu.length) d.menu = s.menu;
      return d;
    } catch (err) { return d; }
  }
  function save(c) {
    localStorage.setItem(KEY, JSON.stringify(c));
    try { window.dispatchEvent(new CustomEvent("orizont-content-change", { detail: c })); } catch (err) {}
  }
  function reset() {
    localStorage.removeItem(KEY);
    try { window.dispatchEvent(new CustomEvent("orizont-content-change", { detail: clone(DEFAULTS) })); } catch (err) {}
  }

  // Writes CMS values into any page that carries data-cms markers.
  function paint(root, c) {
    c = c || load();
    var doc = root || document;
    var map = {
      "program-zilnic": c.program.zilnic,
      "program-bucatarie": c.program.bucatarie,
      "program-descriere": c.program.descriere,
      "program-telefon-ore": c.program.telefonOre,
      "telefon": c.contact.telefon,
      "adresa": c.contact.adresa,
      "oras": c.contact.oras,
      "email": c.contact.email,
      "firma-denumire": (c.firma || {}).denumire,
      "firma-cui": (c.firma || {}).cui,
      "firma-regcom": (c.firma || {}).regcom,
      "firma-sediu": (c.firma || {}).sediu,
      "firma-pastrare-rezervari": (c.firma || {}).pastrareRezervari,
      "firma-retinere-masa": (c.firma || {}).retinereMasa,
      "firma-gazduire": (c.firma || {}).gazduire,
      "firma-cms": (c.firma || {}).cmsFurnizor,
      "firma-actualizat": (c.firma || {}).actualizat
    };
    var GOL = "de completat";
    var fi = c.firma || {};
    var golFirma = !["denumire", "cui", "regcom", "sediu"].some(function (k) { return String(fi[k] || "").trim(); });
    doc.documentElement.setAttribute("data-firma", golFirma ? "empty" : "set");
    Object.keys(map).forEach(function (k) {
      var v = map[k];
      doc.querySelectorAll('[data-cms="' + k + '"]').forEach(function (el) {
        var t = v && String(v).trim() ? String(v) : GOL;
        var lipsa = !(v && String(v).trim());
        if (el.textContent !== t) el.textContent = t;
        if (el.hasAttribute("data-cms-fill")) {
          el.style.background = lipsa ? "#F2E3CE" : "transparent";
          el.style.padding = lipsa ? "1px 5px" : "0";
          el.style.color = lipsa ? "#8A6A3E" : "inherit";
        }
      });
    });
    var d = digits(c.contact.telefon);
    doc.querySelectorAll('a[href^="tel:"]').forEach(function (el) {
      el.setAttribute("href", "tel:+" + d);
      if (/[0-9]/.test(el.textContent) && el.children.length === 0) el.textContent = c.contact.telefon;
    });
    doc.querySelectorAll('a[href*="wa.me/"]').forEach(function (el) {
      var q = el.getAttribute("href").split("?")[1];
      el.setAttribute("href", "https://wa.me/" + d + (q ? "?" + q : ""));
    });
    doc.querySelectorAll('a[href*="facebook.com"]').forEach(function (el) {
      el.setAttribute("href", c.contact.facebook);
    });
  }

  window.ORIZONT = { KEY: KEY, DEFAULTS: DEFAULTS, clone: clone, load: load, save: save, reset: reset, paint: paint, digits: digits };
})();
