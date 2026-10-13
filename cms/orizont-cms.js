/*
 * Adaptor CMS pentru site-ul Orizont.
 * Expune exact același window.ORIZONT ca orizont-content.js, deci pagina rămâne neschimbată.
 *
 *   <script src="./cms/orizont-cms.js" data-project-id="xxxxxxxx" data-dataset="production"></script>
 *
 * Strategie: afișează instant ultimul conținut cunoscut (cache local), apoi cere CMS-ului
 * versiunea curentă și repictează. Dacă CMS-ul nu răspunde, site-ul rămâne pe cache.
 */
(function () {
  var PREV = window.ORIZONT && window.ORIZONT.source !== "cms" ? window.ORIZONT : null;
  function baseline() {
    try { return PREV ? PREV.load() : null; } catch (e) { return null; }
  }
  var el = document.currentScript;
  var PROJECT = el && el.getAttribute("data-project-id");
  var DATASET = (el && el.getAttribute("data-dataset")) || "production";
  var CACHE = "orizont-cms-cache-v1";
  var LOCAL = "orizont-content-v1";

  var QUERY = [
    "{",
    '"setari": *[_type=="setari"][0]{programZilnic,programBucatarie,programDescriere,programTelefonOre,telefon,adresa,oras,facebook},',
    '"menu": *[_type=="categorieMeniu"]|order(ordine asc){',
    '"id":slug.current,"name":nume,"note":nota,"hidden":ascunsa,',
    '"items":feluri[]{"n":denumire,"g":gramaj,"p":pret,"hidden":ascuns}},',
    '"imagini": *[_type=="imagineSite" && defined(imagine)]{cheie,alt,"url":imagine.asset->url}',
    "}"
  ].join("");

  function endpoint() {
    return "https://" + PROJECT + ".apicdn.sanity.io/v2024-01-01/data/query/" +
      DATASET + "?query=" + encodeURIComponent(QUERY);
  }

  var FALLBACK = {
    program: { zilnic: "08:00 — 00:00", bucatarie: "10:00 — 22:00", descriere: "", telefonOre: "" },
    contact: { telefon: "0740 306 758", adresa: "Strada Sighișoara 6", oras: "Arad, România", facebook: "" },
    menu: [],
    imagini: {}
  };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function digits(t) { return String(t || "").replace(/[^0-9]/g, "").replace(/^0/, "40"); }

  function shape(r) {
    var s = (r && r.setari) || {};
    var base = baseline();
    var imagini = {};
    ((r && r.imagini) || []).forEach(function (i) { if (i.cheie && i.url) imagini[i.cheie] = { url: i.url, alt: i.alt || "" }; });
    return {
      program: {
        zilnic: s.programZilnic || (base && base.program.zilnic) || FALLBACK.program.zilnic,
        bucatarie: s.programBucatarie || (base && base.program.bucatarie) || FALLBACK.program.bucatarie,
        descriere: s.programDescriere || (base && base.program.descriere) || "",
        telefonOre: s.programTelefonOre || (base && base.program.telefonOre) || ""
      },
      contact: {
        telefon: s.telefon || (base && base.contact.telefon) || FALLBACK.contact.telefon,
        adresa: s.adresa || (base && base.contact.adresa) || FALLBACK.contact.adresa,
        oras: s.oras || (base && base.contact.oras) || FALLBACK.contact.oras,
        facebook: s.facebook || (base && base.contact.facebook) || FALLBACK.contact.facebook,
        email: s.email || (base && base.contact.email) || ""
      },
      firma: (base && base.firma) || {},
      menu: (((r && r.menu) || []).length ? r.menu : ((base && base.menu) || [])).map(function (c) {
        return {
          id: c.id, name: c.name, note: c.note || "", hidden: !!c.hidden,
          items: (c.items || []).map(function (i) { return { n: i.n, g: i.g || "", p: String(i.p), hidden: !!i.hidden }; })
        };
      }),
      imagini: imagini
    };
  }

  function cached() {
    try {
      var c = JSON.parse(localStorage.getItem(CACHE) || "null");
      if (c && c.menu) return c;
      var l = JSON.parse(localStorage.getItem(LOCAL) || "null"); // conținut din panoul local
      if (l && l.menu) { l.imagini = l.imagini || {}; return l; }
    } catch (e) {}
    var base = baseline();
    if (base) { base.imagini = base.imagini || {}; return base; }
    return clone(FALLBACK);
  }

  var current = cached();

  function load() { return clone(current); }

  function paintImages(doc, c) {
    Object.keys(c.imagini || {}).forEach(function (key) {
      var src = c.imagini[key].url + "?w=2000&auto=format&fit=crop";
      doc.querySelectorAll('image-slot[id="' + key + '"], [data-cms-img="' + key + '"]').forEach(function (slot) {
        if (slot.getAttribute("data-cms-painted") === src) return;
        slot.setAttribute("data-cms-painted", src);
        if (slot.tagName === "IMG") {
          slot.src = src;
          if (!slot.getAttribute("alt")) slot.alt = c.imagini[key].alt || "";
          return;
        }
        var img = slot.querySelector("img[data-cms-img-el]");
        if (!img) {
          img = document.createElement("img");
          img.setAttribute("data-cms-img-el", "1");
          img.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block";
          if (getComputedStyle(slot).position === "static") slot.style.position = "relative";
          slot.appendChild(img);
        }
        img.src = src;
        img.alt = c.imagini[key].alt || "";
      });
    });
  }

  function paint(root, c) {
    c = c || current;
    var doc = root || document;
    var map = {
      "program-zilnic": c.program.zilnic,
      "program-bucatarie": c.program.bucatarie,
      "program-descriere": c.program.descriere,
      "program-telefon-ore": c.program.telefonOre,
      "telefon": c.contact.telefon,
      "adresa": c.contact.adresa,
      "oras": c.contact.oras
    };
    Object.keys(map).forEach(function (k) {
      if (!map[k]) return;
      doc.querySelectorAll('[data-cms="' + k + '"]').forEach(function (n) {
        if (n.textContent !== map[k]) n.textContent = map[k];
      });
    });
    var d = digits(c.contact.telefon);
    doc.querySelectorAll('a[href^="tel:"]').forEach(function (n) {
      n.setAttribute("href", "tel:+" + d);
      if (/[0-9]/.test(n.textContent) && n.children.length === 0) n.textContent = c.contact.telefon;
    });
    doc.querySelectorAll('a[href*="wa.me/"]').forEach(function (n) {
      var q = n.getAttribute("href").split("?")[1];
      n.setAttribute("href", "https://wa.me/" + d + (q ? "?" + q : ""));
    });
    if (c.contact.facebook) {
      doc.querySelectorAll('a[href*="facebook.com"]').forEach(function (n) { n.setAttribute("href", c.contact.facebook); });
    }
    paintImages(doc, c);
    var f = c.firma || {};
    var golFirma = !["denumire", "cui", "regcom", "sediu"].some(function (k) { return String(f[k] || "").trim(); });
    doc.documentElement.setAttribute("data-firma", golFirma ? "empty" : "set");
  }

  function refresh() {
    if (!PROJECT || /^INLOCUIESTE/.test(PROJECT)) {
      console.warn("Orizont: id-ul proiectului Sanity nu e completat — se folosește conținutul local.");
      return Promise.resolve(current);
    }
    return fetch(endpoint())
      .then(function (r) { return r.json(); })
      .then(function (j) {
        var c = shape(j.result);
        if (!c.menu.length) return current;
        current = c;
        try { localStorage.setItem(CACHE, JSON.stringify(c)); } catch (e) {}
        window.dispatchEvent(new CustomEvent("orizont-content-change", { detail: c }));
        paint(document, c);
        return c;
      })
      .catch(function () { return current; });
  }

  window.ORIZONT = {
    source: "cms",
    load: load,
    paint: paint,
    refresh: refresh,
    digits: digits,
    clone: clone,
    save: function () { console.warn("Conținutul se editează în CMS, nu din pagină."); },
    reset: function () { try { localStorage.removeItem(CACHE); } catch (e) {} return refresh(); }
  };

  refresh();
  document.addEventListener("visibilitychange", function () { if (!document.hidden) refresh(); });
})();
