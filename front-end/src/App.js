import React from 'react';
import './App.css';
import CodeHelper from './components/codeHelper';

const App = () => {
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
        <div className="left-panel">
          <section className="section-card enhanced-card" id="lessons">
            <h2>📘 Lessons</h2>
            <ul className="lesson-list">
              <li><strong>Lesson 1:</strong> Variables and Data Types</li>
              <li><strong>Lesson 2:</strong> Conditional Statements</li>
              <li><strong>Lesson 3:</strong> Loops</li>
              <li><strong>Lesson 4:</strong> Functions</li>
              <li><strong>Lesson 5:</strong> Lists and Dictionaries</li>
            </ul>
            <p>Master Python from the ground up. Each lesson includes examples and exercises.</p>
          </section>

          <section className="section-card enhanced-card" id="quizzes">
            <h2>🧠 Quizzes</h2>
            <ul className="quiz-list">
              <li>💡 Quiz 1: Python Basics</li>
              <li>💡 Quiz 2: Control Flow</li>
              <li>💡 Quiz 3: Functions & Loops</li>
            </ul>
            <p>Assess your understanding with short quizzes after lessons. Instant feedback included!</p>
          </section>
        </div>

        {/* Right Column */}
        <div className="right-panel">
          <section className="section-card" id="instructions">
            <CodeHelper />
          </section>
        </div>
      </div>
    </div>
  );
};

export default App;
