import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    API_VERSION = 'v1'
    SECRET_KEY = os.getenv('SECRET_KEY')
    MONGO_URI = os.getenv('MONGO_URI')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    BCRYPT_LOG_ROUNDS = int(os.getenv('BCRYPT_LOG_ROUNDS', 12))
    MONGO_DBNAME = 'quantfyp'
    FINNHUB_API_KEY = os.getenv('FINNHUB_API_KEY')
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
