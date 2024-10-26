import React from 'react';
import '../../src/styles/TicTacToe.css';

const NewGameButton = ({ onReset }) => {
  return (
    <button className="new-game-button" onClick={onReset}>
      New Game
    </button>
  );
};

export default NewGameButton;
