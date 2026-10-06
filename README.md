# EcoTrack – Smart Environmental Impact Tracker

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-2ea44f?style=for-the-badge&logo=github)](https://vinitkumarpatil.github.io/ecotrack/)
[![React](https://img.shields.io/badge/Frontend-React%20%7C%20TypeScript-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Language-Python%203.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![SQLite](https://img.shields.io/badge/Database-SQLite%20%7C%20SQLAlchemy-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org/)

EcoTrack is a modern, full-stack web application designed to help individuals record their everyday eco-friendly and carbon-intensive habits. By applying a centralized calculation engine, EcoTrack converts daily choices into actionable environmental insights—including an Environmental Score, estimated net CO2 impact, waste diversion stats, eco-streaks, and personalized recommendations.

---

## 🌐 Live Demo

Official live application:

**Live Demo:** [https://vinitkumarpatil.github.io/ecotrack/](https://vinitkumarpatil.github.io/ecotrack/)

---

## 📖 Project Overview

Understanding one's day-to-day ecological footprint can be challenging when metrics are fragmented or based on arbitrary placeholder numbers. EcoTrack addresses this by anchoring every dashboard metric in genuine activity logs and clearly structured conversion factors.

EcoTrack enables users to log and monitor activities across multiple lifestyle categories:
- **Transport:** Walking, cycling, public transit, private car trips, and motorcycle usage.
- **Energy:** Household electricity consumption.
- **Water:** Daily water usage.
- **Waste Management:** Plastic avoided, recycled materials, and general landfill waste.
- **Eco Actions:** Tree planting initiatives, reusable water bottle usage, and reusable bag usage.

---

## ✨ Key Features

- **Environmental Score (0–100):** A normalized, deterministic score that evaluates net positive versus negative habits over time.
- **Estimated CO2 Impact:** Tracks net carbon avoided versus emitted across transportation, electricity, and conservation.
- **Waste Diverted & Reduced:** Measures physical waste kept out of landfills through recycling and single-use plastic reduction.
- **Eco Streak Counter:** Tracks consistency by counting active days with positive environmental habits.
- **Interactive Analytics:** Visualizes environmental impact progression over time using Recharts.
- **Data-Driven Insights:** Generates dynamic, context-aware feedback derived from logged habits.
- **Personalized Recommendations:** Delivers targeted next-best actions to reinforce sustainable lifestyles.
- **Instant Impact Preview:** Real-time impact calculations prior to saving activities.
- **Comprehensive History:** Searchable activity history table with instant deletion and date formatting.
- **Centralized Calculation Engine:** Transparent conversion factors maintained in a single backend service layer.
- **Responsive Interface:** Clean, nature-inspired user experience optimized for desktop and mobile screens.

---

## ⚙️ How It Works

```
User Enters Environmental Activity
               ↓
Frontend Sends Payload via REST API
               ↓
FastAPI Backend Validates Schema (Pydantic)
               ↓
Calculation Engine Applies Conversion Factors
               ↓
Activity Persisted via SQLAlchemy (SQLite)
               ↓
Analytics Engine Recalculates Metrics & Trends
               ↓
Dashboard Renders Updated Score, Charts & Insights
```

1. **Activity Entry:** The user selects a category, activity type, quantity, and date.
2. **Instant Estimation:** The frontend queries the backend calculation endpoint to preview the estimated outcome and rationale before saving.
3. **Data Ingestion:** The validated activity is saved to the SQLite database via SQLAlchemy ORM models.
4. **Metric Aggregation:** The analytics engine processes user history, clamps the score between 0 and 100, tallies streaks, and outputs tailored recommendations.
5. **Dashboard Presentation:** The React user interface dynamically displays updated metrics without hardcoded mock figures.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | React 19 + TypeScript | Component-based, type-safe user interface |
| **Build Tool** | Vite | Rapid module bundling and client-side optimization |
| **Styling** | Tailwind CSS v4 | Responsive utility styling and consistent design system |
| **Data Visualization** | Recharts | Dynamic client-side line charts for impact tracking |
| **Icons** | Lucide React | Modern, lightweight UI iconography |
| **Routing** | React Router v7 | Client-side routing with clean SPA navigation |
| **Backend Framework** | FastAPI (Python 3.10+) | High-performance, asynchronous REST API with validation |
| **Data Validation** | Pydantic v2 | Robust request/response schema modeling |
| **ORM** | SQLAlchemy 2.0 | Object-relational mapping and database abstraction |
| **Database** | SQLite | Lightweight zero-configuration embedded SQL storage |
| **Web Server** | Uvicorn | ASGI production-grade web server |

---

## 🏗️ Project Architecture

```
ecotrack/
├── backend/
│   ├── app/
│   │   ├── database.py         # SQLAlchemy engine, session maker & connection logic
│   │   ├── main.py             # FastAPI entry point, CORS config & route handlers
│   │   ├── models.py           # Database entities (User, Activity)
│   │   ├── schemas.py          # Pydantic request & response models
│   │   └── services/
│   │       ├── calculator.py   # Centralized conversion factors & formulas
│   │       └── analytics.py    # Score synthesis, streak counter & recommendations
│   └── requirements.txt        # Python dependency manifest
├── frontend/
│   ├── src/
│   │   ├── components/         # Shared UI shell, navigation & layout wrappers
│   │   ├── pages/              # Landing, Dashboard, LogActivity & History views
│   │   ├── utils/              # Centralized Axios API service layer
│   │   ├── App.tsx             # Route declarations
│   │   └── main.tsx            # Application bootstrapping
│   ├── package.json            # Node.js dependencies and build scripts
│   └── vite.config.ts          # Vite build configuration
└── render.yaml                 # Multi-service infrastructure blueprint
```

### Architectural Principles
- **Separation of Concerns:** The React frontend purely manages presentation, form validation, and user feedback. All environmental mathematics reside strictly within the backend service layer.
- **Centralized Computation:** Conversion logic is isolated in `calculator.py`. Formula updates propagate consistently across previews and stored activities.
- **Database Agnosticism:** Database interactions are mediated through SQLAlchemy ORM, enabling seamless transitions from SQLite to PostgreSQL by altering the connection string.

---

## 📊 Environmental Calculations

All metrics are deterministic and grounded in standard reference conversion estimates implemented in `backend/app/services/calculator.py`:

| Category | Activity Type | Impact Type | Factor | Unit | Direction | Rationale |
|---|---|---|---|---|---|---|
| **Transport** | Walking | CO2 avoided | 0.20 | kg / km | Positive | Replaces private motor vehicle emissions |
| **Transport** | Cycling | CO2 avoided | 0.20 | kg / km | Positive | Replaces private motor vehicle emissions |
| **Transport** | Public Transport | CO2 avoided | 0.10 | kg / km | Positive | Higher passenger efficiency than private driving |
| **Transport** | Car | CO2 emitted | 0.25 | kg / km | Negative | Estimated internal combustion tailpipe emissions |
| **Transport** | Motorcycle | CO2 emitted | 0.15 | kg / km | Negative | Estimated two-wheeler tailpipe emissions |
| **Energy** | Electricity Usage | CO2 emitted | 0.40 | kg / kWh | Negative | Average electrical grid emission factor |
| **Water** | Water Usage | Water consumed | 1.00 | L | Negative | Direct volumetric consumption |
| **Waste** | Plastic Avoided | Waste reduced | 0.02 | kg / item | Positive | Diverts single-use plastics from disposal |
| **Waste** | Recycling | Waste diverted | 0.50 | kg | Positive | Diverts recyclable materials from landfills |
| **Waste** | General Waste | Waste generated | 1.00 | kg | Negative | Landfill waste accumulation |
| **Eco Actions** | Tree Planting | CO2 absorbed | 20.00 | kg / tree | Positive | Estimated average lifetime carbon sequestration |
| **Eco Actions** | Reusable Bottle | Waste reduced | 0.05 | kg / item | Positive | Eliminates single-use beverage containers |
| **Eco Actions** | Reusable Bag | Waste reduced | 0.03 | kg / item | Positive | Eliminates disposable shopping bags |

> *Note: Calculations represent standardized baseline estimates designed for personal environmental awareness and habit improvement.*

---

## 📱 Application Sections

- **Landing Page (`/`):** Clean introduction highlighting the tracker's mission, core value pillars (Track, Measure, Improve), and quick access to tracking.
- **Dashboard (`/dashboard`):** Real-time hub featuring:
  - 4 primary metric cards (Environmental Score, Net CO2 Impact, Waste Reduced, Eco Streak).
  - Trend chart displaying cumulative impact over time.
  - Contextual behavioral insights based on logged categories.
  - Actionable recommendations tailored to historical activities.
  - Graceful empty-state handling for new users with zero logged entries.
- **Track Activity (`/log`):** Form interface with dynamic unit switching, real-time preview computation, optional note tagging, and direct persistence.
- **Activity History (`/history`):** Complete chronological activity table featuring real-time keyword search, categorized tags, impact values, and deletion support.

---

## 🔌 API Overview

The FastAPI backend exposes the following REST endpoints under `/api`:

| Method | Endpoint | Description | Request Body | Response |
|---|---|---|---|---|
| `POST` | `/api/calculate` | Calculates impact preview without saving | `ActivityBase` | `ImpactResult` |
| `POST` | `/api/activities` | Saves a new activity and stores calculated impact | `ActivityCreate` | `Activity` |
| `GET` | `/api/activities` | Retrieves list of recorded activities (ordered by date) | None | `List[Activity]` |
| `DELETE` | `/api/activities/{id}` | Deletes an activity record by primary ID | None | `{"ok": true}` |
| `GET` | `/api/dashboard` | Aggregates score, net impact, streak, insights & advice | None | `DashboardResponse` |

---

## 🚀 Getting Started

Follow these instructions to run the EcoTrack application locally on your machine.

### Prerequisites
- **Node.js:** v18.0.0 or higher
- **Python:** v3.10 or higher
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/vinitkumarpatil/ecotrack.git
cd ecotrack
```

### 2. Backend Setup
```bash
cd backend

# Create and activate virtual environment
python -m venv venv

# On Windows:
.\venv\Scripts\activate
# On macOS / Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn app.main:app --reload --port 8000
```
The backend API documentation will be available at `http://localhost:8000/docs`.

### 3. Frontend Setup
Open a separate terminal window:
```bash
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Environment Configuration
The application runs out of the box with default development values. For custom setups, configure:
- `VITE_API_URL` (Frontend): Base URL of the backend API (defaults to `http://localhost:8000/api`).
- `DATABASE_URL` (Backend): Connection string for the database (defaults to local SQLite `sqlite:///./ecotrack.db`).
- `FRONTEND_URL` (Backend): Allowed origins for CORS headers.

---

## 🔒 Data & Privacy

EcoTrack is designed around simple, non-intrusive activity logging. It tracks strictly user-submitted activity types, dates, quantities, and optional notes. No external telemetry, sensitive financial credentials, or third-party tracking scripts are bundled into the project.

---

## 📌 Project Status

EcoTrack is currently deployed and accessible through the official live demo.

**Live Demo:** [https://vinitkumarpatil.github.io/ecotrack/](https://vinitkumarpatil.github.io/ecotrack/)

---

## 🔮 Future Improvements

Planned future enhancements include:
- **Persistent Cloud Database:** Migration to managed PostgreSQL for permanent data retention.
- **User Authentication:** Multi-tenant profile accounts with JWT-based session security.
- **Localized Emission Datasets:** Region-specific carbon factors reflecting localized energy grid compositions.
- **Data Export:** Capability to export historical impact records in CSV and PDF formats.
- **PWA Capabilities:** Progressive Web App features enabling offline habit logging and background syncing.

---

## 🤝 Contributing

Contributions, feedback, and issue submissions are welcome:
1. Fork the project repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'feat: add amazing feature'`).
4. Push to your branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---

## 📄 License

This repository is distributed as an open-source educational project and technical interview showcase for the GreenPulse organization.
