# Sports Tactics Board

## What it does

Sports Tactics Board is a web app for **visualizing soccer formations and player positions** on a pitch that is scaled to **75×120 yards**. You can:

- **Drag and drop** all **22 players** (two teams) on an SVG field with correct proportions.
- **Pick formations** for each side and reset or adjust layouts from preset templates.
- Use **fullscreen** and on-canvas controls for a focused tactics view.

The UI includes a marketing-style hero section and the interactive board; routing covers the home page and a catch-all **404** route.

## How to run

### Prerequisites

- [Node.js](https://nodejs.org/) **18+** (LTS recommended; Vite 5 expects a current runtime).

### Install and start

```bash
npm install
npm run dev
```

The dev server is configured to listen on **port 8080** and bind to all interfaces (`host: "::"`). Open:

**http://localhost:8080**

### Other scripts

| Command             | Purpose                                      |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Start Vite in development mode (HMR).        |
| `npm run build`     | Production build to `dist/`.                 |
| `npm run build:dev` | Production build with development env mode.  |
| `npm run preview`   | Serve the built app locally for smoke tests. |
| `npm run lint`      | Run ESLint on the project.                   |

## Tech stack (in detail)

### Core application

- **React 18** — UI library; function components and hooks drive the board and layout.
- **TypeScript** — Typed sources and stricter refactors for SVG coordinate math and state.
- **Vite 5** — Dev server, ES modules, and optimized production bundles. **`@vitejs/plugin-react-swc`** compiles JSX/TS with **SWC** for fast refresh and builds.
- **`type: "module"`** — Native ESM in Node and the bundler.

### Styling and design system

- **Tailwind CSS 3** — Utility-first layout, spacing, typography, and dark/light-friendly colors.
- **`tailwindcss-animate`** — Animation utilities aligned with the UI kit.
- **`@tailwindcss/typography`** — Prose-style typography when needed.
- **PostCSS + Autoprefixer** — CSS pipeline for Tailwind and vendor prefixes.
- **shadcn/ui–style setup** (`components.json`) — **Radix UI** primitives (dialogs, dropdowns, tabs, tooltips, etc.) composed with Tailwind; **`class-variance-authority`** for variant APIs; **`tailwind-merge`** and **`clsx`** for className composition.
- **`next-themes`** — Theme provider for light/dark (used with the app shell, not Next.js).

### Routing and data

- **React Router v6** (`BrowserRouter`, `Routes`, `Route`) — `/` for the main experience and `*` for **NotFound**.
- **TanStack React Query v5** — Query client/provider wired at the app root for async/server state when you add APIs.

### Forms and validation (available in the UI layer)

- **React Hook Form** — Performant form state.
- **Zod** — Schema validation; **`@hookform/resolvers`** bridges Zod to RHF.

### Icons and notifications

- **Lucide React** — Icons (hero, board toolbar, UI).
- **Sonner** and the local **Toaster** wrapper — Toast-style feedback.

### Soccer board implementation

- **SVG** — Pitch drawing and player tokens; pointer events for drag; `getScreenCTM()` / SVG point transforms for accurate hit-testing and movement.

### Other notable libraries (UI and utilities)

The repo includes a broad **shadcn-style** dependency set: **cmdk**, **vaul** (drawers), **recharts**, **embla-carousel-react**, **react-day-picker**, **input-otp**, **marked** + **highlight.js**, **date-fns**, **uuid**, and more—ready for dashboards, docs, or forms without extra installs.

### Backend / cloud (dependency only)

- **`@supabase/supabase-js`** is listed as a dependency for optional **Supabase** (Postgres, auth, realtime). The current app sources under `src/` do not import it yet; add client setup when you connect a project.

### Tooling

- **ESLint 9** with **`@eslint/js`**, **`typescript-eslint`**, **`eslint-plugin-react-hooks`**, **`eslint-plugin-react-refresh`**.
- **Path alias `@/`** → `src/` (see `vite.config.ts` and `tsconfig`).

## Contacts

- **Omar Mustafa** — developer
- **Email 1:** [omarmus2005@outlook.com](mailto:omarmus2005@outlook.com)
- **Email 2:** [clear.cup.w@gmail.com](mailto:clear.cup.w@gmail.com)
