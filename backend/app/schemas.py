from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional

class ActivityBase(BaseModel):
    category: str
    activity_type: str
    quantity: float
    unit: str
    date: date
    note: Optional[str] = None

class ActivityCreate(ActivityBase):
    pass

class ActivityUpdate(ActivityBase):
    pass

class Activity(ActivityBase):
    id: int
    user_id: int
    impact_value: float
    impact_type: str
    created_at: datetime

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

class ImpactResult(BaseModel):
    impactType: str
    value: float
    unit: str
    direction: str
    explanation: str

class MetricCards(BaseModel):
    score: int
    co2_impact: float
    waste_reduced: float
    streak: int

class Insight(BaseModel):
    message: str

class Recommendation(BaseModel):
    message: str

class DashboardResponse(BaseModel):
    user_name: str
    metrics: MetricCards
    insights: list[Insight]
    recommendations: list[Recommendation]

class ChartData(BaseModel):
    date: str
    impact: float
