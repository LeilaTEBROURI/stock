import { mkdir } from "node:fs/promises";
import { Database } from "bun:sqlite";

await mkdir("./data", { recursive: true });

const db = new Database("./data/stock.sqlite");

db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reference TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    minimum_stock INTEGER NOT NULL DEFAULT 0,
    unit_price REAL NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

db.run(`
  CREATE INDEX IF NOT EXISTS idx_products_category
  ON products(category)
`);

db.run(`
  CREATE INDEX IF NOT EXISTS idx_products_quantity
  ON products(quantity)
`);

db.close();

console.log("Base SQLite initialisée : data/stock.sqlite");
