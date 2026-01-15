//Que:2 : Deep Property Extraction (10 mins)
// Extract and flatten specific nested properties from a complex object structure.

const orders = [
  {
    orderId: "A1",
    customer: { name: "John", location: { city: "NYC", country: "USA" } },
    items: [
      { product: "Laptop", quantity: 1, price: 999 },
      { product: "Mouse", quantity: 2, price: 25 },
    ],
  },
  {
    orderId: "A2",
    customer: { name: "Jane", location: { city: "LA", country: "USA" } },
    items: [{ product: "Keyboard", quantity: 1, price: 75 }],
  },
];

function extractOrderDetails(orders) {
  return orders.map((order) => {
    const totalAmount = order.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    return {
      orderId: order.orderId,
      customerName: order.customer.name,
      city: order.customer.location.city,
      totalAmount,
    };
  });
}

console.log(extractOrderDetails(orders));
