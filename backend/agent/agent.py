from langgraph.graph import StateGraph
from langchain_core.runnables import RunnableConfig
from langgraph.types import Command
from langchain_core.messages import HumanMessage, AIMessage, ToolMessage, SystemMessage
from langchain_openai import ChatOpenAI
from copilotkit.langchain import copilotkit_emit_state, copilotkit_customize_config


from state import AgentState
from tools.user_info import fetch_user_information
from tools.news import get_finance_news
from agent.subgraph import SubGraph

from datetime import datetime
from typing import Literal, cast


class FinanceAgent:
    def __init__(self):
        self._initialize_tools()
        self._build_workflow()
        self.subgraph = SubGraph().graph

    def _initialize_tools(self):
        self.tools = [
            get_finance_news,
        ]
        self.tools_by_name = {tool.name: tool for tool in self.tools}

    def _build_workflow(self):
        workflow = StateGraph(AgentState)

        # Add nodes
        workflow.add_node("fetch_user_information", self.user_info)

        workflow.add_node("classify_intent", self.classify_intent_node)
        workflow.add_node("router", self.router_node)

        workflow.add_node("call_model_node", self.call_model_node)
        workflow.add_node("tool_node", self.tool_node)

        workflow.add_node("subgraph_node", self.subgraph_node)

        workflow.set_entry_point("fetch_user_information")

        workflow.add_edge("fetch_user_information", "classify_intent")
        workflow.add_edge("classify_intent", "router")
        workflow.add_conditional_edges("router", self.router)
        workflow.add_edge("tool_node", "call_model_node")
        workflow.add_edge("subgraph_node", "__end__")

        # workflow.add_edge("fetch_user_information", "call_model_node")
        # workflow.add_edge("tool_node", "call_model_node")

        self.graph = workflow.compile()

    async def user_info(self, state: AgentState, config: RunnableConfig):
        if state.get("user_info"):
            return {"user_info": state["user_info"]}

        config = copilotkit_customize_config(config, emit_messages=False)
        user_data = await fetch_user_information.ainvoke(config)
        return {"user_info": user_data}

    def _build_system_prompt(self, state: AgentState) -> str:
        """
        Builds the system prompt for the agent.
        """
        prompt_parts = [
            f"Today's date is {datetime.now().strftime('%d-%m-%Y')}.",
            "You are a financial expert helping users with their financial queries and investments. Your primary goal is to assist the user with their financial needs, provide personalized recommendations, portfolio related queries and news updates.\n\n"
            "Use the provided tools to get the real time data and information that you need to assist the user's queries.\n\n"
        ]

        if state["user_info"]:
            prompt_parts.append(
                f"User Information: \n"
                f"{state["user_info"]}\n\n")

        return "\n".join(prompt_parts)

    async def classify_intent_node(self, state: AgentState, config: RunnableConfig):
        llm = ChatOpenAI(model="gpt-4o", temperature=0)
        classification_prompt = [
            SystemMessage(
                content="You are a router. if the user is asking for portfolio creation, respond with 'subgraph'. Otherwise, respond with 'main'"
            ),
            *state["messages"]
        ]

        response = await llm.ainvoke(classification_prompt, config)
        classification = response.content.lower().strip()
        return Command(goto="router", update={"route": classification})

    async def router_node(self, state: AgentState, config: RunnableConfig):
        return Command(update={"route": state["route"]})

    def router(self, state: AgentState) -> Literal["call_model_node", "subgraph_node"]:
        print("[Router] route =", state.get("route"))
        return "subgraph_node" if state.get("route") == 'subgraph' else 'call_model_node'

    async def call_model_node(self, state: AgentState, config: RunnableConfig) -> Command[Literal["tool_node", "__end__"]]:
        last_message = state["messages"][-1]
        if not isinstance(last_message, (AIMessage, SystemMessage, HumanMessage, ToolMessage)):
            last_message = HumanMessage(content=last_message.content)
            state["messages"][-1] = last_message

        llm = ChatOpenAI(model="gpt-4o", temperature=0)
        model = llm.bind_tools(self.tools, parallel_tool_calls=True)

        response = await model.ainvoke([
            SystemMessage(content=self._build_system_prompt(state)),
            *state["messages"]
        ], config)

        response = cast(AIMessage, response)

        if response.tool_calls:
            return Command(goto="tool_node", update={"messages": [*state["messages"], response]})

        return Command(goto="__end__", update={"messages": [*state["messages"], response]})

    async def tool_node(self, state: AgentState, config: RunnableConfig) -> Command:
        config = copilotkit_customize_config(config, emit_messages=False)

        msgs = []
        tool_state = {}

        for tool_call in state["messages"][-1].tool_calls:
            state["messages"] = {'HumanMessage' if type(
                message) == HumanMessage else 'AIMessage': message.content for message in state["messages"]}

            tool_call['args']['state'] = state

            tool = self.tools_by_name[tool_call['name']]
            new_state, tool_msg = await tool.ainvoke(tool_call['args'])

            tool_call['args']['state'] = None
            msgs.append(ToolMessage(content=tool_msg,
                        name=tool_call['name'], tool_call_id=tool_call['id']))

            tool_state = {
                "user_info": new_state.get("user_info", {}),
                "news": new_state.get("news", []),
                "initial_allocation": new_state.get("initial_allocation", {}),
                "holdings": new_state.get("holdings", {}),
                "tool": new_state.get("tool", ""),
                "messages": msgs
            }

            await copilotkit_emit_state(config, tool_state)

        return tool_state

    async def subgraph_node(self, state: AgentState, config: RunnableConfig) -> Command:
        new_state = await self.subgraph.ainvoke(state, config)
        return Command(goto="__end__", update=new_state)


graph = FinanceAgent().graph
