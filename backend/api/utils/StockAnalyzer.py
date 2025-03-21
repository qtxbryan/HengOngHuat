import yfinance as yf
from yahooquery import Ticker, Screener
import pandas as pd
from api.calculations import calculate_1y_return, calculate_sharpe_ratio, calculate_tracking_error
from api.constants import CATEGORY_TO_ASSET_CLASS


class StockAnalyzer:
    def __init__(self, ticker):
        self.asset_name = ticker
        self.asset = self._get_asset(ticker)
        self.asset_info = self.asset.info
        self.company_name = self.asset_info['shortName']
        self.etf = 'fundFamily' in self.asset_info.keys()

    def _get_asset(self, ticker):
        try:
            asset = yf.Ticker(ticker)
            return asset
        except Exception as e:
            print(f"Error getting asset for {ticker}: {e}")
            return None

    def get_price_data(self, ticker, period="5y"):
        data = yf.download(ticker, period=period)['Close']
        return data

    def classify_etfs(self, etfs):
        classified_etfs = {}

        for etf, description in etfs.items():
            classified_etfs[etf] = CATEGORY_TO_ASSET_CLASS.get(
                description, 'Others')

        return classified_etfs

    def get_etf_holdings(self):
        etf = Ticker(self.asset_name)
        holdings_df = etf.fund_top_holdings

        if isinstance(holdings_df, pd.DataFrame) and not holdings_df.empty:
            if 'holdingName' in holdings_df.columns:
                return holdings_df
            else:
                print(f"Required column 'holdingName' not found in holdings_df")
        else:
            print(f"No holdings data found for {self.asset_name}")

        return []

    def get_etf_holdings_top_10(self):
        etf = Ticker(self.asset_name)
        holdings_df = etf.fund_top_holdings  # Returns ETF top holdings as a DataFrame

        if isinstance(holdings_df, pd.DataFrame) and not holdings_df.empty:
            # Ensure 'holdingName' is a valid column
            if 'holdingName' in holdings_df.columns:
                return holdings_df['holdingName'].head(10).tolist()
            else:
                print(f"'holdingName' column not found for {self.asset_name}")
        else:
            print(f"No holdings data available for {self.asset_name}")
        return []

    def get_etf_metrics(self, risk_free_rate_annual=0.04):
        etf_data = {}

        # Data from yfinance
        etf_data['Ticker'] = self.asset_name
        etf_data['Name'] = self.asset_info['longName']
        etf_data['AUM'] = self.asset_info.get('totalAssets', None)
        etf_data['Average Volume'] = self.asset_info.get('averageVolume', None)
        original_category = self.asset_info.get('category', None)
        etf_data['Category'] = CATEGORY_TO_ASSET_CLASS.get(
            original_category, 'Others')
        etf_data['3Y_Return'] = self.asset_info.get(
            'threeYearAverageReturn', None)
        etf_data['5Y_Return'] = self.asset_info.get(
            'fiveYearAverageReturn', None)
        etf_data['YTD_Return'] = self.asset_info.get('ytdReturn', None)
        etf_data['Dividend_Yield_Forward'] = self.asset_info.get('yield', None)
        etf_data['Dividend_Yield_Trailing'] = self.asset_info.get(
            'trailingAnnualDividendYield', None)
        etf_data['3Y_Beta'] = self.asset_info.get('beta3Year', None)

        # Additional data from Yahoo Query
        etf_yq = Ticker(self.asset_name)
        fund_profile = etf_yq.fund_profile
        expense_ratio = None
        turnover_ratio = None

        if fund_profile.get(self.asset_name):
            fees_inv = fund_profile[self.asset_name].get(
                'feesExpensesInvestment')
            if fees_inv:
                expense_ratio = fees_inv.get('annualReportExpenseRatio')
                turnover_ratio = fees_inv.get('annualHoldingsTurnover')

        etf_data['Expense_Ratio'] = expense_ratio
        etf_data['Turnover_Ratio'] = turnover_ratio

        hist_df = self.asset.history(period="5y")

        hist_1y = hist_df.loc[hist_df.index >= (
            hist_df.index.max() - pd.DateOffset(years=1))]
        hist_3y = hist_df.loc[hist_df.index >= (
            hist_df.index.max() - pd.DateOffset(years=3))]

        if hist_df.empty or hist_1y.empty or hist_3y.empty:
            etf_data['1Y_Return_calc'] = None
            etf_data['Sharpe_1Y'] = None
            etf_data['Tracking_Error'] = None
            return etf_data

        etf_data['1Y_Return'] = calculate_1y_return(hist_1y)
        etf_data['1Y_Sharpe'] = calculate_sharpe_ratio(
            hist_1y, risk_free_rate_annual)
        etf_data['Tracking_Error_1Y'] = calculate_tracking_error(
            hist_1y, "^GSPC")

        etf_data['1Y_Return_calc'] = calculate_1y_return(hist_df)
        etf_data['Sharpe_1Y'] = calculate_sharpe_ratio(
            hist_df, risk_free_rate_annual)
        etf_data['Tracking_Error'] = calculate_tracking_error(hist_df, "^GSPC")

        return etf_data
