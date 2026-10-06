# Astro Stock SSR — Bun + SQLite

Application SSR AstroJS affichant l'état des produits en stock.

## Prérequis

- Bun installé
- Aucun Node.js requis
- Aucun npm requis

## Installation

```bash
bun install
bun run db:setup
bun run dev
```

Puis ouvrir l'URL affichée par Astro.

## Production

```bash
bun run build
bun run start
```

Le serveur de production utilise directement Bun pour exécuter `dist/server/entry.mjs`.

## Base SQLite

La base est créée dans :

```text
data/stock.sqlite
```

Elle contient la table `products` :

- `id`
- `reference`
- `name`
- `category`
- `quantity`
- `minimum_stock`
- `unit_price`
- `updated_at`

## Modifier les données

Modifier `scripts/seed-db.mjs`, puis :

```bash
bun run db:seed
```

Le script utilise SQLite natif de Bun : `bun:sqlite`.

Aucune dépendance SQLite externe n'est nécessaire.

## Architecture

```text
Navigateur
    |
    v
Astro SSR
    |
    +--> src/pages/index.astro
    |
    +--> src/lib/db.js
              |
              v
        bun:sqlite
              |
              v
       data/stock.sqlite
```

Les requêtes SQLite sont exécutées côté serveur et ne sont jamais exposées au navigateur.
