(() => {
  const root = document.documentElement;
  const body = document.body;
  const validThemes = new Set(["midnight", "ocean", "violet", "studio"]);

  // Theme picker: presets change CSS variables and are remembered on this browser.
  const themeToggle = document.querySelector(".theme-toggle");
  const themePanel = document.querySelector("#theme-panel");
  const themeOptions = [...document.querySelectorAll("[data-theme-choice]")];

  const setTheme = (theme) => {
    if (!validThemes.has(theme)) return;
    root.dataset.theme = theme;
    themeOptions.forEach((option) => {
      option.setAttribute("aria-pressed", String(option.dataset.themeChoice === theme));
    });
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.content = theme === "studio" ? "#f4f2ec" : theme === "ocean" ? "#071321" : theme === "violet" ? "#100e1b" : "#0a1019";
    try { localStorage.setItem("mottaki-portfolio-theme", theme); } catch (_) { /* local file or private browsing */ }
  };

  try {
    const savedTheme = localStorage.getItem("mottaki-portfolio-theme");
    if (savedTheme && validThemes.has(savedTheme)) setTheme(savedTheme);
  } catch (_) { /* Use the default theme when browser storage is unavailable. */ }

  const closeThemePanel = () => {
    if (!themePanel || !themeToggle) return;
    themePanel.hidden = true;
    themeToggle.setAttribute("aria-expanded", "false");
  };

  themeToggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    const willOpen = themePanel.hidden;
    themePanel.hidden = !willOpen;
    themeToggle.setAttribute("aria-expanded", String(willOpen));
  });
  themeOptions.forEach((option) => option.addEventListener("click", () => {
    setTheme(option.dataset.themeChoice);
    closeThemePanel();
  }));

  // Responsive navigation: closes on selection, outside click, or Escape.
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector("#nav-links");
  const closeMenu = () => {
    navLinks?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation menu");
  };
  menuToggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    const willOpen = !navLinks.classList.contains("is-open");
    navLinks.classList.toggle("is-open", willOpen);
    menuToggle.setAttribute("aria-expanded", String(willOpen));
    menuToggle.setAttribute("aria-label", willOpen ? "Close navigation menu" : "Open navigation menu");
  });
  navLinks?.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("click", (event) => {
    if (navLinks?.classList.contains("is-open") && !event.target.closest(".navbar")) closeMenu();
    if (themePanel && !themePanel.hidden && !event.target.closest(".theme-panel") && !event.target.closest(".theme-toggle")) closeThemePanel();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") { closeMenu(); closeThemePanel(); }
  });
  window.addEventListener("resize", () => { if (window.innerWidth > 760) closeMenu(); });

  // Typing headline, disabled for reduced-motion preferences.
  const typingElement = document.querySelector("#typing");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (typingElement && !reduceMotion) {
    const words = ["ASP.NET Core", "Web API", "Angular", "SQL Server"];
    let wordIndex = 0, charIndex = words[0].length, deleting = true;
    const type = () => {
      const current = words[wordIndex];
      if (deleting) {
        charIndex = Math.max(0, charIndex - 1);
        typingElement.textContent = current.slice(0, charIndex);
        if (charIndex === 0) { deleting = false; wordIndex = (wordIndex + 1) % words.length; }
        window.setTimeout(type, 48);
      } else {
        const next = words[wordIndex];
        charIndex = Math.min(next.length, charIndex + 1);
        typingElement.textContent = next.slice(0, charIndex);
        if (charIndex === next.length) { deleting = true; window.setTimeout(type, 1650); }
        else window.setTimeout(type, 88);
      }
    };
    window.setTimeout(type, 1500);
  }

  // Optional portrait: if assets/profile.jpg is absent, the clean MB initials stay visible.
  const profileImage = document.querySelector(".profile-img");
  const avatar = document.querySelector(".developer-avatar");
  if (profileImage && avatar) {
    profileImage.addEventListener("load", () => avatar.classList.add("has-profile"));
    profileImage.addEventListener("error", () => { profileImage.removeAttribute("src"); avatar.classList.remove("has-profile"); });
    if (profileImage.complete && profileImage.naturalWidth > 0) avatar.classList.add("has-profile");
  }

  // Optional project screenshots: upload to the expected path and they will be framed automatically.
  // If an image is missing, the CSS-generated illustration remains visible (no broken-image icon).
  document.querySelectorAll(".project-visual[data-cover-src]").forEach((visual) => {
    const image = new Image();
    image.className = "project-screenshot";
    image.alt = "";
    image.setAttribute("aria-hidden", "true");
    image.onload = () => visual.classList.add("has-screenshot");
    image.onerror = () => image.remove();
    image.src = visual.dataset.coverSrc;
    visual.appendChild(image);
  });

  // Reveal animations; content remains visible if IntersectionObserver is unavailable.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -35px 0px" });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Active section state in the navigation.
  const navAnchors = [...document.querySelectorAll(".nav-link")];
  const sections = navAnchors.map((anchor) => document.querySelector(anchor.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach((anchor) => anchor.classList.toggle("active", anchor.getAttribute("href") === `#${entry.target.id}`));
      });
    }, { rootMargin: "-22% 0px -65% 0px", threshold: 0 });
    sections.forEach((section) => activeObserver.observe(section));
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
