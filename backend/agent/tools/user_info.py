from langchain_core.runnables import RunnableConfig
from pymongo import MongoClient
from langchain_core.tools import tool
import os
from dotenv import load_dotenv

load_dotenv()


@tool("fetch_user_information")
async def fetch_user_information(config: RunnableConfig):
    """
    Fetches user information from the database.
    """
    configuration = config.get("configurable", {})
    user_id = configuration.get("user_id", None)
    print("[Fetch user infomration tool] Fetching user information for user_id: ", user_id)

    if not user_id:
        raise ValueError("No user ID provided")

    mongo_uri = os.getenv("MONGO_URI")
    client = MongoClient(mongo_uri)
    db = client[os.getenv("DB_NAME")]
    collection = db["user_information"]

    user_info = collection.find_one({"user_id": user_id})
    client.close()

    if user_info:
        user_info.pop("_id", None)
        return user_info
    else:
        raise ValueError(f"No user information found for user_id {user_id}")
