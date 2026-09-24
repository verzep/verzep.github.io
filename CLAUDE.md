# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal academic website + blog of Pietro Verzelli (computational neuroscience), served by GitHub Pages at https://verzep.github.io/. It is a Jekyll site forked from the Jekyll Now theme (via the md-weber template). There is no build pipeline, test suite, or linter: GitHub Pages builds the site on push to `main`.

## Local preview

No Gemfile is committed (`Gemfile`/`Gemfile.lock` are gitignored). The system `jekyll` is available:

```bash
jekyll serve            # http://localhost:4000, rebuilds on change
jekyll serve --drafts   # also render posts in _drafts/
jekyll build            # output to _site/ (gitignored)
```

Requires the `jekyll-sitemap` and `jekyll-feed` gems (declared in `_config.yml`). Note `_config.yml` changes are not picked up by `jekyll serve` without a restart.

## Structure

- **Blog posts**: `_posts/YYYY-MM-DD-Title.md`, front matter `layout: post`, `title`, `tags`, `category`. Permalinks are `/:title/` (date not in URL). The home page (`index.html`) lists all posts with their excerpt (first paragraph).
- **Drafts**: `_drafts/` (unpublished, no date in filename).
- **Post images**: `images/<YYYY-MM-DD>/...`, referenced as `{{site.url}}/images/<date>/file.png`, typically wrapped in `<figure>`/`<figcaption>`.
- **Math**: MathJax v2 is loaded site-wide in `_includes/script.html`; use `$...$` inline and `$$...$$` display, AMS equation numbering enabled. Footnotes use kramdown syntax (`[^1]`).
- **Data-driven pages**: `publications.html` and `teaching.html` render from YAML in `_data/` (`publications.yaml`, `talks.yaml`, `courses.yaml`). To add a paper/talk/course, edit the YAML (newest first) rather than the HTML.
- **Static pages**: `about.md`, `Research.md` (layout `page` with explicit `permalink`). Nav links are hardcoded in `_layouts/default.html`.
- **Styling**: `style.scss` imports partials from `_sass/` (`_variables.scss` for colors/fonts).
- Site-wide config (name, avatar, social links, Google Analytics ID) is in `_config.yml`.

## Gotchas

- Some posts are exported from Jupyter notebooks (e.g. `_drafts/TCN.md`, with images like `TCN_examples_26_0.png`). Raw nbconvert output has no YAML front matter (Jekyll will not render a post without it) and uses relative image paths that break under the `/:title/` permalink, so add the `---` front matter block and rewrite images to `{{site.url}}/images/<date>/...`.
- `vino/` (personal Italian wine notes) and `R-BCM.html` (a large standalone exported notebook) are unrelated to the blog; leave them alone unless asked.
