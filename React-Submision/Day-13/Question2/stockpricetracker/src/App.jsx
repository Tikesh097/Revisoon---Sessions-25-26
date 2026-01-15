import { useEffect, useRef, useState } from "react";

// Mock Data
const initialStocks = [
  { symbol: 'AAPL', price: 178.50, name: 'Apple Inc.' },
  { symbol: 'GOOGL', price: 142.30, name: 'Alphabet Inc.' },
  { symbol: 'MSFT', price: 378.90, name: 'Microsoft Corp.' },
  { symbol: 'AMZN', price: 145.20, name: 'Amazon.com Inc.' },
  { symbol: 'TSLA', price: 242.80, name: 'Tesla Inc.' }
];

function App() {
  const [stocks, setStocks] = useState(
    initialStocks.map(stock => ({ ...stock, prevPrice: stock.price }))
  );

  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  //Function to simulate random price change ±0.50
  const updatePrices = () => {
    setStocks(prevStocks =>
      prevStocks.map(stock => {
        const change = (Math.random() * 1 - 0.5).toFixed(2); // -0.50 to +0.50
        const newPrice = +(stock.price + parseFloat(change)).toFixed(2);
        return {
          ...stock,
          prevPrice: stock.price,
          price: newPrice
        };
      })
    );
  };

  const toggleUpdates = () => {
    setIsRunning(prev => !prev);
  };


  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(updatePrices, 2000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  return (
    <div className="ticker-card">
      <h2>Stock Price Ticker</h2>

      {stocks.map(stock => {
        const diff = stock.price - stock.prevPrice;
        const percent = ((diff / stock.prevPrice) * 100).toFixed(2);
        const priceClass = diff > 0 ? "up" : diff < 0 ? "down" : "";

        return (
          <div className="stock-row" key={stock.symbol}>
            <div>
              <strong>{stock.symbol}</strong> - {stock.name}
            </div>
            <div className={`price ${priceClass}`}>
              ${stock.price} ({percent}%)
            </div>
          </div>
        );
      })}

      <button onClick={toggleUpdates}>
        {isRunning ? "Stop Updates" : "Start Updates"}
      </button>
    </div>
  );
}

export default App;
