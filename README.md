# Colladict

Colladict est un dictionnaire critique du CSCW, conçu comme un site statique Hugo publiable sur GitHub Pages.

## Ce que contient ce dépôt

- un site Hugo minimal sans thème externe;
- une structure d'entrées dans `content/entries/`;
- des pages de méthode et de contribution;
- des templates GitHub pour issues et pull requests;
- un workflow GitHub Actions pour déployer sur GitHub Pages.

## Lancer le site

```bash
hugo server
```

## Personnaliser le dépôt

Les URLs sont préconfigurées pour une publication dans `charoy/colladict`. Si le dépôt change de nom ou d'organisation, mettre à jour `hugo.toml` et `.github/ISSUE_TEMPLATE/config.yml`.

## Organisation éditoriale

Les notions publiées vivent dans `content/entries/`. Chaque fichier est une entrée, relue et discutée via GitHub.
