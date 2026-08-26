import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// -------------------------------------------------------------
// DATABASE SETUP (PostgreSQL)
// -------------------------------------------------------------
const hasDB = !!process.env.DATABASE_URL;
let pool;

if (hasDB) {
  console.log('Connecting to PostgreSQL database...');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Required for Render DBs
  });

  // Initialize Tables
  pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      country VARCHAR(100),
      role VARCHAR(50) DEFAULT 'user'
    );
  `).catch(err => console.error("Error creating users table:", err));
} else {
  console.log('No DATABASE_URL provided. Running with in-memory mock DB.');
}

// Mock In-Memory Database (Fallback)
const memoryUsers = [];

// -------------------------------------------------------------
// API ENDPOINTS
// -------------------------------------------------------------

app.post('/api/users/register', async (req, res) => {
  const { name, email, password, phone, country } = req.body;
  const newId = `user-${Date.now()}`;
  const role = 'user';

  try {
    if (hasDB) {
      // Check if exists
      const check = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (check.rows.length > 0) return res.status(400).json({ message: 'Email is already registered.' });

      // Insert user
      const insert = await pool.query(
        'INSERT INTO users (id, name, email, password, phone, country, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, name, email, phone, country, role',
        [newId, name, email, password, phone, country, role]
      );
      return res.status(201).json(insert.rows[0]);
    } else {
      if (memoryUsers.find(u => u.email === email)) {
        return res.status(400).json({ message: 'Email is already registered.' });
      }
      const newUser = { id: newId, name, email, password, phone, country, role };
      memoryUsers.push(newUser);
      const { password: _, ...userSafe } = newUser;
      return res.status(201).json(userSafe);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    if (hasDB) {
      const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
      if (result.rows.length > 0) {
        const { password: _, ...userSafe } = result.rows[0];
        return res.status(200).json(userSafe);
      }
    } else {
      const user = memoryUsers.find(u => u.email === email && u.password === password);
      if (user) {
        const { password: _, ...userSafe } = user;
        return res.status(200).json(userSafe);
      }
    }
    
    return res.status(401).json({ message: 'Invalid email or password.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// -------------------------------------------------------------
// FRONTEND SERVING (For Render Deployment)
// -------------------------------------------------------------
// Serve the static files from the React app (dist folder)
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Backend API Server running on port ${PORT}`);
});
