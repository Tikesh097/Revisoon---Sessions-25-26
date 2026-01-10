/*Q2: Hierarchical Data Aggregation (15 mins)
Aggregate nested transaction data with running totals.
*/

const transactions = [
  {
    date: "2024-01-15",
    category: "Food",
    items: [
      { name: "Groceries", amount: 50 },
      { name: "Restaurant", amount: 75 },
    ],
  },
  {
    date: "2024-01-16",
    category: "Transport",
    items: [
      { name: "Gas", amount: 40 },
      { name: "Parking", amount: 10 },
    ],
  },
  {
    date: "2024-01-17",
    category: "Food",
    items: [{ name: "Coffee", amount: 5 }],
  },
];

const result = transactions.reduce((acc, { category, items }) => {
  if (!acc[category]) {
    acc[category] = { total: 0, count: 0 };
  }

  items.forEach((item) => {
    acc[category].total += item.amount;
    acc[category].count += 1;
  });

  return acc;
}, {});

console.log(result);
