<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project rules

1. **Prefer shadcn/ui components and lucide-react icons** over custom implementations whenever an equivalent exists. Reach for `Button`, `Dialog`, `Select`, `Input`, etc. from `@/components/ui/*` and icons from `lucide-react` first.

2. **One component per `.tsx` file.** Never define two components in the same file — extract each into its own file.

3. **Do not write comments in code.** No `//` line comments, no `/* */` blocks, no JSDoc. Code must be self-documenting via clear names.

4. **No big components.** Decompose large components into smaller subcomponents in their own files and import them. If a component is getting long, split it.

5. **Group connected components into a single folder.** When components are tightly related (e.g. a parent and its subcomponents), put them together in a named folder. Example: `story/story-card.tsx`, `story/story-buttons.tsx`.

6. **Use `_lib/` for component-scoped non-component files.** Page-scoped or component-scoped types, mocks, constants, and helpers live in a sibling `_lib/` folder. The pattern mirrors `_components/` for page-scoped components.

7. **Files inside `_lib/` must be split by kind into sibling subfolders and include their kind in the filename.** Each kind lives in its own subfolder: `_lib/interface/*.interface.ts`, `_lib/mocks/*.mocks.ts`, `_lib/constants/*.constants.ts`, `_lib/helpers/*.helpers.ts`. Never mix kinds in one folder. Never place kind-files directly under `_lib/`.

8. **Shared components keep their interfaces, mocks, constants, and helpers in the shared `src/lib/` folder, split by kind into sibling subfolders.** Interfaces in `src/lib/interfaces/`, mocks in `src/lib/mock-data/`, constants in `src/lib/constants/`, helpers in `src/lib/helpers/`. Never mix kinds in one folder. Only page-scoped or strictly component-scoped artifacts belong in a local `_lib/`. Apply the same filename-by-kind convention (`*.interface.ts`, `*.constants.ts`, `*.mocks.ts`).

9. **Use `interface IProps` for component prop types.** Never `type Props = { … }`.

10. **All interfaces start with the `I` prefix.** Examples: `IProps`, `IProduct`, `IBrand`, `ICategory`.

11. **Do not write any `type` aliases.** Prefer `interface` declarations. For union/literal needs, inline them at the usage site instead of creating a `type` alias.
