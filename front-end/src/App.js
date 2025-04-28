import { Routes, Route } from "react-router-dom";
import QuizzesPage from "./quizzes/quizzes";
import PythonQuizzes from "./quizzes/pythonQuizzes";
import JavaScriptQuizzes from "./quizzes/javaScriptQuizzes";
import Home from "./home/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quizzes" element={<QuizzesPage />} />
      <Route path="/python-quizzes" element={<PythonQuizzes />} />
      <Route path="/javascript-quizzes" element={<JavaScriptQuizzes />} />
    </Routes>
  );
}

export default App;
