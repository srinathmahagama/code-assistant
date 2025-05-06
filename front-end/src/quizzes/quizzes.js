import React from "react";
import "./quizzes.css";
import "../App.css";
import { useNavigate } from "react-router-dom";

const QuizzesPage = () => {
  const navigate = useNavigate();

  const levels = [
    {
      level: "Beginner",
      title: "Beginner",
      topic: "Python Basics",
      description: "Learn variables, data types, and simple syntax.",
      emoji: "🐍",
    },
    {
      level: "Medium",
      title: "Medium",
      topic: "Functions & Loops",
      description: "Practice with loops, conditionals, and function logic.",
      emoji: "🐍",
    },
    {
      level: "Hard",
      title: "Hard",
      topic: "OOP & Recursion",
      description:
        "Challenge your skills with classes, recursion, and advanced logic.",
      emoji: "🐍",
    },
  ];

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
        {/* Python Levels (loop) */}
        <div className="left-panel">
          {levels.map((item) => (
            <section
              key={item.level}
              className="section-card enhanced-card"
              onClick={() => handleNavigate("/python-quizzes", item.level)}
            >
              <h3>
                {item.emoji} Python Quiz ({item.title})
              </h3>
              <p>
                <strong>Topic:</strong> {item.topic}
              </p>
              <p>
                <strong>Level:</strong> {item.title}
              </p>
              <p>
                <strong>Questions:</strong> 10
              </p>
              <p>
                <em>{item.description}</em>
              </p>
              <button>Start Quiz</button>
            </section>
          ))}
        </div>

        {/* JavaScript Beginner */}
        <div className="right-panel">
          <section
            className="section-card enhanced-card"
            onClick={() => handleNavigate("/javascript-quizzes", "beginner")}
          >
            <h3>📜 JavaScript Quiz (Beginner)</h3>
            <p>
              <strong>Topic:</strong> Functions & Events
            </p>
            <p>
              <strong>Level:</strong> Beginner
            </p>
            <p>
              <strong>Questions:</strong> 10
            </p>
            <p>
              <em>Test your basics with variables, functions, and events.</em>
            </p>
            <button>Start Quiz</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default QuizzesPage;
