import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Replace with your FastAPI backend URL if different

/**
 * Sends the current board state to the backend and retrieves the AI's next move.
 * @param {Array} board 
 * @returns {Promise<number>} 
 */
export const getAIMove = async (board) => {
  try {
    const response = await axios.post(`${API_URL}/api/ai-move`, { board });
    return response.data.move;
  } catch (error) {
    console.error("Error fetching AI move:", error);
    throw error;
  }
};

/**
 * Sends the final game state to the backend for storage in the PostgreSQL database.
 * @param {Array} board 
 * @param {string} winner 
 * @returns {Promise<void>}
 */
export const saveGameResult = async (board, winner) => {
  try {
    await axios.post(`${API_URL}/api/save-game`, { board, winner });
  } catch (error) {
    console.error("Error saving game result:", error);
    throw error;
  }
};
