function addToCart(product) {
  const item = state.cart.find(i => i.id === product.id);

  if (item) {
    item.qty++;
  } else {
    state.cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(state.cart));
  renderCart();
}

function addToCartById(id) {
  const product = state.products.find(p => p.id === id);
  if (!product) return;

  addToCart(product);
}

function renderCart() {
  const div = document.getElementById("cart-items");
  div.innerHTML = "";

  state.cart.forEach(i => {
    div.innerHTML += `<p>${i.title} x ${i.qty}</p>`;
  });
}
