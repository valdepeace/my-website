# CLAUDE.md

This project's agent context lives in [`AGENTS.md`](./AGENTS.md) — read it
first. It covers the tech stack, the actual `package.json` commands, repo
structure, and the blog post conventions (EN/ES pairing, frontmatter shape,
tags/authors reuse).

Quick summary:

- Personal Docusaurus 3 site (blog + About/Projects pages) for Andrés
  Carmona Gil, bilingual EN/ES, deployed to GitHub Pages at
  `valdepeace.com`.
- `npm start` / `npm run build` / `npm run typecheck` are the commands that
  exist — there is no lint or test script, don't invent one.
- Every English post in `blog/` needs a matching Spanish post in
  `i18n/es/docusaurus-plugin-content-blog/` with the same filename/date and
  translated title/description.

Keep this file and `AGENTS.md` in sync — if repo conventions change, update
both rather than letting them drift apart.
