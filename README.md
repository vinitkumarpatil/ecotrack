# EcoTrack

Smart Environmental Impact Tracker built for the GreenPulse technical interview.

## Project Overview
EcoTrack is a minimal, polished web application that allows users to record their daily eco-friendly and environmentally harmful activities. It converts these inputs into an understandable Environmental Impact Score, using real calculations instead of fake metrics.

## Tech Stack & Architecture Decisions
- **Frontend: React + TypeScript + Tailwind CSS**
- **Backend: FastAPI (Python) + SQLite + SQLAlchemy**

## Architecture Flow
The frontend handles UI state and presentation. The backend contains a centralized `calculator.py` service ensuring calculations aren't scattered across frontend components. It applies predefined factors (e.g., 0.2 kg CO2 avoided per km cycled) to user inputs.

## Database Schema
- **Users**: Core user profile details.
- **Activities**: Records of user activities (category, type, impact_value, etc).

## Calculation Methodology
All metrics displayed are derived from user entries. For example:
- **Cycling/Walking**: Calculated as CO2 avoided compared to average vehicle emissions.
- **Plastic/Recycling**: Calculated as kg of waste diverted from landfills.
- **Score Calculation**: A base score of 50 is adjusted based on the net positive/negative impacts of recent activities.

## Local Setup Instructions

### 1. Backend
```bash
cd backend
python -m venv venv
# Windows: .\venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to view the app.

## Production / Deployment Details
The application is structured to be instantly deployable to platforms like Render, Vercel, or Heroku.

### Environment Variables
- **Backend (`DATABASE_URL`)**: Provides the database connection string. If omitted, it defaults to a local SQLite database (`sqlite:///./ecotrack.db`).
- **Backend (`FRONTEND_URL`)**: Used for CORS. Example: `https://your-frontend-url.com`.
- **Frontend (`VITE_API_URL`)**: Used to point the frontend to the deployed backend URL.

### ⚠️ Important SQLite Persistence Limitation
The default configuration uses SQLite, which stores the database as a local `.db` file. When deployed to many free-tier hosting platforms (such as Render or Heroku), the filesystem is **ephemeral**. This means every time the server restarts or goes to sleep, **the database will be reset and all activities will be lost.**
To prevent data loss in a real production environment, you must attach a persistent PostgreSQL database and provide its connection string via the `DATABASE_URL` environment variable. The code natively supports this swap via SQLAlchemy.
