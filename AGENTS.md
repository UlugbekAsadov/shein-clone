<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Folder structure

```
src/
├── app/                         # Next.js App Router (pages only)
│   └── [lang]/...               # Locale segment; pages are thin shells importing from features/
│
├── features/                    # Vertical-slice feature modules (CORE)
│   ├── home/
│   ├── product/                 # incl. comments and gallery as nested component folders
│   ├── category/
│   └── <feature>/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── api/
│       ├── store/
│       ├── constants/
│       ├── mocks/
│       └── interfaces/          # *.interface.ts files, one per concern
│
├── shared/                      # Cross-feature reusable code
│   ├── components/              # shadcn ui/, layout (header, footer), and shared domain components
│   │   ├── ui/                  # shadcn primitives
│   │   ├── header/
│   │   ├── footer/
│   │   ├── product/
│   │   ├── category/
│   │   └── listing/
│   ├── hooks/
│   ├── constants/
│   ├── mocks/
│   └── utils/
│
├── core/                        # App-level wiring
│   ├── providers/               # Providers, query client, etc.
│   ├── config/                  # App config; i18n config + dictionaries
│   ├── middleware/
│   └── guards/
│
├── services/                    # Global services (rare)
├── lib/                         # Low-level utilities (e.g. cn)
├── types/                       # Global cross-app TypeScript types
├── styles/
└── tests/
```

`core/middleware/`, `core/guards/`, `services/`, `styles/`, `tests/`, and the per-feature `hooks/`, `services/`, `api/`, `store/` subfolders are created on demand — only when they have real content. Do not pre-create empty placeholders.

# Project rules

1. **Prefer shadcn/ui components and @solar-icons/react icons** over custom implementations whenever an equivalent exists. Reach for `Button`, `Dialog`, `Select`, `Input`, etc. from `@/shared/components/ui/*` and icons from `@solar-icons/react` first.

2. **One component per `.tsx` file.** Never define two components in the same file — extract each into its own file.

3. **Do not write comments in code.** No `//` line comments, no `/* */` blocks, no JSDoc. Code must be self-documenting via clear names.

4. **No big components.** Decompose large components into smaller subcomponents in their own files and import them. If a component is getting long, split it.

5. **Vertical-slice features.** Each feature is self-contained — it owns its components, hooks, services, API calls, state, mocks, constants, and types. Think of features as mini-apps inside the app.

6. **Dependency direction inside a feature:** components → hooks → services → API. Never invert.

7. **Group connected components into a single folder.** When components are tightly related (e.g. a parent and its subcomponents), put them together in a named folder. Example: `features/home/components/brand-story-viewer/brand-story-viewer.tsx`, `features/home/components/brand-story-viewer/story-card.tsx`.

8. **Feature-scoped interfaces live in `features/<feature>/interfaces/`** with one `*.interface.ts` file per concern (e.g. `product-detail.interface.ts`, `review.interface.ts`). Never create a single `types.ts` at the feature root. Cross-app/global interfaces live in `src/types/` with the same `*.interface.ts` filename convention.

9. **Feature-scoped mocks live in `features/<feature>/mocks/`** with `*.mocks.ts` filenames. Cross-feature mocks live in `src/shared/mocks/`.

10. **Feature-scoped constants live in `features/<feature>/constants/`** with `*.constants.ts` filenames. Cross-feature constants live in `src/shared/constants/`.

11. **`app/` pages are thin shells.** They import from `features/<x>/` (and `shared/`, `core/`). Page-scoped components do **not** live under `app/` — they live in the corresponding feature module.

12. **Use `interface IProps` for component prop types.** Never `type Props = { … }`.

13. **All interfaces start with the `I` prefix.** Examples: `IProps`, `IProduct`, `IBrand`, `ICategory`.

14. **Do not write any `type` aliases.** Prefer `interface` declarations. For union/literal needs, inline them at the usage site instead of creating a `type` alias.

# Import conventions

- Use the `@/*` alias (mapped to `./src/*`) for absolute imports across `features/`, `shared/`, `core/`, `lib/`, and `types/`.
- Relative imports (`./`, `../`) are only acceptable for sibling files within the same folder.
- Never reach into another feature's internals via relative paths — go through the feature's public surface using `@/features/<other-feature>/...`.
