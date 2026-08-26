import pg from 'pg';
const { Pool } = pg;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (!process.env.DATABASE_URL) {
    return res.status(500).json({ 
      error: 'DATABASE_URL environment variable is not set in Vercel!' 
    });
  }

  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });

    // Create users table
    await pool.query(`
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

    // Seed system accounts
    const systemAccounts = [
      { id: 'admin', name: 'System Admin', email: 'admin@specialist.cook', password: 'AdminSpecalist4321', role: 'admin' },
      { id: 'manager', name: 'General Manager', email: 'manager@cleaned.food', password: 'ManagerMaintaner0098', role: 'manager' },
      { id: 'staff', name: 'Support Staff', email: 'staff@workers.team', password: 'Staff-Worker8754', role: 'staff' }
    ];

    for (const acc of systemAccounts) {
      await pool.query(
        `INSERT INTO users (id, name, email, password, role) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (email) DO NOTHING`,
        [acc.id, acc.name, acc.email, acc.password, acc.role]
      );
    }

    // Verify
    const result = await pool.query('SELECT id, name, email, role FROM users');

    await pool.end();

    return res.status(200).json({
      success: true,
      message: 'Database initialized successfully!',
      tables_created: ['users'],
      accounts_seeded: result.rows.length,
      users: result.rows
    });
  } catch (err) {
    console.error('Setup error:', err);
    return res.status(500).json({ 
      error: err.message,
      hint: 'Make sure your DATABASE_URL is correct in Vercel Environment Variables'
    });
  }
}
