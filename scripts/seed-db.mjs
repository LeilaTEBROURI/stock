import { Database } from "bun:sqlite";

const db = new Database(process.env.BDD_SQLITE_PATH);

db.run("DELETE FROM products");

const insert = db.prepare(`
  INSERT INTO products
    (reference, name, category, quantity, minimum_stock, unit_price)
  VALUES (?, ?, ?, ?, ?, ?)
`);

const products = [
  ["PC-001", "Ordinateur portable Pro 14", "Informatique", 24, 10, 899.00],
  ["PC-002", "Écran 27 pouces", "Informatique", 8, 12, 249.90],
  ["NET-001", "Routeur Wi-Fi 6", "Réseau", 31, 15, 129.00],
  ["NET-002", "Switch 24 ports", "Réseau", 14, 8, 189.00],
  ["ACC-001", "Clavier sans fil", "Accessoires", 52, 20, 39.90],
  ["ACC-002", "Souris ergonomique", "Accessoires", 17, 25, 34.90],
  ["CAB-001", "Câble Ethernet Cat 6", "Câblage", 120, 50, 7.50],
  ["CAB-002", "Câble HDMI 2.1", "Câblage", 43, 20, 18.90],
  ["SRV-001", "Serveur rack 1U", "Serveurs", 3, 5, 2190.00],
  ["SRV-002", "SSD 2 To", "Stockage", 19, 10, 159.00],
  ["STO-001", "NAS 4 baies", "Stockage", 6, 4, 599.00],
  ["IMP-001", "Imprimante laser", "Bureautique", 11, 6, 289.00]
];

const transaction = db.transaction(() => {
  for (const product of products) insert.run(...product);
});

transaction();
insert.finalize();
db.close();

console.log(`${products.length} produits insérés.`);
