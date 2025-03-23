from langgraph.graph import StateGraph, END, START
from langchain_core.messages import ChatMessage, HumanMessage
from langgraph.graph.message import MessagesState, add_messages
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import ToolNode, tools_condition
from langgraph.checkpoint.memory import MemorySaver
from pymongo import MongoClient
from constants import PortfolioConstants
from model import PortfolioData
from pydantic import ValidationError

import finnhub

from utils import unix_to_iso8601
from typing import List, TypedDict

finnhub_client = finnhub.Client(
    api_key='ctgkpn1r01qn78n47vmgctgkpn1r01qn78n47vn0')


class AgentState(MessagesState):
    user_id: str
    user_info: dict
    matched_portfolio: dict
    portfolio: dict
    task: str
    save: bool


llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

graph = StateGraph(AgentState)


def call_llm(prompt: str) -> str:
    message = HumanMessage(content=prompt)
    response = llm.invoke([message])
    return response.content


def task_selector_node(state: AgentState) -> AgentState:
    user_input = state['messages'][-1].content

    if 'news' in user_input:
        state['task'] = 'news'
    elif 'portfolio' in user_input:
        state['task'] = 'portfolio'
    elif 'advice' in user_input or 'advisory' in user_input:
        state['task'] = 'advisory'
    else:
        state['task'] = 'fallback'
    return state


def finance_news_tool(state: AgentState) -> AgentState:
    category = 'general'
    limit = 5

    print(f"Fetching top finance news in category: {category}")

    finance_news = finnhub_client.general_news(category=category)

    if not finance_news:
        state['messages'].append(ChatMessage(
            role='assistant', content="Sorry, I cannot fetch any financial news right now."))
        return state

    formatted_news = "📈 **Top Financial News:**\n"
    for idx, article in enumerate(finance_news[:limit], 1):
        formatted_news += (
            f"{idx}. [{article.get('headline', 'No Title')}]({article.get('url', '')})\n"
            f"   - Source: {article.get('source', 'Unknown')}\n"
            f"   - Date: {unix_to_iso8601(article.get('datetime', ''))}\n"
        )

    state['messages'].append(ChatMessage(
        role='assistant', content=formatted_news))


def user_info_tool(state: AgentState):
    """
    Retrieves user information from MongoDB
    """
    user_id = state['user_id']
    mongo_uri = "mongodb+srv://fypuser:testtest@quantfyp.ljw87.mongodb.net/?retryWrites=true&w=majority&appName=quantfyp"
    client = MongoClient(mongo_uri)
    db = client['quantfyp']
    collection = db["user_information"]

    user_info = collection.find_one({"user_id": user_id})

    if user_info:
        user_info.pop("_id", None)
        return {"user_info": user_info}
    else:
        return {"user_info": "No user information found"}


def portfolio_match_tool(state: AgentState):
    """
    Matches portfolio to user information
    """
    user_info = state['user_info']

    prompt = f"""
    Based on the following user information: 
    {user_info}
    
    Choose the most suitable portfolio from these predefined portfolios:
    {PortfolioConstants.PREDEFINED_PORTFOLIO}
    
    Return ONLY the matched portfolio in JSON format
    
    """

    llm_portfolio_structured = llm.with_structured_output(method="json_mode")

    try:
        structured_output = llm_portfolio_structured.invoke(prompt)
        return {"matched_portfolio": structured_output}
    except Exception as e:
        # Catch any unexpected LLM errors
        print("LLM call failed:", e)
        return {"matched_portfolio": None, "error": str(e)}


def mvo_optimization_tool(state: AgentState):
    # Simulate Mean-Variance Optimization result
    optimized = state['portfolio']
    optimized['optimized_return'] = 8.5
    optimized['optimized_risk'] = 10
    state['portfolio'] = optimized
    return state


def advisory_tool(state: AgentState):
    # Simple dummy advice
    advice = "General financial tip: Diversify your investments to reduce risk."
    state['messages'].append(ChatMessage(role='assistant', content=advice))
    return state


def fallback_node(state: AgentState):
    fallback = "I'm here to help with finance news, portfolio creation, or general advisory. How can I assist you?"
    state['messages'].append(ChatMessage(role='assistant', content=fallback))
    return state


def database_tool(state: AgentState):
    if state.get('save', False):
        saved_msg = f"Portfolio saved successfully!"
    else:
        saved_msg = f"Portfolio not saved."

    state['messages'].append(ChatMessage(role='assistant', content=saved_msg))
    return state


graph.add_node("task_selector", task_selector_node)
graph.add_node("get_news", finance_news_tool)
graph.add_node("get_user_info", user_info_tool)
graph.add_node("match_portfolio", portfolio_match_tool)
graph.add_node("optimize_portfolio", mvo_optimization_tool)
graph.add_node("give_advice", advisory_tool)
graph.add_node("fallback", fallback_node)
graph.add_node("database", database_tool)


def route_task(state: AgentState):
    task = state['task']
    if task == 'news':
        return "get_news"
    elif task == 'portfolio':
        return "get_user_info"
    elif task == 'advisory':
        return "give_advice"
    else:
        return "fallback"


graph.set_entry_point("task_selector")
graph.add_conditional_edges("task_selector", route_task)

# Portfolio Creation Flow
graph.add_edge("get_user_info", "match_portfolio")
graph.add_edge("match_portfolio", "optimize_portfolio")
graph.add_edge("optimize_portfolio", "database")

# End flow
graph.add_edge("database", END)
graph.add_edge("get_news", END)
graph.add_edge("give_advice", END)
graph.add_edge("fallback", END)

memory = MemorySaver()
financial_agent = graph.compile(
    checkpointer=memory, interrupt_before=["database"])
