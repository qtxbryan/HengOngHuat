CATEGORY_TO_ASSET_CLASS = {
    "Large Blend": "Large Cap Blend",
    "Large Value": "Large Cap Value",
    "Small Blend": "Small Cap Blend",
    "Small Value": "Small Cap Value",
    "Foreign Large Blend": "International Large Cap Blend",
    "Foreign Large Value": "International Large Cap Value",
    "Foreign Small/Mid Blend": "International Small Cap Blend",
    "Foreign Small/Mid Value": "International Small Cap Value",
    "Diversified Emerging Mkts": "Emerging Markets",
    "Intermediate Core Bond": "Intermediate Bonds",
    "World Bond": "International Bonds",
    "Short-Term Bond": "Short Term Bonds",
    "Long-Term Bond": "Long Term Bonds",
    "Real Estate": "REITs",
    "Commodities Focused": "Commodities",
    "Precious Metals": "Gold",
    "Cash": "Cash",
}

BOND_CATEGORIES = {
    "Intermediate Bonds",
    "Short Term Bonds",
    "Long Term Bonds",
    "International Bonds"
}


class RouteConstants:
    ANALYSIS_METHODS = {
        "return_ts": "get_return_time_series",
        "time_series": "get_time_series",
        "metrics": "get_metrics",
        "type_pie": "get_asset_exposure",
        "sectoral_pie": "get_sector_exposure",
        "constituent_pie": "get_constituent",
        "max_drawdown": "get_max_drawdown_ts",
        "allocation_drift_ts": "get_allocation_drift_ts",
        "top_movers": "get_top_movers",
        "sectoral_ts": "get_sector_ts",
        "drift_sectoral_ts": "get_drift_sector_ts",
        "sector_box_chart": "get_sector_box_chart",
        "sector_metrics": "get_sector_metrics",
        "constituent_table": "get_constituent_table",
        "portfolio_summary": "get_portfolio_summary",
        "portfolio_rec": "get_portfolio_recommendation",
    }


class PortfolioConstants:
    PREDEFINED_PORTFOLIO = [
        {
            "name": "7Twelve Portfolio",
            "allocation": {
                "Large Cap Blend": 0.125,
                "Small Cap Blend": 0.125,
                "International Large Cap Blend": 0.0415,
                "International Small Cap Blend": 0.0415,
                "Emerging Markets": 0.083,
                "Intermediate Bonds": 0.017,
                "International Bonds": 0.083,
                "Cash": 0.083,
                "Commodities": 0.166,
                "REITs": 0.083,
            },
            "description": "A diversified portfolio that spreads investments across 12 different asset classes aiming for a balance between growth and income. Suitable for medium to long-term investors with moderate risk tolerance. Ideal for those seeking broad market exposure and those with an intermediate level of investment knowledge.",
        },
        {
            "name": "All Seasons Portfolio",
            "allocation": {
                "Large Cap Blend": 0.3,
                "Long Term Bonds": 0.4,
                "Intermediate Bonds": 0.15,
                "Commodities": 0.075,
                "Gold": 0.075
            },
            "description": "Designed to perform well across various economic conditions with a mix of stocks, bonds, commodities, and Treasury Inflation-Protected Securities (TIPS). Good for investors with a low to moderate risk tolerance and a long-term investment horizon.",
        },
        {
            "name": "Classic 60-40 Portfolio",
            "allocation": {
                "Large Cap Blend": 0.6,
                "Intermediate Bonds": 0.4,
            },
            "description": "A traditional portfolio with 60% allocated to stocks for growth and 40% to bonds for income and stability. Best for investors with a moderate risk tolerance and a medium to long-term horizon.",
        },
        {
            "name": "Coffeehouse Portfolio",
            "allocation": {
                "Large Cap Blend": 0.1,
                "Large Cap Value": 0.1,
                "Small Cap Blend": 0.1,
                "Small Cap Value": 0.1,
                "International Large Cap Blend": 0.1,
                "Intermediate Bonds": 0.4,
                "REITs": 0.1,
            },
            "description": "Focuses on diversification across several asset classes including stocks and bonds, with a tilt towards value investing. Suitable for investors looking for a mix of growth and income with a moderate risk tolerance.",
        },
        {
            "name": "Core Four Portfolio",
            "allocation": {
                "Large Cap Blend": 0.48,
                "International Large Cap Blend": 0.24,
                "Intermediate Bonds": 0.2,
                "REITs": 0.08,
            },
            "description": "A simple, low-cost portfolio that includes domestic and international stocks, bonds, and real estate. It's designed for investors who prefer a straightforward approach with broad market exposure.",
        },
        {
            "name": "Global Market Portfolio",
            "allocation": {
                "Large Cap Blend": 0.45,
                "Emerging Markets": 0.05,
                "Intermediate Bonds": 0.44,
                "REITs": 0.04,
                "Gold": 0.02
            },
            "description": "Mimics the global investment market composition, suitable for investors seeking exposure to both domestic and international equities and bonds. Ideal for those with moderate to high risk tolerance and a long-term perspective.",
        },
        {
            "name": "Golden Butterfly Portfolio",
            "allocation": {
                "Large Cap Blend": 0.2,
                "Small Cap Value": 0.2,
                "Long Term Bonds": 0.2,
                "Short Term Bonds": 0.2,
                "Gold": 0.2,
            },
            "description": "Balances growth and safety by dividing investments among stocks, bonds, and gold. Suitable for investors looking for protection against inflation and recessions while still aiming for growth.",
        },
        {
            "name": "Ideal Index Portfolio",
            "allocation": {
                "Large Cap Blend": 0.0625,
                "Large Cap Value": 0.0925,
                "Small Cap Growth": 0.0625,
                "Small Cap Value": 0.0925,
                "Short Term Bonds": 0.30,
                "REITs": 0.08,
                "International Large Cap Blend": 0.31
            },
            "description": "Built entirely with index funds to capture market returns at a low cost. Best for investors who prefer a passive management strategy and have a long-term investment horizon.",
        },
        {
            "name": "Ivy Portfolio",
            "allocation": {
                "Intermediate Bonds": 0.2,
                "Commodities": 0.2,
                "REITs": 0.2,
                "Large Cap Blend": 0.2,
                "International Large Cap Blend": 0.2,
            },
            "description": "Mimics the diversified, alternative investment strategies of Ivy League endowments. Suitable for sophisticated investors seeking growth with a balanced approach to risk through diversification across asset classes.",
        },
        {
            "name": "Larry Portfolio",
            "allocation": {
                "Small Cap Value": 0.15,
                "International Small Cap Value": 0.075,
                "Emerging Markets": 0.075,
                "Intermediate Bonds": 0.7,
            },
            "description": "Focuses on small-cap and value stocks with a significant allocation to fixed income. Designed for investors with a lower risk tolerance who seek higher returns through factor investing.",
        },
        {
            "name": "No Brainer Portfolio",
            "allocation": {
                "Large Cap Blend": 0.25,
                "Small Cap Blend": 0.25,
                "International Large Cap Blend": 0.25,
                "Short Term Bonds": 0.25,
            },
            "description": "An equally weighted portfolio of four broad asset classes. Simple and straightforward, suitable for beginners with a long-term investment horizon and moderate risk tolerance.",
        },
        {
            "name": "Permanent Portfolio",
            "allocation": {
                "Large Cap Blend": 0.25,
                "Long Term Bonds": 0.25,
                "Cash": 0.25,
                "Gold": 0.25,
            },
            "description": "Aims to provide stability and growth regardless of market conditions by equally dividing assets among stocks, bonds, cash, and gold. Suitable for conservative investors with a long-term horizon.",
        },
        {
            "name": "Pinwheel Portfolio",
            "allocation": {
                "Large Cap Blend": 0.15,
                "Small Cap Blend": 0.10,
                "International Large Cap Blend": 0.15,
                "Emerging Markets": 0.10,
                "Intermediate Bonds": 0.15,
                "Cash": 0.10,
                "REITs": 0.15,
                "Gold": 0.10,
            },
            "description": "Diversifies across various asset classes and economic sectors to achieve growth and income. Ideal for investors with a medium to long-term horizon and a moderate risk tolerance.",
        },
        {
            "name": "Sandwich Portfolio",
            "allocation": {
                "Large Cap Blend": 0.2,
                "Small Cap Blend": 0.08,
                "International Large Cap Blend": 0.06,
                "International   Small Cap Blend": 0.1,
                "Emerging Markets": 0.06,
                "Intermediate Bonds": 0.30,
                "International Bonds": 0.11,
                "Cash": 0.04,
                "REITs": 0.05,
            },
            "description": "Not a standard portfolio concept, this term might be used for portfolios that layer different strategies or asset classes. It could be tailored based on individual investor preferences, risk tolerance, and goals.",
        },
        {
            "name": "Swensen Portfolio",
            "allocation": {
                "Large Cap Blend": 0.3,
                "International Large Cap Blend": 0.15,
                "Emerging Markets": 0.05,
                "Intermediate Bonds": 0.30,
                "REITs": 0.2,
            },
            "description": "Inspired by Yale's endowment, this portfolio diversifies across domestic and international equities, real estate, and bonds. Suitable for investors with a moderate to high risk tolerance and a long-term investment goal.",
        },
        {
            "name": "Three-Fund Portfolio",
            "allocation": {
                "Large Cap Blend": 0.64,
                "International Large Cap Blend": 0.16,
                "Intermediate Bonds": 0.2,
            },
            "description": "Consists of three broad index funds covering U.S. stocks, international stocks, and U.S. bonds. Ideal for investors seeking simplicity and broad market exposure with a long-term perspective.",
        },
        {
            "name": "Ultimate Buy and Hold Portfolio",
            "allocation": {
                "Large Cap Blend": 0.06,
                "Large Cap Value": 0.06,
                "Small Cap Blend": 0.06,
                "Small Cap Value": 0.06,
                "International Large Cap Blend": 0.06,
                "International Large Cap Value": 0.06,
                "International Small Cap Blend": 0.06,
                "International Small Cap Value": 0.06,
                "Emerging Markets": 0.06,
                "Intermediate Bonds": 0.2,
                "Short Term Bonds": 0.2,
                "REITs": 0.06
            },
            "description": "Diversifies across global asset classes to reduce risk and improve returns. Suitable for long-term investors with a moderate to high risk tolerance looking for growth and income.",
        },
        {
            "name": "Weird Portfolio",
            "allocation": {
                "Small Cap Value": 0.2,
                "International Small Cap Blend": 0.2,
                "Long Term Bonds": 0.2,
                "REITs": 0.2,
                "Gold": 0.2,
            },
            "description": "A conceptual portfolio not based on standard investment principles. It could be designed for investors with specific, unconventional investment preferences and a high tolerance for risk.",
        }
    ]
