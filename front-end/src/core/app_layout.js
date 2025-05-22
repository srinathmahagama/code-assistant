// src/layout/AppLayout.js
import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./app_layout_styles.css"; // Optional: for styling

const AppLayout = () => {
  return (
    <div className="app-layout">
      <div className="main-header">
        <div className="brand-logo">🚀 Code Learning Platform</div>
        <nav className="main-menu">
          <Link to="/">Home</Link>
          <Link to="/lessons">Lessons</Link>
          <Link to="/quizzes">Quizzes</Link>
        </nav>
      </div>

      {/* This is where nested pages will render */}
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
