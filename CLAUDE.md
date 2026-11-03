# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal academic website + blog of Pietro Verzelli (computational neuroscience), served by GitHub Pages at https://verzep.github.io/. It is a Jekyll site originally forked from the Jekyll Now theme, since redesigned (hero/news/card layout). There is no build pipeline, test suite, or linter: GitHub Pages builds the site on push to `main`.

The site is also edited from other machines and the GitHub web UI, so always fetch/rebase before committing. The `origin` remote is HTTPS (no credentials here); push over SSH with `git push git@github.com:verzep/verzep.github.io.git main`.

## Local preview

The `Gemfile` uses the `github-pages` gem (Jekyll 3.10 and the same plugins, Sass and Rouge versions as the live build), so a local build matches what Pages serves. Full steps are in `README.md`. In short, install once (`bundle config set --local path vendor/bundle && bundle install`, both gitignored) and use:

```bash
LANG=C.UTF-8 bundle exec jekyll serve            # http://localhost:4000, rebuilds on change
LANG=C.UTF-8 bundle exec jekyll serve --drafts   # also render posts in _drafts/
```

A UTF-8 locale is required (the Sass step aborts under `LANG=C`). `_config.yml` changes need a server restart. Do not use the system Jekyll 4: it renders some pages and code highlighting differently from Pages.

## Structure

- **Blog posts**: `_posts/YYYY-MM-DD-Title.md`, front matter `layout: post`, `title`, `tags`, `category`. Permalinks are `/:title/` (date not in URL). Post cards (home page, `/Blog/`, "More Posts" under each post) show the first paragraph as the excerpt, truncated to 30 words, so posts should open with a prose paragraph rather than code.
- **Drafts**: `_drafts/` (unpublished, no date in filename).
- **Post images**: `images/<YYYY-MM-DD>/...`, referenced as `{{ site.url }}/images/<date>/file.png`.
- **Math**: MathJax 2.7.9 (cdnjs, `_includes/script.html`) is loaded only on posts whose rendered content contains math (`$`, or the `\(`/`\[` kramdown makes from `$$`) and on pages with `math: true` in front matter (`math: false` turns it off; see `_layouts/default.html`); use `$...$` inline and `$$...$$` display, AMS equation numbering enabled. Footnotes use kramdown syntax (`[^1]`).
- **Home page**: `index.html` (short bio as content, `statement:` front matter = one-sentence research statement) uses `_layouts/home.html`: hero (photo, name, `site.description`, `site.affiliation`, statement, link row from `_includes/profile-links.html`), bio, "Current work" cards, News (`_includes/news.html`, from `_data/news.yaml`, sorted by date), the 4 latest posts.
- **Current work cards**: `_data/projects.yaml` (title, text, optional `image` + `image_alt` + `image_credit`, `icon` used when there is no image, optional `link`), rendered by `_includes/projects.html` on the home page and at the top of `Research.md`. Card images live in `images/research/` (white-background schematics, shown in a 16:9 box).
- **Data-driven pages**: `publications.html`, `teaching.html` and the news list render from YAML in `_data/` (`publications.yaml`, `preprints.yaml`, `talks.yaml`, `courses.yaml`, `news.yaml`). To add a paper/talk/course/news item, edit the YAML rather than the HTML. Each paper or preprint is rendered by `_includes/pub-entry.html` (bolds "P. Verzelli", strips a trailing period from the title, one Code · Preprint · DOI row); publications are grouped by `year`; the "Preprints and in preparation" section shows `status` instead of venue and is hidden when `preprints.yaml` is empty. Author marks: † co-first, * co-corresponding.
- **Nav** links are hardcoded in `_layouts/default.html` (Blog, Research, Publications, Teaching; active state by `page.url`). `about.md` still exists but is not linked. There is deliberately no CV link (the site is the CV).
- **Profiles**: `profiles:` in `_config.yml` (google_scholar, orcid, github, linkedin, bluesky) feeds the home link row and the footer icons (`_includes/social-links.html`); an empty key hides its link. Icons are inline SVG in `_includes/icon.html` (`{% include icon.html name="github" px="22" %}`; do not call the size parameter `size`, `include.size` is the number of include arguments).
- **Per-page scripts**: list them in front matter (`scripts: [/assets/js/x.js]`); the default layout loads them with `defer`. `assets/js/lorenz-demo.js` (interactive Lorenz demo, vanilla JS + canvas) is used by the Butterfly Effect post through a `<div data-lorenz>`.
- **Social preview**: jekyll-seo-tag uses `page.image`; the default (`defaults` in `_config.yml`) is `images/og-card.jpg`, a 1200x630 card made from `images/propic.jpg`. Posts with a lead figure set `image:` in their front matter.
- **Styling**: `style.scss` (most of the redesign CSS) imports partials from `_sass/`. Colors are CSS custom properties on `:root` at the top of `style.scss` (`--bg`, `--surface`, `--text`, `--muted`, `--accent` teal, `--accent-2` coral, `--link`, code colors, ...); dark mode (`prefers-color-scheme: dark`) only redefines them in the `dark-tokens` mixin. Use `var(--...)` in new rules; the Sass names in `_sass/_variables.scss` are aliases to them, so no Sass color functions (lighten, rgba($x)) on those.
- Site-wide config (name, avatar, social links, plugins, `exclude` list) is in `_config.yml`. New root-level files that should not be published (like this one) must be added to `exclude`.

## Gotchas

- Some posts are exported from Jupyter notebooks (e.g. `_drafts/TCN.md`). Raw nbconvert output has no YAML front matter (Jekyll will not render a post without it) and uses relative image paths that break under the `/:title/` permalink, so add the `---` front matter block and rewrite images to `{{ site.url }}/images/<date>/...`.
- `vino/` (personal Italian wine notes) and `R-BCM.html` (a ~5.8 MB standalone NetLogo Web export of a BCM model, no front matter, not linked from anywhere) are unrelated to the blog; leave them alone unless asked. Both are kept out of the sitemap by `defaults` in `_config.yml` (`sitemap: false`).
- SEO/meta tags come from `jekyll-seo-tag` (`{% seo title=false %}` in `_includes/meta.html`; the `<title>` is built in `_layouts/default.html`). The email link is `_includes/email.html` (assembled by JS so the address is not in the HTML; keep `<` and `&` out of that script, kramdown escapes them in `.md` pages).
- Licenses: code/theme MIT (`LICENSE`), content CC BY 4.0 (`LICENSE-content`), stated in the footer too.
