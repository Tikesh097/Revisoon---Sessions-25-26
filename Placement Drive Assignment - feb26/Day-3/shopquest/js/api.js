function fetchWithTimeout(url, timeout = 5000) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject("Timeout"), timeout)
    )
  ]);
}

function fetchWithRetry(url, retries = 3) {
  const start = performance.now();

  return fetchWithTimeout(url)
    .then(res => {
      logApi(url, res.status, performance.now() - start);
      if (!res.ok) throw "Error";
      return res.json();
    })
    .catch(err => {
      if (retries > 0) {
        return fetchWithRetry(url, retries - 1);
      }
      throw err;
    });
}
