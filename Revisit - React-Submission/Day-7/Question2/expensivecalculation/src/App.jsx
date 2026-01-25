import { useEffect, useState } from "react";

function NumberAnalyzer() {
  const [number, setNumber] = useState(0);
  const [theme, setTheme] = useState("light");
  const [calcCount, setCalcCount] = useState(0);
  const [result, setResult] = useState({
    isPrime: false,
    factors: [],
    sum: 0
  });

  useEffect(() => {
    function analyzeNumber(num) {
      let factors = [];
      let sum = 0;
      let isPrime = num > 1;

      for (let i = 1; i <= num; i++) {
        if (num % i === 0) {
          factors.push(i);
          sum += i;
          if (i !== 1 && i !== num) {
            isPrime = false;
          }
        }
      }

      return { isPrime, factors, sum };
    }

    const analysis = analyzeNumber(number);
    setResult(analysis);
    setCalcCount(count => count + 1);

  }, [number]); // 👈 only runs when number changes

  return (
    <div className={theme}>
      <h2>Number Analyzer</h2>

      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />

      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>

      <p>Theme: {theme}</p>
      <p>Calculation Count: {calcCount}</p>

      <p>Is Prime: {result.isPrime ? "Yes" : "No"}</p>
      <p>Sum of Factors: {result.sum}</p>

      <ul>
        {result.factors.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    </div>
  );
}

export default NumberAnalyzer;
