import React, { useEffect, useState } from "react";
import "./quizzes.css";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { fetchQuizLevels } from "../services/api";

const QuizzesPage = () => {
  const navigate = useNavigate();
  const [pythonLevels, setPythonLevels] = useState([]);
  const [jsLevels, setJsLevels] = useState([]);

  useEffect(() => {
    fetchQuizLevels().then((data) => {
      const withEmoji = data.map((item) => ({
        ...item,
        emoji: item.quiz_type === "Python" ? "🐍" : "📜",
      }));
      setPythonLevels(withEmoji.filter((item) => item.quiz_type === "Python"));
      setJsLevels(withEmoji.filter((item) => item.quiz_type === "JavaScript"));
    });
  }, []);

  const handleNavigate = (path, level) => {
    navigate(path, { state: { level } });
  };

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

      <div className="main-content quiz-grid">
        {/* Python Levels */}
        <div className="left-panel">
          {pythonLevels.map((item) => (
            <section
              key={item.level}
              className="section-card enhanced-card"
              onClick={() => handleNavigate("/python-quizzes", item.level)}
            >
              <h3>
                {item.emoji} {item.title}
              </h3>
              <p>
                <strong>Topic:</strong> {item.topic}
              </p>
              <p>
                <strong>Level:</strong> {item.level}
              </p>
              <p>
                <strong>Questions:</strong> 5
              </p>
              <p>
                <em>{item.description}</em>
              </p>
              <button>Start Quiz</button>
            </section>
          ))}
        </div>

        {/* JavaScript Levels */}
        <div className="right-panel">
          {jsLevels.map((item) => (
            <section
              key={item.level}
              className="section-card enhanced-card"
              onClick={() => handleNavigate("/javascript-quizzes", item.level)}
            >
              <h3>
                {item.emoji} {item.title}
              </h3>
              <p>
                <strong>Topic:</strong> {item.topic}
              </p>
              <p>
                <strong>Level:</strong> {item.level}
              </p>
              <p>
                <strong>Questions:</strong> 5
              </p>
              <p>
                <em>{item.description}</em>
              </p>
              <button>Start Quiz</button>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizzesPage;
