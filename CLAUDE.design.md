# CLAUDE.design.md — Design-System & Struktur

> Dieses Dokument steuert alle visuellen und strukturellen Entscheidungen.
> Wird befüllt, sobald die Fragen in CLAUDE.md beantwortet sind.

---

## 1. Farbpalette

```css
/* IMPLEMENTIERT — Apple-Stil */
:root {
  --c-white:       #ffffff;
  --c-off-white:   #f5f5f7;   /* Apple Hintergrundgrau */
  --c-light-gray:  #e8e8ed;
  --c-mid-gray:    #6e6e73;   /* Apple Untertitelgrau */
  --c-dark:        #1d1d1f;   /* Apple Dunkeltext */
  --c-black:       #000000;

  /* Apple Akzente + Gradients — AKTIV */
  --c-blue:        #0071e3;   /* Apple CTA Blau */
  --c-blue-light:  #2997ff;
  --c-purple:      #bf5af2;   /* Apple Purple */
  --c-cyan:        #32ade6;
  --c-green:       #34c759;
}
```

**Design: Apple-Style** — Hell/Dunkel-Sektionswechsel, Lila-Blau-Cyan Gradients, glassmorphism Nav.

---

## 2. Typografie

```css
/* PLATZHALTER */
--font-heading: 'TBD', sans-serif;   /* Überschriften H1–H3 */
--font-body:    'TBD', sans-serif;   /* Fließtext, Labels */
--font-mono:    'TBD', monospace;    /* Code-Snippets (optional) */

/* Größen-Skala (fluid, clamp-basiert) */
--text-xs:   clamp(0.75rem,  1vw,  0.875rem);
--text-sm:   clamp(0.875rem, 1.2vw, 1rem);
--text-base: clamp(1rem,     1.5vw, 1.125rem);
--text-lg:   clamp(1.125rem, 2vw,  1.375rem);
--text-xl:   clamp(1.375rem, 3vw,  2rem);
--text-2xl:  clamp(2rem,     4vw,  3rem);
--text-3xl:  clamp(2.5rem,   6vw,  4.5rem);
```

---

## 3. Spacing & Layout

```css
--space-xs:  0.25rem;
--space-sm:  0.5rem;
--space-md:  1rem;
--space-lg:  2rem;
--space-xl:  4rem;
--space-2xl: 8rem;

--container-max: 1200px;
--container-pad: clamp(1rem, 5vw, 3rem);

--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 16px;
--radius-full: 9999px;
```

---

## 4. Seitenstruktur (One-Pager)

Reihenfolge der Sektionen — **noch offen, wartet auf Kundenfeedback**:

| # | Sektion-ID       | Titel (TBD)        | Status        |
|---|------------------|--------------------|---------------|
| 1 | `#hero`          | Hero / Einstieg    | Struktur offen|
| 2 | `#about`         | Über uns           | Struktur offen|
| 3 | `#services`      | Leistungen         | Inhalt fehlt  |
| 4 | `#portfolio`     | Projekte           | Inhalt fehlt  |
| 5 | `#testimonials`  | Referenzen         | Optional      |
| 6 | `#pricing`       | Preise             | Optional      |
| 7 | `#contact`       | Kontakt            | Inhalt fehlt  |

---

## 5. Komponenten

### Navigation
- Sticky Header mit Logo + Anker-Links
- Hamburger-Menü (Mobile)
- Smooth-Scroll zu Sektionen
- Active-State bei aktiver Sektion (IntersectionObserver)

### Hero
- Fullscreen oder 80vh
- Headline + Subheadline + CTA-Button
- Optional: Hintergrundbild / Video / animierter Gradient

### Über uns
- Option A: Gemeinsamer Block (Team-Foto + Text)
- Option B: Zwei Karten nebeneinander (je Foto, Name, Rolle, Kurztext)

### Service-Karten
- Icon + Titel + Kurztext
- Grid: 2–3 Spalten Desktop, 1 Spalte Mobile

### Portfolio/Projekte
- Bild-Grid mit Hover-Overlay
- Lightbox oder externer Link
- Optional: Filterleiste nach Kategorie

### Kontakt
- Formular (Name, E-Mail, Nachricht, Senden-Button)
- Optional: Social-Icons, Adresse, Karte

### Footer
- Copyright
- Impressum-Link
- Datenschutz-Link

---

## 6. Animationen & Interaktionen

```
- Scroll-Reveal: Elemente fade-in beim Einblenden (IntersectionObserver)
- Smooth-Scroll: Anker-Navigation ohne Sprung
- Hover-States: Buttons, Karten, Links
- Cursor: Standard (kein Custom-Cursor, außer gewünscht)
- Parallax: Optional für Hero
- Page-Load-Animation: Optional
```

**Performance-Regel:** Kein JS-Framework. Kein jQuery. Vanilla JS only.
Animationen via CSS transitions + IntersectionObserver.

---

## 7. Responsive Breakpoints

```css
/* Mobile First */
/* Base:  < 640px  — 1 Spalte */
/* sm:    640px+   — 2 Spalten möglich */
/* md:    768px+   — Navigation Desktop */
/* lg:    1024px+  — 3 Spalten Grid */
/* xl:    1280px+  — Container max-width greift */
```

---

## 8. Zugänglichkeit (Accessibility)

- Semantisches HTML (header, main, section, footer, nav, article)
- ARIA-Labels für Icons ohne Text
- Fokus-sichtbar bei Tab-Navigation
- Kontrastverhältnis min. 4.5:1 (WCAG AA)
- Bilder mit aussagekräftigem alt-Text

---

## Offene Design-Entscheide

- [ ] Farbpalette finalisiert
- [ ] Font-Kombination gewählt
- [ ] Dark/Light Mode Entscheid
- [ ] Hero-Typ (Foto / Gradient / Video)
- [ ] About-Layout (gemeinsam / getrennt)
- [ ] Sektions-Reihenfolge bestätigt
