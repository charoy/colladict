# Contributing to Colladict

Colladict accepts editorial and technical contributions, but editorial proposals enter the project through GitHub issues first.

## Two contribution paths

1. Open a dedicated issue form to propose a new entry, correction, governance question or translation.
2. The editorial team may then open or request a pull request when the proposal is ready to be integrated.

## Adding an entry

Create a Markdown file in `content/entries/` by following the structure in `archetypes/entry.md`.

If the entry is multilingual, add a paired translation file such as `term.fr.md` or `term.de.md`.

Each entry should include at least:

- a title;
- a short definition;
- a critical discussion;
- a small bibliography;
- links to adjacent concepts.

## Running the site locally

```bash
hugo server
```

## Editorial line

The dictionary adopts a critical and argued perspective. Contributions should be sourced when they introduce factual claims, and explicit about their analytical angle when they interpret a concept. Governance and workflow questions should use the dedicated `governance.yml` issue form.
