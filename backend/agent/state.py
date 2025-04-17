from typing import List, Optional, Dict, TypedDict, Any
from copilotkit import CopilotKitState


class Portfolio(TypedDict):
    initial_allocation: Dict[str, Any]
    symbols: List[str]
    top_10_etfs: Dict[str, Any]
    bond_etfs: Dict[str, Any]
    holdings: List[str]
    category_metrics: Dict[str, List[dict]]


class AgentState(CopilotKitState):
    route: Optional[str] = None
    user_info: dict
    news: List[dict]
    portfolio: Optional[Portfolio]
    tool: str
    logs: List[dict]
    approval_status: Optional[str] = None
