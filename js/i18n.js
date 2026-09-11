/**
 * FR / EN — détection navigateur + switch (localStorage)
 */
(function () {
  const STORAGE_KEY = "malo_lang";

  const dict = {
    fr: {
      "meta.title": "Malo Dusseau Brossard — Pilote Pumptrack Elite | Champion de France",
      "meta.desc":
        "Site officiel de Malo Dusseau Brossard, pilote français Pumptrack Elite : double champion de France (U17, U19), 2× vainqueur Qualifier Monde Elite. Route vers Pékin 2026.",
      "meta.ogTitle": "Malo Dusseau Brossard — Pilote Pumptrack Elite",
      "meta.ogDesc":
        "Double champion de France et 2× vainqueur Qualifier Monde Elite. Route vers les Mondiaux UCI Pékin 2026.",
      "nav.home": "Accueil",
      "nav.about": "À propos",
      "nav.results": "Palmarès",
      "nav.media": "Médias",
      "nav.partners": "Partenaires",
      "nav.contact": "Contact",
      "hero.tag": "Pilote français · Pumptrack Elite",
      "hl.cf": "Championnat de France",
      "hl.qualifier": "Qualifier Monde Elite",
      "about.title": "À propos",
      "about.badge": "Pessac · Bordeaux · CREPS",
      "about.k.discipline": "Discipline",
      "about.k.category": "Catégorie",
      "about.k.age": "Âge",
      "about.k.based": "Basé",
      "about.v.age": "10.11.2008 · 17 ans",
      "about.v.based": "Pessac – Bordeaux (33)",
      "about.p1":
        "Originaire de Pessac, près de Bordeaux, je pratique le BMX depuis treize ans (Stade Bordelais) avant de me concentrer pleinement au pumptrack depuis 2 ans.",
      "about.p2":
        "Titulaire d’un bac pro chaudronnerie, j’ai su concilier études et sport de haut niveau en passant notamment par le CREPS de Bordeaux.",
      "about.p3":
        "À 17 ans, je fais partie des meilleurs pilotes Elites de pumptrack au monde.",
      "results.eyebrow": "Résultats",
      "results.title": "Palmarès",
      "results.h1": "2× Vainqueur Qualifier Monde Elite",
      "results.h1.meta": "🇵🇹 Portugal 2025 · 🇫🇷 Valence 2026",
      "results.h2": "2× Champion de France U17 · U19",
      "results.h2.meta": "🇫🇷 Saint-Galmier 2024 · 🇫🇷 Bouxwiller 2025",
      "tl.2026.title": "1er Qualifier Monde Pumptrack Elite — Valence",
      "tl.2026.meta": "🇫🇷 France · Qualification Mondiaux Pékin",
      "tl.2025m.title": "Championnats du Monde UCI Pump Track — Monthey",
      "tl.2025m.meta": "🇨🇭 Suisse · Participation",
      "tl.2025p.title": "1er Qualifier Monde Pumptrack Elite — Portugal",
      "tl.2025p.meta": "🇵🇹 Première victoire en catégorie reine",
      "tl.2025f.title": "Champion de France Pumptrack U19 — Bouxwiller",
      "tl.2025f.meta": "🇫🇷 Meilleur temps, devant les Elites",
      "tl.2024.title": "Champion de France Pumptrack U17 — Saint-Galmier",
      "tl.2024.meta": "🇫🇷 Premier titre national",
      "obj.eyebrow": "Objectifs",
      "obj.title": "Prochaines étapes",
      "obj.beijing.title": "Objectif — Mondiaux UCI Pump Track · Pékin",
      "obj.beijing.meta": "🇨🇳 Chine · octobre 2026 · Qualification via Valence",
      "obj.france.title": "Objectif — Mondiaux UCI · France",
      "obj.france.meta": "🇫🇷 Haute-Savoie · 2027 · Échéance à domicile",
      "media.eyebrow": "Vidéos & photos",
      "media.title": "Médias",
      "media.videos": "Highlights",
      "media.photos": "Photos",
      "media.youtube": "Chaîne YouTube →",
      "gal.sg.kicker": "Championnat de France",
      "gal.sg.event": "Saint-Galmier 2024",
      "gal.bx.kicker": "Championnat de France",
      "gal.bx.event": "Bouxwiller 2025",
      "gal.pt.kicker": "Qualifier Monde Elite",
      "gal.pt.event": "Loureira · Portugal 2025",
      "gal.va.kicker": "Qualifier Monde Elite",
      "gal.va.event": "Valence · France 2026",
      "gal.mh.kicker": "Mondiaux UCI",
      "gal.mh.event": "Monthey 2025",
      "gal.tr.kicker": "Session",
      "gal.tr.event": "Entraînement",
      "gal.ot.kicker": "Divers",
      "gal.ot.event": "Autres événements",
      "partners.title": "<strong>Mes partenaires</strong> qui me soutiennent",
      "contact.title": "Contact",
      "contact.youare": "Vous êtes",
      "contact.opt.partner": "Partenaire / marque",
      "contact.opt.press": "Presse / média",
      "contact.opt.other": "Fan / autre",
      "contact.name": "Nom",
      "contact.email": "Email",
      "contact.message": "Message",
      "contact.send": "Envoyer",
      "contact.form.ok":
        "Message enregistré en local (maquette) — brancher l’envoi plus tard.",
      "contact.partnerships": "Partenariats",
      "contact.asso":
        "Association <strong style=\"color: var(--text)\">MALO PUMPTRACK BMX</strong><br />Loi 1901 · RNA W332036470 · Pessac (33600)",
      "contact.socials": "Réseaux",
      "footer.about": "À propos",
      "footer.results": "Palmarès",
      "footer.media": "Médias",
      "footer.partners": "Partenaires",
      "footer.contact": "Contact",
    },
    en: {
      "meta.title": "Malo Dusseau Brossard — Elite Pumptrack Rider | French Champion",
      "meta.desc":
        "Official site of Malo Dusseau Brossard, French Elite pumptrack rider: two-time French champion (U17, U19), 2× World Elite Qualifier winner. Road to Beijing 2026.",
      "meta.ogTitle": "Malo Dusseau Brossard — Elite Pumptrack Rider",
      "meta.ogDesc":
        "Two-time French champion and 2× World Elite Qualifier winner. Road to the UCI Worlds in Beijing 2026.",
      "nav.home": "Home",
      "nav.about": "About",
      "nav.results": "Results",
      "nav.media": "Media",
      "nav.partners": "Partners",
      "nav.contact": "Contact",
      "hero.tag": "French rider · Pumptrack Elite",
      "hl.cf": "French Championships",
      "hl.qualifier": "World Elite Qualifier",
      "about.title": "About",
      "about.badge": "Pessac · Bordeaux · CREPS",
      "about.k.discipline": "Discipline",
      "about.k.category": "Category",
      "about.k.age": "Age",
      "about.k.based": "Based",
      "about.v.age": "10.11.2008 · 17 yrs",
      "about.v.based": "Pessac – Bordeaux (33)",
      "about.p1":
        "From Pessac, near Bordeaux, I’ve ridden BMX for thirteen years (Stade Bordelais) before focusing fully on pumptrack for the past 2 years.",
      "about.p2":
        "With a vocational baccalaureate in boilermaking, I’ve balanced studies and elite sport — including time at the CREPS in Bordeaux.",
      "about.p3":
        "At 17, I’m among the world’s best Elite pumptrack riders.",
      "results.eyebrow": "Results",
      "results.title": "Honours",
      "results.h1": "2× World Elite Qualifier winner",
      "results.h1.meta": "🇵🇹 Portugal 2025 · 🇫🇷 Valencia 2026",
      "results.h2": "2× French Champion U17 · U19",
      "results.h2.meta": "🇫🇷 Saint-Galmier 2024 · 🇫🇷 Bouxwiller 2025",
      "tl.2026.title": "1st World Elite Pumptrack Qualifier — Valencia",
      "tl.2026.meta": "🇫🇷 France · Beijing Worlds qualification",
      "tl.2025m.title": "UCI Pump Track World Championships — Monthey",
      "tl.2025m.meta": "🇨🇭 Switzerland · Participation",
      "tl.2025p.title": "1st World Elite Pumptrack Qualifier — Portugal",
      "tl.2025p.meta": "🇵🇹 First win in the top category",
      "tl.2025f.title": "French Pumptrack Champion U19 — Bouxwiller",
      "tl.2025f.meta": "🇫🇷 Fastest time, ahead of Elites",
      "tl.2024.title": "French Pumptrack Champion U17 — Saint-Galmier",
      "tl.2024.meta": "🇫🇷 First national title",
      "obj.eyebrow": "Goals",
      "obj.title": "Next steps",
      "obj.beijing.title": "Goal — UCI Pump Track Worlds · Beijing",
      "obj.beijing.meta": "🇨🇳 China · October 2026 · Qualified via Valencia",
      "obj.france.title": "Goal — UCI Worlds · France",
      "obj.france.meta": "🇫🇷 Haute-Savoie · 2027 · Home event",
      "media.eyebrow": "Videos & photos",
      "media.title": "Media",
      "media.videos": "Highlights",
      "media.photos": "Photos",
      "media.youtube": "YouTube channel →",
      "gal.sg.kicker": "French Championships",
      "gal.sg.event": "Saint-Galmier 2024",
      "gal.bx.kicker": "French Championships",
      "gal.bx.event": "Bouxwiller 2025",
      "gal.pt.kicker": "World Elite Qualifier",
      "gal.pt.event": "Loureira · Portugal 2025",
      "gal.va.kicker": "World Elite Qualifier",
      "gal.va.event": "Valence · France 2026",
      "gal.mh.kicker": "UCI Worlds",
      "gal.mh.event": "Monthey 2025",
      "gal.tr.kicker": "Session",
      "gal.tr.event": "Training",
      "gal.ot.kicker": "Misc",
      "gal.ot.event": "Other events",
      "partners.title": "<strong>My partners</strong> who support me",
      "contact.title": "Contact",
      "contact.youare": "You are",
      "contact.opt.partner": "Partner / brand",
      "contact.opt.press": "Press / media",
      "contact.opt.other": "Fan / other",
      "contact.name": "Name",
      "contact.email": "Email",
      "contact.message": "Message",
      "contact.send": "Send",
      "contact.form.ok": "Message saved locally (demo) — wire up sending later.",
      "contact.partnerships": "Partnerships",
      "contact.asso":
        "Association <strong style=\"color: var(--text)\">MALO PUMPTRACK BMX</strong><br />Law 1901 · RNA W332036470 · Pessac (33600)",
      "contact.socials": "Social",
      "footer.about": "About",
      "footer.results": "Results",
      "footer.media": "Media",
      "footer.partners": "Partners",
      "footer.contact": "Contact",
    },
  };

  function detectLang() {
    try {
      const q = new URLSearchParams(window.location.search).get("lang");
      if (q === "fr" || q === "en") return q;
    } catch (_) {}
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "fr" || saved === "en") return saved;
    } catch (_) {}
    const nav = (navigator.language || navigator.userLanguage || "fr").toLowerCase();
    return nav.startsWith("en") ? "en" : "fr";
  }

  function setMeta(sel, attr, value) {
    if (!value) return;
    const el = document.querySelector(sel);
    if (el) el.setAttribute(attr, value);
  }

  function syncUrlLang(lang) {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", lang);
      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    } catch (_) {}
  }

  function applyLang(lang) {
    if (!dict[lang]) lang = "fr";
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {}

    const pack = dict[lang];
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key || pack[key] == null) return;
      el.textContent = pack[key];
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (!key || pack[key] == null) return;
      el.innerHTML = pack[key];
    });

    const title = pack["meta.title"];
    const desc = pack["meta.desc"];
    const ogTitle = pack["meta.ogTitle"] || title;
    const ogDesc = pack["meta.ogDesc"] || desc;
    if (title) document.title = title;
    setMeta('meta[name="description"]', "content", desc);
    setMeta('meta[property="og:title"]', "content", ogTitle);
    setMeta('meta[property="og:description"]', "content", ogDesc);
    setMeta('meta[property="og:locale"]', "content", lang === "en" ? "en_US" : "fr_FR");
    setMeta('meta[name="twitter:title"]', "content", ogTitle);
    setMeta('meta[name="twitter:description"]', "content", ogDesc);

    document.querySelectorAll(".lang-switch [data-lang]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
    });

    syncUrlLang(lang);
    window.__maloLang = lang;
    window.dispatchEvent(new CustomEvent("malo:lang", { detail: { lang } }));
    refreshCountryFlags();
  }

  /** Drapeaux colorés (Twemoji) — rendu propre sous Windows, comme LFL. */
  function refreshCountryFlags() {
    const root = document.getElementById("palmares");
    if (!root || typeof twemoji === "undefined" || !twemoji.parse) return;
    twemoji.parse(root, {
      folder: "svg",
      ext: ".svg",
      base: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/",
    });
  }

  function init() {
    document.querySelectorAll(".lang-switch [data-lang]").forEach((btn) => {
      btn.addEventListener("click", () => {
        applyLang(btn.getAttribute("data-lang"));
      });
    });
    applyLang(detectLang());
  }

  window.MaloI18n = { applyLang, detectLang, t: (key) => (dict[window.__maloLang || "fr"] || dict.fr)[key] };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
