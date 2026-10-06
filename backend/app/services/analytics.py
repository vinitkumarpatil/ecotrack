from typing import List
from ..models import Activity
from ..schemas import MetricCards, Insight, Recommendation

def calculate_metrics(activities: List[Activity]) -> MetricCards:
    # Basic baseline score, adjust based on activities
    score = 50 
    co2_impact = 0.0
    waste_reduced = 0.0
    
    # Track streak
    unique_positive_days = set()

    for act in activities:
        # Score calculation (simple version)
        # determine if positive based on impact type
        is_positive = "avoided" in act.impact_type.lower() or "reduced" in act.impact_type.lower() or "diverted" in act.impact_type.lower() or "absorbed" in act.impact_type.lower()
        
        if is_positive:
            if "co2" in act.impact_type.lower():
                co2_impact += act.impact_value
                score += 1
            if "waste" in act.impact_type.lower():
                waste_reduced += act.impact_value
                score += 2
            
            unique_positive_days.add(act.date)
        else:
            if "co2 emitted" in act.impact_type.lower():
                co2_impact -= act.impact_value
                score -= 1

    # Clamp score
    score = max(0, min(100, score))
    
    streak = len(unique_positive_days) # Simplified streak logic for MVP

    return MetricCards(
        score=int(score),
        co2_impact=round(co2_impact, 2),
        waste_reduced=round(waste_reduced, 2),
        streak=streak
    )

def generate_insights(activities: List[Activity]) -> List[Insight]:
    if not activities:
        return [Insight(message="Start logging activities to see your insights.")]
    
    insights = []
    transport_count = sum(1 for a in activities if a.category == "Transport" and ("avoided" in a.impact_type.lower() or "reduced" in a.impact_type.lower()))
    if transport_count > 0:
        insights.append(Insight(message=f"You chose eco-friendly transport {transport_count} times recently."))
    else:
        insights.append(Insight(message="Transport contributes significantly to environmental impact. Try public transport!"))
    return insights

def generate_recommendations(activities: List[Activity]) -> List[Recommendation]:
    recs = []
    has_plastic = any(a for a in activities if a.category == "Waste" and a.activity_type == "General Waste")
    has_recycling = any(a for a in activities if a.activity_type == "Recycling")
    
    if not has_recycling:
        recs.append(Recommendation(message="Consider starting a recycling habit to reduce landfill waste."))
    if has_plastic:
        recs.append(Recommendation(message="Try using reusable bags and bottles to reduce plastic waste."))
        
    if len(recs) < 3:
        recs.append(Recommendation(message="Keep up the great work! Try walking or cycling for short trips."))
        
    return recs[:3]
