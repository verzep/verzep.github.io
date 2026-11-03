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
- **Home page**: `index.html` (bio text) uses `_layouts/home.html`, which renders the hero, the News section (`_includes/news.html`, from `_data/news.yaml`, sorted by date) and the 6 latest posts.
- **Data-driven pages**: `publications.html`, `teaching.html` and the news list render from YAML in `_data/` (`publications.yaml`, `talks.yaml`, `courses.yaml`, `news.yaml`). To add a paper/talk/course/news item, edit the YAML rather than the HTML.
- **Nav** links are hardcoded in `_layouts/default.html` (Blog, Research, Publications, Teaching). `about.md` still exists but is not linked.
- **Styling**: `style.scss` (most of the redesign CSS) imports partials from `_sass/` (`_variables.scss` for colors/fonts).
- Site-wide config (name, avatar, social links, plugins, `exclude` list) is in `_config.yml`. New root-level files that should not be published (like this one) must be added to `exclude`.

## Gotchas

- Some posts are exported from Jupyter notebooks (e.g. `_drafts/TCN.md`). Raw nbconvert output has no YAML front matter (Jekyll will not render a post without it) and uses relative image paths that break under the `/:title/` permalink, so add the `---` front matter block and rewrite images to `{{ site.url }}/images/<date>/...`.
- `vino/` (personal Italian wine notes) and `R-BCM.html` (a large standalone exported notebook) are unrelated to the blog; leave them alone unless asked.
