import React from "react";

const LanguageSelect = ({ onSelect }) => {
  const languages = [
    { name: "Python", emoji: "🐍" },
    { name: "JavaScript", emoji: "📜" },
  ];

  return (
    <div className="app-layout">
        <section className="hero-section">
  <div className="hero-content">
    <h2 className="hero-title">🚀 Select Your Programming Language</h2>
    <p className="hero-subtitle">Choose a path to start your coding journey with guided lessons and challenges.</p>
  </div>
</section>



      <div className="main-content quiz-grid">
        {languages.map((lang) => (
          <section
            key={lang.name}
            className="section-card enhanced-card"
            onClick={() => onSelect(lang.name)}
            style={{ cursor: "pointer" }}
          >
            <h2>
              {lang.emoji} {lang.name}
            </h2>
            <p>Start quizzes for {lang.name}</p>
            <button>Select</button>
          </section>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelect;
