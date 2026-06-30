# OSC Ogrodzenia — konfiguracja Google Analytics, Search Console i opinii

## Status wdrożenia

Na stronie wdrożono:

- Google Analytics 4 z identyfikatorem `G-LFLEJD1ES2`,
- domyślną zgodę analityki ustawioną na `denied`,
- baner cookies z opcjami „Akceptuję” i „Odrzucam”,
- meta tag Google Search Console:
  `TFYpZ7Ur2OnawWVZTxVvX3ml-ZfWDqzy_1ZqeU2eyeQ`,
- sitemapę: `https://www.oscogrodzenia.pl/sitemap.xml`,
- canonicale wskazujące na domenę `https://www.oscogrodzenia.pl`,
- widget Elfsight Google Reviews na stronie głównej i podstronie opinii.

## Google Analytics 4

Tag GA4 znajduje się w sekcji `<head>` każdej podstrony. Analityka uruchamia się dopiero po zaakceptowaniu cookies przez użytkownika.

Właściciel firmy powinien mieć dostęp administracyjny do usługi GA4. Jeśli usługę zakłada wykonawca, po wdrożeniu należy dodać właściciela jako użytkownika z odpowiednimi uprawnieniami.

## Google Search Console

W Search Console należy dodać usługę dla adresu:

`https://www.oscogrodzenia.pl`

Następnie można kliknąć „Zweryfikuj”, ponieważ meta tag weryfikacyjny jest już dodany do strony.

Po weryfikacji warto zgłosić sitemapę:

`https://www.oscogrodzenia.pl/sitemap.xml`

## Opinie Google

Na stronie działa widget Elfsight Google Reviews. Jeśli widget chwilowo się nie załaduje, użytkownik widzi fallback z przyciskiem prowadzącym do profilu opinii Google.

Profil Google Maps opinii:
`https://www.google.com/maps/place/OSC+Ogrodzenia+Sebastian+Charuk/@50.2096999,18.7715016,17z/data=!4m8!3m7!1s0x471135513377a695:0xc600845d9234825e!8m2!3d50.2096999!4d18.7740765!9m1!1b1!16s%2Fg%2F11j4ybc1j7`

## Dostęp klienta

Po zakończeniu konfiguracji klient powinien mieć dostęp do:

- Google Analytics 4,
- Google Search Console,
- panelu lub konta używanego do widgetu Elfsight, jeśli ma samodzielnie zarządzać opiniami.
