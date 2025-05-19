import React, { useState, useEffect } from 'react';
import './App.css';
import CodeHelper from './components/codeHelper';
import { codeHelperEvents } from './components/codeHelper';



const App = () => {
  const [recommendedLessons, setRecommendedLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  useEffect(() => {
    const handleNewInstructions = (combinedQuestions) => {
      setIsLoading(true);
      fetch(`http://localhost:5000/recommend?input=${encodeURIComponent(combinedQuestions)}`)
        .then(res => res.json())
        .then(data => {
          if (!data.error) {
            setRecommendedLessons(data.lessons || []);
            setShowRecommendations(true);
          }
        })
        .catch(err => console.error("Recommendation error:", err))
        .finally(() => setIsLoading(false));
    };

    codeHelperEvents.on('newInstructions', handleNewInstructions);
    
    return () => {
      codeHelperEvents.off('newInstructions', handleNewInstructions);
    };
  }, []);

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
          
            {showRecommendations && (
              <div className="recommendation-section">
                <h3>🎯 Recommended For You</h3>
                {isLoading ? (
                  <p className="loading-text">Finding the best lessons...</p>
                ) : recommendedLessons.length > 0 ? (
                  <ul className="recommended-lessons">
                    {recommendedLessons.map((lesson, index) => (
                      <li key={index}>
                        <strong>{lesson.title}</strong> (Level {lesson.level})
                        <p className="lesson-keywords">{lesson.keywords}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-recommendations">No specific recommendations found. Keep asking questions!</p>
                )}
              </div>
            )}
          
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
