import { Routes, Route } from "react-router-dom";
import QuizzesFlow from "./components/quizzes";
import Home from "./home/home";
import AppLayout from "./core/app_layout";
import Lessons from "./components/lessons"; 
function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/quizzes" element={<QuizzesFlow />} />
        <Route path="/lessons" element={<Lessons />} /> {/*  Lessons route */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default App;
