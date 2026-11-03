Personal website and blog of Pietro Verzelli, served by GitHub Pages at <https://verzep.github.io/>.
The layout started from [this template](https://github.com/md-weber/md-weber.github.io) (Jekyll Now) and has since been redesigned.

## Local preview

GitHub Pages builds the site itself on every push to `main` (no Actions workflow). The `Gemfile` uses the
[`github-pages`](https://github.com/github/pages-gem) gem, so a local build uses the same Jekyll (3.10), plugins
and Sass/Rouge versions as the live site.

Requirements: Ruby 3.x (Pages uses 3.3) and Bundler. Then, once:

```bash
bundle config set --local path vendor/bundle   # keep gems inside the repo folder (gitignored)
bundle install
```

and to preview:

```bash
LANG=C.UTF-8 bundle exec jekyll serve            # http://localhost:4000, rebuilds on change
LANG=C.UTF-8 bundle exec jekyll serve --drafts   # also render posts in _drafts/
```

`LANG=C.UTF-8` (or any UTF-8 locale) is needed: with a non-UTF-8 locale the Sass step aborts with
`Invalid US-ASCII character`. Changes to `_config.yml` need a server restart.

To follow a new Pages release: `bundle update github-pages`.

## License

- Code and theme (layouts, includes, styles, configuration): MIT, see [LICENSE](LICENSE)
  (original Jekyll Now theme by Barry Clark, modifications by Pietro Verzelli).
- Content (posts, pages, images): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), see
  [LICENSE-content](LICENSE-content).
