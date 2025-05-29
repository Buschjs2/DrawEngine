from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users
from database import engine
from models import Base

# Initialize DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS config to allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include user auth routes
app.include_router(users.router)
