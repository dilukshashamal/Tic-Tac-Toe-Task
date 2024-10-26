from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas import GameState, GameResult
from crud import create_game_result
from openai_client import get_ai_move

router = APIRouter()

@router.post("/api/ai-move")
async def ai_move(game_state: GameState, db: Session = Depends(get_db)) -> int:
    """
    Endpoint to receive the current board state and return the AI's next move.
    """
    board = game_state.board
    current_player = game_state.current_player
    
    # Get the AI's move
    move = get_ai_move(board, current_player)
    
    if move is None:
        return {"error": "Invalid move from AI."}
    
    return {"ai_move": move}

@router.post("/api/save-game", response_model=GameResult)
async def save_game(result: GameResult, db: Session = Depends(get_db)) -> GameResult:
    """
    Endpoint to save the game result (winner).
    """
    db_result = create_game_result(db, winner=result.winner)
    return db_result
