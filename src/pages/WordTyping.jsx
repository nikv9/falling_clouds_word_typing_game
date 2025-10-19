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
  const [timerOn, setTimerOn] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const fallInterval = useRef(null);
  const inputRef = useRef(null);
  const [missedSAudio] = useSound(missedSfx);

  const getRandomWord = () => generate({ minLength: 3, maxLength: 15 });
  const resetDefaults = () => {
    setScore(0);
    setLives(5);
    setPosition(0);
    setTimeLeft(60);
    setInputVal("");
    setCurrentWord(getRandomWord());
  };
  const focusInput = () => setTimeout(() => inputRef.current?.focus(), 0);

  const startGame = () => {
    resetDefaults();
    setGameOver(false);
    setStart(true);
    setPaused(false);
    focusInput();
  };

  const stopGame = (isManual = false) => {
    clearInterval(fallInterval.current);
    setStart(false);
    setCurrentWord("");
    setInputVal("");
    setPosition(0);
    setTimeLeft(60);
    if (isManual) {
      setLives(5);
      setScore(0);
    } else setGameOver(true);
  };

  const handleTyping = (e) => {
    const value = e.target.value.trim();
    setInputVal(value);
    if (value === currentWord) {
      setScore((s) => s + 5);
      setCurrentWord(getRandomWord());
      setInputVal("");
      setPosition(0);
    }
  };

  const togglePause = () => {
    setPaused((p) => {
      const newState = !p;
      if (p) focusInput();
      return newState;
    });
  };

  const toggleLevel = () => {
    setLevel((prev) => (prev === "easy" ? "hard" : "easy"));
    stopGame(true);
  };

  const toggleTimer = () => {
    setTimerOn((t) => !t);
    stopGame(true);
  };

  // falling animation
  useEffect(() => {
    if (!start || paused) return;
    fallInterval.current = setInterval(
      () => setPosition((p) => p + 1),
      level === "easy" ? 50 : 30
    );
    return () => clearInterval(fallInterval.current);
  }, [start, paused, level]);

  // lose life when word hits bottom
  useEffect(() => {
    const maxPos = window.innerWidth <= 800 ? 72 : 80;
    if (position < maxPos) return;

    if (!timerOn) {
      setLives((l) => {
        const newLives = l - 1;
        if (newLives <= 0) {
          stopGame();
          return 0;
        }
        return newLives;
      });
    }

    missedSAudio();
    setCurrentWord(getRandomWord());
    setInputVal("");
    setPosition(0);
  }, [position, timerOn]);

  // countdown timer
  useEffect(() => {
    if (!start || !timerOn || paused) return;
    const t = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          clearInterval(t);
          stopGame();
          return 0;
        }
        return time - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [start, timerOn, paused]);

  return (
    <div className="h-dvh text-white">
      <Header
        score={score}
        lives={lives}
        level={level}
        onToggleLevel={toggleLevel}
        timerOn={timerOn}
        timeLeft={timeLeft}
        onToggleTimer={toggleTimer}
      />

      {!start ? (
        <button
          className="fixed bottom-4 right-4 px-4 py-2 bg-green-600 rounded hover:bg-green-700"
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
            onInputChange={handleTyping}
            onRestart={startGame}
            onStop={() => stopGame(true)}
            onTogglePause={togglePause}
          />
        </>
      )}

      {gameOver && <GameOverMsg score={score} />}
    </div>
  );
};

export default WordTyping;
