import { useEffect, useRef, useState } from 'react';
import "./index.css"

const DEFAULT_TIME = 300;

function App() {
  const [time, setTime] = useState(DEFAULT_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && !isEditing && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning, isEditing, time]);


  useEffect(() => {
    if (time === 0) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  }, [time]);


  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const formattedTime = `
  ${String(minutes).padStart(2, '0')} :
  ${String(seconds).padStart(2, '0')}`;

  const toggleTimer = () => {
    if (time === 0) return;
    setIsRunning(prev => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(DEFAULT_TIME);
  };

  const startEditing = () => {
    if (!isRunning) {
      setIsEditing(true);
      setEditValue(time.toString());
    }
  };

  const confirmEdit = () => {
    const newTime = parseInt(editValue);
    if (!isNaN(newTime) && newTime >= 0) {
      setTime(newTime);
    }
    setIsEditing(false)
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      confirmEdit();
    }
  };

  return (
    <div className='bg-white rounded-2xl shadow-xl p-8 text-center '>
      <h2 className='text-3xl font-bold text-indigo-700 mb-6'>Countdown Timer App</h2>
      {isEditing ? (
        <input
          autoFocus
          value={editValue}
          onChange={e =>
            setEditValue(e.target.value)}
          onBlur={confirmEdit}
          onKeyDown={handleKeyPress}
        />
      ) : (
        <div
          onClick={startEditing}
          style={{ color: time === 0 ? 'red' : 'black', fontSize: '30p' }}
        >{formattedTime}
        </div>
      )}

      <button onClick={toggleTimer} className='px-6 py-3 rounded-xl font-bold w-32'> {isRunning ? 'Stop' : 'Start'}</button>
      <button onClick={resetTimer} className='px-6 py-3 rounded-xl font-bold w-32'>Reset</button>

      {time === 0 && <p>Time is Up!</p>}
    </div>
  )
}

export default App
