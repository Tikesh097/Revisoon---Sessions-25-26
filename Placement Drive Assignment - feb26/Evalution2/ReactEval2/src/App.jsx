import { useEffect, useState } from 'react'
import { flashcards } from "./data/flashcards";
import { localStorageKeys } from "./utils/localStorageKeys";
import Flashcard from './components/Flashcard'
import Timer from './components/Timer';
import Summary from './pages/Summary';
import './index.css'

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(
    Number(localStorage.getItem(localStorageKeys.CURRENT_CARD_INDEX)) || 0
  );

  const [correct, setCorrect] = useState(
    Number(localStorage.getItem(localStorageKeys.CORRECT_ANSWERS)) || 0
  );

  const [incorrect, setIncorrect] = useState(
    Number(localStorage.getItem(localStorageKeys.INCORRECT_ANSWERS)) || 0
  );

    const [unattempted, setUnattempted] = useState(
    Number(localStorage.getItem(localStorageKeys.UNATTEMPTED_CARDS)) || flashcards.length
  );

  const [timeLeft, setTimeLeft] = useState(
    Number(localStorage.getItem(localStorageKeys.TIMER)) || 600
  );

  const [sessionEnd, setSessionEnd] = useState(false);

  useEffect(()=> {
    localStorage.setItem(localStorageKeys.CURRENT_CARD_INDEX,currentIndex);
    localStorage.setItem(localStorageKeys.CORRECT_ANSWERS,correct);
    localStorage.setItem(localStorageKeys.INCORRECT_ANSWERS,incorrect);
     localStorage.setItem(localStorageKeys.UNATTEMPTED_CARDS,unattempted);
    localStorage.setItem(localStorageKeys.TIMER,timeLeft);
  },[currentIndex,correct,incorrect,unattempted,timeLeft]);

  const handleAnswer = (isCorrect) => {
    if(isCorrect) {
    setCorrect(c => c + 1)
    } else {
      setIncorrect(i => i + 1);
    }
    setUnattempted(u => u - 1);
  
   
    if(currentIndex === flashcards.length - 1){
      setSessionEnd(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  if(sessionEnd) {
    return (
      <Summary
      correct={correct}
      incorrect={incorrect}
      unattempted={unattempted}
      />
    );
  }

  return (
    <>
    <div className='min-h-screen bg-gray-100 flex flex-col items-center gap-6 p-6'>
      <Timer
      timeLeft={timeLeft}
      setTimeLeft={setTimeLeft}
      onExpire={() => setSessionEnd(true)}
      />

      <Flashcard
      card={flashcards[currentIndex]}
      onAnswer={handleAnswer}
      />

      <div className='flex gap-4'>
        <button className='px-4 py-2 bg-gray-300 rounded'
        disabled={currentIndex === 0}
        onClick={()=>setCurrentIndex((i) => i -1)}
        >
          Previous
        </button>
        
        <button className='px-4 py-2 bg-gray-300 rounded'
        disabled={currentIndex === flashcards.length - 1}
        onClick={()=>setCurrentIndex((i) => i + 1)}
        >
          Next
        </button>
      </div>
    </div>
  
    </>
  );
}
