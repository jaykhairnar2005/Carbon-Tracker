
# Carbon Footprint Tracker 🌱

A full-stack web application to track and visualize your daily carbon footprint. Built for the Hackathon.

## 🚀 Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Chart.js
- **Backend**: Node.js, Express, Prisma, PostgreSQL

## 📂 Project Structure

- `carbon-tracker/`
  - `frontend/`: React application
  - `backend/`: Express server and Database logic

## 🛠️ Setup & Run

### Prerequisites
- Node.js installed
- **IMPORTANT**: You need a running PostgreSQL database.
  - If you have Docker, run: `docker-compose up -d` in the root folder.
  - If not, ensure a local Postgres instance is running and update `backend/.env` with your credentials.

### 1. Backend Setup

```bash
cd backend
npm install

# Setup Database (Requires running Postgres)
npx prisma generate
npx prisma migrate dev --name init

# (Optional) Seed dummy data
npx prisma db seed

# Start Server
npm run dev
```

Server runs on: `http://localhost:3000`

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

## 🌟 Features

- **Dashboard**: View your total emission score and recent activities.
- **Add Activity**: Log Transport, Food, Electricity, and Shopping activities.
- **Reports**: Visualize emissions with interactive Charts.
- **Tips**: get eco-friendly tips.
- **Profile**: View your status and badges.

## ⚠️ Notes

- If the backend is not running or DB is not connected, the Frontend will use **Mock Data** so you can still demo the UI/UX.
