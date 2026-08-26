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

// Auto-create table on first call
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
  
  // Seed system accounts if they don't exist
  const systemAccounts = [
    { id: 'admin', name: 'System Admin', email: 'admin@specialist.cook', password: 'AdminSpecalist4321', role: 'admin' },
    { id: 'manager', name: 'General Manager', email: 'manager@cleaned.food', password: 'ManagerMaintaner0098', role: 'manager' },
    { id: 'staff', name: 'Support Staff', email: 'staff@workers.team', password: 'Staff-Worker8754', role: 'staff' }
  ];

  for (const acc of systemAccounts) {
    await db.query(
      `INSERT INTO users (id, name, email, password, role) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (email) DO NOTHING`,
      [acc.id, acc.name, acc.email, acc.password, acc.role]
    );
  }

  tableCreated = true;
}

export default async function handler(req, res) {
  // CORS headers
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
    const { email, password } = req.body;

    const result = await db.query(
      'SELECT id, name, email, phone, country, role FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length > 0) {
      return res.status(200).json(result.rows[0]);
    }

    return res.status(401).json({ message: 'Invalid email or password.' });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error during login' });
  }
}
