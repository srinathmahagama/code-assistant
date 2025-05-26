import axios from "axios";

const API_URL = "http://localhost:5007/ask";
const GET_QUIZZ_URL = "http://localhost:5007/quizzes";
const QUIZ_LEVELS_API_URL = "http://localhost:5007/quiz_levels";

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

export const recommendLessons = async (userInput) => {
  try {
    const response = await axios.post(
      "http://localhost:5007/recommend_lessons", 
      { user_input: userInput }
    );
    return response.data.recommended_lessons || [];
  } catch (error) {
    console.error("Error getting recommendations:", error);
    return [];
  }
};