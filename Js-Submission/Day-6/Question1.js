// ### Q1: Fetch and Transform User Data (12 mins)
// Fetch users from an API and transform the response to show only active users with their full names.

// **API:** `https://jsonplaceholder.typicode.com/users`

function fetchAndTransformUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(users => {
      const result = users
        .filter(user => user.username.length > 6)
        .map(user => ({
          id: user.id,
          fullName: user.name,
          email: user.email
        }));

      console.log(result);
    })
    .catch(error => {
      console.error("Error fetching users:", error);
    });
}

fetchAndTransformUsers();
