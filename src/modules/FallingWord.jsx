import React from "react";
import cloudImg from "../assets/cloud.png";

const FallingWord = (props) => {
  return (
    <div className="fallingWordContainer relative w-full h-[80vh] border-b border-gray-600 my-5 mx-auto overflow-hidden">
      <div
        className="absolute left-1/2 transform -translate-x-1/2"
        style={{ top: `${props.position}%` }}
      >
        <img src={cloudImg} alt="cloud" className="w-40 h-auto mx-auto" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl">
          {props.currentWord.split("").map((char, index) => {
            let className = "";
            if (props.inputVal[index]) {
              className =
                char === props.inputVal[index]
                  ? "text-green-400"
                  : "text-red-500";
            }
            return (
              <span key={index} className={className}>
                {char}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FallingWord;
