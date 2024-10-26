# Tic Tac Toe Game with AI Integration

This project is a Tic Tac Toe game application built using **React** for the frontend, **FastAPI** for the backend, and **OpenAI API** for AI-powered moves. The application also uses **PostgreSQL** to store game states and results, with all services containerized using **Docker**.

---

## Features

### Frontend (React)
- **3x3 Grid** for player moves.
- **Game State Display** showing current player’s turn, results (win, lose, or draw).
- **New Game Button** to start a new game.

### Backend (FastAPI)
- **AI Move Endpoint**: Determines AI’s next move.
- **Game Result Storage**: Saves game results to PostgreSQL.
- **Win/Draw Detection** integrated with game validation logic.

### Database (PostgreSQL)
- **Game Results Schema** with fields for ID, winner, and timestamp.

---

## Project Structure


---

## Functions Overview

### Frontend (React)

1. **Board.js**  
   Manages the grid and interactions. Displays each cell’s state and updates game status.

2. **Cell.js**  
   Represents individual cells. Shows 'X', 'O', or remains empty.

3. **Header.js**  
   Displays game status (current player, winner announcement).

4. **NewGameButton.js**  
   Resets the board to start a new game.

5. **API Integration (api/openai.js)**  
   Sends requests to FastAPI to get AI moves and save game results.

6. **Game Logic (utils/gameLogic.js)**  
   Manages core game rules (win, draw, reset).

### Backend (FastAPI)

1. **main.py**  
   Initializes the FastAPI app and includes routers from `game.py`.

2. **config.py**  
   Loads environment variables like PostgreSQL URL and OpenAI API key.

3. **database.py**  
   Sets up the PostgreSQL connection and database session.

4. **models.py**  
   Defines the `GameResult` SQLAlchemy model (fields: `id`, `winner`, `timestamp`).

5. **schemas.py**  
   Uses Pydantic models for data validation:
   - `GameState`: Board state representation.
   - `GameResult`: Contains winner and timestamp.

6. **crud.py**  
   Provides database interaction functions:
   - `save_game_result`: Saves winner and timestamp.
   - `get_game_results`: Retrieves past results.

7. **openai_client.py**  
   Handles interactions with the OpenAI API to determine the AI’s next move.

8. **game.py**  
   Main API endpoints:
   - `/api/ai-move`: Receives board state, returns AI move.
   - `/api/save-game`: Saves game results.

---

## Running the Application

### 1. Set Up Environment Variables

In the `backend` directory, create an `.env` file with the following:

```plaintext
DATABASE_URL=postgresql://<username>:<password>@db:5432/tictactoe
OPENAI_API_KEY=your_openai_api_key
```

### 2. Run Application

```plaintext
docker compose up --build
