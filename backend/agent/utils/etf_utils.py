from constants import CATEGORY_TO_ASSET_CLASS
from typing import Dict, List


def classify_etfs(etfs):
    classified_etfs = {}

    for etf, description in etfs.items():
        classified_etfs[etf] = CATEGORY_TO_ASSET_CLASS.get(
            description, 'Others')

    return classified_etfs


def compute_etf_count_by_allocation(allocation: Dict[str, float], total_etfs: int) -> Dict[str, int]:
    """Compute how many ETFs to select per category based on portfolio allocation."""
    return {
        category: max(1, round(total_etfs * float(weight)))
        for category, weight in allocation.items()
    }


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
