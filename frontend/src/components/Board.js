import React, { useState } from 'react';
import Cell from './Cell';
import '../../src/styles/TicTacToe.css';
import { checkWinner } from '../utils/gameLogic';

const Board = ({ onMove }) => {
  const [board, setBoard] = useState(Array(9).fill(null)); // 3x3 grid initialized to null
  const [isXTurn, setIsXTurn] = useState(true);            // 'X' goes first
  const [gameStatus, setGameStatus] = useState("Player X's turn"); // Game status message
  const [gameOver, setGameOver] = useState(false);         // Tracks if the game has ended

  const handleCellClick = (index) => {
    if (board[index] || gameOver) return; // Ignore click if cell is taken or game is over

    const newBoard = board.slice();       // Copy current board state
    newBoard[index] = isXTurn ? 'X' : 'O'; // Place 'X' or 'O' based on turn
    setBoard(newBoard);                   // Update board state

    const winner = checkWinner(newBoard); // Check if there's a winner
    if (winner) {
      setGameStatus(`Player ${winner} wins!`);
      setGameOver(true);
    } else if (newBoard.every(cell => cell)) { // Check for a draw
      setGameStatus("It's a draw!");
      setGameOver(true);
    } else {
      setIsXTurn(!isXTurn);
      setGameStatus(`Player ${isXTurn ? 'O' : 'X'}'s turn`);
      
      onMove && onMove(newBoard);
    }
  };

  const renderCell = (index) => {
    return (
      <Cell
        value={board[index]}
        onClick={() => handleCellClick(index)}
      />
    );
  };

  return (
    <div className="board">
      <h2>{gameStatus}</h2>
      <div className="grid">
        {Array.from({ length: 9 }).map((_, i) => renderCell(i))}
      </div>
    </div>
  );
};

export default Board;
