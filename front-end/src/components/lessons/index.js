import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LessonsPage.css';

const LessonsPage = () => {
  const navigate = useNavigate();
  const lessons = [
    {
      id: 1,
      title: "Variables & Data Types",
      description: "Learn about Python variables and basic data types",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      level: "Beginner",
      topics: ["int", "float", "str", "bool"]
    },
    {
      id: 2,
      title: "Conditional Statements",
      description: "Master if-else conditions and boolean logic",
      image: "https://images.unsplash.com/photo-1542903660-eedba2cda473?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      level: "Beginner",
      topics: ["if", "else", "elif", "comparisons"]
    },
    {
      id: 3,
      title: "Loops",
      description: "Understand for and while loops in Python",
      image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      level: "Beginner",
      topics: ["for", "while", "range", "break"]
    },
    {
      id: 4,
      title: "Functions",
      description: "Learn to create reusable code with functions",
      image: "https://images.unsplash.com/photo-1592609931095-54a2168ae893?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      level: "Intermediate",
      topics: ["def", "parameters", "return", "scope"]
    },
    {
      id: 5,
      title: "Lists & Dictionaries",
      description: "Work with Python's core data structures",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      level: "Intermediate",
      topics: ["list", "dict", "methods", "comprehensions"]
    },
    {
      id: 6,
      title: "Object-Oriented Programming",
      description: "Introduction to classes and objects",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      level: "Intermediate",
      topics: ["class", "object", "inheritance", "methods"]
    },
    {
      id: 7,
      title: "Error Handling",
      description: "Manage exceptions in your code",
      image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      level: "Intermediate",
      topics: ["try", "except", "finally", "raise"]
    },
    {
      id: 8,
      title: "Modules & Packages",
      description: "Organize and reuse code across files",
      image: "https://images.unsplash.com/photo-1592609931095-54a2168ae893?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      level: "Advanced",
      topics: ["import", "pip", "modules", "__init__"]
    },
    {
      id: 9,
      title: "Decorators",
      description: "Modify function behavior dynamically",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      level: "Advanced",
      topics: ["@", "wrappers", "closures", "functools"]
    }
  ];

  return (
    <div className="lessons-container">
      <header className="lessons-header">
        <button onClick={() => navigate(-1)} className="back-button">
          &larr; Back to Dashboard
        </button>
        <h1>Python Learning Path</h1>
        <p>Master Python programming with our structured lessons</p>
      </header>

      <div className="lessons-grid">
        {lessons.map(lesson => (
          <div key={lesson.id} className="lesson-card">
            <div className="lesson-image-container">
              <img src={lesson.image} alt={lesson.title} className="lesson-image" />
              <span className={`difficulty-badge ${lesson.level.toLowerCase()}`}>
                {lesson.level}
              </span>
            </div>
            <div className="lesson-content">
              <h3>{lesson.title}</h3>
              <p className="lesson-description">{lesson.description}</p>
              <div className="lesson-topics">
                {lesson.topics.map((topic, index) => (
                  <span key={index} className="topic-tag">{topic}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonsPage;
