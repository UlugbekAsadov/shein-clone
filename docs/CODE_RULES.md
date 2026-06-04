# Code Rules & Developer Guide

Welcome. This document is the source of truth for how we write, organize, and name code in this project. Read it once end-to-end before writing your first PR.

The short version (machine-readable) lives in [AGENTS.md](../AGENTS.md). This file is the **long version with examples and rationale** for humans.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [How `pages/` works](#how-pages-works)
5. [The Rules](#the-rules)
6. [How-To Guides](#how-to-guides)
7. [Naming Cheatsheet](#naming-cheatsheet)
8. [FAQ](#faq)

---

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # eslint
npx tsc --noEmit   # type-check
```

Before touching code:

- Skim this whole document.
- Skim [AGENTS.md](../AGENTS.md) — that is the canonical rule list.
- Look at how a real feature is laid out (e.g. `src/features/profile/`) to see the rules in practice.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4 + `tw-animate-css`
- **UI primitives**: shadcn/ui (Radix under the hood) — under `src/shared/components/ui/`
- **Icons**: `@solar-icons/react` (prefer); `lucide-react` (fallback)
- **State / data**: TanStack Query
- **Package manager**: npm
- **i18n**: locale-prefixed routes (`/uz`, `/ru`, `/en`)

---

## Project Structure

```
src/
├── app/
│   ├── globals.css
│   └── [lang]/                              # locale-prefixed routes
│       ├── layout.tsx
│       ├── page.tsx                         # thin shell → @/features/home/pages/home.page
│       ├── cart/page.tsx                    # thin shell → @/features/cart/pages/cart.page
│       ├── product/[slug]/page.tsx          # thin shell → @/features/product/pages/[slug]/pages/product.page
│       └── ...                              # one Next.js page.tsx per route, each a thin shell
│
├── features/                                # Vertical-slice feature modules (CORE)
│   ├── auth/                                # No routes — supporting feature (dialog-based login)
│   │   ├── login/{components,utils}/
│   │   ├── api/  hooks/  providers/  services/  utils/
│   │
│   ├── home/                                # Single root route /
│   │   ├── components/  hooks/  utils/
│   │   └── pages/home.page.tsx
│   │
│   ├── category/                            # /category and /category/[slug]
│   │   ├── components/  mocks/  utils/
│   │   └── pages/
│   │       ├── category.page.tsx
│   │       └── [slug]/
│   │           ├── components/  mocks/
│   │           └── pages/category-slug.page.tsx
│   │
│   ├── product/                             # Deep nesting: /product/[slug]/comments/gallery
│   │   └── pages/[slug]/
│   │       ├── components/  mocks/  utils/
│   │       └── pages/
│   │           ├── product.page.tsx
│   │           └── comments/
│   │               ├── components/  mocks/  utils/
│   │               └── pages/
│   │                   ├── comments.page.tsx
│   │                   └── gallery/
│   │                       ├── components/  mocks/  utils/
│   │                       └── pages/gallery.page.tsx
│   │
│   ├── profile/
│   │   ├── components/                      # Profile root page components (profile-mobile, profile-sidebar, ...)
│   │   ├── mocks/  utils/
│   │   └── pages/
│   │       ├── profile.page.tsx
│   │       ├── account/                     # /profile/account
│   │       │   ├── components/  mocks/  utils/
│   │       │   └── pages/account.page.tsx
│   │       ├── addresses/                   # /profile/addresses + nested routes
│   │       │   ├── api/  services/  components/  mocks/  utils/
│   │       │   └── pages/
│   │       │       ├── addresses.page.tsx
│   │       │       ├── new/pages/
│   │       │       │   ├── new-address.page.tsx
│   │       │       │   └── map/pages/new-address-map.page.tsx
│   │       │       └── [id]/pages/edit/pages/
│   │       │           ├── edit-address.page.tsx
│   │       │           └── map/pages/edit-address-map.page.tsx
│   │       └── ...                          # chat, language, measurements, payments, promocode, wishlist, ...
│   │
│   └── ...
│
├── shared/                                  # Cross-feature reusable code
│   ├── components/
│   │   ├── ui/                              # shadcn primitives (do not hand-edit)
│   │   ├── header/  footer/                 # Layout
│   │   ├── product/  category/  listing/    # Shared domain components
│   │   ├── mobile-bottom-nav/
│   │   ├── page-placeholder/
│   │   └── icons/                           # Project-specific icons
│   ├── hooks/
│   ├── constants/
│   ├── mocks/
│   └── utils/
│
├── core/                                    # App-level wiring
│   ├── providers/                           # Providers (QueryClient, user, auth dialog, ...)
│   ├── config/                              # App config; i18n config + dictionaries
│   ├── middleware/  guards/                 # (created on demand)
│
├── lib/                                     # Low-level utilities
│   └── utils.ts                             # cn(), etc.
│
├── types/                                   # Global cross-app TypeScript interfaces
│   └── *.interface.ts
│
└── proxy.ts                                 # Next.js middleware
```

### What folder does what

| Folder                            | Holds                                           | Notes                                                           |
| --------------------------------- | ----------------------------------------------- | --------------------------------------------------------------- |
| `app/[lang]/.../page.tsx`         | Thin Next.js shells                             | Locale check → dict → render `<XxxPage />` from features.       |
| `features/<x>/pages/<x>.page.tsx` | The page's actual JSX                           | Composes Header/Footer, layout, data wiring.                    |
| `features/<x>/components/`        | Feature-root-scoped or cross-subpage components | Page-only components live closer to their page (see Rule 10).   |
| `features/<x>/api/`               | HTTP client + endpoint constants                | One file per concern: `address.api.ts`, `address.endpoints.ts`. |
| `features/<x>/services/`          | Server actions and data-fetching wrappers       | `address.service.ts`, `address.actions.ts`.                     |
| `features/<x>/hooks/`             | React hooks                                     | `use-foo.ts`.                                                   |
| `features/<x>/providers/`         | React context providers                         | `user-provider.tsx`.                                            |
| `features/<x>/utils/`             | Interfaces, constants, enums, validators        | One file per concern, kind suffix in name (see Rule 11).        |
| `features/<x>/mocks/`             | Mock data                                       | `*.mocks.ts`.                                                   |
| `shared/components/ui/`           | shadcn primitives                               | Generated by shadcn CLI. Don't hand-edit.                       |
| `shared/components/<family>/`     | Shared, cross-feature components                | One folder per component family.                                |
| `types/*.interface.ts`            | Global, cross-app interfaces                    | E.g. `IProduct` used by many features.                          |

---

## How `pages/` works

The `pages/` folder mirrors the URL structure. **The rule is recursive and applies at every depth.**

- A page's entry component lives at `pages/<name>.page.tsx`.
- A sub-page lives inside that same `pages/` folder, as its own folder containing its own `pages/`, `components/`, `utils/`, etc.
- Dynamic route segments (`[slug]`, `[id]`) are folder names just like static segments.

Walked one level at a time, the path `/profile/addresses/[id]/edit/map` resolves to:

```
features/profile/
  pages/
    addresses/
      pages/
        [id]/
          pages/
            edit/
              pages/
                map/
                  pages/
                    edit-address-map.page.tsx
```

Every "sahifa ichidagi sahifa" (page inside a page) sits in its parent's `pages/`. There is no depth limit.

A feature without a route (used only as a supporting library — e.g. `auth/`) has no `pages/` folder.

A feature with a root route (e.g. `/category`) has `pages/<feature>.page.tsx`. Sub-routes nest as folders inside that same `pages/`.

---

## The Rules

These are numbered the same way as in [AGENTS.md](../AGENTS.md). Examples show the **wrong** way (do not write) and the **right** way (do write).

### Rule 1 — Prefer shadcn/ui + @solar-icons/react

Before writing anything custom, check whether shadcn already has it: `Button`, `Dialog`, `Select`, `Input`, `Avatar`, `Badge`, `DropdownMenu`, `ScrollArea`, `Separator`. For icons, prefer `@solar-icons/react` (fall back to `lucide-react` only if there's no equivalent).

**Wrong**

```tsx
<button className="rounded bg-foreground px-4 py-2 text-background">
  Buy now
</button>
```

**Right**

```tsx
import { Button } from "@/shared/components/ui/button";
import { Cart3 } from "@solar-icons/react";

<Button>
  <Cart3 className="size-4" />
  Buy now
</Button>;
```

If shadcn doesn't have what you need, ask in the team chat before rolling your own.

---

### Rule 2 — One component per `.tsx` file

A `.tsx` file exports exactly one React component.

**Wrong** (`footer.tsx`)

```tsx
export function Footer() {
  /* ... */
}
function FeatureItem() {
  /* ... */
}
function FooterColumn() {
  /* ... */
}
```

**Right** — split into siblings:

```
footer/
├── footer.tsx
├── feature-items/
│   └── feature-item.tsx
└── footer-column.tsx
```

---

### Rule 3 — No comments in code

No `//`, no `/* */`, no JSDoc. If you feel the urge to comment, rename the variable, extract a helper, or split the function.

**Wrong**

```tsx
// Calculate sold count from reviews
const soldCount = product.reviews * 5 + 123;
```

**Right** — let the name carry the meaning:

```tsx
const soldCount = product.reviews * 5 + 123;
```

If a piece of code is genuinely surprising, write a clearer abstraction — don't paper over it with a comment.

---

### Rule 4 — No big components

If a component is getting long (rule of thumb: > 150 lines, or two distinct "areas"), split it. Look at `features/shop/pages/[slug]/pages/shop.page.tsx` and how it delegates to `ShopMobilePage`, `ShopProfile`, `ShopContent`, etc.

---

### Rule 5 — Vertical-slice features

Each `features/<x>/` owns its components, hooks, services, API, providers, mocks, and utils. Treat it as a mini-app. Don't reach into another feature's internals via relative paths.

**Wrong**

```ts
import { addressApi } from "../../../profile/pages/addresses/api/address.api";
```

**Right**

```ts
import { addressApi } from "@/features/profile/pages/addresses/api/address.api";
```

---

### Rule 6 — Dependency direction: components → hooks → services → API

Never invert. A service may call the API client. A hook may call a service. A component may call a hook. Don't make services call components, etc.

---

### Rule 7 — Group connected components into one folder

When components only make sense together, give them a folder. The folder name is the parent component's name in kebab-case.

**Wrong** — flat siblings:

```
components/
├── story-viewer.tsx
├── story-card.tsx
├── progress-bar.tsx
└── hero-carousel.tsx
```

**Right** — grouped:

```
components/
├── stories/
│   ├── story-viewer/
│   │   ├── story-viewer.tsx
│   │   ├── story-card.tsx
│   │   └── progress-bar.tsx
│   └── story-item/
│       ├── story-item.tsx
│       └── story-ring.tsx
└── hero-carousel.tsx
```

---

### Rule 8 — `app/` pages are thin shells

Every `app/[lang]/.../page.tsx` does these and only these:

1. Awaits `params` / `searchParams`.
2. Validates the locale with `hasLocale()`.
3. Calls `getDictionary(lang)` if the page needs it.
4. Renders the `<XxxPage />` imported from a feature.

**Right**

```tsx
import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { AccountPage } from "@/features/profile/pages/account/pages/account.page";

export default async function Page({
  params,
}: PageProps<"/[lang]/demo/profile/account">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <AccountPage lang={lang} dict={dict} />;
}
```

JSX, layout (Header/Footer), data fetching, and composition all live in the feature page component — not in `app/`.

---

### Rule 9 — Sub-pages live inside their parent's `pages/` folder

Never put a sub-route folder at the feature root next to `components/`. The `pages/` folder is recursive and can nest infinitely (see "How `pages/` works").

**Wrong**

```
features/profile/
├── components/
├── account/            ← subpage at feature root, mixed with components
│   └── pages/account.page.tsx
└── addresses/          ← same problem
    └── pages/addresses.page.tsx
```

**Right**

```
features/profile/
├── components/         ← only profile root page components
└── pages/
    ├── profile.page.tsx
    ├── account/        ← subpage, inside pages/
    │   └── pages/account.page.tsx
    └── addresses/
        └── pages/addresses.page.tsx
```

---

### Rule 10 — Page-scoped components live next to the page

A component used by exactly one page goes inside that page's own folder. A component shared across multiple sub-pages moves up to the nearest common ancestor's `components/`.

**Wrong** — `account-mobile` parked at the profile root even though only `/profile/account` uses it:

```
features/profile/
├── components/account-mobile/         ← wrong place
└── pages/account/pages/account.page.tsx
```

**Right**

```
features/profile/
└── pages/account/
    ├── components/account-mobile/     ← lives with its only consumer
    └── pages/account.page.tsx
```

But the `ProfileShell` (used by every profile sub-page's desktop view) belongs at `features/profile/components/profile-shell.tsx`.

---

### Rule 11 — File naming

| Kind        | Location                     | Filename                 | Example                |
| ----------- | ---------------------------- | ------------------------ | ---------------------- |
| Page entry  | inside a `pages/` folder     | `<name>.page.tsx`        | `account.page.tsx`     |
| Interface   | inside a `utils/` folder     | `<concern>.interface.ts` | `address.interface.ts` |
| Constants   | inside a `utils/` folder     | `<concern>.constants.ts` | `login.constants.ts`   |
| Enum        | inside a `utils/` folder     | `<concern>.enum.ts`      | `order-status.enum.ts` |
| Validator   | inside a `utils/` folder     | `<concern>.validator.ts` | `address.validator.ts` |
| Mock        | inside a `mocks/` folder     | `<concern>.mocks.ts`     | `card.mocks.ts`        |
| API client  | inside an `api/` folder      | `<concern>.api.ts`       | `address.api.ts`       |
| Endpoints   | inside an `api/` folder      | `<concern>.endpoints.ts` | `address.endpoints.ts` |
| Service     | inside a `services/` folder  | `<concern>.service.ts`   | `address.service.ts`   |
| Server act. | inside a `services/` folder  | `<concern>.actions.ts`   | `address.actions.ts`   |
| Hook        | inside a `hooks/` folder     | `use-<name>.ts`          | `use-auth-dialog.ts`   |
| Provider    | inside a `providers/` folder | `<name>-provider.tsx`    | `user-provider.tsx`    |

The kind suffix makes greps and imports unambiguous.

---

### Rule 12 — Feature-scoped interfaces/constants/enums/validators live in `utils/`

Per feature (or per sub-page, when scoped tighter). Never create a single `types.ts` or grouped `constants.ts` at any feature root.

**Wrong**

```
features/profile/pages/addresses/
└── types.ts          ← bundles every interface
```

**Right**

```
features/profile/pages/addresses/utils/
└── address.interface.ts
```

Cross-app interfaces live in `src/types/` with the same `*.interface.ts` filename convention.

---

### Rule 13 — Feature-scoped mocks live in `mocks/`

Per feature (or per sub-page) with `*.mocks.ts` filenames. Cross-feature mocks live in `src/shared/mocks/`.

---

### Rule 14 — Use `interface IProps` for component prop types

**Wrong**

```tsx
type Props = {
  product: IProduct;
};

export function ProductCard({ product }: Props) { ... }
```

**Right**

```tsx
interface IProps {
  product: IProduct;
}

export function ProductCard({ product }: IProps) { ... }
```

---

### Rule 15 — All interfaces start with `I`

`IProps`, `IProduct`, `IBrand`, `ICategory`, `IShop`, `IDictionary`, etc.

**Wrong**

```ts
export interface Brand {
  id: string;
  name: string;
}
```

**Right**

```ts
export interface IBrand {
  id: string;
  name: string;
}
```

---

### Rule 16 — No `type` aliases

Use `interface` for everything. For unions or derived types, inline them at the usage site.

**Wrong**

```ts
export type Tone = "rose" | "emerald" | "blue" | "amber";

interface IProps {
  tone: Tone;
}
```

**Right** — inline at the prop site:

```ts
export const filterChipTones = {
  rose: "...",
  emerald: "...",
  blue: "...",
  amber: "...",
} as const;

interface IProps {
  tone: keyof typeof filterChipTones;
}
```

**Wrong** — type alias for a derived shape:

```ts
export type Dictionary = Awaited<ReturnType<typeof dictionaries.en>>;
```

**Right** — interface extends the derived type:

```ts
export interface IDictionary extends Awaited<
  ReturnType<typeof dictionaries.en>
> {}
```

**Wrong** — type alias for a locale union:

```ts
export type Locale = (typeof locales)[number];
function hasLocale(v: string): v is Locale { ... }
```

**Right** — inline the derived expression:

```ts
function hasLocale(v: string): v is (typeof locales)[number] { ... }
```

---

## How-To Guides

### Add a new route

Say you want a new route `/profile/security`.

1. Create the feature page component:

   ```
   src/features/profile/pages/security/
   ├── components/         (optional, if needed)
   ├── utils/              (optional, if needed)
   └── pages/
       └── security.page.tsx
   ```

   ```tsx
   // security.page.tsx
   import type { locales } from "@/core/config/i18n/i18n-config";
   import type { IDictionary } from "@/core/config/i18n/dictionaries";

   interface IProps {
     lang: (typeof locales)[number];
     dict: IDictionary;
   }

   export function SecurityPage({ lang, dict }: IProps) {
     return <main className="flex-1">...</main>;
   }
   ```

2. Add the Next.js route shell at `src/app/[lang]/profile/security/page.tsx`:

   ```tsx
   import { notFound } from "next/navigation";
   import { hasLocale } from "@/core/config/i18n/i18n-config";
   import { getDictionary } from "@/core/config/i18n/dictionaries";
   import { SecurityPage } from "@/features/profile/pages/security/pages/security.page";

   export default async function Page({
     params,
   }: PageProps<"/[lang]/demo/profile/security">) {
     const { lang } = await params;
     if (!hasLocale(lang)) notFound();
     const dict = await getDictionary(lang);
     return <SecurityPage lang={lang} dict={dict} />;
   }
   ```

### Add a sub-route under an existing page

For `/profile/security/two-factor`, nest inside the existing `pages/`:

```
src/features/profile/pages/security/pages/two-factor/
├── components/        (optional)
└── pages/
    └── two-factor.page.tsx
```

And add `src/app/[lang]/profile/security/two-factor/page.tsx` as a thin shell.

### Add a page-scoped component

Used by exactly one page → lives inside that page's folder:

```
features/profile/pages/security/components/
└── security-panel.tsx
```

Import as `@/features/profile/pages/security/components/security-panel`.

### Add a cross-page shared component

Used by multiple sub-pages of one feature → moves to the parent feature's `components/`:

```
features/profile/components/security-banner.tsx
```

Used by multiple features → moves to `src/shared/components/<family>/`:

```
shared/components/security/security-banner.tsx
```

### Add a new interface

Feature-scoped → `features/<x>/utils/<concern>.interface.ts` (or `features/<x>/.../utils/` if scoped tighter):

```ts
export interface IOrder {
  id: string;
  total: number;
  items: IOrderItem[];
}

export interface IOrderItem {
  productId: string;
  qty: number;
}
```

Import: `import type { IOrder } from "@/features/orders/utils/order.interface";`.

Cross-app → `src/types/<concern>.interface.ts`.

### Add new mock data

`features/<x>/mocks/<concern>.mocks.ts`:

```ts
import type { IOrder } from "@/features/orders/utils/order.interface";

export const orderMocks: IOrder[] = [
  /* ... */
];
```

Import: `import { orderMocks } from "@/features/orders/mocks/order.mocks";`.

Cross-feature mocks → `src/shared/mocks/`.

### Add new constants

`features/<x>/utils/<concern>.constants.ts`:

```ts
export const CODE_LENGTH = 6;
export const PHONE_DIGIT_COUNT = 12;
```

Cross-feature constants → `src/shared/constants/`.

### Where do I put X?

| Question                                     | Answer                                                 |
| -------------------------------------------- | ------------------------------------------------------ |
| It's the JSX for a route                     | `features/<x>/.../pages/<name>.page.tsx`               |
| It's a component used by one page            | `features/<x>/.../<page>/components/`                  |
| It's a component used by multiple sub-pages  | `features/<x>/components/` (nearest common ancestor)   |
| It's a component reused across features      | `shared/components/<family>/`                          |
| It's an interface for feature data           | `features/<x>/utils/<concern>.interface.ts`            |
| It's an interface for one component's props  | inside that component file (`interface IProps`)        |
| It's a global cross-app interface            | `src/types/<concern>.interface.ts`                     |
| It's a feature-scoped constant               | `features/<x>/utils/<concern>.constants.ts`            |
| It's a cross-feature constant                | `src/shared/constants/`                                |
| It's mock data                               | `features/<x>/mocks/` or `src/shared/mocks/`           |
| It's an API call                             | `features/<x>/api/<concern>.api.ts`                    |
| It's a server action / data-fetching wrapper | `features/<x>/services/<concern>.{service,actions}.ts` |
| It's a React hook used by one feature        | `features/<x>/hooks/use-<name>.ts`                     |
| It's a React hook used across features       | `src/shared/hooks/`                                    |
| It's a React context provider                | `features/<x>/providers/<name>-provider.tsx`           |
| It's a small generic utility (`cn`, etc.)    | `src/lib/`                                             |

---

## Naming Cheatsheet

| Thing            | Convention                                                     | Example                          |
| ---------------- | -------------------------------------------------------------- | -------------------------------- |
| Page entry       | `<name>.page.tsx` inside `pages/`                              | `account.page.tsx`               |
| Component file   | `kebab-case.tsx`                                               | `product-card.tsx`               |
| Interface file   | `<concern>.interface.ts` inside `utils/`                       | `product-detail.interface.ts`    |
| Constants file   | `<concern>.constants.ts` inside `utils/`                       | `login.constants.ts`             |
| Mock file        | `<concern>.mocks.ts` inside `mocks/`                           | `product-detail.mocks.ts`        |
| API file         | `<concern>.api.ts` inside `api/`                               | `address.api.ts`                 |
| Service file     | `<concern>.service.ts` inside `services/`                      | `address.service.ts`             |
| Hook file        | `use-<name>.ts` inside `hooks/`                                | `use-auth-dialog.ts`             |
| Folder           | `kebab-case/`                                                  | `product-preview/`               |
| Component name   | `PascalCase`                                                   | `ProductCard`                    |
| Interface name   | `IPascalCase`                                                  | `IProduct`, `IProps`             |
| Constant name    | `SCREAMING_SNAKE` for primitives; `camelCase` for object/array | `CODE_LENGTH`, `filterChipTones` |
| Hook name        | `camelCase` starting with `use`                                | `useAuthDialog`                  |
| Tailwind classes | as-is                                                          | `text-sm font-semibold`          |

---

## FAQ

**Q: Can I name a prop interface something other than `IProps`?**
A: No. Use `IProps` inside the component file. If you genuinely need to export it (rare), name the exported version after the component, e.g. `IProductCardProps`.

**Q: What about types that can't be expressed as interfaces (unions, conditional types)?**
A: Inline them at the usage site. If a union shows up in three or more places, define a `const` map (see `filterChipTones`) and derive `keyof typeof …` inline.

**Q: I added a tiny helper. Where does it go?**
A: If it's used in one component, put it next to that component (or its `utils/` if it's named). If it's used across a whole feature, put it in `features/<x>/utils/`. If it's used across features, `src/lib/`.

**Q: Can I leave `// TODO:` comments?**
A: No. Track TODOs in the issue tracker or PR description, not in code.

**Q: I think a rule is wrong for my case. What do I do?**
A: Open an issue (or raise it in the PR). Don't quietly bend the rule. Consistency beats local optimums.

**Q: Where do I edit shadcn primitives?**
A: Usually you don't. If you need to change behavior, wrap the primitive in `shared/components/` instead of editing `shared/components/ui/`.

**Q: Why no `type` aliases?**
A: Consistency. With one rule ("interfaces only"), everyone knows where to look. `interface` extends, declaration-merges, and reads predictably across the codebase.

**Q: Why is `pages/` recursive instead of one flat folder per route?**
A: Each route owns the components, mocks, and utils that only it uses — co-located with the page. Shared things move up to the nearest common ancestor. The recursive shape makes "where does X live?" answerable without grepping: walk the URL.

**Q: The bracketed folders (`[slug]`, `[id]`) — do imports work with them?**
A: Yes. Brackets are valid in import paths and TypeScript module resolution. Example: `@/features/product/pages/[slug]/pages/comments/pages/comments.page`. Be aware that shell globs treat brackets as character classes, so wrap such paths in quotes.

**Q: Where are the rules enforced?**
A: TypeScript + ESLint catch some; PR review catches the rest. If you see a violation in `main`, fix it in a small follow-up PR.

---

## Reference

- Canonical rule list: [AGENTS.md](../AGENTS.md)
- A simple feature (single route): [src/features/home/](../src/features/home/)
- A feature with one dynamic sub-route: [src/features/shop/](../src/features/shop/)
- A feature with deep nesting: [src/features/product/](../src/features/product/)
- A feature with many sub-pages: [src/features/profile/](../src/features/profile/)
- A non-route supporting feature: [src/features/auth/](../src/features/auth/)
- Shared components: [src/shared/components/](../src/shared/components/)
