from langchain_core.tools import tool
from langchain_core.runnables import RunnableConfig
from modules.portfolio import process_etf, get_category_etf_metrics, filter_and_sort_etfs, compute_etf_count_by_allocation, select_etfs_by_overlap, print_final_portfolio_breakdown, retrieve_etfs
from pydantic import BaseModel, Field, ValidationError
from typing import Optional, Dict
from copilotkit.langchain import copilotkit_emit_state
from langchain_openai import ChatOpenAI
from agent.constants import PortfolioConstants, CATEGORY_TO_ASSET_CLASS, BOND_CATEGORIES
from langchain_core.messages import AIMessage, ToolMessage


class PortfolioResponse(BaseModel):
    name: str = Field(description="The name of the portfolio")
    allocation: Dict[str, float] = Field(
        description="The allocation of the portfolio")
    description: str = Field(description="The description of the portfolio")


class PortfolioMatchInput(BaseModel):
    state: Optional[Dict] = Field(
        description="State of the assistant. Will be provided at runtime"
    )


class PortfolioConstructionInput(BaseModel):
    state: Optional[Dict] = Field(
        description="State of the assistant. Will be provided at runtime"
    )


@tool("portfolio_match", args_schema=PortfolioMatchInput, return_direct=True)
async def portfolio_match(state):
    """
    Match the user's risk tolerance and investment goals with the most suitable portfolio
    """
    config = RunnableConfig()
    user_info = state.get("user_info", {})
    state['logs'] = state.get("logs", [])
    state["logs"].append({
        "message": "Matching user with a portfolio...",
        "done": False
    })
    print(
        f"[EMIT] copilotkit_emit_state: step='portfolio_match' keys={list(state.keys())} logs={len(state.get('logs', []))}")
    await copilotkit_emit_state(config, state)

    try:
        prompt = f"""
        You are a financial assistant helping match users with suitable investment portfolios.

        Given:
        - User information:
        {user_info}

        - A list of predefined portfolios:
        {PortfolioConstants.PREDEFINED_PORTFOLIO}

        Your task:
        Please select the most suitable portfolio for the user.
        Respond with a JSON object containing the portfolio's name, allocation, and description.

        Notes:
        - Ensure the weights in the \"allocation\" sum up exactly 1.0
        - Do not include any commentary or additional text outside the JSON object.
        """

        llm = ChatOpenAI(model="gpt-4o", temperature=0)
        structured_llm = llm.with_structured_output(
            PortfolioResponse, method="json_mode")

        portfolio = structured_llm.invoke(prompt)
        state["logs"][-1]["done"] = True

        tool_msg = (
            f"🧠 Matched portfolio:\n"
            f"Name: {portfolio.name}\n"
            f"Description: {portfolio.description}\n"
            f"Allocation: {portfolio.allocation}"
        )

        initial_allocation = portfolio.model_dump()
        state['portfolio'] = state.get("portfolio", {})
        state['portfolio']['initial_allocation'] = initial_allocation

        print(
            f"[EMIT] copilotkit_emit_state: step='portfolio_match' keys={list(state.keys())} logs={len(state.get('logs', []))}")
        await copilotkit_emit_state(config, state)
        return state, tool_msg

    except ValidationError as e:
        error_msg = f"❌ Validation error: {str(e)}"
        state["logs"][-1]["done"] = True
        state["logs"].append({"message": error_msg, "done": True})
        print(
            f"[EMIT] copilotkit_emit_state: step='portfolio_match' (ValidationError) keys={list(state.keys())} logs={len(state.get('logs', []))}")
        await copilotkit_emit_state(config, state)
        return state, error_msg

    except Exception as e:
        error_msg = f"❌ Unexpected error: {str(e)}"
        state["logs"][-1]["done"] = True
        state["logs"].append({"message": error_msg, "done": True})
        print(
            f"[EMIT] copilotkit_emit_state: step='portfolio_match' (Exception) keys={list(state.keys())} logs={len(state.get('logs', []))}")
        await copilotkit_emit_state(config, state)
        return state, error_msg


async def retrieve_etfs_node(state, config: RunnableConfig):
    print("[STEP] Retrieving ETFs")
    state['logs'] = state.get("logs", [])
    state["logs"].append({
        "message": "Retrieving ETFs...",
        "done": False
    })
    print(
        f"[EMIT] copilotkit_emit_state: step='retrieve_etfs_node' keys={list(state.keys())} logs={len(state.get('logs', []))}")
    await copilotkit_emit_state(config, state)

    try:
        etfs = retrieve_etfs()
        state['portfolio']['symbols'] = etfs
        state["logs"][-1]["done"] = True

    except Exception as e:
        state["logs"][-1]["done"] = True
        state["logs"].append(
            {"message": f"❌ Failed to retrieve ETFs: {str(e)}", "done": True})

    print(
        f"[EMIT] copilotkit_emit_state: step='retrieve_etfs_node' keys={list(state.keys())} logs={len(state.get('logs', []))}")
    await copilotkit_emit_state(config, state)
    return state


async def classify_etfs_node(state, config: RunnableConfig):
    print("[STEP] Classifying ETFs")
    state["portfolio"] = state.get("portfolio", {})
    state["logs"] = state.get("logs", [])
    state["logs"].append({
        "message": "Classifying ETFs...",
        "done": False
    })
    print(
        f"[EMIT] copilotkit_emit_state: step='classify_etfs_node' keys={list(state.keys())} logs={len(state.get('logs', []))}")
    await copilotkit_emit_state(config, state)

    try:
        initial_allocation = state["portfolio"].get("initial_allocation", {})
        symbols = state["portfolio"].get("symbols", [])

        top_10_etfs, bond_etfs = process_etf(initial_allocation, symbols)

        state["portfolio"]["top_10_etfs"] = top_10_etfs
        state["portfolio"]["bond_etfs"] = bond_etfs
        state["logs"][-1]["done"] = True

    except Exception as e:
        state["logs"][-1]["done"] = True
        state["logs"].append(
            {"message": f"❌ Failed to classify ETFs: {str(e)}", "done": True})

    print(
        f"[EMIT] copilotkit_emit_state: step='classify_etfs_node' keys={list(state.keys())} logs={len(state.get('logs', []))}")
    await copilotkit_emit_state(config, state)
    return state


async def get_category_metrics_node(state, config: RunnableConfig):
    print("[STEP] Getting ETF metrics")
    state["portfolio"] = state.get("portfolio", {})
    state["logs"] = state.get("logs", [])
    state["logs"].append({
        "message": "Getting ETF metrics...",
        "done": False
    })

    try:
        all_category_etfs = {
            **state.get("top_10_etfs", {}), **state.get("bond_etfs", {})}
        category_metrics = get_category_etf_metrics(all_category_etfs)
        state['category_metrics'] = category_metrics
        state["logs"][-1]["done"] = True
    except Exception as e:
        state["logs"][-1]["done"] = True
        state['logs'].append(
            {"message": f"❌ Failed to get ETF metrics: {str(e)}", "done": True})
    await copilotkit_emit_state(config, state)
    return state


async def select_final_etfs_node(state, config: RunnableConfig):
    print("[STEP] Selecting final ETFs")
    state["portfolio"] = state.get("portfolio", {})
    state["logs"] = state.get("logs", [])
    state["logs"].append({
        "message": "Selecting final ETFs...",
        "done": False
    })
    await copilotkit_emit_state(config, state)

    try:
        category_dfs = filter_and_sort_etfs(state["category_metrics"])
        category_counts = compute_etf_count_by_allocation(
            state['portfolio'].get('initial_allocation', {}),
            total_etfs=10
        )

        final_selected_etfs = []
        for category, df in category_dfs.items():
            desired_count = category_counts.get(category, 1)
            if df.empty:
                state["logs"].append(
                    {"message": f"⚠️ No valid ETFs found for category {category}", "done": True})
                continue

            selected = select_etfs_by_overlap(category, df, desired_count)
            final_selected_etfs.extend(selected)

        state["portfolio"]["holdings"] = final_selected_etfs
        state["logs"][-1]["done"] = True

    except Exception as e:
        state["logs"][-1]["done"] = True
        state['logs'].append(
            {"message": f"❌ Failed to get ETF metrics: {str(e)}", "done": True})

    await copilotkit_emit_state(config, state)
    return state


async def build_portfolio_message_node(state, config: RunnableConfig):
    print("[Step] Building portfolio message")

    state["portfolio"] = state.get("portfolio", {})
    initial_allocation = state["portfolio"].get("initial_allocation", {})
    name = initial_allocation.get("name", "Unnamed Portfolio")
    desc = initial_allocation.get("description", "")
    allocation = initial_allocation.get("allocation", {})
    etfs = state["portfolio"].get("holdings", [])

    allocation_str = "\n".join(
        [f"- {k}: {round(v * 100, 2)}%" for k, v in allocation.items()])
    etf_str = "\n".join([f"- {etf}" for etf in etfs])
    message = (
        f"\n🎯 **Constructed Portfolio**: {name}\n"
        f"📄 {desc}\n\n"
        f"📊 Allocation:\n{allocation_str}\n\n"
        f"✅ Constructed holdings:\n{etf_str}\n\n"
    )

    state["messages"].append(
        AIMessage(content=message)
    )

    return state
