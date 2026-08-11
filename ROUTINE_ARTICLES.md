Discover the site's conventions and publish one new high-quality article autonomously, then push to main.

1. Run `git checkout main && git pull origin main`. If package.json exists and node_modules is absent, run `npm install`.
2. Determine the build command: check package.json for a "build" script; if absent, detect the generator (Hugo → `hugo`, Jekyll → `bundle exec jekyll build`, Astro/Gatsby/Next → corresponding script).
3. Locate the articles folder by finding the directory with the most .md/.mdx files (common paths: content/, src/content/, posts/, _posts/, blog/, src/pages/blog/). In this repository the articles live in `src/blog/articles.tsx` (TypeScript data, not Markdown) — follow that file's format instead.
4. Read 2–3 existing articles to learn the exact format: frontmatter structure, heading hierarchy, tone, length, and any custom fields.
5. Infer the site's niche and topic from existing content.
6. Write one new article matching the discovered format exactly. Ensure it is high-quality, well-researched, and on-brand.
7. Run the build command to verify no errors.
8. Commit with a clear message (e.g., "Add article: [title]") and push to main.

If the site structure is unclear or build fails, stop and report the issue.
Always push directly to the main branch.

── 4. VALIDATION (bloquant, économe en tokens) ──
- Vérifie le frontmatter et les liens internes.
- Lance le build SANS ingérer les logs :
    npm run build > /tmp/build.log 2>&1 && echo "BUILD_OK" || (echo "BUILD_FAIL"; tail -n 30 /tmp/build.log)
  Ne lis le log QUE si "BUILD_FAIL". Ne pousse jamais un build cassé.
