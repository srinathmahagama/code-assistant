import React, { useEffect, useState } from "react";
import "./quizzes.css";
import "../App.css";
import CodeHelper from "../components/codeHelper";

const PythonQuizzesPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetch("/dataset.json")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item, index) => ({
          id: index + 1,
          question: item.instruction,
          type: "text",
          choices: [],
          correct_answer: item.output?.trim() || "",
          mark: 1,
        }));
        setQuestions(formatted.slice(0, 10));
      })
      .catch((err) => console.error("Failed to load questions:", err));
  }, []);

  const handleTextChange = (questionId, text) => {
    setAnswers({ [questionId]: text });
  };

  const handleSubmit = () => {
    const currentQuestion = questions[currentIndex];
    const userAnswer = answers[currentQuestion.id]?.trim() || "";
    const correctAnswer = currentQuestion.correct_answer;

    const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();

    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        question: currentQuestion.question,
        userAnswer,
        correctAnswer,
        isCorrect,
        mark: currentQuestion.mark,
      },
    ]);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setAnswers({});
    } else {
      setShowResult(true);
    }
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="app-layout">
      <header className="main-header">
        <h1>Code Learning Platform</h1>
        <nav className="main-menu">
          <a href="#lessons">Lessons</a>
          <a href="#quizzes">Quizzes</a>
          <a href="#instructions">Code Generator</a>
        </nav>
      </header>

      <div className="main-content">
        <div className="left-panel">
          {currentQuestion ? (
            <div className="question-card">
              <div className="question-number">
                Question {currentIndex + 1} of {questions.length}
              </div>
              <div className="question-text">{currentQuestion.question}</div>
              <textarea
                placeholder="Type your answer here..."
                className="text-answer"
                onChange={(e) =>
                  handleTextChange(currentQuestion.id, e.target.value)
                }
              />
              <button
                onClick={handleSubmit}
                disabled={!answers[currentQuestion.id]}
              >
                Submit Answer
              </button>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="right-panel">
          <section className="section-card" id="instructions">
            <CodeHelper />
          </section>
        </div>
      </div>

      {showResult && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Quiz Result Summary</h2>
            <ul>
              {userAnswers.map((ans, index) => (
                <li key={index}>
                  <strong>Q{index + 1}:</strong> {ans.question}
                  <br />
                  ✅ Correct answer: <strong>{ans.correctAnswer}</strong>
                  <br />
                  📝 Your answer: <span>{ans.userAnswer}</span>
                  <br />
                  Result:{" "}
                  <span style={{ color: ans.isCorrect ? "green" : "red" }}>
                    {ans.isCorrect ? "Correct" : "Wrong"}
                  </span>
                  <hr />
                </li>
              ))}
            </ul>
            <p>
              🏁 Total Score:{" "}
              {userAnswers.filter((a) => a.isCorrect).length} /{" "}
              {questions.length}
            </p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PythonQuizzesPage;
