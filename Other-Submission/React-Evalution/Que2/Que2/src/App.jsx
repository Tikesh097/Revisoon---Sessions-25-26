import { useEffect, useState } from 'react';
import { patients } from './data/patients';
import { localStorageKeys } from './utils/localStorageKeys';
import Timer from './components/Timer';
import PatientCard from './components/PatientCard';
import Summary from './components/Summary';
import './App.css'
import './index.css'


const SESSION_TIME = 15 * 60;

export default function App() {

  const [current, setCurrent] = useState(() =>
    Number(localStorage.getItem(localStorageKeys.CURRENT_PATIENT)) || 0);

  const [treated, setTreated] = useState(() =>
    Number(localStorage.getItem(localStorageKeys.TREATED)) || []);

  const [notTreated, setNotTreated] = useState(() =>
    Number(localStorage.getItem(localStorageKeys.NOT_TREATED)) || []);

  const [timeLeft, setTimeLeft] = useState(() =>
    Number(localStorage.getItem(localStorageKeys.TIMER)) || SESSION_TIME);  

  const [ended, setEnded] = useState(false);

  useEffect(() => {
    localStorage.setItem(localStorageKeys.CURRENT_PATIENT, current);
    localStorage.setItem(localStorageKeys.TREATED, JSON.stringify(treated));
    localStorage.setItem(localStorageKeys.NOT_TREATED, JSON.stringify(notTreated));
    localStorage.setItem(localStorageKeys.TIMER, timeLeft);
  }, [current, treated, notTreated, timeLeft]);

  const currentPatient = patients[current];
  const status = treated.includes(currentPatient?.id) ? "treated" : notTreated.includes(currentPatient?.id) ? "not" : null;
  const markTreated = () => setTreated([...treated, currentPatient.id]);
  const markNotTreated = () => setNotTreated([...notTreated, currentPatient.id]);

  useEffect(() => {
    if (treated.length + notTreated.length === patients.length)
      setEnded(true);
  }, [treated, notTreated]);

  if (ended || timeLeft <= 0) {
    return <Summary
      total={patients.length}
      treated={treated.length}
      notTreated={notTreated.length} />;
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-6  bg-blue-200'>
      <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} onExpire={() => setEnded(true)} />
      <p>Patient {current + 1} / {patients.length}</p>

      <PatientCard
        patient={currentPatient}
        status={status}
        onTreat={markTreated}
        onExpire={markNotTreated}
      />

      <div className='flex gap-6'>
        <button disabled={current === 0}
          onClick={() => setCurrent(c => c - 1)}
          className='px-4 py-2 bg-gray-200 rounded-full'
        >Prev</button>

        <button disabled={current === patients.length - 1}
          onClick={() => setCurrent(c => c + 1)}
          className='px-4 py-2 bg-gray-200 rounded-full'
        >Next</button>
      </div>
    </div>
  );
}

