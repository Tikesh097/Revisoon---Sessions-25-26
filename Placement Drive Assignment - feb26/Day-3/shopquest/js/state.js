const state = {
  products: [],
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  user: localStorage.getItem("user") || null
};
