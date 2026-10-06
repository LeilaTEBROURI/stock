import { Database } from "bun:sqlite";
import { existsSync } from "node:fs";

const databasePath = import.meta.env.DEV
  ? import.meta.env.BDD_SQLITE_PATH
  : process.env.BDD_SQLITE_PATH;

if (!databasePath) {
  throw new Error("BDD_SQLITE_PATH doit être défini dans le fichier .env.");
}

if (!existsSync(databasePath)) {
  throw new Error(`Base SQLite introuvable : ${databasePath}`);
}

const db = new Database(databasePath);
db.run("PRAGMA journal_mode = WAL");

export function getProducts() {
  return db.query(`
    SELECT
      id,
      reference,
      name,
      category,
      quantity,
      minimum_stock,
      unit_price,
      updated_at
    FROM products
    ORDER BY category, name
  `).all();
}

export function getStockStats() {
  return db.query(`
    SELECT
      COUNT(*) AS total_products,
      COALESCE(SUM(quantity), 0) AS total_units,
      COALESCE(SUM(quantity * unit_price), 0) AS stock_value,
      COALESCE(SUM(
        CASE WHEN quantity <= minimum_stock THEN 1 ELSE 0 END
      ), 0) AS low_stock
    FROM products
  `).get();
}
