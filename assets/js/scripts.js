// Lightweight interactions: preloader, mobile menu, smooth scroll, active nav, reveal
document.addEventListener("DOMContentLoaded", function () {
  // PRELOADER
  const pre = document.getElementById("preloader");
  setTimeout(() => {
    if (pre) {
      pre.style.opacity = "0";
      pre.style.pointerEvents = "none";
      setTimeout(() => pre.remove(), 450);
    }
  }, 650);

  // YEAR
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // MOBILE MENU
  const btnMenu = document.getElementById("btn-menu");
  const nav = document.getElementById("nav");
  btnMenu &&
    btnMenu.addEventListener("click", () => nav.classList.toggle("open"));

  // SMOOTH SCROLL for anchors
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", function (e) {
      const target = this.getAttribute("href");
      if (target.length > 1) {
        e.preventDefault();
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        // close nav on mobile
        if (nav.classList.contains("open")) nav.classList.remove("open");
      }
    });
  });

  // ACTIVE LINK ON SCROLL
  const sections = document.querySelectorAll("section[id]");
  const navlinks = document.querySelectorAll(".nav-link");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        if (entry.isIntersecting) {
          navlinks.forEach((l) =>
            l.classList.toggle("active", l.getAttribute("href") === "#" + id)
          );
        }
      });
    },
    { threshold: 0.45 }
  );
  sections.forEach((s) => io.observe(s));

  // REVEAL ON SCROLL
  const revealEls = document.querySelectorAll(
    ".project-card, .section-heading, .hero-copy, .profile, .cert, .project-thumb"
  );
  const rObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "none";
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(16px)";
    rObs.observe(el);
  });

  // Accessibility: focus styles for project-cards
  document.querySelectorAll(".project-card").forEach((card) => {
    card.tabIndex = 0;
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const link = card.querySelector(".proj-link");
        if (link) link.click();
      }
    });
  });
});
