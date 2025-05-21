import axios from 'axios';

const API_URL = 'http://localhost:5000/ask';

export const generateAnswer = async (instruction) => {
  try {
    const response = await axios.post(API_URL, { instruction });
    return response.data.generated;
  } catch (error) {
    console.error('Error generating answer:', error);
    throw error;
  }
};
