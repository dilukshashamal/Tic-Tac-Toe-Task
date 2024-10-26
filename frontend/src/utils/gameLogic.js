/**
 * Checks if there's a winner on the board.
 * @param {Array} board 
 * @returns {string|null} 
 */
export const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
  
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Returns 'X' or 'O'
      }
    }
  
    return null; // No winner
  };
  
  /**
   * Checks if the game is a draw (no empty cells and no winner).
   * @param {Array} board 
   * @returns {boolean} 
   */
  export const isDraw = (board) => {
    return board.every(cell => cell !== null) && !checkWinner(board);
  };
  
  /**
   * Resets the board to an initial empty state.
   * @returns {Array} 
   */
  export const resetBoard = () => {
    return Array(9).fill(null);
  };
  