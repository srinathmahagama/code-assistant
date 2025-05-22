import React, { useState } from "react";
import LanguageSelect from "./languageSelect";
import LevelSelect from "./levelSelect";
import QuizSession from "./quizSession";
import QuizResult from "./quizResult";
import "./quizzes_styles.css"

const QuizzesFlow = () => {
  const [language, setLanguage] = useState(null);
  const [level, setLevel] = useState(null);
  const [quizData, setQuizData] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [score, setScore] = useState(0);

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setCurrentStep(2);
  };

  const handleLevelSelect = async (level) => {
    setLevel(level);
    setCurrentStep(3);
  };

  const handleQuizComplete = (data, userScore) => {
    setQuizData(data);
    setScore(userScore);
    setCurrentStep(4);
  };

  return (
    <>
      {currentStep === 1 && <LanguageSelect onSelect={handleLanguageSelect} />}
      {currentStep === 2 && <LevelSelect onSelect={handleLevelSelect} />}
      {currentStep === 3 && (
        <QuizSession
          language={language}
          difficulty={level}
          onComplete={handleQuizComplete}
        />
      )}
      {currentStep === 4 && <QuizResult score={score} />}
    </>
  );
};

export default QuizzesFlow;
