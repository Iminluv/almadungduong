# 🚫 File Exclusion Matrix

The following categories of files are explicitly omitted from structural UML models because they define build configuration, static assets, tooling scripts, or test runners rather than core production execution logic.

| Category | Target Files & Directories | Technical Rationale for Exclusion |
| :--- | :--- | :--- |
| **Tooling & Build Configs** | `package.json`, `tsconfig.json`, `next.config.ts`, `prisma.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `prettier.config.js`, `commitlint.config.js` | Meta-configuration files governing bundlers, linters, and compilers. They define development rules, not runtime execution architecture. |
| **Testing Suite & Mocks** | `vitest.config.ts`, `src/__tests__/setup.ts`, `src/__tests__/email.test.ts`, `src/__tests__/loyalty.test.tsx` | Verification fixtures used during testing runs. They validate system behavior but are not active components in production execution. |
| **One-Off Scripts & Data Seeders** | `scratch/*`, `prisma/seed.ts`, `prisma/set_admin.ts`, `prisma/sync_custom.ts`, `prisma/extract_reviews.py`, `prisma/products_seed_data.ts`, `prisma/reviews_seed_data.ts`, `test-prisma.ts` | Utilities executed on-demand for DB initialization or debugging. They do not maintain persistent application state or handle production user requests. |
| **Static Media & Documentation** | `public/*` (`file.svg`, `globe.svg`, `robots.txt`, images), `documentation/*`, `.github/*`, `.husky/*` | Static media assets, markdown specifications, git hook triggers, and CI/CD workflow templates. |
