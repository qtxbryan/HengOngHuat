
import pandas as pd
import numpy as np
import yfinance as yf

""" Calculation helper functions """


def calculate_1y_return(hist_df):
    """
    Calculates a simple 1 year total return from price and dividends.
    Uses 'Close' and 'Dividends' Columns in yfinance's history dataframe
    """

    if len(hist_df) < 252:
        return None  # Not enough data for 1 year return

    last_date = hist_df.index.max()
    one_year_ago_date = last_date - pd.DateOffset(years=1)

    try:
        loc_idx = hist_df.index.get_loc(one_year_ago_date)
    except KeyError:
        # If exact match not found, get nearest index
        loc_idx = hist_df.index.searchsorted(one_year_ago_date)
        # Ensure loc_idx is within data
        if loc_idx >= len(hist_df):
            loc_idx = len(hist_df) - 1

    start_price = hist_df['Close'].iloc[loc_idx]
    end_price = hist_df['Close'].iloc[-1]
    # Sum dividends from the start index to the end
    dividends_sum = hist_df['Dividends'].iloc[loc_idx:].sum()

    total_return = (end_price - start_price + dividends_sum) / start_price
    return total_return


def calculate_sharpe_ratio(hist_df, annual_rf=0.04):
    """
    Calculates the Sharpe Ratio based on daily returns, given an annual risk-free rate (annual_rf).
    """
    df = hist_df.copy()
    df['Daily_Return'] = df['Close'].pct_change()
    df.dropna(subset=['Daily_Return'], inplace=True)

    # Convert annual risk-free rate to daily
    daily_rf = (1 + annual_rf)**(1/252) - 1

    df['Excess_Return'] = df['Daily_Return'] - daily_rf

    avg_excess_daily = df['Excess_Return'].mean()
    std_excess_daily = df['Excess_Return'].std()

    # Annualize
    avg_excess_annual = avg_excess_daily * 252
    std_excess_annual = std_excess_daily * np.sqrt(252)

    if std_excess_annual != 0:
        return avg_excess_annual / std_excess_annual
    else:
        return None


def calculate_tracking_error(etf_df, benchmark_symbol="^GSPC"):
    """
    Calculate tracking error by comparing ETF returns to benchmark returns (S&P 500 = ^GSPC).
    """
    # Get benchmark data
    bench_hist = yf.Ticker(benchmark_symbol).history(period="5y")

    if bench_hist.empty:
        return None  # fallback if no data

    df = pd.DataFrame({
        "ETF_Close": etf_df["Close"],
        "Benchmark_Close": bench_hist["Close"]
    }).dropna()

    df["ETF_Return"] = df["ETF_Close"].pct_change()
    df["Bench_Return"] = df["Benchmark_Close"].pct_change()
    df.dropna(inplace=True)

    df["Diff"] = df["ETF_Return"] - df["Bench_Return"]
    daily_std = df["Diff"].std()
    return daily_std * np.sqrt(252)
