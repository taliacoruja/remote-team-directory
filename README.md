# Remote Team Directory

A small React + TypeScript + Vite project that showcases a modern, accessible UI
for browsing a distributed remote team.

The project focuses on clean component architecture, design tokens,
and thoughtful UI details rather than complex business logic.

---

## ✨ Features

- Remote team directory with responsive grid layout
- Modern card design with avatars, status badges, and skill chips
- Dark / Light theme with system preference support
- Persistent theme selection (localStorage)
- Deterministic placeholder avatars with graceful fallback
- Accessibility-first approach (semantic HTML, keyboard-friendly controls)

---

## 🧱 Architecture

The project is intentionally split into clear layers:

- **pages** — page-level composition
- **entities** — domain-related UI and models (`team`)
- **shared**
  - `ui` — reusable UI components (ThemeToggle, states)
  - `hooks` — reusable logic (useTheme)
  - `styles` — global design tokens and themes

This keeps domain logic, UI primitives, and page composition cleanly separated.

---

## 🎨 Design & Theming

- Design tokens are implemented via CSS variables
- Themes are switched using `data-theme` on the root element
- Initial theme is resolved in the following order:
  1. User preference (localStorage)
  2. System preference (`prefers-color-scheme`)
- Theme toggle is implemented as an accessible UI control (`aria-pressed`)

---

## 🖼 Avatars

- Avatars use **Picsum Photos** as a visual placeholder to explore UI layout
- Avatar URLs are deterministic (based on member id)
- If an image fails to load, initials are shown as a fallback
- In a real product, avatar URLs would be provided by the backend

---

## ♿ Accessibility

- Semantic HTML structure
- Decorative images use empty `alt` attributes
- Interactive elements are keyboard-accessible
- Theme toggle exposes state via `aria-pressed`

---

## 🛠 Tech Stack

- React
- TypeScript
- Vite
- CSS (design tokens + component-level styles)

---

## 🚧 In Progress

```bash
npm install
npm run dev


