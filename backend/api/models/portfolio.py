# portfolio.py
from pydantic import BaseModel, Field
from typing import List, Optional


class Portfolio(BaseModel):
    name: str
    stocks: Optional[List[str]] = Field(default_factory=list)
    weights: Optional[List[float]] = Field(default_factory=list)
    start_date: str
    end_date: str

    class Config:
        schema_extra = {
            "example": {
                "name": "Tech Portfolio",
                "stocks": ["BBRE", "IEFA"],
                "weights": [0.6, 0.4],
                "start_date": "2023-01-01",
                "end_date": "2023-12-31"
            }
        }
