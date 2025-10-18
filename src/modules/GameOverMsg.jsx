import React from "react";

const GameOverMsg = (props) => {
  return (
    <div className="gameOverMsgContainer fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-red-800 h-[20%] w-[20%] flex flex-col justify-center items-center gap-3">
      <h2 className="text-3xl text-white font-bold animate-pulse">
        GAME OVER!
      </h2>
      <p className="text-xl text-yellow-300">Final Score: {props.score}</p>
    </div>
  );
};

export default GameOverMsg;
