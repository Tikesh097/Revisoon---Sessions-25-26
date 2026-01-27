function login(username, password) {
  fetch(ENDPOINTS.login, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.json())
  .then(data => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", username);
    state.user = username;
  });
}
