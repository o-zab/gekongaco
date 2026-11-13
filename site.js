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

  const resultClip = `<span class="result-clip" aria-hidden="true"><svg viewBox="0 0 48 68"><path d="M15 28V15a9 9 0 0 1 18 0v13" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M10 27h28l-3 38H13z" fill="currentColor"/><path d="M15 28h18" fill="none" stroke="#aaa" stroke-width="1.5"/></svg></span>`;

  const resultMarkup = () => (data.caseResults || []).map(([amount, category]) => `
    <article class="result-item">
      ${resultClip}
      <p>${escapeHtml(category)}</p>
      <strong>${escapeHtml(amount)}</strong>
      <small>COMPENSATION</small>
    </article>`).join("");

  const cityMarkup = () => (data.serviceCities || []).map(([city, path]) => {
    const slug = path.replace(/^\//, "");
    return `<a class="city-card" href="${homeUrl}?page=${encodeURIComponent(slug)}"><strong>${escapeHtml(city)}</strong><span>VIEW LOCATION <span aria-hidden="true">↗</span></span></a>`;
  }).join("");

  const contactFormMarkup = (title) => `
    <form class="page-form inquiry-form">
      <label>Your name<input name="name" autocomplete="name" placeholder="Full name" required></label>
      <label>Email address<input name="email" type="email" autocomplete="email" placeholder="you@example.com" required></label>
      <label>Phone number<input name="phone" type="tel" autocomplete="tel" placeholder="(555) 555-5555"></label>
      <label>${title === "Sponsorships" ? "Tell us about your organization or event" : "How can we help?"}<textarea name="message" rows="4" placeholder="Share a few details" required></textarea></label>
      <button class="button button-red" type="submit">${title === "Sponsorships" ? "SEND REQUEST" : "REQUEST A FREE CONSULTATION"} <span aria-hidden="true">↗</span></button>
      <p class="page-form-note">This standalone preview does not send or store form submissions. Call (956) 226-4232 to reach the firm.</p>
      <p class="page-form-status" role="status" aria-live="polite"></p>
    </form>`;

  const pageContent = (page, slug) => {
    const title = escapeHtml(page.title);
    const eyebrow = escapeHtml(page.eyebrow);
    const intro = escapeHtml(page.intro);
    const description = escapeHtml(page.description);
    let body = "";

    if (page.kind === "results") {
      body = `<section class="page-body"><p class="eyebrow eyebrow-red">SELECTED CASE OUTCOMES</p><div class="result-grid">${resultMarkup()}</div><p class="legal-note">${escapeHtml(page.intro)} Past results do not guarantee a similar outcome. Every case is different.</p></section>`;
    } else if (page.kind === "areas") {
      body = `<section class="page-body"><p class="eyebrow eyebrow-red">KENYA COMMUNITIES WE SERVE</p><div class="city-grid">${cityMarkup()}</div><p class="legal-note">Our team can discuss the details of your location and potential case during a consultation.</p></section>`;
    } else if (page.kind === "contact" || page.kind === "sponsorship") {
      body = `<section class="page-body page-columns"><div class="page-copy"><p>${intro}</p><h2>Talk with our team</h2><p>Call <a href="tel:+19562264232"><strong>(956) 226-4232</strong></a> for South KENYA or <a href="tel:+18326719473"><strong>(832) 671-9473</strong></a> for Houston.</p><p>There is no fee unless we win your case.</p></div>${contactFormMarkup(page.title)}</section>`;
    } else if (page.kind === "media") {
      body = `<section class="page-body"><p>${intro}</p><ul class="media-list">${listMarkup(page.bullets || [])}</ul></section>`;
    } else if (page.kind === "blog") {
      body = `<section class="page-body"><p>${intro}</p><div class="resource-grid">${(page.bullets || []).map((item) => `<article class="resource-card"><strong>${escapeHtml(item)}</strong><span>LEGAL INSIGHT</span></article>`).join("")}</div><p class="legal-note">These topic cards are a visual preview, not published legal articles.</p></section>`;
    } else {
      const points = page.bullets?.length ? `<ul class="page-points">${listMarkup(page.bullets)}</ul>` : "";
      const sections = page.sections?.length ? `<div class="page-sections">${sectionsMarkup(page.sections)}</div>` : "";
      const related = page.kind === "attorney" || page.kind === "about" ? pageLink("our-firm", "GEKONG'A & COMPANY") : pageLink("areas-we-serve", "VIEW ALL SERVICE AREAS");
      const mainCopy = `<div class="page-copy"><p>${intro}</p>${points}${sections}<p class="legal-note">${description} This page provides general information and is not legal advice.</p>${related}</div>`;
      const aside = `<aside class="page-card"><p class="eyebrow">HERE WHEN YOU NEED US</p><h2>Let’s talk about what happened.</h2><p>Our team can help you understand possible next steps.</p><a class="button button-red" href="${homeUrl}?page=contact-us">FREE CONSULTATION <span aria-hidden="true">↗</span></a></aside>`;
      body = `<section class="page-body page-columns">${mainCopy}${aside}</section>`;
    }

    const aside = page.kind !== "contact" && page.kind !== "sponsorship" && page.kind !== "results" && page.kind !== "areas" && page.kind !== "media" && page.kind !== "blog";
    main.innerHTML = `
      <section class="page-shell">
        <div class="page-hero"><div class="page-hero-inner">
          <div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="lead">${intro}</p></div>
          ${aside ? `<aside class="page-aside"><strong>Free consultation</strong><p>Speak with our team about your questions and possible next steps.</p><a href="tel:+19562264232">CALL (956) 226-4232 <span aria-hidden="true">↗</span></a></aside>` : ""}
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
      menuButton.setAttribute("aria-expanded", String(!expanded));
      document.body.classList.toggle("nav-open", !expanded);
    });
  }

  const homeResults = document.querySelector(".results-preview");
  const previousResults = document.querySelector(".results-prev");
  const nextResults = document.querySelector(".results-next");

  if (homeResults && previousResults && nextResults) {
    const updateResultsControls = () => {
      previousResults.disabled = homeResults.scrollLeft <= 2;
      nextResults.disabled = homeResults.scrollLeft + homeResults.clientWidth >= homeResults.scrollWidth - 2;
    };

    previousResults.addEventListener("click", () => homeResults.scrollBy({ left: -(homeResults.clientWidth + 16), behavior: "smooth" }));
    nextResults.addEventListener("click", () => homeResults.scrollBy({ left: homeResults.clientWidth + 16, behavior: "smooth" }));
    homeResults.addEventListener("scroll", updateResultsControls, { passive: true });
    updateResultsControls();
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

  const year = document.querySelector("#copyright-year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
