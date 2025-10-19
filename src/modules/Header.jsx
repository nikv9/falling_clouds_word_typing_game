import React from "react";
import { Link } from "react-router-dom";
import { FiClock } from "react-icons/fi";

const Header = (props) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center py-2 px-4 border-b border-gray-600 gap-2 md:gap-0">
      <Link to="/" className="tracking-wider font-bold text-lg">
        FALLING CLOUDS
      </Link>

      <div className="flex items-center gap-4 flex-wrap">
        <button
          onClick={props.onToggleLevel}
          className={`flex items-center gap-1 py-1 px-2 rounded cursor-pointer ${
            props.level === "hard"
              ? "bg-red-700 text-white"
              : "bg-green-700 text-white"
          }`}
        >
          {props.level === "hard" ? "Hard" : "Easy"}
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={props.onToggleTimer}
            className={`flex items-center justify-center py-2 px-3 rounded cursor-pointer ${
              props.timerOn
                ? "bg-yellow-400 text-black"
                : "bg-gray-700 text-white"
            }`}
          >
            <FiClock />
          </button>
          <span
            className={`text-yellow-400 ${!props.timerOn ? "opacity-50" : ""}`}
          >
            {props.timeLeft}s
          </span>
        </div>

        <span className="text-green-500">Score: {props.score}</span>
        <span className={`text-red-500 ${props.timerOn ? "opacity-50" : ""}`}>
          Lives: {props.lives}
        </span>
      </div>
    </div>
  );
};

export default Header;
