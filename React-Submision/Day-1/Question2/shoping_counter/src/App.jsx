import { useState } from "react";

export default function ShoppingCartCounter() {
  const [qty, setQty] = useState(1);
  const price = 29.99;

  const increment = () => setQty(qty + 1);
  const decrement = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const subtotal = qty * price;
  const discount = qty >= 5 ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  return (
    <div style={{ marginTop: "20px " }}>
      <h2>Shopping Cart</h2>

      <button onClick={decrement}>-</button>
      <span style={{ margin: "0 10px" }}>{qty}</span>
      <button onClick={increment}>+</button>

      <p>Unit Price: ${price}</p>

      {qty >= 5 && <p>🎉 10% Bulk Discount Applied!</p>}

      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
}
