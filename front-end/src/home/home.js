import React, { useState } from "react";
import { Link } from "react-router-dom";
import CodingChatBot from "../components/chatbot/coding_chatbot";
import "./home_styles.css";
import { recommendLessons } from "../services/api";

const Home = () => {
  const [recommendedLessons, setRecommendedLessons] = useState([]);
  const [userQuestions, setUserQuestions] = useState([]);

  const handleGetRecommendations = async (newQuestion) => {
    const updatedQuestions = [...userQuestions, newQuestion];
    setUserQuestions(updatedQuestions);

    // Wait for at least 3 questions
    if (updatedQuestions.length >= 3) {
      try {
        // Combine the last 3 questions for context
        const context = updatedQuestions.slice(-3).join(" ");
        const lessons = await recommendLessons(context);
        setRecommendedLessons(lessons);
      } catch (error) {
        console.error("Error getting recommendations:", error);
      }
    }
  };

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>Learn to Code Smarter, Not Harder</h1>
          <p>Master Python and JavaScript with interactive lessons, quick quizzes, and AI assistance.</p>
          <div className="hero-buttons">
            <Link to="/lessons" className="cta-btn secondary">📘 Start Learning</Link>
            <Link to="/quizzes" className="cta-btn secondary">🧠 Take a Quiz</Link>
          </div>
        </div>
      </section>

      {/* Recommended Lessons Section */}
      {recommendedLessons.length > 0 && (
        <section className="recommended-lessons-section">
          <h2>Recommended Lessons Based on Your Questions</h2>
          <div className="lessons-grid">
            {recommendedLessons.map((lesson, index) => (
              <div key={index} className="lesson-card">
                <h3>{lesson.title}</h3>
                <p>{lesson.description}</p>
                <Link 
                  to={`/lessons?topic=${encodeURIComponent(lesson.title)}`}
                  className="lesson-link"
                >
                  Start Learning →
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}



      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <h3>📚 Step-by-Step Lessons</h3>
          <p>Interactive modules with real code examples to guide you through the basics to advanced topics.</p>
        </div>
        <div className="feature-card">
          <h3>🧪 Smart Quizzes</h3>
          <p>Challenge yourself with short quizzes and get instant feedback to reinforce your learning.</p>
        </div>
        <div className="feature-card">
          <h3>🤖 AI Coding Assistant</h3>
          <p>Stuck on a concept? Ask our built-in AI assistant for help — like having a tutor available 24/7.</p>
        </div>
      </section>

      {/* Testimonial / Call to Action */}
      <section className="testimonial-cta">
        <blockquote>
          “This platform made coding fun and easy! I went from beginner to building projects in weeks.”
          <span>– A Happy Learner</span>
        </blockquote>
        <Link to="/lessons" className="cta-btn primary large">🚀 Get Started Now</Link>
      </section>

      {/* Floating Chatbot */}
      <CodingChatBot onRecommend={handleGetRecommendations} />
    </div>
  );
};

export default Home;
