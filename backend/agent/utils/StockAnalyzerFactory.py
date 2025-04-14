from typing import Dict
from utils.StockAnalyzer_v2 import StockAnalyzer_v2


class StockAnalyzerFactory:
    """
    Factory for reusing StockAnalyzer instances per ticker.
    Implements caching to avoid redundant object creation.
    """
    _analyzer_cache: Dict[str, StockAnalyzer_v2] = {}

    @classmethod
    def get_analyzer(cls, ticker: str) -> StockAnalyzer_v2:
        if ticker not in cls._analyzer_cache:
            cls._analyzer_cache[ticker] = StockAnalyzer_v2(ticker)
        return cls._analyzer_cache[ticker]
