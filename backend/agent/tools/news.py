from copilotkit.langchain import copilotkit_emit_state
from langchain_core.runnables import RunnableConfig
from typing import Optional, Dict
from pydantic import BaseModel, Field
from utils.utils import unix_to_iso8601
from langchain_core.tools import tool
import finnhub
import os
from dotenv import load_dotenv

load_dotenv()


finnhub_client = finnhub.Client(
    api_key=os.getenv('FINNHUB_API_KEY'))


class FinanceNewsInput(BaseModel):
    category: str = Field(
        description="The financial news category (e.g. 'general', 'latest)", default="general")
    state: Optional[Dict] = Field(
        description="State of the assistant. Will be provided at runtime")


@tool("get_finance_news", args_schema=FinanceNewsInput, return_direct=True)
async def get_finance_news(category: str = "general", state: Optional[Dict] = None):
    """
    Fetches the top financial news from Finnhub based on specified category.

    Returns the updated state and a summary of the news 
    """

    config = RunnableConfig()

    if state is None:
        state = {}

    state['logs'] = state.get('logs', [])
    state['logs'].append({
        "message": f"Fetching top financial news in category: **{category}**",
        "done": False
    })

    await copilotkit_emit_state(config, state)

    try:
        news_items = finnhub_client.general_news(category=category)
        if not news_items:
            raise ValueError("No news items found")

        limit = 5
        state["news"] = []
        formatted_news = "📈 **Top Financial News:**\n"
        for idx, article in enumerate(news_items[:limit], 1):
            news_entry = {
                "headline": article.get("headline", "No Title"),
                "url": article.get("url", ""),
                "source": article.get("source", "Unknown"),
                "datetime": unix_to_iso8601(article.get("datetime", ""))
            }

            state["news"].append(news_entry)

            formatted_news += (
                f"{idx}. [{news_entry['headline']}]({news_entry['url']})\n"
                f"   - Source: {news_entry['source']}\n"
                f"   - Date: {news_entry['datetime']}\n"
            )

        state["logs"][-1]["done"] = True
        state["tool"] = {"category": category}
        await copilotkit_emit_state(config, state)

        return state, formatted_news

    except Exception as e:
        print(f"Error fetching financial news: {e}")
        state["logs"][-1]["done"] = True
        await copilotkit_emit_state(config, state)
        return state, f"Failed to fetch news for category {category}. Please try again later."
