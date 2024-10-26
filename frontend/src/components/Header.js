import React from 'react';
import '../../src/styles/TicTacToe.css';

const Header = ({ gameStatus }) => {
  return (
    <div className="header">
      <h1>Tic Tac Toe</h1>
      <h2>{gameStatus}</h2>
    </div>
  );
};

export default Header;
