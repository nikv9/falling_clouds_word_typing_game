import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WordTyping from "./pages/WordTyping";

const App = () => {
  return (
    <div className="app bg-[#151721]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/word_typing" element={<WordTyping />} />
      </Routes>
    </div>
  );
};

export default App;
