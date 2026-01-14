const products = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Mouse", price: 25 },
  { id: 3, name: "Keyboard", price: 75 },
  { id: 4, name: "Monitor", price: 299 },
];

let cart = {};

const cartDiv = document.getElementById("cart");
const summaryDiv = document.getElementById("summary");
const productsDiv = document.getElementById("products");

//RENDER PRODUCTS
function renderProducts() {
  productsDiv.innerHTML = "";

  products.forEach((product) => {
    const div = document.createElement("div");
    div.innerHTML = `
      ${product.name} - $${product.price}
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productsDiv.appendChild(div);
  });
}

//ADD TO CART
function addToCart(id) {
  if (cart[id]) {
    cart[id].quantity++;
  } else {
    const product = products.find((p) => p.id === id);
    cart[id] = { ...product, quantity: 1 };
  }
  renderCart();
}

//UPDATE QUANTITY
function updateQuantity(id, change) {
  cart[id].quantity += change;

  if (cart[id].quantity <= 0) {
    delete cart[id];
  }
  renderCart();
}

//REMOVE ITEM
function removeItem(id) {
  delete cart[id];
  renderCart();
}

//RENDER CART
function renderCart() {
  cartDiv.innerHTML = "";
  summaryDiv.innerHTML = "";

  if (Object.keys(cart).length === 0) {
    cartDiv.innerHTML = "Cart is empty";
    return;
  }

  let subtotal = 0;

  Object.values(cart).forEach((item) => {
    subtotal += item.price * item.quantity;

    const div = document.createElement("div");
    div.innerHTML = `
      ${item.name} ($${item.price})
      <button onclick="updateQuantity(${item.id}, -1)">-</button>
      ${item.quantity}
      <button onclick="updateQuantity(${item.id}, 1)">+</button>
      <button onclick="removeItem(${item.id})">Remove</button>
    `;
    cartDiv.appendChild(div);
  });

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  summaryDiv.innerHTML = `
    Subtotal: $${subtotal.toFixed(2)} <br>
    Tax (10%): $${tax.toFixed(2)} <br>
    <strong>Total: $${total.toFixed(2)}</strong>
  `;
}

renderProducts();
renderCart();
