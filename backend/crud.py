from sqlalchemy.orm import Session
from models import GameResult
from schemas import GameResult as GameResultSchema

# Function to create a new game result
def create_game_result(db: Session, winner: str) -> GameResult:
    db_game_result = GameResult(winner=winner)
    db.add(db_game_result)
    db.commit()
    db.refresh(db_game_result)
    return db_game_result

# Function to get all game results
def get_game_results(db: Session, skip: int = 0, limit: int = 10) -> list[GameResultSchema]:
    return db.query(GameResult).offset(skip).limit(limit).all()

# Function to get a game result by ID
def get_game_result(db: Session, game_id: int) -> GameResult:
    return db.query(GameResult).filter(GameResult.id == game_id).first()
