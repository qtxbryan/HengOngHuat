import yfinance as yf
from yahooquery import Ticker, Screener
import pandas as pd
from utils.calculations import calculate_1y_return, calculate_sharpe_ratio, calculate_tracking_error
from constants import CATEGORY_TO_ASSET_CLASS
import time


def safe_ticker_request(symbol, retries=3, backoff=2):
    """Retry wrapper for yahooquery.Ticker"""
    for attempt in range(retries):
        try:
            return Ticker(symbol)
        except Exception as e:
            print(
                f"[Retry {attempt+1}] yahooquery.Ticker failed for {symbol}: {e}")
            time.sleep(backoff ** attempt)
    return None


class StockAnalyzer_v2:
    def __init__(self, ticker: str):
        self.asset_name = ticker
        self.yq = safe_ticker_request(ticker)
        self.asset_info = self._get_asset_info()
        self.key_stats = self._get_key_stats()
        self.etf = 'fundFamily' in self.key_stats.keys()

    def _get_asset_info(self):
        if self.yq:
            try:
                return self.yq.summary_detail.get(self.asset_name, {})
            except Exception as e:
                print(f"Error getting asset info for {self.asset_name}: {e}")
        return {}

    def _get_key_stats(self):
        if self.yq:
            try:
                return self.yq.key_stats.get(self.asset_name, {})
            except Exception as e:
                print(f"Error getting key stats for {self.asset_name}: {e}")
        return {}

    def get_price_data(self, ticker, period="5y"):
        try:
            data = self.yq.history(period=period)
            data = data.xs(ticker, level=0)  # Flatten MultiIndex to just dates
            # <- ✅ Force date index to Timestamp
            data.index = pd.to_datetime(data.index)
            return data[['adjclose']]
        except Exception as e:
            print(f"Error getting price data for {ticker}: {e}")
            return None

    def classify_etfs(self, etfs):
        classified_etfs = {}

        for etf, description in etfs.items():
            classified_etfs[etf] = CATEGORY_TO_ASSET_CLASS.get(
                description, 'Others')

        return classified_etfs

    def get_etf_holdings(self):
        if self.yq and self.etf:
            holdings_df = self.yq.fund_top_holdings

            if isinstance(holdings_df, pd.DataFrame) and not holdings_df.empty:
                if 'holdingName' in holdings_df.columns:
                    return holdings_df
                else:
                    print(f"Required column 'holdingName' not found in holdings_df")
            else:
                print(f"No holdings data found for {self.asset_name}")

        return []

    def get_etf_holdings_top_10(self):
        if not self.yq:
            return []

        try:
            # Returns ETF top holdings as a DataFrame
            holdings_df = self.yq.fund_top_holdings

            if isinstance(holdings_df, pd.DataFrame) and not holdings_df.empty:
                # Ensure 'holdingName' is a valid column
                if 'holdingName' in holdings_df.columns:
                    return holdings_df['holdingName'].head(10).tolist()
                else:
                    print(
                        f"'holdingName' column not found for {self.asset_name}")
            else:
                print(f"No holdings data available for {self.asset_name}")
        except Exception as e:
            print(f"Failed to get ETF holdings for {self.asset_name}: {e}")
        return []

    def get_etf_metrics(self, risk_free_rate_annual=0.04):
        etf_data = {
            "Ticker": self.asset_name,
            "Name": self.asset_info.get("shortName", None),
            "AUM": self.asset_info.get("totalAssets", None),
            "Average Volume": self.asset_info.get("averageVolume", None),
            "Category": CATEGORY_TO_ASSET_CLASS.get(self.key_stats.get("category"), "Others"),
            "3Y_Return": self.key_stats.get("threeYearAverageReturn", None),
            "5Y_Return": self.key_stats.get("fiveYearAverageReturn", None),
            "YTD_Return": self.yq.fund_performance.get(self.asset_name).get("trailingReturns", None).get("ytd", None),
            "Dividend_Yield_Forward": self.asset_info.get("yield", None),
            "Dividend_Yield_Trailing": self.asset_info.get("trailingAnnualDividendYield", None),
            "3Y_Beta": self.key_stats.get("beta3Year", None),
        }

        expense_ratio = None
        turnover_ratio = None

        fund_profile = self.yq.fund_profile
        if fund_profile and isinstance(fund_profile, dict):
            fund_info = fund_profile.get(self.asset_name, {})
            fees_inv = fund_info.get('feesExpensesInvestment', {})

            if fees_inv:
                expense_ratio = fees_inv.get('annualReportExpenseRatio')
                turnover_ratio = fees_inv.get('annualHoldingsTurnover')

        etf_data['Expense_Ratio'] = expense_ratio
        etf_data['Turnover_Ratio'] = turnover_ratio

        hist_df = self.get_price_data(self.asset_name, period="5y")

        if hist_df.empty:
            print(f"No price history for {self.asset_name}")
            etf_data.update({
                "1Y_Return": None,
                "1Y_Sharpe": None,
                "Tracking_Error_1Y": None,
                "1Y_Return_calc": None,
                "Sharpe_1Y": None,
                "Tracking_Error": None,
            })
            return etf_data

        latest_date = hist_df.index.max()

        hist_1y = hist_df.loc[hist_df.index >= (
            latest_date - pd.DateOffset(years=1))]
        hist_3y = hist_df.loc[hist_df.index >= (
            latest_date - pd.DateOffset(years=3))]

        if hist_1y.empty or hist_3y.empty:
            etf_data.update({
                "1Y_Return_calc": None,
                "Sharpe_1Y": None,
                "Tracking_Error": None,
            })
            return etf_data

        etf_data.update({
            "1Y_Return": calculate_1y_return(hist_1y),
            "1Y_Sharpe": calculate_sharpe_ratio(hist_1y, risk_free_rate_annual),
            "Tracking_Error_1Y": calculate_tracking_error(hist_1y, "^GSPC"),
            "1Y_Return_calc": calculate_1y_return(hist_df),
            "Sharpe_1Y": calculate_sharpe_ratio(hist_df, risk_free_rate_annual),
            "Tracking_Error": calculate_tracking_error(hist_df, "^GSPC"),
        })

        return etf_data
