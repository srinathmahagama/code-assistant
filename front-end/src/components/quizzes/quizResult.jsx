import "./quizzes_styles.css"

const QuizResult = ({ score }) => (
    <div className="quiz-result-container">
      <h2 className="quiz-result-title">🎉 Quiz Complete!</h2>
      <p className="quiz-result-score">You scored <strong>{score}</strong> out of 5</p>
      <button className="quiz-button" onClick={() => window.location.href = "/quizzes"}>
        Try Again
      </button>
    </div>
  );
  
  export default QuizResult;
  