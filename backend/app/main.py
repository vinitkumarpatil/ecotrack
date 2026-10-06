from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from . import models, schemas
from .database import engine, get_db, Base
from .services import calculator, analytics

import os

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="EcoTrack API")

# Setup CORS
allowed_origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/activities", response_model=schemas.Activity)
def create_activity(activity: schemas.ActivityCreate, db: Session = Depends(get_db)):
    # Calculate impact
    impact = calculator.calculate_impact(activity.activity_type, activity.quantity)
    
    db_activity = models.Activity(
        user_id=1,  # Hardcoded MVP user
        category=activity.category,
        activity_type=activity.activity_type,
        quantity=activity.quantity,
        unit=activity.unit,
        impact_value=impact.value,
        impact_type=impact.impactType,
        date=activity.date,
        note=activity.note
    )
    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)
    return db_activity

@app.get("/api/activities", response_model=List[schemas.Activity])
def read_activities(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    activities = db.query(models.Activity).order_by(models.Activity.date.desc(), models.Activity.id.desc()).offset(skip).limit(limit).all()
    return activities

@app.delete("/api/activities/{activity_id}")
def delete_activity(activity_id: int, db: Session = Depends(get_db)):
    activity = db.query(models.Activity).filter(models.Activity.id == activity_id).first()
    if activity is None:
        raise HTTPException(status_code=404, detail="Activity not found")
    db.delete(activity)
    db.commit()
    return {"ok": True}

@app.post("/api/calculate", response_model=schemas.ImpactResult)
def calculate_preview(activity: schemas.ActivityBase):
    return calculator.calculate_impact(activity.activity_type, activity.quantity)

@app.get("/api/dashboard", response_model=schemas.DashboardResponse)
def get_dashboard(db: Session = Depends(get_db)):
    activities = db.query(models.Activity).all()
    metrics = analytics.calculate_metrics(activities)
    insights = analytics.generate_insights(activities)
    recommendations = analytics.generate_recommendations(activities)
    
    return schemas.DashboardResponse(
        user_name="Eco Warrior",
        metrics=metrics,
        insights=insights,
        recommendations=recommendations
    )
