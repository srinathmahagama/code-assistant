import React, { useState } from "react";
import "./quizzes.css";
import "../App.css";
import { useNavigate } from "react-router-dom";

const QuizzesPage = () => {
  const [click, isClick] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    isClick(true);
    navigate(path);
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

      <div className="main-content">
        {/* Left Column */}
        <div
          className="left-panel"
          onClick={() => handleNavigate("/python-quizzes")}
        >
          <section className="section-card enhanced-card" id="lessons">
            <h3>🐍 Python Quiz</h3>
            <p>
              <strong>Topic:</strong> Python Basics
            </p>
            <p>
              <strong>Level:</strong> Beginner
            </p>
            <p>
              <strong>Questions:</strong> 10
            </p>
            <p>
              <em>
                Learn the core concepts of Python including variables, data
                types, and simple logic.
              </em>
            </p>
            <button onClick={() => handleNavigate("/python-quizzes")}>
              Start Quiz
            </button>
          </section>
          {/* {click ? "Hello World, Button is clicked!!!" : ""} */}
        </div>

        {/* Right Column */}
        <div
          className="right-panel"
          onClick={() => handleNavigate("/javascript-quizzes")}
        >
          <section className="section-card enhanced-card" id="quizzes">
            <h3>📜 JavaScript Quiz</h3>
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
              <em>
                Test your JS basics with questions on functions, variables, and
                event handling.
              </em>
            </p>
            <button onClick={() => navigate("/javascript-quizzes")}>
              Start Quiz
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default QuizzesPage;
