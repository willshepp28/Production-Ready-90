import os
from sqlalchemy import create_engine, text 
from sqlalchemy.orm import sessionmaker 
from dotenv import load_dotenv 

load_dotenv() # loads env file

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL not set")

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

def ping_db():
    """Simple check that queries Postgres for the current time."""
    with engine.connect() as conn:
        return conn.execute(text("SELECT NOW()")).scalar()
