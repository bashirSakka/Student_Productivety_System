# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server
npm run build     # production build (output: dist/)
npm run preview   # preview production build locally
npm run lint      # run ESLint
```

## Architecture

**React 19 + Vite 8 SPA** deployed on Vercel. Routing via `react-router-dom` v7. State via Zustand. Styling via Tailwind v4 (CSS-first config in `src/index.css` — no `tailwind.config.js`).

### Route structure (`src/App.jsx`)
- `/` → `Home` (public landing page)
- `/dashboard`, `/courses`, `/tasks`, `/calendar`, `/pomodoro`, `/gpa`, `/notes` → app views, each wrapped in `GridSection` (navbar + burger + page)

### Key layout
- `GridSection` composes `Navbar` + `Burger` + a page view into the app shell
- `Navbar` uses `NavLinks` and `UserMenu`
- The landing page (`Home`) is fully independent — no app shell

### Component directories
- `src/components/landing/` — landing page sections (`Header`, `Features`, `Testimonials`, `FAQ`, `ClosingCTA`, `LogosBand`) + shared `tokens.js` (color/class constants)
- `src/components/views/` — one file per route
- `src/components/ui/` — shared primitives (`Card`, `Button`, `Pill`, `Modal`, `FormInput`, etc.)
- `src/components/layout/` — shell components

### State
- `src/store/pomodoroStore.js` — exports `useCounterStore` (timer state + tick/start/stop/reset) and `useWorkStore` (current task label). Both are named exports. The global timer tick runs in `App.jsx` via `useEffect` + `setInterval`.
- `src/store/taskStore.js` — task state

### Styling conventions
- Tailwind v4: all theme tokens (colors, fonts, animations) defined in `@theme {}` inside `src/index.css`
- Custom animations (`slideUp`, `slideInLeft`, `slideInRight`, `checkTask`, `taskEnd`) are defined there as `--animate-*` variables + `@keyframes`
- `animation-fill-mode: both` is used on all animations to prevent flash during delay
- Arbitrary Tailwind values with `rgba()` must have no spaces: `rgba(0,0,0,0.08)` not `rgba(0, 0, 0, 0.08)`
- Token file `src/components/landing/tokens.js` exports `bgLanding`, `bgLanding2`, `btn` for use across landing components

### Deployment
- `vercel.json` rewrites all routes to `index.html` for client-side routing
- Root directory for Vercel must be set to `OneDrive/Desktop/Student Productivity Dashboard` (git root is above the project)
