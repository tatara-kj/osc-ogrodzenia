# OSC Ogrodzenia — instrukcja GA4 i Search Console

Ten plik opisuje aktualny stan techniczny po wdrożeniu analityki i weryfikacji Google.

## 1. Google Analytics 4

Na stronie jest wdrożony Google Analytics 4:

`G-LFLEJD1ES2`

Tag znajduje się w sekcji `<head>` wszystkich podstron. Nie ma starego pustego identyfikatora ani drugiego równoległego tagu Analytics.

Analityka działa z banerem cookies:

- przed wyborem użytkownika analityka ma status `denied`,
- po kliknięciu „Akceptuję” uruchamia się GA4,
- po kliknięciu „Odrzucam” analityka pozostaje wyłączona.

## 2. Search Console

Na stronie dodano meta tag weryfikacyjny:

`TFYpZ7Ur2OnawWVZTxVvX3ml-ZfWDqzy_1ZqeU2eyeQ`

W Google Search Console należy dodać usługę dla:

`https://www.oscogrodzenia.pl`

Po dodaniu usługi można kliknąć „Zweryfikuj”.

## 3. Sitemap i robots

Pliki są gotowe:

- `https://www.oscogrodzenia.pl/sitemap.xml`,
- `https://www.oscogrodzenia.pl/robots.txt`.

Po weryfikacji w Search Console warto zgłosić sitemapę.

## 4. SEO techniczne

Strona ma:

- canonicale na domenę `https://www.oscogrodzenia.pl`,
- meta title i meta description dla podstron,
- Open Graph,
- schema.org `LocalBusiness` na stronie głównej,
- finalne menu bez osobnej zakładki „Bramy i furtki”.

## 5. Formularz

Formularze na stronie głównej i w kontakcie działają przez Web3Forms. W razie błędu użytkownik dostaje komunikat i przycisk „Wyślij e-mail ręcznie”.

## 6. Opinie Google

Opinie Google są osadzone przez Elfsight Google Reviews na stronie głównej i podstronie „Opinie”. Polityka prywatności oraz baner cookies informują o tej usłudze.
