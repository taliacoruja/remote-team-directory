# Remote Team Directory

A small **React + TypeScript + Vite** project showcasing a modern, accessible UI  
for browsing a distributed remote team.

Focus: **clean UI architecture, design tokens, accessibility, and polished micro-interactions**.

**Live demo:** https://taliacoruja.github.io/remote-team-directory/

---

## Preview

<p align="center">
  <img src="./public/docs/preview-light.png" width="48%" alt="Light theme preview" />
  <img src="./public/docs/preview-dark.png" width="48%" alt="Dark theme preview" />
</p>

---

## Features

- Responsive team grid with modern cards (avatar, status badge, skill chips)
- **Search, filtering, and sorting**
- Dark / Light theme with system preference support
- Persistent theme selection (`localStorage`)
- Deterministic placeholder avatars with graceful fallback to initials
- Accessibility-first UI (semantic HTML, keyboard-friendly controls)

---

## What I focused on

- Clear UI layering (`pages / entities / shared`)
- Reusable UI primitives (Listbox, SearchInput, EmptyState)
- CSS design tokens via variables and theme switching via `data-theme`
- Predictable domain logic with unit test coverage
- Accessibility basics done right: focus visibility, ARIA where needed, full keyboard navigation

---

## Tech stack

- React 19
- TypeScript
- Vite
- CSS (CSS Modules + global component styles)
- Vitest (unit tests)
- Playwright (end-to-end tests)
- ESLint

---

## Accessibility notes

- Semantic HTML structure for layout and cards
- Decorative images use empty `alt` attributes
- Keyboard-accessible controls (including the custom Listbox)
- Focus is always visible and restored after interactions
- Theme toggle exposes state via `aria-pressed`

---

## Getting started

```bash
npm install        # install dependencies
npm run dev        # start local dev server
npm run build      # type-check and build for production
npm run preview    # preview production build locally
```

###  Unit tests (Vitest)
```bash
npm run test               # alias for unit tests
npm run test:unit          # watch mode
npm run test:unit:ui       # Vitest UI

## Covered areas include:
## domain utilities (filters, timezone matching, skills matching)
## formatting helpers
## predictable filter and sort behaviour
```

###  End-to-end tests (Playwright)
```bash
npm run e2e                 # headless e2e tests
npm run e2e:ui              # Playwright UI runner

## E2E scenarios cover:
## 
## search, filtering, and AND-combination logic
## 
## sorting stability across state changes
## 
empty state behaviour
## 
## keyboard accessibility for the custom Listbox
## (Tab / Enter / Arrow navigation)
```

### Run all tests
 ```bash
npm run tests:all
```

### Lighthouse

Lighthouse audits are run against the production build (vite preview).
 ```bash
npm run build
npm run preview
npm run tests:all
```
Latest results:
Performance: `100`
Accessibility: `100`
Best Practices: `100`
SEO: `100`


