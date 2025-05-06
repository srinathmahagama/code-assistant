import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./quizzes.css";
import "../App.css";
import CodeHelper from "../components/codeHelper";

const PythonQuizzesPage = () => {
  const location = useLocation();
  const defaultLevel = location.state?.level || "Beginner";

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quizLevel, setQuizLevel] = useState(defaultLevel);

  const loadQuestions = (level) => {
    setLoading(true);
    fetch("/dataset.json")
      .then((res) => res.json())
      .then((data) => {
        const levelData = data.find((item) => item.level === level);
        if (levelData) {
          const formatted = levelData.question_list.map((item) => ({
            id: item.id,
            question: item.question,
            type: "text",
            choices: [],
            correct_answer: item.correct_answer?.trim() || "",
            mark: 1,
          }));
          setQuestions(formatted.slice(0, 10));
        } else {
          console.error("Selected level not found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load questions:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadQuestions(quizLevel);
  }, [quizLevel]);

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

  const restartQuiz = () => {
    setCurrentIndex(0);
    setAnswers({});
    setUserAnswers([]);
    setShowResult(false);
    loadQuestions(quizLevel);
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
          <div className="level-select">
            <label>Select Level: {quizLevel}</label>
            {/* <select
              value={quizLevel}
              onChange={(e) => {
                setQuizLevel(e.target.value);
                restartQuiz();
              }}
            >
              <option value="beginner">Beginner</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select> */}
          </div>

          {loading ? (
            <p>Loading questions...</p>
          ) : currentQuestion ? (
            <div className="question-card">
              <div className="question-number">
                Question {currentIndex + 1} of {questions.length}
              </div>
              <div className="question-text">{currentQuestion.question}</div>
              <textarea
                placeholder="Type your answer here..."
                className="text-answer"
                value={answers[currentQuestion.id] || ""}
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
            <p>No questions found for this level.</p>
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
                  <br />✅ Correct answer: <strong>{ans.correctAnswer}</strong>
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
              🏁 Total Score: {userAnswers.filter((a) => a.isCorrect).length} /{" "}
              {questions.length}
            </p>
            <button onClick={restartQuiz}>Try Again</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PythonQuizzesPage;
