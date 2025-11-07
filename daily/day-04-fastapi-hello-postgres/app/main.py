from fastapi import FastAPI 
from app.database import ping_db 

app = FastAPI(title="Hello FastAPI + Postgres")

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.get("health/db")
def db_health():
    current_time = ping_db()
    return {"postgres_now": str(current_time)}