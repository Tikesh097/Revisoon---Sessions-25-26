/*
Implement a fetch function with automatic retry logic (max 3 attempts) and proper error handling.
**API:** `https://jsonplaceholder.typicode.com/posts/1`

Handle network failures gracefully and implement exponential backoff.
*/

function fetchWithRetry(url, maxRetries = 3, delay = 500) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP Error: " + response.status);
      }
      return response.json();
    })
    .catch((error) => {
      if (maxRetries === 1) {
        throw new Error("Failed after multiple retries");
      }

      console.warn(`Retrying in ${delay}ms...`);

      return new Promise((resolve) => {
        setTimeout(resolve, delay);
      }).then(() => {
        return fetchWithRetry(url, maxRetries - 1, delay * 2);
      });
    });
}
