let users = [];
let filteredUsers = [];
let isAsc = true;

async function fetchUsers() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("Failed to fetch users");

    users = await res.json();
    filteredUsers = users;

    populateDomainFilter();
    updateStats();
    renderTable();
    document.getElementById("loading").style.display = "none";
  } catch (err) {
    document.getElementById("loading").style.display = "none";
    document.getElementById("error").innerText = err.message;
  }
}

fetchUsers();
