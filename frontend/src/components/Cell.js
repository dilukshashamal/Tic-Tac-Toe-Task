import React from 'react';
import '../../src/styles/TicTacToe.css';

const Cell = ({ value, onClick }) => {
  return (
    <button className="cell" onClick={onClick} disabled={value !== null}>
      {value}
    </button>
  );
};

export default Cell;
