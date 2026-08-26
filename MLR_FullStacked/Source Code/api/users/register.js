import pg from 'pg';
const { Pool } = pg;

let pool;

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });
  }
  return pool;
}

let tableCreated = false;
async function ensureTable() {
  if (tableCreated) return;
  const db = getPool();
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      country VARCHAR(100),
      role VARCHAR(50) DEFAULT 'user'
    );
  `);
  tableCreated = true;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await ensureTable();
    const db = getPool();
    const { name, email, password, phone, country } = req.body;

    // Check if email already exists
    const check = await db.query('SELECT id FROM users WHERE email = $1', [email]);
    if (check.rows.length > 0) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    const newId = `user-${Date.now()}`;
    const result = await db.query(
      'INSERT INTO users (id, name, email, password, phone, country, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, name, email, phone, country, role',
      [newId, name, email, password, phone, country, 'user']
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ message: 'Server error during registration' });
  }
}
