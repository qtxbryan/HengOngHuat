from langgraph.graph import StateGraph
from langchain_core.messages import ToolMessage
from langgraph.types import Command
from langchain_core.runnables import RunnableConfig

from state import AgentState
from tools.portfolio_creation import portfolio_match, retrieve_etfs_node, classify_etfs_node


class SubGraph:
    def __init__(self):
        print("SubGraph initialized")
        self._initialize_tools()
        self._build_workflow()

    def _initialize_tools(self):
        self.tools = [
            portfolio_match
        ]
        self.tools_by_name = {tool.name: tool for tool in self.tools}

    def _build_workflow(self):
        workflow = StateGraph(AgentState)

        workflow.add_node("match_portfolio", self.match_portfolio_node)
        workflow.add_node("retrieve_etfs", retrieve_etfs_node)
        workflow.add_node("classify_etfs", classify_etfs_node)

        workflow.set_entry_point("match_portfolio")
        workflow.add_edge("match_portfolio", "retrieve_etfs")
        workflow.add_edge("retrieve_etfs", "classify_etfs")
        workflow.add_edge("classify_etfs", "__end__")

    async def match_portfolio_node(self, state: AgentState, config: RunnableConfig):
        print("[STEP] Matched Portfolio")
        tool = self.tools_by_name["portfolio_match"]
        tool_args = {"state": state}
        new_state, tool_msg = await tool.ainvoke(tool_args)

        state["portfolio"] = state.get("portfolio", {})
        state["portfolio"]["initial_allocation"] = new_state.get(
            "portfolio", {}).get("initial_allocation", {})
        state["logs"] = new_state.get("logs", [])

        state["messages"] = state.get("messages", [])
        state["messages"].append(
            ToolMessage(
                content=tool_msg,
                name="portfolio_match",
                tool_call_id="portfolio_match_step"
            )
        )

        return Command(goto="retrieve_etfs", update=state)


graph = SubGraph().graph
