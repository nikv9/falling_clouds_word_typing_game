import React, { useState, useEffect, useRef } from "react";
import { generate } from "random-words";
import useSound from "use-sound";
import missedSfx from "../assets/awm.mp3";
import Header from "../modules/Header";
import FallingWord from "../modules/FallingWord";
import Controls from "../modules/Controls";
import GameOverMsg from "../modules/GameOverMsg";

const WordTyping = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [start, setStart] = useState(false);
  const [lives, setLives] = useState(5);
  const [paused, setPaused] = useState(false);
  const [level, setLevel] = useState("easy");

  const fallInterval = useRef(null);
  const inputRef = useRef(null);

  const [missedSAudio] = useSound(missedSfx);

  const getRandomWord = () => generate({ minLength: 3, maxLength: 15 });

  const startGame = () => {
    setScore(0);
    setPosition(0);
    setGameOver(false);
    setStart(true);
    setPaused(false);
    setLives(5);
    setCurrentWord(getRandomWord());
    setTimeout(() => inputRef.current.focus(), 0);
  };

  const stopGame = () => {
    clearInterval(fallInterval.current);
    setStart(false);
    setCurrentWord("");
    setInputVal("");
    setPosition(0);
    setGameOver(true);
  };

  const wordType = (e) => {
    const value = e.target.value;
    setInputVal(value);

    if (value.trim() === currentWord) {
      setScore((prev) => prev + 5);
      setCurrentWord(getRandomWord());
      setInputVal("");
      setPosition(0);
    }
  };

  const togglePause = () => {
    setPaused((prev) => {
      const newState = !prev;
      if (prev && inputRef.current)
        setTimeout(() => inputRef.current.focus(), 0);
      return newState;
    });
  };

  const selectLevel = (e) => {
    setLevel(e.target.value);
    if (start) {
      clearInterval(fallInterval.current);
      startGame();
      setInputVal("");
    }
  };

  useEffect(() => {
    if (!start || paused) return;

    fallInterval.current = setInterval(
      () => {
        setPosition((prev) => prev + 1);
      },
      level === "easy" ? 50 : 30
    );

    return () => clearInterval(fallInterval.current);
  }, [start, paused, level]);

  useEffect(() => {
    // set the maximum falling position based on screen width
    const maxPos = window.innerWidth <= 800 ? 72 : 80;

    if (position >= maxPos) {
      setLives((prev) => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          stopGame();
          return 0;
        }
        return newLives;
      });
      missedSAudio();
      setCurrentWord(getRandomWord());
      setInputVal("");
      setPosition(0);
    }
  }, [position]);

  return (
    <div className="h-dvh text-white">
      <Header
        score={score}
        lives={lives}
        level={level}
        onLevelChange={selectLevel}
      />

      {!start ? (
        <button
          className="fixed bottom-4 right-4 px-4 py-2 bg-green-600 rounded hover:bg-green-700 cursor-pointer"
          onClick={startGame}
        >
          Start Game
        </button>
      ) : (
        <>
          <FallingWord
            currentWord={currentWord}
            inputVal={inputVal}
            position={position}
          />
          <Controls
            inputVal={inputVal}
            inputRef={inputRef}
            paused={paused}
            onInputChange={wordType}
            onRestart={startGame}
            onStop={stopGame}
            onTogglePause={togglePause}
          />
        </>
      )}

      {gameOver && <GameOverMsg score={score} />}
    </div>
  );
};

export default WordTyping;
