from datetime import datetime


def unix_to_iso8601(timestamp):
    """
    Convert a Unix timestamp to ISO 8601 string.

    :param timestamp: Unix timestamp (int)
    :return: ISO 8601 formatted string
    """
    if not isinstance(timestamp, int):
        return ""
    return datetime.fromtimestamp(timestamp).isoformat()
