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
      "nav.goal": "Objectif",
      "nav.why": "Pourquoi Malo",
      "nav.needs": "Besoins",
      "nav.packs": "Packs partenaires",
      "dp.meta.title": "Devenir partenaire — Malo Dusseau Brossard",
      "dp.kicker": "En route vers le maillot arc en ciel…",
      "dp.title": "Objectif : Champion du monde",
      "dp.lead":
        "Une trajectoire claire — du premier mondial UCI en 2025, jusqu’à l’échéance historique à domicile en 2027 en passant par Pékin.",
      "dp.mile.past": "Passé",
      "dp.mile.next": "Prochaine étape",
      "dp.mile.soon": "À venir",
      "dp.mile.pekin": "Pékin",
      "dp.mile.monthey.meta": "Suisse — sept. 2025",
      "dp.mile.pekin.meta": "Chine — oct. 2026",
      "dp.mile.savoie.meta": "France — 2027",
      "dp.miser.title": "Miser<br />sur<br />Malo",
      "dp.miser.c1.t": "Jeune déjà au sommet",
      "dp.miser.c1.p":
        "{age} ans, double champion de France, double vainqueur de manches qualificatives Monde Elite. Un talent français qui a de l’avenir — Pékin 2026, puis les Mondiaux 2027 à la maison.",
      "dp.miser.c2.t": "Un champion accessible",
      "dp.miser.c2.p":
        "Stages avec les plus jeunes, messages auxquels il répond, photos. Un haut niveau que les familles peuvent vraiment rencontrer — pas un sportif injoignable.",
      "dp.miser.c3.t": "Une visibilité qui grandit",
      "dp.miser.c3.p":
        "Présent dans le Pumptrack, et au-delà. YouTube, Instagram : une communauté qui s’élargit, des vlogs, un partenariat qui se voit vraiment.",
      "dp.miser.c4.t": "Un cap net",
      "dp.miser.c4.p":
        "Il sait où il va. Pékin, puis France 2027 : un projet carré, une tête claire — pas une envie floue.",
      "dp.aud.title": "Une visibilité qui se mesure",
      "dp.aud.yt": "abonnés",
      "dp.aud.yt.meta": "1,2 M vues en 2026",
      "dp.aud.yt.chart": "Évolution YouTube 2025 → 2026 (vues et abonnés gagnés)",
      "dp.aud.yt.chart.views": "Vues",
      "dp.aud.yt.chart.subs": "Abonnés",
      "dp.aud.yt.tip.v25": "599 616 vues",
      "dp.aud.yt.tip.v26": "1 200 360 vues",
      "dp.aud.yt.tip.s25": "+867 abonnés",
      "dp.aud.yt.tip.s26": "+1 600 abonnés",
      "dp.aud.tt": "abonnés",
      "dp.aud.ig": "followers",
      "dp.aud.note": "D’autres métriques sont disponibles selon vos besoins. Sollicitez-nous.",
      "dp.aud.date": "Données à jour septembre 2026",
      "dp.need.title": "Les besoins de Malo",
      "dp.need.lead":
        "Un accompagnement concret pour viser Pékin 2026, puis les Mondiaux en France en 2027",
      "dp.need.col1": "Pékin · Haute-Savoie",
      "dp.need.flights": "Vols et déplacements incluant les qualifications",
      "dp.need.stay": "Hébergement",
      "dp.need.food": "Restauration",
      "dp.need.col2": "Équipements",
      "dp.need.wheels": "Roues carbones et moyeux",
      "dp.need.helmet": "Casque",
      "dp.need.kit": "Protections et tenues",
      "dp.need.timing": "Cellules chronométriques",
      "dp.need.parts": "Autres pièces vélos",
      "dp.need.col3": "Entraînements",
      "dp.need.camps": "2 stages en amont en Haute-Savoie",
      "dp.need.ffc": "Stage FFC",
      "dp.need.coach": "Coaching personnalisé (K. Da Encarnacion)",
      "dp.need.mental": "Coaching mental",
      "dp.need.physio": "Préparation physique (musculation, récupération, cryothérapie)",
      "dp.need.total": "Total",
      "dp.need.sum": "Budget nécessaire 26/27",
      "dp.pack.title": "Contreparties — Packs partenaires",
      "dp.pack.bronze.s1": "4 stories",
      "dp.pack.bronze.s2": "2 reels dédiés à la marque (cross post possible)",
      "dp.pack.bronze.s3": "Mur partenaires digital (réseaux et sites)",
      "dp.pack.bronze.s4": "Reporting compétition + reporting taux d’engagement réseaux",
      "dp.pack.opt": "En option selon besoin",
      "dp.pack.promo": "Code promo / lien réduction",
      "dp.pack.inc.bronze": "Tout bronze",
      "dp.pack.argent.logo": "Logo maillot (épaule/côté) ou équipement",
      "dp.pack.argent.s1": "2 stories",
      "dp.pack.argent.s2": "2 reels dédiés à la marque (cross post possible)",
      "dp.pack.argent.yt": "Placement produit, vidéo longue YouTube",
      "dp.pack.inc.argent": "Tout argent",
      "dp.pack.or.logo": "Logo maillot (devant ou dos)",
      "dp.pack.or.immerse":
        "Immersion : stage pumptrack, activation locale ou chez le partenaire (~10 personnes, ½ journée)",
      "dp.pack.or.reels": "1 reel immersion",
      "dp.pack.note": "Packs annuels adaptables à vos objectifs",
      "dp.pack.legal":
        "Association MALO PUMPTRACK BMX (loi 1901) — N° W332036470 · Facture (sociétés) / reçu d’asso (particuliers)",
      "dp.pack.hint": "Voir le plan des emplacements logo sur le maillot",
      "hero.tag": "Pilote français · Pumptrack Elite",
      "hero.goal": "Objectif : Mondiaux UCI · Pékin 2026",
      "dp.story.title": "Be part<br />of the<br />story",
      "contact.form.ok.partner":
        "Message envoyé — le dossier de partenariat vous sera envoyé sous 24 h.",
      "results.tab.wins": "Victoires majeures",
      "results.tab.other": "Autres participations",
      "results.tab.goals": "Objectifs à venir",
      "tl.2026a47.title": "Qualifier Monde Pumptrack Elite — Area 47",
      "tl.2026a47.meta": "🇦🇹 Autriche · 4<sup>e</sup>",
      "tl.2025an.title": "Qualifier Monde Pumptrack Elite — Ainsa",
      "tl.2025an.meta": "🇪🇸 Espagne · 3<sup>e</sup>",
      "hl.cf": "Championnat de France",
      "hl.qualifier": "Qualifier Monde Elite",
      "hl.sound.on": "Activer le son",
      "hl.sound.off": "Couper le son",
      "about.title": "À propos",
      "about.badge": "Pessac · Bordeaux · CREPS",
      "about.k.discipline": "Discipline",
      "about.k.category": "Catégorie",
      "about.k.age": "Âge",
      "about.k.based": "Basé",
      "about.v.age": "10.11.2008 · {age} ans",
      "about.v.based": "Pessac – Bordeaux (33)",
      "about.p1":
        "Originaire de Pessac, près de Bordeaux, je pratique le BMX depuis treize ans (Stade Bordelais) avant de me concentrer pleinement au pumptrack depuis 2 ans.",
      "about.p2":
        "Titulaire d’un bac pro chaudronnerie, j’ai su concilier études et sport de haut niveau en passant notamment par le CREPS de Bordeaux.",
      "about.p3":
        "À {age} ans, je fais partie des meilleurs pilotes Elites de pumptrack au monde.",
      "results.eyebrow": "Résultats",
      "results.title": "Palmarès",
      "results.h1": "2× Vainqueur Qualifier Monde Elite",
      "results.h1.meta": "🇵🇹 Portugal 2025 · 🇫🇷 Valence 2026",
      "results.h2": "2× Champion de France U17 · U19",
      "results.h2.meta": "🇫🇷 Saint-Galmier 2024 · 🇫🇷 Bouxwiller 2025",
      "tl.2026.title": "1er Qualifier Monde Pumptrack Elite — Valence",
      "tl.2026.meta": "🇫🇷 France · Qualification Mondiaux Pékin",
      "tl.2025m.title": "Championnats du Monde UCI Pump Track — Monthey",
      "tl.2025m.meta": "🇨🇭 Suisse · 17<sup>e</sup>",
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
      "obj.france.title": "Objectif — Mondiaux UCI Pump Track · France",
      "obj.france.meta": "🇫🇷 Haute-Savoie · 2027 · Échéance à domicile",
      "media.eyebrow": "Vidéos & photos",
      "media.title": "Médias",
      "media.videos": "Highlights",
      "media.photos": "Photos",
      "gal.sg.kicker": "Championnat de France",
      "gal.sg.event": "Saint-Galmier 🇫🇷 · 2024",
      "gal.bx.kicker": "Championnat de France",
      "gal.bx.event": "Bouxwiller 🇫🇷 · 2025",
      "gal.pt.kicker": "Qualifier Monde Elite",
      "gal.pt.event": "Loureira 🇵🇹 · 2025",
      "gal.va.kicker": "Qualifier Monde Elite",
      "gal.va.event": "Valence 🇫🇷 · 2026",
      "gal.mh.kicker": "Mondiaux UCI",
      "gal.mh.event": "Monthey 🇨🇭 · 2025",
      "gal.an.kicker": "Qualifier Monde Elite",
      "gal.an.event": "Ainsa 🇪🇸 · 2025",
      "gal.tr.kicker": "Session",
      "gal.tr.event": "Entraînement",
      "gal.a47.kicker": "Qualifier Monde Elite",
      "gal.a47.event": "Area 47 🇦🇹 · 2026",
      "gal.ot.kicker": "Divers",
      "gal.ot.event": "Autres événements",
      "partners.title": "<strong>Mes partenaires</strong> qui me soutiennent",
      "partners.join": "Me rejoindre",
      "contact.title": "Contact",
      "contact.youare": "Vous êtes",
      "contact.opt.partner": "Partenaire / marque",
      "contact.opt.press": "Presse / média",
      "contact.opt.other": "Fan / autre",
      "contact.name": "Nom",
      "contact.email": "Email",
      "contact.message": "Message",
      "contact.send": "Envoyer",
      "contact.form.ok": "Message envoyé — merci, on vous répond vite.",
      "contact.form.error": "Envoi impossible pour le moment. Réessayez ou appelez le 06 51 11 02 01.",
      "contact.form.rate": "Trop de messages. Réessayez dans quelques minutes ou appelez le 06 51 11 02 01.",
      "contact.form.sending": "Envoi en cours…",
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
      "nav.goal": "Goal",
      "nav.why": "Why Malo",
      "nav.needs": "Needs",
      "nav.packs": "Partner packs",
      "dp.meta.title": "Become a partner — Malo Dusseau Brossard",
      "dp.kicker": "On the road to the rainbow jersey…",
      "dp.title": "Goal: World champion",
      "dp.lead":
        "A clear path — from the first UCI Worlds in 2025, through Beijing, to the historic home event in 2027.",
      "dp.mile.past": "Past",
      "dp.mile.next": "Next stop",
      "dp.mile.soon": "Upcoming",
      "dp.mile.pekin": "Beijing",
      "dp.mile.monthey.meta": "Switzerland — Sept. 2025",
      "dp.mile.pekin.meta": "China — Oct. 2026",
      "dp.mile.savoie.meta": "France — 2027",
      "dp.miser.title": "Bet<br />on<br />Malo",
      "dp.miser.c1.t": "Already at the top",
      "dp.miser.c1.p":
        "{age} years old, two-time French champion, two-time World Elite qualifier winner. A French talent with a future — Beijing 2026, then the 2027 Worlds at home.",
      "dp.miser.c2.t": "A champion you can meet",
      "dp.miser.c2.p":
        "Camps with the youngest riders, messages he answers, photos. Elite level that families can actually meet — not an unreachable athlete.",
      "dp.miser.c3.t": "Growing visibility",
      "dp.miser.c3.p":
        "In pumptrack, and beyond. YouTube, Instagram: a growing community, vlogs, a partnership you actually see.",
      "dp.miser.c4.t": "A clear heading",
      "dp.miser.c4.p":
        "He knows where he’s going. Beijing, then France 2027: a clear plan, a clear head — not a vague wish.",
      "dp.aud.title": "Visibility you can measure",
      "dp.aud.yt": "subscribers",
      "dp.aud.yt.meta": "1.2M views in 2026",
      "dp.aud.yt.chart": "YouTube growth 2025 → 2026 (views and new subscribers)",
      "dp.aud.yt.chart.views": "Views",
      "dp.aud.yt.chart.subs": "Subscribers",
      "dp.aud.yt.tip.v25": "599,616 views",
      "dp.aud.yt.tip.v26": "1,200,360 views",
      "dp.aud.yt.tip.s25": "+867 subscribers",
      "dp.aud.yt.tip.s26": "+1,600 subscribers",
      "dp.aud.tt": "followers",
      "dp.aud.ig": "followers",
      "dp.aud.note": "Additional metrics are available according to your needs. Get in touch.",
      "dp.aud.date": "Data current as of September 2026",
      "dp.need.title": "What Malo needs",
      "dp.need.lead":
        "Concrete support to aim for Beijing 2026, then the Worlds in France in 2027",
      "dp.need.col1": "Beijing · Haute-Savoie",
      "dp.need.flights": "Flights and travel including qualifiers",
      "dp.need.stay": "Accommodation",
      "dp.need.food": "Meals",
      "dp.need.col2": "Equipment",
      "dp.need.wheels": "Carbon wheels and hubs",
      "dp.need.helmet": "Helmet",
      "dp.need.kit": "Protection and kit",
      "dp.need.timing": "Timing cells",
      "dp.need.parts": "Other bike parts",
      "dp.need.col3": "Training",
      "dp.need.camps": "2 prep camps in Haute-Savoie",
      "dp.need.ffc": "FFC camp",
      "dp.need.coach": "Personal coaching (K. Da Encarnacion)",
      "dp.need.mental": "Mental coaching",
      "dp.need.physio": "Physical prep (strength, recovery, cryotherapy)",
      "dp.need.total": "Total",
      "dp.need.sum": "Budget needed 26/27",
      "dp.pack.title": "Benefits — Partner packs",
      "dp.pack.bronze.s1": "4 stories",
      "dp.pack.bronze.s2": "2 brand-dedicated reels (cross post possible)",
      "dp.pack.bronze.s3": "Digital partners wall (socials and websites)",
      "dp.pack.bronze.s4": "Race reporting + social engagement report",
      "dp.pack.opt": "Optional as needed",
      "dp.pack.promo": "Promo code / discount link",
      "dp.pack.inc.bronze": "All bronze",
      "dp.pack.argent.logo": "Jersey logo (shoulder/side) or equipment",
      "dp.pack.argent.s1": "2 stories",
      "dp.pack.argent.s2": "2 brand-dedicated reels (cross post possible)",
      "dp.pack.argent.yt": "Product placement, long-form YouTube video",
      "dp.pack.inc.argent": "All silver",
      "dp.pack.or.logo": "Jersey logo (front or back)",
      "dp.pack.or.immerse":
        "Immersion: pumptrack camp, local activation or at the partner (~10 people, half day)",
      "dp.pack.or.reels": "1 immersion reel",
      "dp.pack.note": "Annual packs tailored to your goals",
      "dp.pack.legal":
        "MALO PUMPTRACK BMX association (law 1901) — No. W332036470 · Invoice (companies) / association receipt (individuals)",
      "dp.pack.hint": "See jersey logo placement map",
      "hero.tag": "French rider · Pumptrack Elite",
      "hero.goal": "Goal: UCI Pump Track Worlds · Beijing 2026",
      "dp.story.title": "Be part<br />of the<br />story",
      "contact.form.ok.partner":
        "Message sent — the partnership pack will be sent within 24 hours.",
      "results.tab.wins": "Major wins",
      "results.tab.other": "Other appearances",
      "results.tab.goals": "Upcoming goals",
      "tl.2026a47.title": "World Elite Pumptrack Qualifier — Area 47",
      "tl.2026a47.meta": "🇦🇹 Austria · 4<sup>th</sup>",
      "tl.2025an.title": "World Elite Pumptrack Qualifier — Ainsa",
      "tl.2025an.meta": "🇪🇸 Spain · 3<sup>rd</sup>",
      "hl.cf": "French Championships",
      "hl.qualifier": "World Elite Qualifier",
      "hl.sound.on": "Turn sound on",
      "hl.sound.off": "Mute",
      "about.title": "About",
      "about.badge": "Pessac · Bordeaux · CREPS",
      "about.k.discipline": "Discipline",
      "about.k.category": "Category",
      "about.k.age": "Age",
      "about.k.based": "Based",
      "about.v.age": "10.11.2008 · {age} yrs",
      "about.v.based": "Pessac – Bordeaux (33)",
      "about.p1":
        "From Pessac, near Bordeaux, I’ve ridden BMX for thirteen years (Stade Bordelais) before focusing fully on pumptrack for the past 2 years.",
      "about.p2":
        "With a vocational diploma in metalwork, I’ve balanced studies and elite sport — including time at the CREPS in Bordeaux.",
      "about.p3":
        "At {age}, I’m among the world’s best Elite pumptrack riders.",
      "results.eyebrow": "Results",
      "results.title": "Honours",
      "results.h1": "2× World Elite Qualifier winner",
      "results.h1.meta": "🇵🇹 Portugal 2025 · 🇫🇷 Valence 2026",
      "results.h2": "2× French Champion U17 · U19",
      "results.h2.meta": "🇫🇷 Saint-Galmier 2024 · 🇫🇷 Bouxwiller 2025",
      "tl.2026.title": "1st World Elite Pumptrack Qualifier — Valence",
      "tl.2026.meta": "🇫🇷 France · Beijing Worlds qualification",
      "tl.2025m.title": "UCI Pump Track World Championships — Monthey",
      "tl.2025m.meta": "🇨🇭 Switzerland · 17<sup>th</sup>",
      "tl.2025p.title": "1st World Elite Pumptrack Qualifier — Portugal",
      "tl.2025p.meta": "🇵🇹 First win in the top category",
      "tl.2025f.title": "French Pumptrack Champion U19 — Bouxwiller",
      "tl.2025f.meta": "🇫🇷 Fastest time, ahead of Elites",
      "tl.2024.title": "French Pumptrack Champion U17 — Saint-Galmier",
      "tl.2024.meta": "🇫🇷 First national title",
      "obj.eyebrow": "Goals",
      "obj.title": "Next steps",
      "obj.beijing.title": "Goal — UCI Pump Track Worlds · Beijing",
      "obj.beijing.meta": "🇨🇳 China · October 2026 · Qualified via Valence",
      "obj.france.title": "Goal — UCI Pump Track Worlds · France",
      "obj.france.meta": "🇫🇷 Haute-Savoie · 2027 · Home event",
      "media.eyebrow": "Videos & photos",
      "media.title": "Media",
      "media.videos": "Highlights",
      "media.photos": "Photos",
      "gal.sg.kicker": "French Championships",
      "gal.sg.event": "Saint-Galmier 🇫🇷 · 2024",
      "gal.bx.kicker": "French Championships",
      "gal.bx.event": "Bouxwiller 🇫🇷 · 2025",
      "gal.pt.kicker": "World Elite Qualifier",
      "gal.pt.event": "Loureira 🇵🇹 · 2025",
      "gal.va.kicker": "World Elite Qualifier",
      "gal.va.event": "Valence 🇫🇷 · 2026",
      "gal.mh.kicker": "UCI Worlds",
      "gal.mh.event": "Monthey 🇨🇭 · 2025",
      "gal.an.kicker": "World Elite Qualifier",
      "gal.an.event": "Ainsa 🇪🇸 · 2025",
      "gal.tr.kicker": "Session",
      "gal.tr.event": "Training",
      "gal.a47.kicker": "World Elite Qualifier",
      "gal.a47.event": "Area 47 🇦🇹 · 2026",
      "gal.ot.kicker": "Misc",
      "gal.ot.event": "Other events",
      "partners.title": "<strong>My partners</strong> who support me",
      "partners.join": "Join me",
      "contact.title": "Contact",
      "contact.youare": "You are",
      "contact.opt.partner": "Partner / brand",
      "contact.opt.press": "Press / media",
      "contact.opt.other": "Fan / other",
      "contact.name": "Name",
      "contact.email": "Email",
      "contact.message": "Message",
      "contact.send": "Send",
      "contact.form.ok": "Message sent — thanks, we’ll get back to you soon.",
      "contact.form.error": "Could not send right now. Please try again or call +33 6 51 11 02 01.",
      "contact.form.rate": "Too many messages. Try again in a few minutes or call +33 6 51 11 02 01.",
      "contact.form.sending": "Sending…",
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

  const BIRTH = { y: 2008, m: 11, d: 10 };

  function computeAge() {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Paris",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date());
    const num = (type) => Number(parts.find((p) => p.type === type)?.value);
    const y = num("year");
    const m = num("month");
    const d = num("day");
    let age = y - BIRTH.y;
    if (m < BIRTH.m || (m === BIRTH.m && d < BIRTH.d)) age -= 1;
    return Math.max(0, age);
  }

  function fillAge(value) {
    return String(value).replaceAll("{age}", String(computeAge()));
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
      el.textContent = fillAge(pack[key]);
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (!key || pack[key] == null) return;
      el.innerHTML = fillAge(pack[key]);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (!key || pack[key] == null) return;
      el.setAttribute("aria-label", fillAge(pack[key]));
    });

    const isPartner = document.body.classList.contains("page-partner");
    const title = isPartner ? pack["dp.meta.title"] : pack["meta.title"];
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

    document.querySelectorAll("[data-home]").forEach((a) => {
      a.setAttribute("href", "index.html?lang=" + lang);
    });

    syncUrlLang(lang);
    window.__maloLang = lang;
    window.dispatchEvent(new CustomEvent("malo:lang", { detail: { lang } }));
    refreshCountryFlags();
  }

  /** Drapeaux colorés (Twemoji) — rendu propre sous Windows, comme LFL. */
  function refreshCountryFlags() {
    if (typeof twemoji === "undefined" || !twemoji.parse) return;
    const opts = {
      folder: "svg",
      ext: ".svg",
      base: "https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/",
    };
    ["palmares", "medias", "objectif"].forEach((id) => {
      const root = document.getElementById(id);
      if (root) twemoji.parse(root, opts);
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

  window.MaloI18n = {
    applyLang,
    detectLang,
    computeAge,
    t: (key) => fillAge((dict[window.__maloLang || "fr"] || dict.fr)[key] ?? ""),
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
