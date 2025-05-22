import React from "react";

const levels = [
  { name: "Easy", emoji: "🟢", description: "Perfect for beginners." },
  { name: "Intermediate", emoji: "🟡", description: "Some experience required." },
  { name: "Hard", emoji: "🔴", description: "Challenging for advanced learners." },
];

const LevelSelect = ({ onSelect }) => {
  return (
    <div className="app-layout">
      <section className="hero-section">
  <div className="hero-content">
    <h2 className="hero-title">🚀 Select level of difficulty</h2>
    <p className="hero-subtitle">Choose the level of path start your coding journey with guided lessons and challenges.</p>
  </div>
</section>

      <div className="main-content quiz-grid">
        {levels.map((level) => (
          <section
            key={level.name}
            className="section-card enhanced-card"
            onClick={() => onSelect(level.name)}
            style={{ cursor: "pointer" }}
          >
            <h2>
              {level.emoji} {level.name}
            </h2>
            <p>{level.description}</p>
            <button>Select {level.name}</button>
          </section>
        ))}
      </div>
    </div>
  );
};

export default LevelSelect;
