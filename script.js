document.documentElement.classList.add("js");

const body = document.body;
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    body.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
  });
  nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }),
  );
}

const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = lightbox?.querySelector("img");
const lightboxCaption = lightbox?.querySelector("[data-lightbox-caption]");
const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  body.classList.remove("nav-open");
};
document.querySelectorAll("[data-lightbox-trigger]").forEach((trigger) => {
  const openLightbox = () => {
    if (!lightbox || !lightboxImage) return;
    const image = trigger.querySelector("img");
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = trigger.dataset.caption || image.alt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    body.classList.add("nav-open");
    lightbox.querySelector("button").focus();
  };
  trigger.addEventListener("click", openLightbox);
  trigger.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox();
    }
  });
});
lightbox?.querySelector("button").addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

document.querySelectorAll("[data-compare]").forEach((compare) => {
  const range = compare.querySelector("input");
  range?.addEventListener("input", () => {
    compare.style.setProperty("--position", `${range.value}%`);
  });
});

document.querySelectorAll("[data-estimate-form]").forEach((form) => {
  const formSection = form.closest("section");
  if (formSection && !formSection.id) formSection.id = "wycena";
  document
    .querySelectorAll('.mobile-actions a[href="#main"]')
    .forEach((link) => {
      link.href = "#wycena";
    });
  const status = form.querySelector(".form-status");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const name = String(data.get("imie") || "").trim();
    const subject = "Zapytanie ze strony OSC Ogrodzenia";
    const bodyText = [
      "Nowe zapytanie ze strony OSC Ogrodzenia",
      "",
      `Imię: ${name}`,
      `Telefon: ${data.get("telefon") || ""}`,
      `E-mail: ${data.get("email") || ""}`,
      `Miejscowość: ${data.get("miejscowosc") || ""}`,
      `Usługa: ${data.get("usluga") || ""}`,
      `Orientacyjny wymiar: ${data.get("dlugosc") || ""}`,
      `Opis: ${data.get("opis") || ""}`,
      "",
      "Jeżeli klient ma zdjęcia posesji, bramy lub napędu, może dołączyć je w odpowiedzi na tę wiadomość.",
    ].join("\n");
    status.textContent = `Dziękujemy${name ? `, ${name}` : ""}. Otwieramy gotową wiadomość do OSC.`;
    window.location.href = `mailto:ogrodzeniasc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
  });
});

document.querySelectorAll("[data-year]").forEach((item) => {
  item.textContent = new Date().getFullYear();
});

const backToTop = document.querySelector("[data-back-to-top]");
if (backToTop) {
  const toggleBackToTop = () => {
    backToTop.classList.toggle("is-visible", window.scrollY > 520);
  };
  toggleBackToTop();
  window.addEventListener("scroll", toggleBackToTop, { passive: true });
}

const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll("[data-elfsight-wrap]").forEach((wrap) => {
  const app = wrap.querySelector('[class*="elfsight-app"]');
  if (!app) return;

  const markLoaded = () => {
    if (app.children.length > 0 || app.querySelector("iframe")) {
      wrap.classList.add("is-loaded");
      return true;
    }
    return false;
  };

  if (markLoaded()) return;

  const observer = new MutationObserver(() => {
    if (markLoaded()) observer.disconnect();
  });
  observer.observe(app, { childList: true, subtree: true });
});

document.querySelectorAll(".footer__bottom").forEach((footerBottom) => {
  if (!footerBottom.querySelector('a[href="polityka-prywatnosci.html"]')) {
    const privacyLink = document.createElement("a");
    privacyLink.href = "polityka-prywatnosci.html";
    privacyLink.textContent = "Polityka prywatności";
    footerBottom.append(privacyLink);
  }
});
