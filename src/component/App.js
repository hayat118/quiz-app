import React from "react";
import { Routes, Route } from "react-router-dom";
import Start from "./Start";
import Quiz from "./Quiz";

function App() {
  return (
    <>
      {/* <div className="box"> */}
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
      {/* </div> */}
    </>
  );
}
export default App;
