function logApi(url, status, duration) {
  const logs = JSON.parse(localStorage.getItem("apiLogs")) || [];

  logs.unshift({
    url,
    status,
    duration: duration.toFixed(0) + "ms"
  });

  localStorage.setItem("apiLogs", JSON.stringify(logs.slice(0, 5)));
  renderLogs();
}

function renderLogs() {
  const ul = document.getElementById("api-logs");
  ul.innerHTML = "";

  const logs = JSON.parse(localStorage.getItem("apiLogs")) || [];
  logs.forEach(l => {
    ul.innerHTML += `<li>${l.url} | ${l.status} | ${l.duration}</li>`;
  });
}
