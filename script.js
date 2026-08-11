(() => {
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const year = document.querySelector("[data-year]");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  if (toggle && nav) {
    const closeNav = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNav();
    });
  }

  const upcomingSection = document.querySelector("[data-upcoming]");
  const recentSection = document.querySelector("[data-recent]");
  const upcomingGrid = document.querySelector("[data-upcoming-grid]");
  const recentGrid = document.querySelector("[data-recent-grid]");
  const upcomingNav = document.querySelector("[data-upcoming-nav]");
  const recentNav = document.querySelector("[data-recent-nav]");

  if (upcomingGrid && recentGrid) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    document.querySelectorAll(".event-card[data-date]").forEach((card) => {
      const eventDate = new Date(`${card.dataset.date}T00:00:00`);
      if (Number.isNaN(eventDate.getTime())) return;

      if (eventDate < today) {
        recentGrid.append(card);
      } else {
        upcomingGrid.append(card);
      }
    });

    const hasUpcoming = upcomingGrid.children.length > 0;
    const hasRecent = recentGrid.children.length > 0;

    upcomingSection?.toggleAttribute("hidden", !hasUpcoming);
    recentSection?.toggleAttribute("hidden", !hasRecent);
    if (upcomingNav) upcomingNav.hidden = !hasUpcoming;
    if (recentNav) recentNav.hidden = !hasRecent;
  }

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }
})();
