import React from "react";
import { Routes, Route } from "react-router-dom";
import Start from "./Start";
import Quiz from "./Quiz";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </>
  );
}
export default App;
