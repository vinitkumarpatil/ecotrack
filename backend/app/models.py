from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Date
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    category = Column(String, index=True)
    activity_type = Column(String)
    quantity = Column(Float)
    unit = Column(String)
    impact_value = Column(Float)
    impact_type = Column(String)
    date = Column(Date, index=True)
    note = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
