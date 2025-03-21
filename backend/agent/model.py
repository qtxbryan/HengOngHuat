from pydantic import BaseModel
from typing import Dict
from pydantic import Field


class PortfolioData(BaseModel):
    name: str = Field(description='Name of the portfolio')
    allocation: Dict[str, float] = Field(
        description='Asset allocation with asset name as key and allocation percentage as float')
    description: str = Field(
        description='Description of the portfolio strategy, risk tolerance, and target audience')

    model_config = {
        "json_schema_extra": {
            "required": ["name", "allocation", "description"]
        }
    }
