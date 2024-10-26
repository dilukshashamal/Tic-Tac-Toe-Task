from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class GameState(BaseModel):
    board: List[Optional[str]]  # Represents the 3x3 board; 'X', 'O', or None for empty cells
    current_player: str          # Indicates the current player ('X' or 'O')

class GameResult(BaseModel):
    id: int
    winner: str                  # Could be 'X', 'O', or 'Draw'
    timestamp: datetime

    class Config:
        orm_mode = True  # Allow using ORM models with Pydantic models
