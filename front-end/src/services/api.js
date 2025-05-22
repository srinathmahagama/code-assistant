import axios from "axios";

const API_URL = "http://localhost:5000/ask";
const GET_QUIZZ_URL = "http://localhost:5000/quizzes";
const QUIZ_LEVELS_API_URL = "http://localhost:5000/quiz_levels";

export const generateAnswer = async (instruction) => {
  try {
    const response = await axios.post(API_URL, { instruction });
    return response.data.generated;
  } catch (error) {
    console.error("Error generating answer:", error);
    throw error;
  }
};

export const fetchQuizzesFromAPI = async (language, difficulty) => {
  try {
    const url = GET_QUIZZ_URL+`?language=${language.toUpperCase()}&difficulty=${difficulty.toUpperCase()}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return [];
  }
};

export const fetchQuizLevels = async () => {
  try {
    const response = await axios.get(QUIZ_LEVELS_API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz levels:", error);
    return [];
  }
};