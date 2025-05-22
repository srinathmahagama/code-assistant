import React, { useState } from "react";
import "./quizzes.css";
import "../App.css";

const JavaScriptQuizzesPage = () => {
  const [click, isClick] = useState(false);

  const handleClick = () => {
    isClick(true);
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
        <h1>Hello World Welcome to Python Quizzes Page</h1>
      </div>
    </div>
  );
};

export default JavaScriptQuizzesPage;
