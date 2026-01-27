window.onload = function () {
  loadProducts();
  renderCart();
  renderLogs();

  document.getElementById("search").addEventListener("input", e => {
    const q = e.target.value.toLowerCase();
    renderProducts(
      state.products.filter(p =>
        p.title.toLowerCase().includes(q)
      )
    );
  });

  document.getElementById("checkout-btn").onclick = function () {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login required");
      return;
    }

    fetch(ENDPOINTS.carts, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        userId: 1,
        products: state.cart.map(i => ({
          productId: i.id,
          quantity: i.qty
        }))
      })
    })
    .then(res => res.json())
    .then(() => {
      alert("Order placed!");
      state.cart = [];
      localStorage.removeItem("cart");
      renderCart();
    });
  };
};
