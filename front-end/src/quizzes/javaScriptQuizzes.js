import React, { useState } from "react";
import "./quizzes.css";
import "../App.css";
import CodeHelper from "../components/codeHelper";

// Dummy quiz data (later replace with API data)
const dummyQuestions = [
  {
    id: 1,
    question: "What does 'var' keyword do in JavaScript?",
    type: "choice",
    choices: [
      "Declares a block-scoped variable",
      "Declares a variable globally or function-scoped",
      "Defines a constant",
      "Creates a class",
    ],
  },
  {
    id: 2,
    question: "Which of the following is NOT a JavaScript data type?",
    type: "choice",
    choices: ["Boolean", "Undefined", "Float", "Object"],
  },
  {
    id: 3,
    question: "Fill in the blank: JavaScript runs in the ____.",
    type: "text",
    choices: [],
  },
  {
    id: 4,
    question: "Which symbol is used for comments in JavaScript?",
    type: "choice",
    choices: [
      "// for single-line comments",
      "/* */ for single-line comments",
      "<!-- --> for comments",
      "# for comments",
    ],
  },
  {
    id: 5,
    question:
      "Write a line of JavaScript code to declare a variable named 'score' and assign it the value 100.",
    type: "text",
    choices: [],
  },
];

const JavaScriptQuizzesPage = () => {
  const [answers, setAnswers] = useState({});

  const handleChoiceClick = (questionId, choice) => {
    setAnswers((prev) => ({ ...prev, [questionId]: choice }));
    console.log("Selected choice:", choice);
  };

  const handleTextChange = (questionId, text) => {
    setAnswers((prev) => ({ ...prev, [questionId]: text }));
    console.log("Typed answer:", text);
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
        <div className="left-panel">
          {dummyQuestions.length > 0 ? (
            dummyQuestions.map((questionItem, index) => (
              <div className="question-card" key={questionItem.id}>
                <div className="question-number">Quiz {index + 1}</div>
                <div className="question-text">{questionItem.question}</div>
                <div className="choices-list">
                  {questionItem.type === "choice" ? (
                    questionItem.choices.map((choice, choiceIndex) => (
                      <button
                        key={choiceIndex}
                        className={`choice-button ${
                          answers[questionItem.id] === choice ? "selected" : ""
                        }`}
                        onClick={() =>
                          handleChoiceClick(questionItem.id, choice)
                        }
                      >
                        {choice}
                      </button>
                    ))
                  ) : (
                    <textarea
                      placeholder="Type your answer here..."
                      className="text-answer"
                      onChange={(e) =>
                        handleTextChange(questionItem.id, e.target.value)
                      }
                    />
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No questions found.</p>
          )}
        </div>

        <div className="right-panel">
          <section className="section-card" id="instructions">
            <CodeHelper />
          </section>
        </div>
      </div>
    </div>
  );
};

export default JavaScriptQuizzesPage;
