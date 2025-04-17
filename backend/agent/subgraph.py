from langgraph.graph import StateGraph
from langchain_core.messages import ToolMessage, SystemMessage
from langgraph.types import Command, interrupt
from langchain_core.runnables import RunnableConfig

from state import AgentState
from tools.portfolio_creation import portfolio_match, retrieve_etfs_node, classify_etfs_node, get_category_metrics_node, select_final_etfs_node, build_portfolio_message_node, save_portfolio_node


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
        workflow.add_node("get_metrics", get_category_metrics_node)
        workflow.add_node("select_final", select_final_etfs_node)
        workflow.add_node("build_message", build_portfolio_message_node)
        workflow.add_node("process_approval", self.process_approval_node)
        workflow.add_node("save_portfolio", save_portfolio_node)

        workflow.set_entry_point("match_portfolio")
        workflow.add_edge("match_portfolio", "retrieve_etfs")
        workflow.add_edge("retrieve_etfs", "classify_etfs")
        workflow.add_edge("classify_etfs", "get_metrics")
        workflow.add_edge("get_metrics", "select_final")
        workflow.add_edge("select_final", "build_message")
        workflow.add_edge("build_message", "process_approval")
        workflow.add_edge("process_approval", "save_portfolio")
        workflow.add_edge("save_portfolio", "__end__")

        self.graph = workflow.compile()

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

    async def process_approval_node(self, state: AgentState, config: RunnableConfig):
        print("[STEP] Awaiting human approval...")

        reviewed = interrupt({
            "message": "Do you approve this generated portfolio?",
            "portfolio": state.get("portfolio", {})
        })

        # Process user response
        approved = reviewed.get("approved", False)
        state["approval_status"] = "approved" if approved else "rejected"
        state["logs"] = state.get("logs", [])
        state["logs"].append({
            "message": f"Portfolio {'approved' if approved else 'rejected'} by user.",
            "done": True
        })
        state["messages"] = [
            SystemMessage(
                content="User has reviewed the portfolio and submitted their approval.")
        ]

        # Route based on response
        if approved:
            return Command(goto="save_portfolio", update=state)
        return Command(goto="__end__", update=state)


graph = SubGraph().graph
