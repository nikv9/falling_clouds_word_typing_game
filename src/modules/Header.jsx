import React from "react";

const Header = (props) => {
  return (
    <div className="flex justify-between items-center py-2 px-4 border-b border-gray-600">
      <h1 className="tracking-wider">FALLING CLOUDS</h1>
      <div className="flex justify-center items-center gap-7">
        <select
          value={props.level}
          onChange={props.onLevelChange}
          className="bg-gray-700 text-white text-sm outline-none rounded-sm cursor-pointer p-1"
        >
          <option value="easy">Easy</option>
          <option value="hard">Hard</option>
        </select>
        <span className="text-green-500">Score: {props.score}</span>
        <span className="text-red-500">Lives: {props.lives}</span>
      </div>
    </div>
  );
};

export default Header;
