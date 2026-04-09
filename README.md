# Colladict

Colladict is a critical dictionary of CSCW, published as a multilingual Hugo site on GitHub Pages.

## What this repository includes

- a custom Hugo site with no external theme;
- multilingual content with English as the default language, French as a secondary language and German prepared as a third track;
- entry files in `content/entries/`;
- method and contribution pages;
- GitHub issue and pull request templates;
- a GitHub Actions workflow for deployment to GitHub Pages.

## Run locally

```bash
hugo server
```

## Editorial organization

Published concepts live in `content/entries/`. Each concept can exist in paired language files such as `cscw.md` and `cscw.fr.md`.

## Contribution policy

Contributions happen primarily through dedicated GitHub issue forms.

- `new-entry.yml` for proposing new entries;
- `correction.yml` for corrections and debates;
- `governance.yml` for editorial governance and workflow questions;
- `translation.yml` for new language tracks and translation requests.

The editorial team can then open pull requests based on accepted issues.
