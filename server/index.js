import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize SQLite database
const dbDir = join(__dirname, 'db');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir);
}
const dbPath = join(dbDir, 'bakery.sqlite');
const db = new sqlite3.Database(dbPath);

// Create table if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      cakeSize TEXT NOT NULL,
      flavor TEXT NOT NULL,
      specifications TEXT,
      totalPrice TEXT,
      paymentMethod TEXT,
      status TEXT DEFAULT 'Pending',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// Admin Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    res.json({ success: true, token: 'fake-jwt-token-123' });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
});

// GET all orders
app.get('/api/orders', (req, res) => {
  db.all('SELECT * FROM orders ORDER BY createdAt DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// POST a new order
app.post('/api/orders', (req, res) => {
  const { name, email, cakeSize, flavor, specifications, totalPrice, paymentMethod } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const query = `INSERT INTO orders (name, email, cakeSize, flavor, specifications, totalPrice, paymentMethod) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.run(query, [name, email, cakeSize, flavor, specifications, totalPrice, paymentMethod], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, message: 'Order created successfully' });
  });
});

// PATCH to update order status
app.patch('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  db.run(`UPDATE orders SET status = ? WHERE id = ?`, [status, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order updated successfully' });
  });
});

// --- Production Deployment Configuration ---
// Serve static frontend files from the dist directory
const distPath = join(__dirname, '../dist');
app.use(express.static(distPath));

// Fallback for React Router (must be after API routes)
app.get('*', (req, res) => {
  res.sendFile(join(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
