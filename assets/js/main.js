/* ── Header scroll state ── */
const siteHeader = document.getElementById("site-header");
const menuToggle = document.getElementById("menu-toggle");
const primaryNav = document.getElementById("primary-nav");

const updateHeaderState = () => {
  if (!siteHeader) return;
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 60);
};

const closeMobileNav = () => {
  if (!menuToggle || !primaryNav) return;
  menuToggle.setAttribute("aria-expanded", "false");
  primaryNav.classList.remove("is-open");
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState);

/* ── Mobile nav toggle ── */
if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    primaryNav.classList.toggle("is-open", !isExpanded);
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMobileNav();
    }
  });
}

/* ── Hero stat counter animations ── */
const statNumbers = document.querySelectorAll(".stat-number");
const easeOutQuad = (t) => 1 - (1 - t) * (1 - t);

const animateStat = (element) => {
  const target = Number(element.dataset.target || 0);
  const prefix = element.dataset.prefix || "";
  const suffix = element.dataset.suffix || "";
  const duration = 1200;
  const startTime = performance.now();

  const step = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuad(progress);
    const value = Math.round(target * easedProgress);
    element.textContent = `${prefix}${value}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

statNumbers.forEach((stat) => animateStat(stat));

/* ── Scroll-reveal (IntersectionObserver) ── */
const revealTargets = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealTargets.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((item) => revealObserver.observe(item));
} else {
  revealTargets.forEach((item) => item.classList.add("is-visible"));
}

/* ── Active nav link highlighting ── */
const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
const sectionIds = ["about", "projects", "skills", "contact"];
const sections = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length > 0 && navLinks.length > 0) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const activeId = entry.target.id;
        navLinks.forEach((link) => {
          const linkTarget = link.getAttribute("href")?.replace("#", "");
          link.classList.toggle("is-active", linkTarget === activeId);
        });
      });
    },
    {
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => navObserver.observe(section));
}

/* ── Skill bar animations ── */
const skillsSection = document.getElementById("skills");
const skillFills = document.querySelectorAll(".skill-fill");

const animateSkillBars = () => {
  skillFills.forEach((fill) => {
    fill.style.width = fill.dataset.width || "0%";
  });
};

if ("IntersectionObserver" in window && skillsSection && skillFills.length > 0) {
  const skillsObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateSkillBars();
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.25 }
  );

  skillsObserver.observe(skillsSection);
} else {
  animateSkillBars();
}

/* ── Contact form submission ── */
const contactForm = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");

if (contactForm && formSuccess) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formSuccess.classList.add("is-visible");
    contactForm.reset();
  });
}

