/**
 * Malo — maquette site (nav ancres, vidéo, galerie, reveal)
 */
(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const mobile = document.querySelector(".mobile-nav");
  const navLinks = document.querySelectorAll("[data-nav]");

  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const open = mobile.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    mobile.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        mobile.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  const sections = ["accueil", "medias", "palmares", "partenaires", "apropos", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const setActive = (id) => {
    navLinks.forEach((a) => {
      const match = a.getAttribute("href") === `#${id}`;
      if (match) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  };

  if (sections.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0.01 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  document.querySelectorAll("[data-video-facade]").forEach((block) => {
    const btn = block.querySelector("[data-video-play]");
    const src = block.getAttribute("data-video-src");
    if (!btn || !src) return;
    btn.addEventListener("click", () => {
      const iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.title = "Vidéo Malo Pumptrack";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      block.innerHTML = "";
      block.appendChild(iframe);
    });
  });

  const EVENT_GALLERIES = {
    valence: [
      "assets/medias/2026_valence_1.jpeg",
      "assets/medias/2026_valence_2.jpeg",
      "assets/medias/2026_valence_4.jpeg",
      "assets/medias/2026_valence_5.jpeg",
      "assets/medias/2026_valence_6.jpg",
      "assets/medias/2026_valence_7.png",
      "assets/medias/2026_valence_8.png",
    ],
    area47: [
      "assets/medias/2026_area47_1.jpg",
      "assets/medias/2026_area47_2.jpg",
    ],
    entrainement: [
      "assets/medias/entrainement_1.jpg",
      "assets/medias/entrainement_2.png",
      "assets/medias/entrainement_3.png",
      "assets/medias/entrainement_4.jpg",
    ],
    loureira: [
      "assets/medias/2025_loureira_1.png",
      "assets/medias/2025_loureira_2.jpeg",
      "assets/medias/2025_loureira_3.jpeg",
      "assets/medias/2025_loureira_6.png",
    ],
    monthey: [
      "assets/medias/2025_monthey_1.png",
      "assets/medias/2025_monthey_2.png",
      "assets/medias/2025_monthey_3.png",
    ],
    saintgalmier: ["assets/medias/2024_saintgalmier_1.jpg"],
    bouxwiller: [
      "assets/medias/2024_bouxwiller_1.png",
      "assets/medias/2024_bouxwiller_2.png",
    ],
  };

  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = lightbox?.querySelector("img");
  const lightboxClose = lightbox?.querySelector(".lightbox__close");
  const lightboxPrev = lightbox?.querySelector(".lightbox__nav--prev");
  const lightboxNext = lightbox?.querySelector(".lightbox__nav--next");
  const lightboxCounter = lightbox?.querySelector(".lightbox__counter");
  let galleryItems = [];
  let galleryIndex = 0;

  const galleryUrl = (src) => {
    if (!src) return "";
    try {
      return new URL(src, document.baseURI).href;
    } catch {
      return src;
    }
  };

  const setNavHidden = (el, hide) => {
    if (!el) return;
    if (hide) el.setAttribute("hidden", "");
    else el.removeAttribute("hidden");
  };

  const showGalleryAt = (index) => {
    if (!lightbox || !lightboxImg || !galleryItems.length) return;
    galleryIndex =
      ((index % galleryItems.length) + galleryItems.length) % galleryItems.length;
    lightboxImg.src = galleryUrl(galleryItems[galleryIndex]);
    lightboxImg.alt = `Photo ${galleryIndex + 1} / ${galleryItems.length}`;
    if (lightboxCounter) {
      if (galleryItems.length > 1) {
        lightboxCounter.hidden = false;
        lightboxCounter.textContent = `${galleryIndex + 1} / ${galleryItems.length}`;
      } else {
        lightboxCounter.hidden = true;
      }
    }
    const multi = galleryItems.length > 1;
    setNavHidden(lightboxPrev, !multi);
    setNavHidden(lightboxNext, !multi);
  };

  const openEventGallery = (eventKey) => {
    const list = EVENT_GALLERIES[eventKey];
    if (!list?.length || !lightbox || !lightboxImg) return;
    galleryItems = list.slice();
    galleryIndex = 0;
    /* Ouvrir d’abord l’overlay (sinon gros JPEG = impression que le clic ne marche pas) */
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
    showGalleryAt(0);
  };

  const galleryRoot = document.querySelector(".gallery");
  if (galleryRoot) {
    galleryRoot.querySelectorAll("[data-gallery]").forEach((el) => {
      const eventKey = el.getAttribute("data-gallery");
      const first = EVENT_GALLERIES[eventKey]?.[0];
      const thumb = el.querySelector("img");
      if (first && thumb) {
        thumb.setAttribute("src", first);
        el.setAttribute("data-gallery-start", first);
      }
    });
    galleryRoot.addEventListener("click", (e) => {
      const el = e.target.closest("[data-gallery]");
      if (!el || !galleryRoot.contains(el)) return;
      e.preventDefault();
      e.stopPropagation();
      const eventKey = el.getAttribute("data-gallery");
      /* Laisser finir le click souris/tactile avant d’afficher l’overlay */
      window.setTimeout(() => openEventGallery(eventKey), 0);
    });
  }

  // Compat : ancien data-lightbox mono-image
  document.querySelectorAll("[data-lightbox]").forEach((el) => {
    el.addEventListener("click", () => {
      const src = el.getAttribute("data-lightbox") || el.querySelector("img")?.src;
      if (!src || !lightbox || !lightboxImg) return;
      galleryItems = [src];
      showGalleryAt(0);
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    });
  });

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
    galleryItems = [];
  };
  lightboxClose?.addEventListener("click", closeLightbox);
  lightboxPrev?.addEventListener("click", (e) => {
    e.stopPropagation();
    showGalleryAt(galleryIndex - 1);
  });
  lightboxNext?.addEventListener("click", (e) => {
    e.stopPropagation();
    showGalleryAt(galleryIndex + 1);
  });
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (!lightbox?.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showGalleryAt(galleryIndex - 1);
    if (e.key === "ArrowRight") showGalleryAt(galleryIndex + 1);
  });

  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  const t = (key, fallback) =>
    (window.MaloI18n && window.MaloI18n.t(key)) || fallback;

  const CONTACT_TO = "laurentdusseau@gmail.com";

  const sendViaPhp = async (payload) => {
    const res = await fetch("contact.php", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) throw new Error(data.error || "php");
    return true;
  };

  const sendViaFormSubmit = async (payload) => {
    const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_TO}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        type: payload.type,
        message: payload.message,
        _subject: `MDB site — Contact : ${payload.type || "Message"}`,
        _template: "table",
        _captcha: "false",
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.success === "false" || data.success === false) {
      throw new Error(data.message || "formsubmit");
    }
    return true;
  };

  document.querySelectorAll("form[data-contact-form]").forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const msg = form.querySelector("[data-form-msg]");
      const btn = form.querySelector('button[type="submit"]');
      const fd = new FormData(form);

      if (String(fd.get("website") || "").trim()) {
        form.reset();
        return;
      }

      const typeKey = String(fd.get("type") || "").trim();
      const typeLabel =
        typeKey === "partner"
          ? t("contact.opt.partner", "Partenaire / marque")
          : typeKey === "press"
            ? t("contact.opt.press", "Presse / média")
            : typeKey === "other"
              ? t("contact.opt.other", "Fan / autre")
              : typeKey;

      const payload = {
        type: typeLabel,
        name: String(fd.get("name") || "").trim(),
        email: String(fd.get("email") || "").trim(),
        message: String(fd.get("message") || "").trim(),
      };

      if (!payload.name || !payload.email || !payload.message) {
        if (msg) {
          msg.hidden = false;
          msg.style.color = "var(--pink)";
          msg.textContent = t("contact.form.error", "Champs incomplets.");
        }
        return;
      }

      if (btn) {
        btn.disabled = true;
      }
      if (msg) {
        msg.hidden = false;
        msg.style.color = "var(--muted)";
        msg.textContent = t("contact.form.sending", "Envoi en cours…");
      }

      try {
        try {
          await sendViaPhp(payload);
        } catch (_) {
          await sendViaFormSubmit(payload);
        }
        form.reset();
        if (msg) {
          msg.style.color = "var(--pink)";
          msg.textContent = t(
            "contact.form.ok",
            "Message envoyé — merci, on vous répond vite."
          );
        }
      } catch (_) {
        if (msg) {
          msg.style.color = "var(--pink)";
          msg.textContent = t(
            "contact.form.error",
            "Envoi impossible pour le moment. Réessayez ou appelez le 06 51 11 02 01."
          );
        }
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  });

  /* Highlights carousel — 1 vidéo visible, scroll / flèches / dots */
  const hlRoot = document.querySelector("[data-hl-carousel]");
  if (hlRoot) {
    const rail = hlRoot.querySelector("[data-hl-rail]");
    const cards = Array.from(hlRoot.querySelectorAll("[data-hl-card]"));
    const prevBtn = hlRoot.querySelector("[data-hl-prev]");
    const nextBtn = hlRoot.querySelector("[data-hl-next]");
    const dotsWrap = hlRoot.querySelector("[data-hl-dots]");
    let activeIndex = 0;
    let scrollTick = 0;

    const dots = cards.map((_, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "hl-strip__dot" + (i === 0 ? " is-active" : "");
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-label", `Highlight ${i + 1}`);
      btn.setAttribute("aria-selected", i === 0 ? "true" : "false");
      btn.addEventListener("click", () => goTo(i, true));
      dotsWrap.appendChild(btn);
      return btn;
    });

    const tryPlay = (card) => {
      const video = card.querySelector("video");
      if (!video) return;
      video.muted = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("muted", "");
      video.preload = "auto";
      if (video.readyState < 2) {
        try {
          video.load();
        } catch (_) {}
      }
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise
          .then(() => card.classList.add("is-playing"))
          .catch(() => card.classList.remove("is-playing"));
      }
      video.addEventListener(
        "playing",
        () => card.classList.add("is-playing"),
        { once: true }
      );
      video.addEventListener("error", () => card.classList.remove("is-playing"), {
        once: true,
      });
    };

    const pauseCard = (card) => {
      const video = card.querySelector("video");
      if (!video) return;
      video.pause();
      card.classList.remove("is-playing");
    };

    const setActive = (index) => {
      activeIndex = Math.max(0, Math.min(index, cards.length - 1));
      cards.forEach((card, i) => {
        const on = i === activeIndex;
        card.classList.toggle("is-active", on);
        card.setAttribute("aria-hidden", on ? "false" : "true");
        if (on) tryPlay(card);
        else pauseCard(card);
      });
      dots.forEach((dot, i) => {
        const on = i === activeIndex;
        dot.classList.toggle("is-active", on);
        dot.setAttribute("aria-selected", on ? "true" : "false");
      });
      if (prevBtn) prevBtn.disabled = activeIndex === 0;
      if (nextBtn) nextBtn.disabled = activeIndex === cards.length - 1;
    };

    const goTo = (index, smooth) => {
      const target = cards[Math.max(0, Math.min(index, cards.length - 1))];
      if (!target || !rail) return;
      const left = target.offsetLeft;
      rail.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
      setActive(index);
    };

    const nearestIndex = () => {
      if (!rail || !cards.length) return 0;
      const center = rail.scrollLeft + rail.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        const mid = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(mid - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      return best;
    };

    if (rail) {
      rail.addEventListener(
        "scroll",
        () => {
          window.clearTimeout(scrollTick);
          scrollTick = window.setTimeout(() => {
            const idx = nearestIndex();
            if (idx !== activeIndex) setActive(idx);
          }, 60);
        },
        { passive: true }
      );

      rail.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          goTo(activeIndex - 1, true);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          goTo(activeIndex + 1, true);
        }
      });
    }

    if (prevBtn) prevBtn.addEventListener("click", () => goTo(activeIndex - 1, true));
    if (nextBtn) nextBtn.addEventListener("click", () => goTo(activeIndex + 1, true));

    /* Toujours démarrer sur Valence (1re carte), jamais sur Saint-Galmier */
    const bootValence = () => {
      if (rail) rail.scrollLeft = 0;
      goTo(0, false);
    };
    bootValence();
    requestAnimationFrame(bootValence);
    window.addEventListener("load", bootValence, { once: true });
  }
})();
