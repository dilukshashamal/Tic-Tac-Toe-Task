import openai
from config import settings
from typing import Optional

# Set the OpenAI API key
openai.api_key = settings.OPENAI_API_KEY

def format_game_state(board: list[Optional[str]], current_player: str) -> str:
    """
    Formats the current game state for the OpenAI API request.
    """
    formatted_state = f"Current Board:\n"
    for i in range(3):
        row = board[i * 3:(i + 1) * 3]
        formatted_state += " | ".join(cell if cell else " " for cell in row) + "\n"
    formatted_state += f"Current Player: {current_player}\n"
    return formatted_state

def get_ai_move(board: list[Optional[str]], current_player: str) -> Optional[int]:
    """
    Calls the OpenAI API to determine the next move for the AI.
    """
    prompt = format_game_state(board, current_player) + "What is the best move for O? Respond with the index (0-8)."
    
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Specify the model to use
            messages=[
                {"role": "user", "content": prompt}
            ],
            max_tokens=10,
            n=1,
            stop=None,
            temperature=0  # Lower temperature for more deterministic output
        )
        
        # Parse the response
        move = int(response.choices[0].message['content'].strip())
        if move in range(9):  # Check if the move is valid
            return move
    except Exception as e:
        print(f"Error calling OpenAI API: {e}")
    
    return None
