import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Mock In-Memory Database
const users = [
  {
    id: 'admin',
    name: 'System Admin',
    email: 'admin@specialist.cook',
    password: 'AdminSpecalist4321',
    role: 'admin'
  },
  {
    id: 'manager',
    name: 'General Manager',
    email: 'manager@cleaned.food',
    password: 'ManagerMaintaner0098',
    role: 'manager'
  },
  {
    id: 'staff',
    name: 'Support Staff',
    email: 'staff@workers.team',
    password: 'Staff-Worker8754',
    role: 'staff'
  }
];

app.post('/api/users/register', (req, res) => {
  const { name, email, password, phone, country } = req.body;
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'Email is already registered.' });
  }

  const newUser = { 
    id: `user-${Date.now()}`, 
    name, 
    email, 
    password, 
    phone, 
    country, 
    role: 'user' 
  };
  
  users.push(newUser);
  // Send back user without password
  const { password: _, ...userSafe } = newUser;
  res.status(201).json(userSafe);
});

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    const { password: _, ...userSafe } = user;
    return res.status(200).json(userSafe);
  }
  
  return res.status(401).json({ message: 'Invalid email or password.' });
});

app.listen(PORT, () => {
  console.log(`Backend API Server running on http://localhost:${PORT}`);
});
