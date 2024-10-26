import os
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# Configuration for the database and OpenAI API
class Settings:
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY")

settings = Settings()
