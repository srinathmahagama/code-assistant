import React, { useEffect, useState } from "react";
import { fetchQuizzesFromAPI } from "../../services/api"; // your API logic

const QuizSession = ({ language, difficulty, onComplete }) => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const load = async () => {
      const data = await fetchQuizzesFromAPI(language, difficulty); // Fetch 5
      setQuestions(data);
    };
    load();
  }, [language, difficulty]);

  const handleAnswer = (answer) => {
    if (answer === questions[current].correct_answer) {
      setScore((prev) => prev + 1);
    }

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      onComplete(questions, score + (answer === questions[current].correct_answer ? 1 : 0));
    }
  };

  if (!questions.length) return (
    <div className="locked-message-container">
      <div className="locked-icon">🔒</div>
      <h2>Oops!!</h2>
      <p>Please practice more to unlock this feature.</p>
    </div>
  );;

  const q = questions[current];

  return (
    <div className="quiz-session-container">
      <h3 className="quiz-question-header">
        Question {current + 1} of {questions.length}
      </h3>
      <p className="quiz-question-text">{q.question}</p>
      <div className="quiz-options-container">
        {q.answer_options.map((option, index) => {
          const label = String.fromCharCode(65 + index); // A, B, C, D...
          return (
            <button
              key={index}
              className="quiz-option-button"
              onClick={() => handleAnswer(option)}
            >
              {label}. {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizSession;
