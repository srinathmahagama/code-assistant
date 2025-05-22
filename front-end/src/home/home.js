import React from "react";
import { Link } from "react-router-dom";
import CodingChatBot from "../components/chatbot/coding_chatbot";
import "./home_styles.css";

const Home = () => {
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
      <CodingChatBot />
    </div>
  );
};

export default Home;
