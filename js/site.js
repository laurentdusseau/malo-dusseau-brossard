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

  const sections = [
    "accueil",
    "medias",
    "palmares",
    "partenaires",
    "apropos",
    "contact",
    "objectif",
    "pourquoi-malo",
    "besoins",
    "packs",
  ]
    .map((id) => document.getElementById(id))
    .filter((el) => el && !el.classList.contains("dp-hero__pin"));

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
      "assets/medias/2026_valence_7.jpg",
      "assets/medias/2026_valence_8.jpg",
    ],
    area47: [
      "assets/medias/2026_area47_1.jpg",
      "assets/medias/2026_area47_2.jpg",
    ],
    entrainement: [
      "assets/medias/entrainement_1.jpg",
      "assets/medias/entrainement_2.jpg",
      "assets/medias/entrainement_3.jpg",
      "assets/medias/entrainement_4.jpg",
    ],
    loureira: [
      "assets/medias/2025_loureira_1.jpg",
      "assets/medias/2025_loureira_2.jpeg",
      "assets/medias/2025_loureira_3.jpeg",
      "assets/medias/2025_loureira_6.jpg",
    ],
    monthey: [
      "assets/medias/2025_monthey_1.jpg",
      "assets/medias/2025_monthey_2.jpg",
      "assets/medias/2025_monthey_3.jpg",
    ],
    saintgalmier: ["assets/medias/2024_saintgalmier_1.jpg"],
    bouxwiller: [
      "assets/medias/2025_bouxwiller_1.jpg",
      "assets/medias/2025_bouxwiller_2.jpg",
    ],
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = lightbox?.querySelector("img");
  const lightboxClose = lightbox?.querySelector(".lightbox__close");
  const lightboxPrev = lightbox?.querySelector(".lightbox__nav--prev");
  const lightboxNext = lightbox?.querySelector(".lightbox__nav--next");
  const lightboxCounter = lightbox?.querySelector(".lightbox__counter");
  let galleryItems = [];
  let galleryIndex = 0;
  let galleryCaption = "";
  let lightboxLastFocus = null;

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

  const lightboxFocusables = () => {
    if (!lightbox) return [];
    return Array.from(
      lightbox.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")
    ).filter((el) => !el.hasAttribute("hidden") && !el.disabled);
  };

  const showGalleryAt = (index) => {
    if (!lightbox || !lightboxImg || !galleryItems.length) return;
    galleryIndex =
      ((index % galleryItems.length) + galleryItems.length) % galleryItems.length;
    lightboxImg.hidden = false;
    lightboxImg.src = galleryUrl(galleryItems[galleryIndex]);
    lightboxImg.alt = galleryCaption
      ? `${galleryCaption} (${galleryIndex + 1} / ${galleryItems.length})`
      : `Photo ${galleryIndex + 1} / ${galleryItems.length}`;
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
    lightboxImg.style.cursor = multi ? "pointer" : "default";
  };

  const openLightbox = (trigger) => {
    if (!lightbox || !lightboxImg) return;
    lightboxLastFocus = trigger || document.activeElement;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    showGalleryAt(galleryIndex);
    (lightboxClose || lightbox).focus();
  };

  const openEventGallery = (eventKey, trigger) => {
    const list = EVENT_GALLERIES[eventKey];
    if (!list?.length || !lightbox || !lightboxImg) return;
    galleryItems = list.slice();
    galleryIndex = 0;
    galleryCaption = trigger?.querySelector("img")?.getAttribute("alt") || "";
    openLightbox(trigger);
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
      window.setTimeout(() => openEventGallery(eventKey, el), 0);
    });
  }

  // Compat : ancien data-lightbox mono-image
  document.querySelectorAll("[data-lightbox]").forEach((el) => {
    el.addEventListener("click", () => {
      const src = el.getAttribute("data-lightbox") || el.querySelector("img")?.src;
      if (!src || !lightbox || !lightboxImg) return;
      galleryItems = [src];
      galleryIndex = 0;
      galleryCaption = el.querySelector("img")?.getAttribute("alt") || "";
      openLightbox(el);
    });
  });

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    galleryItems = [];
    galleryCaption = "";
    if (lightboxImg) {
      lightboxImg.removeAttribute("src");
      lightboxImg.alt = "";
      lightboxImg.hidden = true;
    }
    const back = lightboxLastFocus;
    lightboxLastFocus = null;
    if (back && typeof back.focus === "function") back.focus();
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
  lightboxImg?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (galleryItems.length > 1) showGalleryAt(galleryIndex + 1);
  });
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (!lightbox?.classList.contains("is-open")) return;
    if (e.key === "Escape") {
      closeLightbox();
      return;
    }
    if (e.key === "ArrowLeft") showGalleryAt(galleryIndex - 1);
    if (e.key === "ArrowRight") showGalleryAt(galleryIndex + 1);
    if (e.key === "Tab") {
      const nodes = lightboxFocusables();
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  const reveals = document.querySelectorAll(".reveal");
  if (reduceMotion) {
    reveals.forEach((el) => el.classList.add("is-in"));
  } else if (reveals.length && "IntersectionObserver" in window) {
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

  const sendViaPhp = async (payload) => {
    const res = await fetch("contact.php", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (res.status === 429 || data.error === "rate") {
      const err = new Error("rate");
      err.code = "rate";
      throw err;
    }
    if (!res.ok || !data.ok) throw new Error(data.error || "php");
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
        await sendViaPhp(payload);
        form.reset();
        if (msg) {
          msg.style.color = "var(--pink)";
          msg.textContent = t(
            "contact.form.ok",
            "Message envoyé — merci, on vous répond vite."
          );
        }
      } catch (err) {
        if (msg) {
          msg.style.color = "var(--pink)";
          const rate = err && err.code === "rate";
          msg.textContent = rate
            ? t(
                "contact.form.rate",
                "Trop de messages. Réessayez dans quelques minutes ou appelez le 06 51 11 02 01."
              )
            : t(
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
      btn.setAttribute("aria-label", `Highlight ${i + 1}`);
      btn.setAttribute("aria-current", i === 0 ? "true" : "false");
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
        dot.setAttribute("aria-current", on ? "true" : "false");
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

  /* Partenaires — survol tactile (doigt qui glisse) = même lumière / zoom qu’au hover desktop */
  const partnersGrid = document.querySelector(".partners-cr7__grid");
  if (partnersGrid) {
    let litCell = null;
    const clearLit = () => {
      if (litCell) {
        litCell.classList.remove("is-lit");
        litCell = null;
      }
    };
    const litFromPoint = (x, y) => {
      const el = document.elementFromPoint(x, y);
      const cell = el?.closest?.(".partners-cr7__cell:not(.partners-cr7__cell--empty)");
      if (cell === litCell) return;
      clearLit();
      if (cell && partnersGrid.contains(cell)) {
        cell.classList.add("is-lit");
        litCell = cell;
      }
    };
    partnersGrid.addEventListener(
      "touchstart",
      (e) => {
        const t = e.touches[0];
        if (t) litFromPoint(t.clientX, t.clientY);
      },
      { passive: true }
    );
    partnersGrid.addEventListener(
      "touchmove",
      (e) => {
        const t = e.touches[0];
        if (t) litFromPoint(t.clientX, t.clientY);
      },
      { passive: true }
    );
    partnersGrid.addEventListener("touchend", clearLit, { passive: true });
    partnersGrid.addEventListener("touchcancel", clearLit, { passive: true });
  }

  const closeMaillotHints = (keep) => {
    document.querySelectorAll(".dp-maillot-hint.is-open").forEach((wrap) => {
      if (wrap === keep) return;
      wrap.classList.remove("is-open");
      const b = wrap.querySelector(".dp-maillot-hint__btn");
      if (b) b.setAttribute("aria-expanded", "false");
    });
  };

  document.querySelectorAll(".dp-maillot-hint").forEach((wrap) => {
    const btn = wrap.querySelector(".dp-maillot-hint__btn");
    if (!btn) return;
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const open = !wrap.classList.contains("is-open");
      closeMaillotHints(open ? wrap : null);
      wrap.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dp-maillot-hint")) closeMaillotHints();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMaillotHints();
  });
})();
