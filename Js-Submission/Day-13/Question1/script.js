function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

function apiCall(query) {
  console.log('API called with:', query);
}

const debouncedApi = debounce(apiCall, 500);

debouncedApi('a');
debouncedApi('ab');
debouncedApi('abc');
