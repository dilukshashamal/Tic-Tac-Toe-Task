import React, { useState } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import NewGameButton from './components/NewGameButton';
import { getAIMove, saveGameResult } from './api/openai';
import { checkWinner, isDraw, resetBoard } from './utils/gameLogic';
import '../src/styles/TicTacToe.css';

const App = () => {
  const [board, setBoard] = useState(resetBoard()); // Initializes the board to empty
  const [isXTurn, setIsXTurn] = useState(true);     // 'X' starts the game
  const [gameStatus, setGameStatus] = useState("Player X's turn");
  const [gameOver, setGameOver] = useState(false);  // Track if game is over

  // Handles a new game reset
  const handleNewGame = () => {
    setBoard(resetBoard());
    setIsXTurn(true);
    setGameStatus("Player X's turn");
    setGameOver(false);
  };

  // Handles player's move and triggers AI's move if needed
  const handleMove = async (newBoard) => {
    const winner = checkWinner(newBoard);
    if (winner) {
      setGameStatus(`Player ${winner} wins!`);
      setGameOver(true);
      await saveGameResult(newBoard, winner);
      return;
    } else if (isDraw(newBoard)) {
      setGameStatus("It's a draw!");
      setGameOver(true);
      await saveGameResult(newBoard, "Draw");
      return;
    }

    // Switch turns and update the board
    setIsXTurn(!isXTurn);
    setBoard(newBoard);
    setGameStatus(`Player ${isXTurn ? 'O' : 'X'}'s turn`);

    // Trigger AI move if it's 'O's turn
    if (!isXTurn) {
      try {
        const aiMove = await getAIMove(newBoard);
        if (newBoard[aiMove] === null && !gameOver) {
          newBoard[aiMove] = 'O';
          handleMove(newBoard);
        }
      } catch (error) {
        console.error("Error fetching AI move:", error);
      }
    }
  };

  return (
    <div className="App">
      <Header gameStatus={gameStatus} />
      <Board board={board} onMove={handleMove} />
      <NewGameButton onReset={handleNewGame} />
    </div>
  );
};

export default App;
