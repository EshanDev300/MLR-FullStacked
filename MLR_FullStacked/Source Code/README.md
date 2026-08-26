# CookSmart Web Portal

A full-stack culinary web application built with React, Vite, Tailwind CSS, and Node.js/Express with PostgreSQL.

## Local Development

```bash
npm install
npm run dev        # Frontend on http://localhost:5173
node server.js     # Backend on http://localhost:5000
```

## Deployment on Render

### Build Command
```
npm install && npm run build
```

### Start Command
```
npm start
```

### Environment Variables
| Key | Value |
|-----|-------|
| `DATABASE_URL` | Your Render PostgreSQL Internal URL |
| `NODE_ENV` | `production` |
