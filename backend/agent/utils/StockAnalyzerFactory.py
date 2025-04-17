from typing import Dict
from modules.analyzer.StockAnalyzer import StockAnalyzer


class StockAnalyzerFactory:
    """
    Factory for reusing StockAnalyzer instances per ticker.
    Implements caching to avoid redundant object creation.
    """
    _analyzer_cache: Dict[str, StockAnalyzer] = {}

    @classmethod
    def get_analyzer(cls, ticker: str) -> StockAnalyzer:
        if ticker not in cls._analyzer_cache:
            cls._analyzer_cache[ticker] = StockAnalyzer(ticker)
        return cls._analyzer_cache[ticker]
