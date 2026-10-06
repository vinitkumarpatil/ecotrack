from app.schemas import ImpactResult

# Configuration for factors
# Units usually co2 in kg
FACTORS = {
    "Walking": {"type": "CO2 avoided", "factor": 0.2, "unit": "kg", "direction": "positive", "desc": "Walking avoids vehicle emissions."},
    "Cycling": {"type": "CO2 avoided", "factor": 0.2, "unit": "kg", "direction": "positive", "desc": "Cycling avoids vehicle emissions."},
    "Public Transport": {"type": "CO2 avoided", "factor": 0.1, "unit": "kg", "direction": "positive", "desc": "Public transport is much more efficient per person than driving."},
    "Car": {"type": "CO2 emitted", "factor": 0.25, "unit": "kg", "direction": "negative", "desc": "Driving a car emits significant CO2."},
    "Bike/Motorcycle": {"type": "CO2 emitted", "factor": 0.15, "unit": "kg", "direction": "negative", "desc": "Motorcycles emit CO2, though generally less than cars."},
    
    "Electricity Usage": {"type": "CO2 emitted", "factor": 0.4, "unit": "kg", "direction": "negative", "desc": "Grid electricity generation typically produces CO2."},
    "Water Usage": {"type": "Water consumed", "factor": 1, "unit": "L", "direction": "negative", "desc": "Water usage has an energy cost to clean and distribute."},
    
    "Plastic Avoided": {"type": "Waste reduced", "factor": 0.02, "unit": "kg", "direction": "positive", "desc": "Avoiding plastic reduces landfill waste."},
    "Recycling": {"type": "Waste diverted", "factor": 0.5, "unit": "kg", "direction": "positive", "desc": "Recycling diverts waste from landfills and saves raw materials."},
    "General Waste": {"type": "Waste generated", "factor": 1, "unit": "kg", "direction": "negative", "desc": "General waste goes to landfills."},
    
    "Tree Planting": {"type": "CO2 absorbed", "factor": 20.0, "unit": "kg", "direction": "positive", "desc": "Trees absorb CO2 over their lifetime."},
    "Reusable Bottle": {"type": "Waste reduced", "factor": 0.05, "unit": "kg", "direction": "positive", "desc": "Using a reusable bottle avoids single-use plastics."},
    "Reusable Bag": {"type": "Waste reduced", "factor": 0.03, "unit": "kg", "direction": "positive", "desc": "Using a reusable bag avoids single-use plastics."}
}

def calculate_impact(activity_type: str, quantity: float) -> ImpactResult:
    factor_info = FACTORS.get(activity_type)
    if not factor_info:
        # Default fallback
        return ImpactResult(
            impactType="Unknown",
            value=0.0,
            unit="units",
            direction="neutral",
            explanation="No calculation factor available for this activity."
        )
    
    value = quantity * factor_info["factor"]
    
    return ImpactResult(
        impactType=factor_info["type"],
        value=round(value, 2),
        unit=factor_info["unit"],
        direction=factor_info["direction"],
        explanation=factor_info["desc"]
    )
