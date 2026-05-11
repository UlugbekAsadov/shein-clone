<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project rules

1. **Prefer shadcn/ui components and lucide-react icons** over custom implementations whenever an equivalent exists. Reach for `Button`, `Dialog`, `Select`, `Input`, etc. from `@/components/ui/*` and icons from `lucide-react` first.

2. **One component per `.tsx` file.** Never define two components in the same file — extract each into its own file.

3. **Only one component + one Props interface belong inside a component file.** Everything else (additional types/interfaces, mock data, constants, helpers) lives in a sibling `_utils/` folder organized by kind: `_utils/interfaces/`, `_utils/types/`, `_utils/mocks/`, `_utils/constants/`, etc. The pattern mirrors the existing `_components/` convention for page-scoped components.

4. **Do not write comments in code.** No `//` line comments, no `/* */` blocks, no JSDoc. Code must be self-documenting via clear names.

5. **No big components.** Decompose large components into smaller subcomponents in their own files and import them. If a component is getting long, split it.
