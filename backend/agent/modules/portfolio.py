
from constants import PortfolioConstants, CATEGORY_TO_ASSET_CLASS, BOND_CATEGORIES
from utils.StockAnalyzerFactory import StockAnalyzerFactory
from yahooquery import Screener
from concurrent.futures import ThreadPoolExecutor, as_completed
import pandas as pd
from typing import Dict, List, TypedDict
from langchain_core.runnables import RunnableConfig
from pydantic import ValidationError, BaseModel, Field
from langchain_openai import ChatOpenAI
from pymongo import MongoClient
from collections import defaultdict
from yahooquery import Ticker


class MatchedPortfolio(TypedDict):
    name: str
    allocation: Dict[str, float]
    description: str


class PortfolioResponse(BaseModel):
    name: str = Field(description="The name of the portfolio")
    allocation: Dict[str, float] = Field(
        description="The allocation of the portfolio")
    description: str = Field(description="The description of the portfolio")


def fetch_user_information(config: RunnableConfig):
    """
    Fetch user information from MongoDB

    Returns:
        dict: User information
    """
    configuration = config.get("configurable", {})
    user_id = configuration.get("user_id", None)
    if not user_id:
        raise ValueError("No user id configured")

    mongo_uri = "mongodb+srv://fypuser:testtest@quantfyp.ljw87.mongodb.net/?retryWrites=true&w=majority&appName=quantfyp"
    client = MongoClient(mongo_uri)
    db = client['quantfyp']
    collection = db["user_information"]

    user_info = collection.find_one({"user_id": user_id})

    if user_info:
        user_info.pop("_id", None)
        return user_info

    return {}


def portfolio_match(user_info, config: RunnableConfig):
    """
    Match the user's risk tolerance and investment goals with the most suitable portfolio

    Returns:
        dict: Portfolio information
    """
    # configuration = config.get("configurable", {})
    # user_id = configuration.get("user_id", None)

    # if not user_id:
    #     raise ValueError("No user id configured")

    prompt = f"""
    You are a financial assistant helping match users with suitable investment portfolios.
    
    Given: 
    - User information: 
    {user_info}
    
    - A list of predefined portfolios: 
    {PortfolioConstants.PREDEFINED_PORTFOLIO}
    
    Your task:    
    Please select the most suitable portfolio for the user. Respond with a JSON object containing the portfolio's name, allocation, and description.
    
    Notes:
    - Ensure the weights in the "allocation" sum up exactly 1.0
    - Do not include any commentary, explaination or additonal text outside the JSON object.
    
    """

    # llm = ChatOpenAI(model="gpt-4o", temperature=0)
    # structured_llm = llm.with_structured_output(
    #     PortfolioResponse)

    llm = ChatOpenAI(model="gpt-4o", temperature=0)
    structured_llm = llm.with_structured_output(
        PortfolioResponse, method='json_mode')

    try:
        preconstruct_portfolio = structured_llm.invoke(prompt)
    except ValidationError as e:
        print("Validation error:", e)

    return preconstruct_portfolio.model_dump()


def classify_etfs(etfs: Dict[str, str]) -> Dict[str, str]:
    """
    Classify ETFs based on their category

    Args:
        etfs (dict): ETFs pulled from yfinance

    Returns: 
        dict: ETFs classified by asset class
    """
    classified_etfs = {}

    for etf, category in etfs.items():
        classified_etfs[etf] = CATEGORY_TO_ASSET_CLASS.get(category, "Other")

    return classified_etfs


def retrieve_etfs(limit=120) -> List[str]:
    """
    Retrieve ETFs from the Screener API

    Args:
        limit (int): Number of ETFs to retrieve

    Returns:
        list[str]: List of ETF symbols
    """
    screen = Screener()

    try:
        etf_data = screen.get_screeners('top_performing_etfs', count=limit)

        if not isinstance(etf_data, Dict):
            raise ValueError("Screener API did not return a dictionary")

        symbols = [
            quote["symbol"]
            for quote in etf_data.get("top_performing_etfs", {}).get("quotes", [])
        ]

    except Exception as e:
        print(f"Error retrieving ETFs: {e}")
        return []

    return symbols


def process_etf(portfolio: MatchedPortfolio, symbols: List[str]) -> Dict[str, List[str]]:
    """
    Process ETFs based on matched portfolio allocation

    Args:
        portfolio (MatchedPortfolio): Matched portfolio allocation
        symbols (List[str]): List of ETF symbols

    Returns:
        Dict[str, List[str]]: Top 10 ETFs and bond ETFs for each matched portfolio category
    """

    yq = Ticker(symbols)
    key_stats = yq.key_stats

    etf_categories = {
        symbol: key_stats.get(symbol).get("category", "others")
        for symbol in symbols
    }

    for symbol, category in etf_categories.items():
        print(f"[fetch_category] {symbol}: Category {category}")

    mapped_etfs = classify_etfs(etf_categories)

    filtered_etfs = defaultdict(list)
    for symbol, category in mapped_etfs.items():
        if category in portfolio["allocation"]:
            filtered_etfs[category].append(symbol)

    # Slice top 10 for equity and bond ETFs
    top_10_etfs = {
        cat: etfs[:10] for cat, etfs in filtered_etfs.items() if cat not in BOND_CATEGORIES
    }

    bond_etfs = {
        cat: etfs[:10] for cat, etfs in filtered_etfs.items() if cat in BOND_CATEGORIES
    }

    return top_10_etfs, bond_etfs


def filter_etfs_dataframe(etf_df, bond_df):
    etf_df_filtered = etf_df.dropna(subset=[
        "Expense_Ratio", "AUM", "Average Volume", "3Y_Return", "5Y_Return", "Sharpe_1Y"])

    bond_df_filtered = bond_df.dropna(subset=[
        "Expense_Ratio", "AUM", "Average Volume", "3Y_Return", "5Y_Return", "Sharpe_1Y"])

    stocks_df = etf_df_filtered[
        # Stock ETFs filtering
        (~etf_df_filtered["Category"].isin(BOND_CATEGORIES)) &
        (etf_df_filtered["3Y_Return"] > 0) &
        (etf_df_filtered["5Y_Return"] > 0) &
        (etf_df_filtered["AUM"] > 500_000_000)
    ]

    bonds_df = bond_df_filtered[
        # Bond ETFs filtering
        (bond_df_filtered["Category"].isin(BOND_CATEGORIES)) &
        # Allow slightly negative return
        (bond_df_filtered["3Y_Return"] > -0.02) &
        (bond_df_filtered["AUM"] > 500_000_000) &
        (bond_df_filtered["Expense_Ratio"] <= 0.20)
    ]

    # Combine stocks and bonds
    stocks_df_sorted = stocks_df.sort_values(
        by=["Sharpe_1Y", "AUM", "Average Volume"], ascending=[False, False, False]
    )

    bonds_df_sorted = bonds_df.sort_values(
        by=["Sharpe_1Y", "AUM", "Average Volume"], ascending=[False, False, False]
    )

    return stocks_df_sorted, bonds_df_sorted


def overlap_check(selected_etfs, holdings_data):
    overlap_count = {}

    for etf1 in selected_etfs:
        for etf2 in selected_etfs:
            if etf1 != etf2:
                common_holdings = set(holdings_data.get(etf1, [])) & set(
                    holdings_data.get(etf2, []))
                # % of overlapping holdings
                overlap_percentage = (len(common_holdings) / 10) * 100

                overlap_count[(etf1, etf2)] = overlap_percentage

    return overlap_count


def get_category_etf_metrics(all_category_etfs: Dict[str, List[str]]) -> Dict[str, List[dict]]:
    all_tickers = list({ticker for tickers in all_category_etfs.values()
                        for ticker in tickers})

    print(f"[BATCH] Fetching ETF metrics for {all_tickers} tickers")

    etf_metrics = {}
    for ticker in all_tickers:
        try:
            analyzer = StockAnalyzerFactory.get_analyzer(ticker)
            metrics = analyzer.get_etf_metrics()
            if metrics:
                etf_metrics[ticker] = metrics
                print(f"[fetch_metrics] {ticker}: Success")
            else:
                print(f"[fetch_metrics] {ticker}: No data")
        except Exception as e:
            print(f"[ERROR] {ticker} failed: {e}")

    category_metrics: Dict[str, List[dict]] = defaultdict(list)
    for category, tickers in all_category_etfs.items():
        for ticker in tickers:
            if ticker in etf_metrics:
                category_metrics[category].append(etf_metrics[ticker])

    return dict(category_metrics)


def filter_and_sort_etfs(category_metrics: Dict[str, List[dict]]) -> Dict[str, pd.DataFrame]:
    category_dfs: Dict[str, pd.DataFrame] = {}

    for category, metrics in category_metrics.items():
        df = pd.DataFrame(metrics)
        if df.empty:
            continue

        df_filtered = df.dropna(subset=[
                                "Expense_Ratio", "AUM", "Average Volume", "3Y_Return", "5Y_Return", "Sharpe_1Y"])

        if category in BOND_CATEGORIES:
            df_filtered = df_filtered[
                (df_filtered["3Y_Return"] > -0.02) &
                (df_filtered["AUM"] > 500_000_000) &
                (df_filtered["Expense_Ratio"] <= 0.20)
            ]

        elif category == "REITs":
            # 🛠 Relaxed conditions for REITs
            df_filtered = df_filtered[
                (df_filtered["AUM"] > 250_000_000) &
                (df_filtered["Expense_Ratio"] <= 0.30)
            ]

        else:
            df_filtered = df_filtered[
                (df_filtered["3Y_Return"] > 0) &
                (df_filtered["5Y_Return"] > 0) &
                (df_filtered["AUM"] > 500_000_000)
            ]

        df_sorted = df_filtered.sort_values(
            by=["Sharpe_1Y", "AUM", "Average Volume"], ascending=[False, False, False]
        )

        category_dfs[category] = df_sorted

    return category_dfs


def compute_etf_count_by_allocation(allocation: Dict[str, float], total_etfs: int) -> Dict[str, int]:
    """Compute how many ETFs to select per category based on portfolio allocation."""
    return {
        category: max(1, round(total_etfs * weight))
        for category, weight in allocation.items()
    }


def fetch_holdings_parallel(tickers: List[str]) -> Dict[str, List[str]]:
    def fetch(ticker):
        return ticker, StockAnalyzerFactory.get_analyzer(ticker).get_etf_holdings_top_10()

    results = {}
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = {executor.submit(fetch, t): t for t in tickers}
        for future in as_completed(futures):
            try:
                ticker, holdings = future.result()
                results[ticker] = holdings
            except Exception as e:
                print(f"[Error] Fetching holdings failed: {e}")
    return results


def select_etfs_by_overlap(category: str, df: pd.DataFrame, count: int) -> List[str]:
    """Select ETFs from a category while minimizing holding overlap."""
    tickers = df["Ticker"].tolist(
    )[:count * 2]  # pull extras in case we filter some out

    holdings_data = fetch_holdings_parallel(tickers)

    overlap = overlap_check(tickers, holdings_data)
    overlap_df = pd.DataFrame(overlap.items(), columns=[
                              "ETF Pair", "Overlap Percentage"])
    overlap_df = overlap_df.sort_values(
        by="Overlap Percentage", ascending=False)

    overlapping_pairs = overlap_df[overlap_df["Overlap Percentage"]
                                   > 30]["ETF Pair"].tolist()
    filtered = set(tickers)
    for etf1, etf2 in overlapping_pairs:
        if etf1 in filtered and etf2 in filtered:
            filtered.remove(etf2)

    selected = list(filtered)[:count]
    return selected


def print_final_portfolio_breakdown(etfs: List[str]):
    """Optional: Debug print of selected ETF categories."""
    print("\n------ Final Portfolio Breakdown ------")
    for etf in etfs:
        cat = StockAnalyzerFactory.get_analyzer(
            etf).asset_info.get("category", "Unknown")
        print(f"{etf} → {cat}")
