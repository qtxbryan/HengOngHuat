from pydantic import BaseModel, Field
from typing import Optional, List
from api.models.portfolio import Portfolio


class User(BaseModel):
    personalInformation: Optional[dict]
    financialSituation: Optional[dict]
    investmentObjectives: Optional[dict]
    riskWillingness: Optional[dict]
    riskCapacity: Optional[dict]
    portfolios: Optional[List[Portfolio]] = Field(default_factory=list)
    chatbotHistory: Optional[dict] = Field(default_factory=dict)

    class Config:
        schema_extra = {
            "personalInformation": {
                "fullName": "Ah Tan",
                "dob": "1990-01-01",
                "email": "lol@lol.com",
                "phone": "12345678",
                "occupation": "Software Engineer",
                "gender": "male",
                "maritalStatus": "single",
                "dependents": 2
            },
            "financialSituation": {
                "netWorth": "100000",
                "majorExpenses": ["education", "housing"],
                "earningCapacity": "70000"
            },
            "investmentObjectives": {
                "investmentTimeHorizon": [10, 20],
                "returnRequirements": "5",
                "objectivePriority": "growth",
                "futureFinancialGoals": ["retirement", "house"]
            },
            "riskWillingness": {
                "investmentKnowledge": "some",
                "riskPerception": "understand",
                "responseToLoss": "reallocate",
                "regretAversion": "reluctantlyDecide"
            },
            "riskCapacity": {
                "initialInvestment": "5000-25000",
                "acceptableReturns": "-15%-25%",
                "monthlyContribution": ">=10%",
                "withdrawalStartTime": "5-9years"
            },
            "portfolios": [
                {
                    "stocks": [],
                    "weights": [],
                    "start_date": [],
                    "end_date": []
                }
            ],
            "chatbotHistory": {
                "date": [],
                "topic": []
            }
        }

    class Settings:
        name = 'user_data'


class UpdateUserModel(BaseModel):
    id: str
    personalInformation: Optional[dict]
    financialSituation: Optional[dict]
    investmentObjectives: Optional[dict]
    riskWillingness: Optional[dict]
    riskCapacity: Optional[dict]
    portfolio: Optional[dict]
    chatbot_history: Optional[dict]

    class Config:
        schema_extra = {
            "personalInformation": {
                "fullName": "John Doe",
                "dob": "1990-01-01",
                "email": "john@example.com",
                "contact": "1234567890",
                "occupation": "Software Engineer",
                "gender": "male",
                "maritalStatus": "married",
                "dependents": 2
            },
            "financialSituation": {
                "netWorth": "500000",
                "majorExpenses": ["education", "houseConstruction"],
                "earningCapacity": "70000"
            },
            "investmentObjectives": {
                "investmentTimeHorizon": [10, 20],
                "returnRequirements": "5",
                "objectivePrioritisation": "growth",
                "futureFinancialGoals": ["retirement", "house"]
            },
            "riskWillingness": {
                "investmentKnowledge": "some",
                "riskPerception": "understand",
                "responseToLoss": "reallocate",
                "regretAversion": "reluctantlyDecide"
            },
            "riskCapacity": {
                "initialInvestment": "5000-25000",
                "acceptableReturns": "-15%-25%",
                "monthlyContribution": ">=10%",
                "withdrawalStartTime": "5-9years"
            }
        }

    class Settings:
        name = 'user_data'
