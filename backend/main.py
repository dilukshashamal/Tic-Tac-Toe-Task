from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routes import game

# Create the FastAPI app instance
app = FastAPI()

# Allow CORS for the frontend 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

# Include the game router
app.include_router(game.router)

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the Tic Tac Toe API!"}
