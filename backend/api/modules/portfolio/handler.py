from api.models.portfolio import Portfolio
from api.extensions import mongo
from typing import List, Optional, Dict
import logging
from api.utils.PortfolioAnalyzer import PortfolioAnalyzer
from api.utils.StockAnalyzer import StockAnalyzer
import json
import yfinance as yf
import pandas as pd

logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)

user_information_collection = mongo.db.user_information
portfolio_collection = mongo.db.portfolio


def get_portfolios(user_id: str) -> List[Portfolio]:
    """
    Fetch all portfolios 
    """
    # fetch the user information
    portfolio_doc = portfolio_collection.find_one(
        {"user_id": user_id})

    if portfolio_doc and "portfolios" in portfolio_doc:
        portfolios = portfolio_doc["portfolios"]

        processed_portfolios = []

        for portfolio in portfolios:
            name = portfolio["name"]
            stocks = portfolio["stocks"]
            weights = portfolio["weights"]
            start_date = portfolio['start_date']
            end_date = portfolio['end_date']
            initial_investment = 10000

            analyzer = PortfolioAnalyzer(
                stocks, weights, start_date, end_date, initial_investment)
            metrics = json.loads(analyzer.get_portfolio_metrics())
            portfolio_value = initial_investment * \
                (1 + metrics['Cumulative Return'])
            portfolio_return = metrics['Annualized Return']
            benchmark_return = metrics['Alpha'] + \
                portfolio_return if metrics['Alpha'] else portfolio_return - 0.1
            profit_loss_percentage = portfolio_return - benchmark_return

            composition = [
                {"ticker": ticker, "weight": weight} for ticker, weight in zip(stocks, weights)
            ]

            processed_portfolios.append({
                "portfolio_name": name,
                "portfolio_value": round(portfolio_value, 2),
                "portfolio_return": round(portfolio_return, 2),
                "benchmark_return": round(benchmark_return, 2),
                "profit_loss_percentage": round(profit_loss_percentage, 2),
                "composition": composition
            })

        return processed_portfolios

    LOGGER.info(f"No portfolios found for user: {user_id}")
    return []


def total_portfolio_value(user_id: str) -> List[Dict]:
    """
    Calculate the total portfolio value for a user
    """
    try:
        all_portfolios = get_portfolios(user_id)

        if not all_portfolios:
            return {
                "total_portfolio_value": 0,
                "portfolio_timeseries": {"dates": [], "values": []},
                "benchmark_timeseries": {"dates": [], "values": []},
                "profit_loss_percentage": 0,
            }

        total_value = sum(p["portfolio_value"] for p in all_portfolios)

        portfolio_timeseries = {"dates": [],
                                "values": []}
        benchmark_timeseries = {"dates": [],
                                "values": []}

        LOGGER.info(f"All portfolios: {all_portfolios}")

        portfolio_doc = portfolio_collection.find_one({"user_id": user_id})

        if portfolio_doc and "portfolios" in portfolio_doc:
            portfolios = portfolio_doc["portfolios"]

            for portfolio in portfolios:
                stocks = portfolio["stocks"]
                weights = portfolio["weights"]
                start_date = portfolio["start_date"]
                end_date = portfolio["end_date"]
                initial_investment = 10000

                try:
                    analyzer = PortfolioAnalyzer(
                        stocks, weights, start_date, end_date, initial_investment)

                    ts = analyzer.get_portfolio_timeseries()

                    dates = [date.strftime('%Y-%m-%d') for date in ts.index]
                    values = [float(val) for val in ts["Portfolio Value"]]

                    portfolio_timeseries["dates"].extend(dates)
                    portfolio_timeseries["values"].extend(values)

                    benchmark_data = yf.Ticker("^GSPC").history(
                        start=start_date, end=end_date)
                    benchmark_dates = [date.strftime(
                        '%Y-%m-%d') for date in benchmark_data.index]
                    benchmark_values = [float(val)
                                        for val in benchmark_data["Close"]]

                    benchmark_timeseries["dates"].extend(benchmark_dates)
                    benchmark_timeseries["values"].extend(benchmark_values)

                except ValueError as e:
                    LOGGER.error(f"Error processing portfolio: {e}")
                    continue

            if all_portfolios:
                total_profit_loss_percentage = sum(
                    p["profit_loss_percentage"] for p in all_portfolios) / len(all_portfolios)

        return {
            "total_portfolio_value": round(total_value, 2),
            "portfolio_timeseries": portfolio_timeseries,
            "benchmark_timeseries": benchmark_timeseries,
            "profit_loss_percentage": round(total_profit_loss_percentage, 4),
        }

    except Exception as e:
        LOGGER.error(f"Error calculating total portfolio value: {e}")
        # Return empty data structure instead of raising an exception
        return {
            "total_portfolio_value": 0,
            "portfolio_timeseries": {"dates": [], "values": []},
            "benchmark_timeseries": {"dates": [], "values": []},
            "profit_loss_percentage": 0,
        }


def get_portfolio(user_id: str, p_name: str) -> Optional[Portfolio]:
    """
    Fetch a specific portfolio
    """
    try:
        # fetch the user information
        portfolio_doc = portfolio_collection.find_one(
            {"user_id": user_id})

        if not portfolio_doc:
            LOGGER.error(
                f"User {user_id} not found in portfolio collection")
            return None

        # Search portfolio by name
        portfolios = portfolio_doc.get('portfolios', [])
        for portfolio_data in portfolios:
            if portfolio_data.get('name') == p_name:
                return Portfolio(**portfolio_data)

        LOGGER.info(f"Portfolio {p_name} not found for user {user_id}")
        return None
    except Exception as err:
        LOGGER.error(f'Error retrieving portfolio {
                     p_name} for user {user_id}: {err}')
        raise


def get_individual_portfolio_metrics(user_id: str, p_name: str) -> Optional[Dict]:
    """
    Get the metrics for a specific portfolio
    """
    portfolio = get_portfolio(user_id, p_name)
    LOGGER.info(f"Portfolio: {portfolio}")

    if not portfolio:
        LOGGER.error(f"Portfolio {p_name} not found for user {user_id}")
        return None

    stocks = portfolio.stocks
    weights = portfolio.weights
    start_date = portfolio.start_date
    end_date = portfolio.end_date
    initial_investment = 10000

    analyzer = PortfolioAnalyzer(
        stocks, weights, start_date, end_date, initial_investment)
    metrics = json.loads(analyzer.get_portfolio_metrics())

    return metrics


def get_individual_portfolio_asset_allocation(user_id: str, p_name: str) -> Optional[Dict]:
    """
    Get the asset allocation for a specific portfolio
    """
    portfolio = get_portfolio(user_id, p_name)
    LOGGER.info(f"Portfolio: {portfolio}")

    if not portfolio:
        LOGGER.error(f"Portfolio {p_name} not found for user {user_id}")
        return None

    stocks = portfolio.stocks
    weights = portfolio.weights

    allocation = []

    for stock, weight in zip(stocks, weights):
        analyzer = StockAnalyzer(stock)
        asset_class = analyzer.get_etf_metrics().get("Category", "Others")
        allocation.append({
            "ticker": stock,
            "weight": weight,
            "asset_class": asset_class
        })

    return allocation


def get_individual_portfolio_holdings(user_id: str, p_name: str) -> Optional[Dict]:
    """
    Get the holdings for a specific portfolio
    """
    portfolio = get_portfolio(user_id, p_name)
    LOGGER.info(f"Portfolio: {portfolio}")

    if not portfolio:
        LOGGER.error(f"Portfolio {p_name} not found for user {user_id}")
        return None

    stocks = portfolio.stocks
    weights = portfolio.weights

    etf_holdings = {}
    bond_holdings = []
    stock_holdings = []
    bond_categories = {"Intermediate Bonds",
                       "International Bonds", "Short Term Bonds", "Long Term Bonds"}

    for stock, weight in zip(stocks, weights):
        analyzer = StockAnalyzer(stock)
        etf_metrics = analyzer.get_etf_metrics()
        category = etf_metrics.get("Category", "Others")

        if analyzer.etf and category not in bond_categories:
            holdings_df = analyzer.get_etf_holdings()
            if not holdings_df.empty:
                etf_holdings[stock] = {
                    "Underlying_Symbol": list(holdings_df["symbol"].values),
                    "Underlying_Name": list(holdings_df["holdingName"].values),
                    "weight": list(holdings_df["holdingPercent"].values),
                    "category": [category] * len(holdings_df)
                }
            else:
                etf_holdings[stock] = {
                    "Underlying_Symbol": [],
                    "Underlying_Name": [],
                    "weight": [],
                    "category": []
                }
        elif category in bond_categories:
            bond_holdings.append({
                "ticker": stock,
                "weight": weight,
                "category": category
            })
        else:
            stock_holdings.append({
                "ticker": stock,
                "weight": weight,
                "category": category
            })

    return {
        "ETF": etf_holdings,
        "Bond_ETF": bond_holdings,
        "Stocks": stock_holdings
    }


def retrieve_individual_portfolio_top_movers(user_id: str, p_name: str, rank: int = 5) -> Optional[Dict]:
    """
    Retrieve the top movers for a specific portfolio
    """
    portfolio = get_portfolio(user_id, p_name)
    LOGGER.info(f"Portfolio: {portfolio}")

    if not portfolio:
        LOGGER.error(f"Portfolio {p_name} not found for user {user_id}")
        return None

    stocks = portfolio.stocks
    weights = portfolio.weights
    start_date = portfolio.start_date
    end_date = portfolio.end_date
    initial_investment = 10000

    analyzer = PortfolioAnalyzer(
        stocks, weights, start_date, end_date, initial_investment)
    time_series = analyzer.get_portfolio_timeseries()

    top_movers = {}
    top_movers['ticker'] = []
    top_movers['latest_price'] = []
    top_movers['7d_change'] = []

    for column in time_series.columns:
        if column == 'Portfolio Value':
            continue
        top_movers['ticker'].append(column)
        top_movers['latest_price'].append(time_series[column].iloc[-1])
        top_movers['7d_change'].append(round(
            (time_series[column].iloc[-1] - time_series[column].iloc[-7])/time_series[column].iloc[-7] * 100, 2))

    df_top_movers = pd.DataFrame(top_movers).sort_values(
        by="7d_change", ascending=False)

    top_movers = {
        'ticker': list(df_top_movers.iloc[:rank]['ticker'].values),
        'latest_price': list(df_top_movers.iloc[:rank]['latest_price'].values),
        '7d_change': list(df_top_movers.iloc[:rank]['7d_change'].values)
    }

    return top_movers


def retrieve_individual_portfolio_max_drawdown(user_id: str, p_name: str) -> Optional[Dict]:
    """
    Retrieve the max drawdown for a specific portfolio
    """
    portfolio = get_portfolio(user_id, p_name)
    LOGGER.info(f"Portfolio: {portfolio}")

    if not portfolio:
        LOGGER.error(f"Portfolio {p_name} not found for user {user_id}")
        return None

    stocks = portfolio.stocks
    weights = portfolio.weights
    start_date = min(portfolio.start_date)
    end_date = max(portfolio.end_date)
    initial_investment = 10000

    analyzer = PortfolioAnalyzer(
        stocks, weights, start_date, end_date, initial_investment)
    ts = analyzer.get_portfolio_timeseries()
    rolling_max = ts["Portfolio Value"].cummax()
    drawdown_series = ts["Portfolio Value"] - rolling_max

    return {
        "dates": list(ts.index),
        "values": list(drawdown_series),
    }


def add_portfolio(user_id: str, new_portfolio: Portfolio) -> Portfolio:
    """
    Add a new portfolio to a user's portfolio list
    """
    try:
        portfolio_doc = portfolio_collection.find_one({"user_id": user_id})

        if not portfolio_doc:
            portfolio_doc = {
                "user_id": user_id,
                "portfolios": []
            }

            portfolio_collection.insert_one(portfolio_doc)
            LOGGER.info(f"Created new portfolio document for user {user_id}")
            portfolios = []
        else:
            portfolios = portfolio_doc.get('portfolios', [])

        for portfolio in portfolios:
            if portfolio.get('name') == new_portfolio.name:
                LOGGER.error(
                    f"Portfolio with name {new_portfolio.name} already exists for user {user_id}")
                return None

        # add new portfolio to the list
        portfolios.append(new_portfolio.model_dump())

        portfolio_collection.update_one(
            {'user_id': user_id},
            {'$set': {'portfolios': portfolios}},
            upsert=True
        )

        LOGGER.info(f"Portfolio added for user_id {user_id}")

        return new_portfolio

    except Exception as err:
        LOGGER.error(f"Error adding portfolio: {err}")
        raise


def delete_portfolio(user_id: str, portfolio_name: str) -> bool:
    """
    Delete a specific portfolio for a user 
    """
    try:
        portfolio_doc = portfolio_collection.find_one(
            {"user_id": user_id})

        if not portfolio_doc:
            LOGGER.error(
                f'User {user_id} not found in portfolio collection')
            return False

        # filter out the portfolio with matching name
        portfolios = portfolio_doc.get('portfolios', [])
        updated_portfolios = [
            p for p in portfolios if p.get('portfolio_name') != portfolio_name
        ]

        if len(portfolios) == len(updated_portfolios):
            LOGGER.info(
                f'Portfolio {portfolio_name} not found for user {user_id}')
            return False

        portfolio_collection.update_one(
            {'user_id': user_id},
            {'$set': {'portfolios': updated_portfolios}}
        )
        LOGGER.info(f'Portfolio {portfolio_name} deleted for user {user_id}')
        return True
    except Exception as err:
        LOGGER.error(f'Error deleting portfolio {
                     portfolio_name} for user {user_id}: {err}')
        raise


def update_portfolio(user_id: str, portfolio_name: str, data: dict) -> Optional[Portfolio]:
    """
    Update a specific portfolio for a user 
    """
    try:
        portfolio_doc = portfolio_collection.find_one(
            {"user_id": user_id})

        if not portfolio_doc:
            LOGGER.error(
                f'User {user_id} not found in portfolio collection')
            return None

        # filter out the portfolio with matching name
        portfolios = portfolio_doc.get('portfolios', [])
        for portfolio in portfolios:
            if portfolio.get('portfolio_name') == portfolio_name:
                # Update the portfolio with the provided data
                portfolio.update(
                    {k: v for k, v in data.items() if v is not None})
                break
            else:
                LOGGER.info(
                    f'Portfolio {portfolio_name} not found for user {user_id}')
                return None

        portfolio_collection.update_one(
            {'user_id': user_id},
            {'$set': {'portfolios': portfolios}}
        )

        LOGGER.info(f'Portfolio {portfolio_name} updated for user {user_id}')
        return Portfolio(**portfolio)

    except Exception as err:
        LOGGER.error(f'Error updating portfolio {
                     portfolio_name} for user {user_id}: {err}')
        raise


def get_constituent_table(stocks: str, weights: str, start_date: str, end_date: str, initialInvestment: float) -> Dict:
    """
    Get the constituent table for given portfolio
    """
    try:
        portfolio_evaluator = PortfolioAnalyzer(
            stocks, weights, start_date, end_date, initialInvestment
        )

        timeseries_dict = {
            'value': portfolio_evaluator.get_correct_format_portfolio_timeseries(),
        }

        return timeseries_dict

    except Exception as err:
        LOGGER.error(f'Error generating constituent table: {err}')
        raise


def get_portfolio_metrics(stocks: str, weights: str, start_date: str, end_date: str, initialInvestment: float) -> Dict:
    """
    Get the portfolio metrics
    """
    try:
        portfolio_evaluator = PortfolioAnalyzer(
            stocks, weights, start_date, end_date, initialInvestment
        )
        metrics = portfolio_evaluator.calculate_metrics()
        return metrics
    except Exception as err:
        LOGGER.error(f'Error calculating portfolio metrics: {err}')
        raise


def get_return_timeseries(stocks: str, weights: str, start_date: str, end_date: str, initialInvestment: float, interval: str) -> Dict:
    """
    Get the return timeseries for the portfolio
    """
    try:
        portfolio_evaluator = PortfolioAnalyzer(
            stocks, weights, start_date, end_date, initialInvestment
        )
        return_timeseries = portfolio_evaluator.analyse_returns_timeseries(
            interval)
        return return_timeseries
    except Exception as err:
        LOGGER.error(f'Error calculating return timeseries: {err}')
        raise
