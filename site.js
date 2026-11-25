(() => {
  const data = window.LEAH_SITE_DATA;
  const main = document.querySelector("#page-content");
  const menuButton = document.querySelector(".menu-toggle");
  const pageParam = new URLSearchParams(window.location.search).get("page");
  const pages = data?.sitePages || {};
  const homeUrl = "./index.html";

  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);

  const pageLink = (slug, label, className = "") =>
    `<a${className ? ` class="${className}"` : ""} href="${homeUrl}?page=${encodeURIComponent(slug)}">${escapeHtml(label)} <span aria-hidden="true">↗</span></a>`;

  const sectionsMarkup = (sections = []) => sections.map((section) => `
    <article class="info-card">
      <h2>${escapeHtml(section.title)}</h2>
      <p>${escapeHtml(section.body)}</p>
    </article>`).join("");

  const listMarkup = (items = []) => items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  const practiceAreasMarkup = (practiceSlugs = []) => practiceSlugs.map((practiceSlug) => {
    const practice = pages[practiceSlug];
    return `
      <article class="practice-list-card">
        <h2><a href="${homeUrl}?page=${encodeURIComponent(practiceSlug)}">${escapeHtml(practice.title)}</a></h2>
        <p>${escapeHtml(practice.intro)}</p>
        ${pageLink(practiceSlug, "LEARN MORE", "text-link")}
      </article>`;
  }).join("");

  const contactFormMarkup = (title) => `
    <form class="page-form inquiry-form">
      <label>First name<input name="firstName" autocomplete="given-name" placeholder="First name" required></label>
      <label>Last name<input name="lastName" autocomplete="family-name" placeholder="Last name" required></label>
      <label>Phone<input name="phone" type="tel" autocomplete="tel" placeholder="Phone"></label>
      <label>Email address<input name="email" type="email" autocomplete="email" placeholder="you@example.com" required></label>
      <label>City<input name="city" autocomplete="address-level2" placeholder="City"></label>
      <label>${title === "Community Enquiries" ? "Describe your enquiry" : "Describe your case"}<textarea name="message" rows="4" placeholder="Brief, non-confidential summary" required></textarea></label>
      <button class="button button-red" type="submit">${title === "Sponsorships" ? "SEND REQUEST" : "SEND INQUIRY"} <span aria-hidden="true">↗</span></button>
      <p class="page-form-note">This website preview does not send or store form submissions. Call the firm at 07123456789.</p>
      <p class="page-form-status" role="status" aria-live="polite"></p>
    </form>`;

  const pageContent = (page, slug) => {
    const title = escapeHtml(page.title);
    const eyebrow = escapeHtml(page.eyebrow);
    const intro = escapeHtml(page.intro);
    let body = "";

    if (page.kind === "practice-index") {
      body = `<section class="page-body"><div class="practice-list-grid">${practiceAreasMarkup(page.practiceSlugs)}</div><p class="legal-note">This website provides general information only and is not legal advice.</p></section>`;
    } else if (page.kind === "results") {
      body = `<section class="page-body"><p class="legal-note">No case-result figures are published here, and no particular outcome is promised or guaranteed.</p></section>`;
    } else if (page.kind === "areas") {
      body = `<section class="page-body"><p class="legal-note">Specific service locations are not listed here. Contact the firm to confirm whether it may assist with your location and matter.</p></section>`;
    } else if (page.kind === "sponsorship") {
      body = `<section class="page-body page-columns"><div class="page-copy"><h2>Contact the firm</h2><p>Call the firm at <a href="tel:07123456789"><strong>07123456789</strong></a>.</p><p>Fees and disbursements will be discussed and recorded in the client engagement terms in accordance with applicable law.</p></div>${contactFormMarkup(page.title)}</section>`;
    } else if (page.kind === "media") {
      body = `<section class="page-body"><p class="legal-note">Media coverage will be listed here when details are verified and available.</p></section>`;
    } else if (page.kind === "blog") {
      body = `<section class="page-body"><p class="legal-note">Legal information will be published here when available. Website content is general information, not legal advice.</p></section>`;
    } else {
      const points = page.bullets?.length ? `<ul class="page-points">${listMarkup(page.bullets)}</ul>` : "";
      const sections = page.sections?.length ? `<div class="page-sections">${sectionsMarkup(page.sections)}</div>` : "";
      const related = pageLink("areas-we-serve", "VIEW AREAS OF SERVICE");
      const mainCopy = `<div class="page-copy">${points}${sections}<p class="legal-note">This page is general information, not legal advice.</p>${related}</div>`;
      body = `<section class="page-body">${mainCopy}</section>`;
    }

    const aside = page.kind !== "practice-index" && page.kind !== "sponsorship" && page.kind !== "results" && page.kind !== "areas" && page.kind !== "media" && page.kind !== "blog";
    main.innerHTML = `
      <section class="page-shell">
        <div class="page-hero"><div class="page-hero-inner${aside ? "" : " page-hero-inner--single"}">
          <div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="lead">${intro}</p></div>
          ${aside ? `<aside class="page-aside"><strong>Contact the firm</strong><p>Discuss your matter and possible next steps.</p><a href="tel:07123456789">CALL 07123456789 <span aria-hidden="true">↗</span></a></aside>` : ""}
        </div></div>
        ${body}
      </section>`;
    document.title = `${page.title} | GEKONG'A & COMPANY`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", page.description);
    document.body.classList.add("is-subpage");
    document.querySelector("#top")?.scrollIntoView();
  };

  if (pageParam && pages[pageParam] && main) {
    pageContent(pages[pageParam], pageParam);
  } else if (pageParam && !pages[pageParam]) {
    document.title = "Page not found | GEKONG'A & COMPANY";
    main.innerHTML = `<section class="page-hero"><div class="page-hero-inner"><div><p class="eyebrow">PAGE NOT FOUND</p><h1>That page isn’t here.</h1><p class="lead">Use the links below to continue browsing.</p><a class="button button-light" href="${homeUrl}">BACK TO HOME</a></div></div></section><section class="page-body">${pageLink("areas-we-serve", "AREAS WE SERVE")}</section>`;
  }

  if (menuButton) {
    menuButton.addEventListener("click", () => {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      const isOpen = !expanded;
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      document.body.classList.toggle("nav-open", isOpen);
    });
  }

  document.querySelectorAll(".nav-group").forEach((group) => {
    const summary = group.querySelector("summary");
    group.addEventListener("toggle", () => {
      const hasOpenMobileSubmenu = window.matchMedia("(max-width: 640px)").matches
        && Boolean(document.querySelector(".nav-group[open]"));
      document.body.classList.toggle("nav-submenu-open", hasOpenMobileSubmenu);
    });
    group.querySelector(".mobile-submenu-back")?.addEventListener("click", () => {
      group.open = false;
    });
    const supportsMenuHover = () => window.matchMedia("(min-width: 901px) and (hover: hover) and (pointer: fine)").matches;
    group.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse" && supportsMenuHover()) group.open = true;
    });
    group.addEventListener("pointerleave", (event) => {
      if (event.pointerType === "mouse" && supportsMenuHover()) group.open = false;
    });
    summary?.addEventListener("click", (event) => {
      if (event.detail > 0 && supportsMenuHover() && group.matches(":hover")) {
        event.preventDefault();
      }
    });
  });

  const practiceTrack = document.querySelector(".practice-grid");
  const practiceCards = practiceTrack ? [...practiceTrack.querySelectorAll("article")] : [];
  const practiceDots = [...document.querySelectorAll(".practice-carousel-dots button")];

  if (practiceTrack && practiceCards.length && practiceDots.length) {
    const practiceSection = practiceTrack.closest(".practice-home");
    const practiceCarouselMedia = window.matchMedia("(max-width: 640px)");
    const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    let practiceAutoplayTimer;

    const setActivePracticeDot = (activeIndex) => {
      practiceDots.forEach((dot, index) => {
        if (index === activeIndex) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    };

    const updatePracticeDots = () => {
      const trackLeft = practiceTrack.getBoundingClientRect().left;
      let activeIndex = 0;
      let closestDistance = Infinity;

      practiceCards.forEach((card, index) => {
        const distance = Math.abs(card.getBoundingClientRect().left - trackLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          activeIndex = index;
        }
      });

      setActivePracticeDot(activeIndex);
    };

    const stopPracticeAutoplay = () => {
      window.clearTimeout(practiceAutoplayTimer);
      practiceAutoplayTimer = undefined;
    };

    const schedulePracticeAutoplay = () => {
      stopPracticeAutoplay();
      const isFinePointerHovering = window.matchMedia("(hover: hover) and (pointer: fine)").matches
        && practiceSection.matches(":hover");
      if (!practiceCarouselMedia.matches || reducedMotionMedia.matches || document.hidden
        || isFinePointerHovering || practiceSection.contains(document.activeElement)) return;

      practiceAutoplayTimer = window.setTimeout(() => {
        const activeIndex = practiceDots.findIndex((dot) => dot.getAttribute("aria-current") === "true");
        const nextIndex = (activeIndex + 1 + practiceCards.length) % practiceCards.length;
        const nextCard = practiceCards[nextIndex];
        const left = practiceTrack.scrollLeft
          + nextCard.getBoundingClientRect().left
          - practiceTrack.getBoundingClientRect().left;

        setActivePracticeDot(nextIndex);
        practiceTrack.scrollTo({ left, behavior: "smooth" });
        schedulePracticeAutoplay();
      }, 3000);
    };

    practiceDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        const card = practiceCards[index];
        if (!card) return;
        setActivePracticeDot(index);
        const left = practiceTrack.scrollLeft
          + card.getBoundingClientRect().left
          - practiceTrack.getBoundingClientRect().left;
        practiceTrack.scrollTo({
          left,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        });
        schedulePracticeAutoplay();
      });
    });

    const updateAfterGesture = () => window.setTimeout(updatePracticeDots, 200);
    practiceTrack.addEventListener("scroll", updatePracticeDots, { passive: true });
    practiceTrack.addEventListener("scrollend", updatePracticeDots);
    practiceTrack.addEventListener("touchstart", stopPracticeAutoplay, { passive: true });
    practiceTrack.addEventListener("touchend", () => {
      updateAfterGesture();
      schedulePracticeAutoplay();
    }, { passive: true });
    practiceTrack.addEventListener("pointerup", schedulePracticeAutoplay, { passive: true });
    practiceSection.addEventListener("pointerenter", stopPracticeAutoplay);
    practiceSection.addEventListener("pointerleave", schedulePracticeAutoplay);
    practiceSection.addEventListener("focusin", stopPracticeAutoplay);
    practiceSection.addEventListener("focusout", (event) => {
      if (!practiceSection.contains(event.relatedTarget)) schedulePracticeAutoplay();
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopPracticeAutoplay();
      else schedulePracticeAutoplay();
    });
    window.addEventListener("resize", () => {
      updatePracticeDots();
      schedulePracticeAutoplay();
    });
    updatePracticeDots();
    schedulePracticeAutoplay();
  }

  const updateHeaderState = () => {
    document.body.classList.toggle("is-scrolled", window.scrollY > 80);
  };

  window.addEventListener("scroll", updateHeaderState, { passive: true });
  updateHeaderState();

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (link && link.getAttribute("href")?.includes("?page=")) {
      document.body.classList.remove("nav-open");
      menuButton?.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("submit", (event) => {
    if (!event.target.matches(".inquiry-form")) return;
    event.preventDefault();
    const status = event.target.querySelector(".form-status, .page-form-status");
    if (status) status.textContent = "This preview doesn’t send messages. Please call the firm directly.";
  });

  const revealTargets = document.querySelectorAll([
    ".hero-copy",
    ".results-home > *",
    ".about-intro",
    ".about-points article",
    ".practice-intro",
    ".practice-grid article",
    ".strategy-cta > *",
    ".service-home > *",
    ".home-contact > *",
    ".page-hero-inner > *",
    ".page-body > *",
    ".page-body .page-points li",
    ".page-body .info-card",
    ".page-body .page-form",
    ".page-body .page-card",
  ].join(","));

  if (revealTargets.length && "IntersectionObserver" in window
    && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });

    document.body.classList.add("scroll-reveal-ready");
    revealTargets.forEach((element) => {
      element.classList.add("scroll-reveal");
      revealObserver.observe(element);
    });
  }

  const year = document.querySelector("#copyright-year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
