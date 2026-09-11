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

  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = lightbox?.querySelector("img");
  const lightboxClose = lightbox?.querySelector(".lightbox__close");

  document.querySelectorAll("[data-lightbox]").forEach((el) => {
    el.addEventListener("click", () => {
      const src = el.getAttribute("data-lightbox") || el.querySelector("img")?.src;
      if (!lightbox || !lightboxImg || !src) return;
      lightboxImg.src = src;
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    });
  });

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  };
  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
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

  document.querySelectorAll("form[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = form.querySelector("[data-form-msg]");
      if (msg) {
        msg.hidden = false;
        msg.textContent =
          (window.MaloI18n && window.MaloI18n.t("contact.form.ok")) ||
          "Message enregistré en local (maquette) — brancher l’envoi plus tard.";
      }
      form.reset();
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
      if (video.readyState === 0) {
        video.preload = "metadata";
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

    setActive(0);
  }
})();
