# ReactBoilerplate App — React + TypeScript + Vite + Tailwind

A production-ready starter kit showcasing modern frontend architecture.

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| State | Redux Toolkit |
| Forms | React Hook Form + Zod |
| HTTP | Axios (with interceptors) |
| Icons | Lucide React |

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Create your .env file
cp .env.example .env

# 3. Start dev server
npm run dev
```

App opens at **http://localhost:3000**

---

## Project Structure

```
src/
├── assets/              # Static files (images, fonts)
├── components/
│   ├── ui/              # Reusable UI atoms: Button, Input, Card, Badge, Modal, Select
│   ├── layout/          # RootLayout, AuthLayout, Sidebar, Topbar
│   └── common/          # ProtectedRoute, PageLoader, ToastContainer
├── hooks/               # useAuth, useToast, useDebounce, useLocalStorage, useAppStore
├── pages/
│   ├── auth/            # LoginPage, RegisterPage
│   ├── dashboard/       # DashboardPage
│   ├── users/           # UsersPage
│   ├── settings/        # SettingsPage
│   └── NotFoundPage.tsx
├── router/              # createBrowserRouter config + ROUTES constants
├── services/            # apiClient (Axios), authService, userService
├── store/
│   └── slices/          # authSlice, uiSlice
├── styles/              # globals.css (Tailwind base + component layer)
├── types/               # auth.ts, user.ts, common.ts
└── utils/               # cn.ts, format.ts, validation.ts (Zod schemas)
```

---

## Path Aliases

All aliases are configured in both `vite.config.ts` and `tsconfig.json`:

```ts
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/router/routes'
```

---

## Key Features Demonstrated

### ✅ Authentication Flow
- JWT stored in `localStorage` via Redux `authSlice`
- `ProtectedRoute` redirects unauthenticated users, preserving `location.state.from`
- `AuthLayout` redirects already-authenticated users away from login/register

### ✅ Axios Interceptors
- Auto-attaches `Authorization: Bearer <token>` header
- Handles **token refresh** on 401 with queued retry of failed requests
- Dispatches `logout()` if refresh also fails

### ✅ Redux Toolkit
- `authSlice` — user, token, isAuthenticated, isLoading
- `uiSlice` — dark mode (persisted), sidebar open/close, toast queue

### ✅ Form Validation
- React Hook Form + Zod schemas in `src/utils/validation.ts`
- Schemas: `loginSchema`, `registerSchema`, `createUserSchema`

### ✅ Lazy Loading
- All page components are `lazy()` wrapped in the router
- `<Suspense>` with `<PageLoader />` fallback

### ✅ Dark Mode
- Tailwind `darkMode: 'class'` strategy
- Persisted in `localStorage`, applied via `document.classList`

---

## Available Scripts

```bash
npm run dev          # Start dev server (port 3000)
npm run build        # TypeScript check + Vite build
npm run preview      # Preview production build
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run format       # Prettier format
npm run type-check   # tsc --noEmit
```

---

## Environment Variables

```env
VITE_APP_NAME=ReactBoilerplate
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_API_TIMEOUT=10000
VITE_AUTH_TOKEN_KEY=auth_token
VITE_AUTH_REFRESH_KEY=refresh_token
```

---

## Extending the Project

**Add a new page:**
1. Create `src/pages/feature/FeaturePage.tsx`
2. Add the route constant in `src/router/routes.ts`
3. Add a lazy import + route in `src/router/index.tsx`
4. Add a nav item in `src/components/layout/Sidebar.tsx`

**Add a new API service:**
1. Create `src/services/featureService.ts` (see `userService.ts` as template)
2. Import and use in your page or custom hook

**Add a new Redux slice:**
1. Create `src/store/slices/featureSlice.ts`
2. Register it in `src/store/index.ts`
