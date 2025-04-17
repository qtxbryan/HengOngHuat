from collections import defaultdict
from typing import Dict, List

from constants import BOND_CATEGORIES
from utils.StockAnalyzerFactory import StockAnalyzerFactory
from utils.etf_utils import classify_etfs, overlap_check


from yahooquery import Ticker
import pandas as pd


def process_etf_batch(portfolio, symbols):
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


def get_category_etf_metrics_batch(all_category_etfs: Dict[str, List[str]]) -> Dict[str, List[dict]]:
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


def fetch_holdings_batch(tickers: List[str]) -> Dict[str, List[str]]:
    """
    Sequentially fetch top 10 holdings for each ETF in the tickers list.
    Avoids thread pool to reduce API rate limit hits.
    Returns: { ticker: [holdings] }
    """
    holdings_data = {}

    print(f"[BATCH] Fetching holdings for {len(tickers)} ETFs...")

    for ticker in tickers:
        try:
            analyzer = StockAnalyzerFactory.get_analyzer(ticker)
            top_holdings = analyzer.get_etf_holdings_top_10()
            holdings_data[ticker] = top_holdings
            print(f"[fetch_holdings] {ticker}: {len(top_holdings)} holdings")
        except Exception as e:
            print(f"[ERROR] Failed to fetch holdings for {ticker}: {e}")

    return holdings_data


def select_etfs_by_overlap(category: str, df: pd.DataFrame, count: int) -> List[str]:
    """Select ETFs from a category while minimizing holding overlap."""
    tickers = df["Ticker"].tolist(
    )[:count * 2]  # pull extras in case we filter some out

    holdings_data = fetch_holdings_batch(tickers)

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
