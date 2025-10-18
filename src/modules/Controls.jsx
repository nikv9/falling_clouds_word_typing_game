import React from "react";

const Controls = (props) => {
  return (
    <div className="controlsContainer fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-4">
      <input
        type="text"
        ref={props.inputRef}
        value={props.inputVal}
        onChange={props.onInputChange}
        autoFocus
        disabled={props.paused}
        placeholder="Type here..."
        className="p-2 my-4 outline-none border border-gray-600 rounded-sm"
      />
      <div className="flex items-center gap-4">
        <button
          onClick={props.onRestart}
          className="p-2 rounded-sm bg-yellow-600 hover:bg-yellow-700 cursor-pointer"
        >
          Restart
        </button>
        <button
          onClick={props.onStop}
          className="p-2 rounded-sm bg-red-600 hover:bg-red-700 cursor-pointer"
        >
          Stop
        </button>
        <button
          onClick={props.onTogglePause}
          className={`p-2 rounded-sm cursor-pointer ${
            props.paused
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-700 hover:bg-blue-800"
          }`}
        >
          {props.paused ? "Resume" : "Pause"}
        </button>
      </div>
    </div>
  );
};

export default Controls;
