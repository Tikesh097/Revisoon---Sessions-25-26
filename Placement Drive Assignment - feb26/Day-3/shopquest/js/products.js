function loadProducts() {
  document.getElementById("status").innerText = "Loading products...";

  fetchWithRetry(ENDPOINTS.products)
    .then(data => {
      state.products = data;
      localStorage.setItem("productsCache", JSON.stringify(data));
      document.getElementById("status").innerText = "";
      renderProducts(data);
    })
    .catch(() => {
      const cached = JSON.parse(localStorage.getItem("productsCache"));
      if (cached) {
        document.getElementById("status").innerText = "Offline - cached data";
        renderProducts(cached);
      }
    });
}

function renderProducts(products) {
  const div = document.getElementById("products");
  div.innerHTML = "";

  products.forEach(p => {
    const card = document.createElement("div");

    card.innerHTML = `
      <h4>${p.title}</h4>
      <p>₹${p.price}</p>
      <button>Add to Cart</button>
    `;

    card.querySelector("button").addEventListener("click", function () {
      addToCartById(p.id);
    });

    div.appendChild(card);
  });
}
