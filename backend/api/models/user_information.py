from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Literal


class PersonalInformation(BaseModel):
    fullName: str
    dob: str
    phone: str
    occupation: str
    gender: Literal["male", "female", "other"]
    maritalStatus: Literal["single", "married", "divorced", "widowed"]
    dependents: int


class FinancialSituation(BaseModel):
    netWorth: str  # Consider using int/float if you need numeric validation
    majorExpenses: List[str]
    earningCapacity: str


class InvestmentObjectives(BaseModel):
    investmentTimeHorizon: List[int]
    returnRequirements: str  # Consider using int/float if you need numeric validation
    objectivePriority: str
    futureFinancialGoals: List[str]


class RiskWillingness(BaseModel):
    investmentKnowledge: str
    riskPerception: str
    responseToLoss: str
    regretAversion: str


class RiskCapacity(BaseModel):
    initialInvestment: str
    acceptableReturns: str
    monthlyContribution: str
    withdrawalStartTime: str


class UserInformation(BaseModel):
    personalInformation: Optional[PersonalInformation] = None
    financialSituation: Optional[FinancialSituation] = None
    investmentObjectives: Optional[InvestmentObjectives] = None
    riskWillingness: Optional[RiskWillingness] = None
    riskCapacity: Optional[RiskCapacity] = None

    class Config:
        schema_extra = {
            "example": {
                "personalInformation": {
                    "fullName": "Heng Ong Huat",
                    "dob": "1990-01-01",
                    "email": "hoh@hoh.com",
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
                    "initialInvestment": "23000",
                    "acceptableReturns": "-15%-25%",
                    "monthlyContribution": ">=10%",
                    "withdrawalStartTime": "5-9years"
                }
            }
        }
