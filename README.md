# BRAC Banking Micro-Frontend POC

## Handling Shared User Info UI

- **Separate MFE** — Use when user profile is a full-featured module (edit profile, settings, password change) owned by a dedicated team.
- **Shared component in `@brac/ui-library`** — Use when it's just a reusable widget (e.g. user info card) displayed across multiple MFEs. Simpler and avoids unnecessary overhead.


## How to Load One MFE Inside Another MFE

By default, only the app-shell (host) loads MFEs. But you can also load one MFE inside another. Here's how:

### 1. Add the remote in `vite.config.ts`

In the MFE that wants to consume another, add the remote in the `federation()` config:

```ts
// apps/onboarding-mfe/vite.config.ts
federation({
  name: "onboarding_mfe",
  filename: "remoteEntry.js",
  exposes: { "./App": "./src/App.tsx" },  // still a remote itself
  remotes: {                               // now also a host
    loan_mfe: {
      type: "module",
      name: "loan_mfe",
      entry: "http://localhost:3001/remoteEntry.js",
      entryGlobalName: "loan_mfe",
      shareScope: "default",
    },
  },
  shared: { react: { singleton: true }, ... },
})
```

### 2. Add TypeScript type declaration

Create `src/types/remote-apps.d.ts` in the consuming MFE:

```ts
declare module "loan_mfe/App" {
  const LoanApp: React.ComponentType;
  export default LoanApp;
}
```

This tells TypeScript the module exists (it's loaded at runtime via Module Federation, not from `node_modules`).

### 3. Use it with lazy loading

```tsx
const LoanApp = React.lazy(() => import("loan_mfe/App"));

<Suspense fallback={<div>Loading...</div>}>
  <LoanApp />
</Suspense>
```

### Important

- The remote MFE's dev server must be running (e.g. loan-mfe on `:3001`)
- Keep `singleton: true` for shared libs (react, zustand) to avoid duplicate instances

A Banking Micro-Frontend Application built with React, Vite Module Federation, pnpm workspace monorepo, TailwindCSS, and Zustand.

## Architecture

```
                    +------------------+
                    |    App Shell     |
                    |   (Host :3000)   |
                    +--------+---------+
                             |
              +--------------+--------------+
              |                             |
    +---------v----------+    +-------------v--------+
    |    Loan MFE        |    |   Onboarding MFE     |
    |  (Remote :3001)    |    |   (Remote :3002)      |
    +--------------------+    +----------------------+
              |                             |
    +---------v-----------------------------v--------+
    |             Shared Packages                    |
    |   @brac/ui-library     @brac/store             |
    +------------------------------------------------+
```

## Project Structure

```
apps/
  app-shell/         # Host application (port 3000)
  loan-mfe/          # Loan micro-frontend (port 3001)
  onboarding-mfe/    # Onboarding micro-frontend (port 3002)
packages/
  ui-library/        # Shared UI component library
  store/             # Shared Zustand state management
```

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Module Federation**: @module-federation/vite
- **Styling**: TailwindCSS v4
- **State Management**: Zustand (shared across MFEs)
- **Monorepo**: pnpm workspace

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 9

### Installation

```bash
pnpm install
```

### Development

Start all applications simultaneously:

```bash
pnpm dev
```

Or start individually:

```bash
pnpm dev:shell        # App Shell on http://localhost:3000
pnpm dev:loan         # Loan MFE on http://localhost:3001
pnpm dev:onboarding   # Onboarding MFE on http://localhost:3002
```

### Build

```bash
pnpm build
```

## Features

- **App Shell**: Navigation, layout, dashboard, lazy-loaded MFEs
- **Onboarding MFE**: 4-step wizard (Personal Info + NID + Liveness, Address, Income, Review)
- **Loan MFE**: 3-step wizard (Product Selection, Personal Info, Summary)
- **Shared UI Library**: Button, Input, Card, Stepper, FileUploader, CameraPreview, Loader
- **Global State**: Zustand stores shared across all micro-frontends


## Troubleshooting: UI/CSS Issues

If Tailwind CSS classes from remote MFEs or the shared UI library are not being applied, you need to add `@source` directives so that Tailwind scans those files for class names.

Add the following lines to `apps/app-shell/src/index.css`:

```css
@source "../../../packages/ui-library/src/**/*.{ts,tsx}";
@source "../../../apps/loan-mfe/src/**/*.{ts,tsx,json}";
@source "../../../apps/onboarding-mfe/src/**/*.{ts,tsx}";
```

This ensures the App Shell's Tailwind build includes all utility classes used across the monorepo.

## Troubleshooting: Zustand Store Issues

### Store not sharing state across MFEs

In a micro-frontend setup, each MFE may bundle its own copy of the store module, resulting in separate store instances and broken shared state. To solve this, stores use a **singleton pattern via `globalThis`**:

```ts
const STORE_KEY = "__BRAC_USER_PROFILE_STORE__";

function createUserProfileStore(): UserProfileBoundStore {
  const globalStore = globalThis as unknown as Record<string, UserProfileBoundStore>;

  // Return existing instance if already created by another MFE
  if (globalStore[STORE_KEY]) return globalStore[STORE_KEY];

  const store = create<UserProfileStore>((set) => ({ ... }));

  // Stash on globalThis so all MFEs share the same instance
  globalStore[STORE_KEY] = store;
  return store;
}
```

If state is not syncing between MFEs, verify that:
1. Each store uses a unique `globalThis` key (e.g., `__BRAC_USER_PROFILE_STORE__`)
2. The store factory function checks `globalThis` before creating a new instance
3. All MFEs import from the same `@brac/store` package

### TypeScript `getState()` error on store

When calling `useMyStore.getState()`, you may see:

```
Property 'getState' does not exist on type ...
Each member of the union type has signatures, but none are compatible with each other.
```

This happens because the store factory function has two return paths (cached from `globalThis` vs. newly created), and TypeScript infers a **union type** instead of a single type.

**Fix:** Add an explicit return type using `UseBoundStore<StoreApi<...>>`:

```ts
import { create, type StoreApi, type UseBoundStore } from "zustand";

type MyBoundStore = UseBoundStore<StoreApi<MyStore>>;

function createMyStore(): MyBoundStore {
  const globalStore = globalThis as unknown as Record<string, MyBoundStore>;
  if (globalStore[STORE_KEY]) return globalStore[STORE_KEY];

  const store = create<MyStore>((set) => ({ ... }));
  globalStore[STORE_KEY] = store;
  return store;
}
```

This ensures both return paths resolve to the same type, and `.getState()` works correctly.
