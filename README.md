# TravelEase

TravelEase is a starter MERN travel booking platform with role-based access for clients, admins, marketing, finance, and support.

## Structure

- `client/`: React + Vite frontend
- `server/`: Express + MongoDB backend

## Getting Started

1. Copy `.env.example` to `.env`.
2. Install dependencies:

```bash
cd server && npm install
cd ../client && npm install
```

3. Seed the admin user:

```bash
cd server && npm run seed:admin
```

Default seeded admin credentials:

- Email: `admin@travelease.com`
- Password: `Admin123!`

4. Start the apps:

```bash
cd server && npm run dev
cd ../client && npm run dev
```
