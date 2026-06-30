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
  const submitButton = form.querySelector('button[type="submit"]');
  const fallbackButton = form.querySelector("[data-mailto-fallback]");
  let submitted = false;

  const setStatus = (message, type = "info") => {
    if (!status) return;
    status.textContent = message;
    status.className = `form-status form-status--${type}`;
  };

  const createMailto = (data) => {
    const subject = "Zapytanie ze strony OSC Ogrodzenia";
    const bodyText = [
      "Zapytanie ze strony OSC Ogrodzenia",
      "",
      `Imię: ${data.get("imie") || ""}`,
      `Telefon: ${data.get("telefon") || ""}`,
      `E-mail: ${data.get("email") || ""}`,
      `Miejscowość: ${data.get("miejscowosc") || ""}`,
      `Usługa: ${data.get("usluga") || ""}`,
      `Orientacyjny wymiar: ${data.get("dlugosc") || ""}`,
      `Opis: ${data.get("opis") || ""}`,
      "",
      "Jeżeli chcesz, dołącz zdjęcia posesji, bramy lub napędu do tej wiadomości.",
    ].join("\n");
    return `mailto:ogrodzeniasc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (submitted || form.dataset.submitting === "true") return;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    if (data.get("botcheck")) return;
    const name = String(data.get("imie") || "").trim();
    const endpoint = form.getAttribute("action") || "https://api.web3forms.com/submit";
    if (fallbackButton) {
      fallbackButton.href = createMailto(data);
      fallbackButton.hidden = true;
    }
    form.dataset.submitting = "true";
    submitButton.disabled = true;
    submitButton.textContent = "Wysyłanie...";
    setStatus("Wysyłamy zapytanie do OSC Ogrodzenia...", "info");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === false) {
        throw new Error(result.message || "Błąd wysyłki formularza.");
      }
      submitted = true;
      form.reset();
      setStatus(
        `Dziękujemy${name ? `, ${name}` : ""}. Zapytanie zostało wysłane. OSC skontaktuje się z Tobą telefonicznie lub mailowo.`,
        "success",
      );
      submitButton.textContent = "Zapytanie wysłane";
      if (window.OSC_ANALYTICS_CONFIGURED && typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", {
          event_category: "formularz",
          event_label: "OSC zapytanie",
        });
      }
    } catch (error) {
      setStatus(
        "Nie udało się wysłać formularza. Zadzwoń pod numer 667 052 883 albo wyślij wiadomość na ogrodzeniasc@gmail.com.",
        "error",
      );
      if (fallbackButton) fallbackButton.hidden = false;
      form.dataset.submitting = "false";
      submitButton.disabled = false;
      submitButton.textContent = "Wyślij zapytanie o wycenę";
    }
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

const consentKey = "osc_cookie_consent";
const getConsent = () => {
  try {
    return localStorage.getItem(consentKey);
  } catch (error) {
    return null;
  }
};
const setConsent = (value) => {
  try {
    localStorage.setItem(consentKey, value);
  } catch (error) {
    /* Brak dostępu do localStorage nie blokuje działania strony. */
  }
};
const enableAnalytics = () => {
  if (typeof window.gtag !== "function") return;
  window.gtag("consent", "update", { analytics_storage: "granted" });
  if (!window.OSC_ANALYTICS_CONFIGURED && window.OSC_GA4_ID) {
    window.gtag("config", window.OSC_GA4_ID);
    window.OSC_ANALYTICS_CONFIGURED = true;
  }
};
const disableAnalytics = () => {
  if (typeof window.gtag !== "function") return;
  window.gtag("consent", "update", { analytics_storage: "denied" });
  window.OSC_ANALYTICS_CONFIGURED = false;
};
const showCookieBanner = () => {
  if (document.querySelector("[data-cookie-banner]")) return;
  const banner = document.createElement("section");
  banner.className = "cookie-banner";
  banner.setAttribute("data-cookie-banner", "");
  banner.setAttribute("aria-label", "Informacja o cookies");
  banner.innerHTML = `
    <div>
      <h2>Cookies i usługi zewnętrzne</h2>
      <p>
        Strona wykorzystuje niezbędne pliki cookies, Google Analytics oraz
        osadzone usługi zewnętrzne, w tym Google Maps i Elfsight Google Reviews.
        Analitykę uruchamiamy dopiero po Twojej zgodzie.
      </p>
      <a href="polityka-prywatnosci.html">Polityka prywatności</a>
    </div>
    <div class="cookie-banner__actions">
      <button class="btn btn--dark" type="button" data-cookie-reject>Odrzucam</button>
      <button class="btn" type="button" data-cookie-accept>Akceptuję</button>
    </div>
  `;
  document.body.append(banner);
  banner.querySelector("[data-cookie-accept]").addEventListener("click", () => {
    setConsent("accepted");
    enableAnalytics();
    banner.remove();
  });
  banner.querySelector("[data-cookie-reject]").addEventListener("click", () => {
    setConsent("rejected");
    disableAnalytics();
    banner.remove();
  });
};
const consent = getConsent();
if (consent === "accepted") {
  enableAnalytics();
} else if (consent === "rejected") {
  disableAnalytics();
} else {
  disableAnalytics();
  showCookieBanner();
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
