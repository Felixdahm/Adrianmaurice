# CLAUDE.seo.md — SEO-Strategie & technische Optimierung

> Dieses Dokument definiert alle SEO-Maßnahmen für die Portfolio-Website.
> Wird befüllt, sobald Keywords, Region und Domain bekannt sind.

---

## 1. On-Page SEO — Meta-Tags

```html
<!-- PLATZHALTER — nach Kundenfeedback befüllen -->
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary Meta -->
  <title>[Firmenname] — [Leistung] in [Stadt] | Adrian & Maurice</title>
  <meta name="description" content="[Kernleistung] von Adrian & Maurice. [USP in 1 Satz]. Jetzt Kontakt aufnehmen.">
  <meta name="keywords" content="[keyword1], [keyword2], [keyword3], [Stadt]">
  <meta name="author" content="Adrian [Nachname], Maurice [Nachname]">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://[domain.de]/">

  <!-- Open Graph (Social Sharing) -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="[Firmenname] — [Leistung] in [Stadt]">
  <meta property="og:description" content="[Kurztext für Social Media Preview]">
  <meta property="og:image" content="https://[domain.de]/assets/images/og-preview.jpg">
  <meta property="og:url" content="https://[domain.de]/">
  <meta property="og:locale" content="de_DE">
  <meta property="og:site_name" content="[Firmenname]">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="[Firmenname] — [Leistung]">
  <meta name="twitter:description" content="[Kurztext]">
  <meta name="twitter:image" content="https://[domain.de]/assets/images/og-preview.jpg">

  <!-- Favicon & App-Icons -->
  <link rel="icon" type="image/svg+xml" href="/assets/icons/favicon.svg">
  <link rel="icon" type="image/png" href="/assets/icons/favicon-32x32.png">
  <link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#[hex]">
</head>
```

---

## 2. Schema.org Structured Data (JSON-LD)

### LocalBusiness / Person Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "name": "[Firmenname]",
      "url": "https://[domain.de]",
      "logo": "https://[domain.de]/assets/images/logo.png",
      "description": "[Beschreibung der Leistungen]",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "[Stadt]",
        "addressCountry": "DE"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "[email@domain.de]",
        "contactType": "customer service"
      },
      "sameAs": [
        "https://instagram.com/[handle]",
        "https://linkedin.com/in/[handle]",
        "https://[weitere-profile]"
      ]
    },
    {
      "@type": "Person",
      "name": "Adrian [Nachname]",
      "jobTitle": "[Berufsbezeichnung]",
      "url": "https://[domain.de]#about",
      "sameAs": ["https://linkedin.com/in/[adrianhandle]"]
    },
    {
      "@type": "Person",
      "name": "Maurice [Nachname]",
      "jobTitle": "[Berufsbezeichnung]",
      "url": "https://[domain.de]#about",
      "sameAs": ["https://linkedin.com/in/[mauricehandle]"]
    }
  ]
}
</script>
```

### BreadcrumbList (optional für Unterseiten)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://[domain.de]"
    }
  ]
}
</script>
```

---

## 3. Performance-Optimierung (Core Web Vitals)

### Bilder
```html
<!-- Moderne Formate, Lazy Loading, explizite Maße -->
<img
  src="photo.webp"
  alt="[Beschreibender Alt-Text]"
  width="800"
  height="600"
  loading="lazy"
  decoding="async"
>

<!-- Hero-Bild: kein lazy loading (LCP-Element) -->
<img src="hero.webp" alt="..." width="1920" height="1080" loading="eager">
```

### CSS & JS
```html
<!-- CSS im Head, kein render-blocking JS -->
<link rel="stylesheet" href="/css/style.css">

<!-- JS am Ende des Body oder mit defer -->
<script src="/js/main.js" defer></script>

<!-- Google Fonts: preconnect + display=swap -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=[Font]:wght@400;600;700&display=swap" rel="stylesheet">
```

### Preload kritischer Ressourcen
```html
<link rel="preload" as="image" href="/assets/images/hero.webp">
<link rel="preload" as="font" href="/assets/fonts/[font].woff2" crossorigin>
```

---

## 4. robots.txt

```
User-agent: *
Allow: /
Disallow: /assets/private/

Sitemap: https://[domain.de]/sitemap.xml
```

---

## 5. sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://[domain.de]/</loc>
    <lastmod>2026-04-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## 6. Technisches SEO — Checkliste

### HTML-Semantik
- [ ] `<html lang="de">` gesetzt
- [ ] Genau eine `<h1>` pro Seite
- [ ] Heading-Hierarchie: H1 → H2 → H3 (keine Lücken)
- [ ] `<title>` unter 60 Zeichen
- [ ] `<meta description>` 120–160 Zeichen
- [ ] Alle Bilder haben `alt`-Attribute
- [ ] Interne Links haben sinnvollen Anker-Text

### Performance (Zielwerte)
- [ ] LCP (Largest Contentful Paint): < 2.5s
- [ ] FID / INP: < 100ms
- [ ] CLS (Cumulative Layout Shift): < 0.1
- [ ] PageSpeed Score Desktop: ≥ 90
- [ ] PageSpeed Score Mobile: ≥ 80

### Security & Trust
- [ ] HTTPS (SSL-Zertifikat aktiv)
- [ ] Impressum vorhanden (Pflicht in DE)
- [ ] Datenschutzerklärung vorhanden (DSGVO)
- [ ] Kein gemischter HTTP/HTTPS-Content

---

## 7. Keyword-Strategie

**Noch ausstehend — benötigt Angaben zu:**
- Tätigkeitsfeld
- Zielregion
- Zielgruppe

### Template für Keyword-Cluster:
```
Primär-Keyword:   [Leistung] [Stadt]               → Titel, H1, Meta-Description
Sekundär:         [Leistung] [Bundesland/Region]   → H2, Fließtext
Long-Tail:        [Spezifische Leistung] [Nische]  → Alt-Texte, Sektions-Unterüberschriften
Brand:            Adrian Maurice / [Firmenname]    → About-Sektion, Schema
```

---

## 8. Lokales SEO (falls regional tätig)

- [ ] Google Business Profile erstellen / verlinken
- [ ] NAP-Konsistenz (Name, Adresse, Telefon) auf allen Plattformen gleich
- [ ] Ortsbezogene Keywords im Content einbauen
- [ ] Ggf. LocalBusiness Schema mit vollständiger Adresse

---

## Offene SEO-Entscheide

- [ ] Domain bestätigt
- [ ] Primär-Keywords definiert
- [ ] Region/Stadtbezug geklärt
- [ ] Sprache (DE / EN / mehrsprachig)
- [ ] Google Business Profile vorhanden?
- [ ] Impressum & Datenschutz-Texte vorhanden?
