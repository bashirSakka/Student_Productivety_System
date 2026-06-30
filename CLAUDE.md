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
- `/` → `Home` (public landing page, eagerly loaded)
- `/login`, `/register` → auth views (eagerly loaded)
- `/dashboard`, `/courses`, `/tasks`, `/calendar`, `/pomodoro`, `/gpa`, `/notes` → app views, lazy-loaded via `React.lazy`, each wrapped in `ProtectedRoute` → `GridSection`

All lazy routes share a single `<Suspense fallback={null}>` wrapper in `App.jsx`. The global Pomodoro tick (`setInterval`) also lives in `App.jsx`.

### Key layout
- `GridSection` composes `Navbar` + `Burger` + a page view into the app shell
- The landing page (`Home`) is fully independent — no app shell
- `ProtectedRoute` checks `useAuthStore` for a token; redirects to `/login` if absent

### Component directories
- `src/components/landing/` — landing page sections + `tokens.js` (`bgLanding`, `bgLanding2`, `btn`) used across landing components. Use `<Link>` from react-router-dom (not `<a href>`) for all internal navigation.
- `src/components/views/` — one file per route
- `src/components/ui/` — shared primitives (`Card`, `Button`, `Pill`, `Modal`, `FormInput`, `ConfirmModal`, `EmptyState`)
- `src/components/layout/` — shell components
- `src/components/pomodoro/` — `PomodoroWidget` (reads `count` from `useCounterStore`)

### API layer
- `src/lib/api.js` — axios instance with `baseURL: import.meta.env.VITE_API_URL` and a request interceptor that attaches `Authorization: Bearer <token>` from `useAuthStore.getState().token`
- `src/services/taskService.js` — CRUD helpers (`getAll`, `create`, `update`, `remove`) for the tasks API
- Backend URL is set via `VITE_API_URL` in `.env.local` (local) and in Vercel environment variables (production)

### State

**Auth** (`src/store/authStore.js`) — persisted to localStorage (`key: "auth"`). Holds `token`, `user`, `id`. Always read reactively: `useAuthStore(state => state.id)`, never `useAuthStore.getState()` inside components.

**Tasks** (`src/store/taskStore.js`) — non-persisted, single `{ tasks, setTasks }`. `Tasks.jsx` fetches from API and syncs via `useEffect(() => { setStoreTasks(tasks) }, [tasks])`. `Dashboard.jsx` reads from this store to derive due tasks — no extra fetch.

**GPA** (`src/store/gpaStore.js`) — holds `{ gpa, courses, setGpa, setCourses }`. `GPACalculator.jsx` writes computed GPA and course list after fetch; `Dashboard.jsx` reads both — no extra fetch.

**Pomodoro** (`src/store/pomodoroStore.js`) — `useCounterStore` holds `count`, `isActive`, `session`, `round`, `timers` (per-session durations), `completedSessions`. Key actions: `setSession(key)` resets count to that session's duration; `incrementTimer(key)` / `decrementTimer(key)` adjust per-setting durations and update live count if the active session matches; `tick()` auto-advances to the next session when count hits 0. `useWorkStore` holds the current task label shown in the widget.

### Styling conventions
- Tailwind v4: all theme tokens (colors, fonts, animations) defined in `@theme {}` inside `src/index.css`
- Custom animations (`slideUp`, `slideInLeft`, `slideInRight`, `checkTask`, `taskEnd`) defined as `--animate-*` variables + `@keyframes`
- `animation-fill-mode: both` on all animations to prevent flash during delay
- Arbitrary Tailwind values with `rgba()` must have no spaces: `rgba(0,0,0,0.08)` not `rgba(0, 0, 0, 0.08)`

### Skeleton loading pattern
Views use `isLoading` state (default `true`, set to `false` after fetch). While loading, render `Array.from({ length: N }).map((_, i) => <div key={i} className='... animate-pulse'>...)`. Guard `EmptyState` with `!isLoading` to prevent flash.

### Deployment
- `vercel.json` rewrites all routes to `index.html` for client-side routing
- Git root IS the project root — Vercel `rootDirectory` must be `null` (no subdirectory). If Vercel auto-deploys start serving stale code, check the project's `rootDirectory` setting via the Vercel API or dashboard.
- Production backend: `https://gitapirequests-production.up.railway.app` (set as `VITE_API_URL` in Vercel environment variables)
- Deploy via `npx vercel --prod --scope bashirsakkas-projects`
