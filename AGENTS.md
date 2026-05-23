<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Folder structure

```
src/
├── app/                                    # Next.js App Router (thin shells only)
│   └── [lang]/...                          # Locale segment; each page.tsx validates lang/dict,
│                                           # then renders <XxxPage /> from features/
│
├── features/                               # Vertical-slice feature modules (CORE)
│   ├── <feature>/
│   │   ├── components/                     # Components scoped to the feature root page
│   │   │                                   # (or shared across all its sub-pages)
│   │   ├── api/                            # API client + endpoints
│   │   ├── services/                       # Server actions, data-fetching wrappers
│   │   ├── hooks/                          # React hooks
│   │   ├── providers/                      # React context providers
│   │   ├── mocks/                          # *.mocks.ts
│   │   ├── utils/                          # *.interface.ts, *.constants.ts, *.enum.ts, *.validator.ts
│   │   └── pages/                          # Routing-mirror folder (recursive)
│   │       ├── <feature>.page.tsx          # Root page component (e.g. profile.page.tsx)
│   │       └── <sub-route>/                # A sub-page is a folder. Can nest infinitely.
│   │           ├── components/             # Sub-page-scoped components
│   │           ├── mocks/  utils/  ...     # Sub-page-scoped (only when needed)
│   │           └── pages/                  # Same recursive pattern
│   │               ├── <sub-route>.page.tsx
│   │               └── <deeper-sub-route>/...
│
├── shared/                                 # Cross-feature reusable code
│   ├── components/
│   │   ├── ui/                             # shadcn primitives
│   │   ├── header/  footer/                # Layout
│   │   └── product/  category/  listing/   # Shared domain components
│   ├── hooks/
│   ├── constants/
│   ├── mocks/
│   └── utils/
│
├── core/                                   # App-level wiring
│   ├── providers/                          # Providers, query client, etc.
│   ├── config/                             # App config; i18n config + dictionaries
│   ├── middleware/
│   └── guards/
│
├── services/                               # Global services (rare)
├── lib/                                    # Low-level utilities (e.g. cn)
├── types/                                  # Global cross-app TypeScript types (*.interface.ts)
├── styles/
└── tests/
```

`core/middleware/`, `core/guards/`, `services/`, `styles/`, `tests/`, and the per-feature `hooks/`, `services/`, `api/`, `providers/`, `mocks/`, `utils/` subfolders are created on demand — only when they have real content. Do not pre-create empty placeholders.

## How `pages/` works

The `pages/` folder mirrors the URL structure. The rule is recursive and applies at every depth:

- The page's entry component lives at `pages/<name>.page.tsx`.
- A sub-page lives inside that same `pages/` folder, as its own folder containing its own `pages/`, `components/`, `utils/`, etc.
- Dynamic route segments (`[slug]`, `[id]`) are folder names just like static segments.

Example (from `/profile/addresses/[id]/edit/map`):

```
features/profile/pages/addresses/pages/[id]/pages/edit/pages/map/pages/edit-address-map.page.tsx
```

A feature without a route (used only as a supporting library — e.g. `auth/`) has no `pages/` folder.

A feature with a root route (e.g. `/category`) has `pages/<feature>.page.tsx`. Sub-routes nest as folders inside that same `pages/`.

# Project rules

1. **Prefer shadcn/ui components and @solar-icons/react icons** over custom implementations whenever an equivalent exists. Reach for `Button`, `Dialog`, `Select`, `Input`, etc. from `@/shared/components/ui/*` and icons from `@solar-icons/react` first.

2. **One component per `.tsx` file.** Never define two components in the same file — extract each into its own file.

3. **Do not write comments in code.** No `//` line comments, no `/* */` blocks, no JSDoc. Code must be self-documenting via clear names.

4. **No big components.** Decompose large components into smaller subcomponents in their own files and import them. If a component is getting long, split it.

5. **Vertical-slice features.** Each feature is self-contained — it owns its components, hooks, services, API calls, providers, mocks, and utils. Think of features as mini-apps inside the app.

6. **Dependency direction inside a feature:** components → hooks → services → API. Never invert.

7. **Group connected components into a single folder.** When components are tightly related (e.g. a parent and its subcomponents), put them together in a named folder. Example: `features/home/components/stories/story-viewer/story-viewer.tsx`, `features/home/components/stories/story-viewer/story-card.tsx`.

8. **`app/` pages are thin shells.** Each `app/[lang]/.../page.tsx` only:
   - Validates the locale (`hasLocale`),
   - Awaits `params` / `searchParams`,
   - Calls `getDictionary(lang)`,
   - Renders the corresponding `<XxxPage />` imported from `features/.../pages/<name>.page.tsx`.

   Page composition, layout (Header/Footer), data wiring, and JSX all live in the feature page component, not the app shell.

9. **Sub-pages live inside their parent's `pages/` folder.** Never put a sub-route folder at the feature root next to `components/`. The `pages/` folder is recursive and can nest to any depth (see "How `pages/` works" above).

10. **Page-scoped components live next to the page.** Components used by exactly one page belong inside that page's own folder (`features/.../pages/<route>/components/`). Components shared across multiple sub-pages move up to the nearest common ancestor's `components/` folder.

11. **File naming conventions.**
    - Page entry: `<name>.page.tsx` (lives inside `pages/`)
    - Interfaces: `<concern>.interface.ts` (lives inside `utils/`)
    - Constants: `<concern>.constants.ts` (lives inside `utils/`)
    - Enums: `<concern>.enum.ts` (lives inside `utils/`)
    - Validators: `<concern>.validator.ts` (lives inside `utils/`)
    - Mocks: `<concern>.mocks.ts` (lives inside `mocks/`)

12. **Feature-scoped interfaces/constants/enums/validators live in `features/<feature>/utils/`** (or in the appropriate sub-page's `utils/` if scoped tighter). Never create a single `types.ts` or grouped `constants.ts` at the feature root. Cross-app/global interfaces live in `src/types/` with the same `*.interface.ts` filename convention.

13. **Feature-scoped mocks live in `features/<feature>/mocks/`** (or in the appropriate sub-page's `mocks/`) with `*.mocks.ts` filenames. Cross-feature mocks live in `src/shared/mocks/`.

14. **Use `interface IProps` for component prop types.** Never `type Props = { … }`.

15. **All interfaces start with the `I` prefix.** Examples: `IProps`, `IProduct`, `IBrand`, `ICategory`.

16. **Do not write any `type` aliases.** Prefer `interface` declarations. For union/literal needs, inline them at the usage site instead of creating a `type` alias.

# Import conventions

- Use the `@/*` alias (mapped to `./src/*`) for absolute imports across `features/`, `shared/`, `core/`, `lib/`, and `types/`.
- Relative imports (`./`, `../`) are only acceptable for sibling files within the same folder.
- Never reach into another feature's internals via relative paths — go through the feature's public surface using `@/features/<other-feature>/...`.
- Dynamic-segment folders keep their brackets in import paths: `@/features/product/pages/[slug]/pages/comments/pages/comments.page`.
