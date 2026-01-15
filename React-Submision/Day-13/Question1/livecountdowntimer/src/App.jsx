import { useEffect, useRef, useState } from "react";

function App() {

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);


  const [timeLeft, setTimeLeft] = useState(0);


  const [isRunning, setIsRunning] = useState(false);


  const intervalRef = useRef(null);


  function formatTime(totalSeconds) {
    const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const s = String(totalSeconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  }


  function startTimer() {
    const total = Number(minutes) * 60 + Number(seconds);
    if (total <= 0) return;

    setTimeLeft(total);
    setIsRunning(true);
  }


  function togglePause() {
    setIsRunning((prev) => !prev);
  }


  function resetTimer() {
    setIsRunning(false);
    setTimeLeft(0);
    setMinutes(0);
    setSeconds(0);
  }


  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          alert("Time's Up!");
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);


    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  return (
    <div className="timer-card">
      <h2>Countdown Timer</h2>

      <div>
        <input
          type="number"
          min="0"
          placeholder="MM"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
        :
        <input
          type="number"
          min="0"
          max="59"
          placeholder="SS"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
        />
      </div>

      <div className="timer-display">
        {formatTime(timeLeft)}
      </div>

      <div>
        {!isRunning ? (
          <button onClick={startTimer}>Start</button>
        ) : (
          <button onClick={togglePause}>Pause</button>
        )}

        {isRunning === false && timeLeft > 0 && (
          <button onClick={togglePause}>Resume</button>
        )}

        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default App;
