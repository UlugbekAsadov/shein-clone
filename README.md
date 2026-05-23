This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## New here? Read the developer guide first

Before writing any code, read [docs/CODE_RULES.md](./docs/CODE_RULES.md). It covers the project's folder layout, naming conventions, and the 16 rules every PR is expected to follow, with do/don't examples.

The short machine-readable version of the same rules is in [AGENTS.md](./AGENTS.md).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The home page's JSX lives in [`src/features/home/pages/home.page.tsx`](./src/features/home/pages/home.page.tsx); the `src/app/[lang]/page.tsx` file is just a thin Next.js shell that validates the locale and renders it. To edit any route, find the matching `*.page.tsx` under `src/features/.../pages/`.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
