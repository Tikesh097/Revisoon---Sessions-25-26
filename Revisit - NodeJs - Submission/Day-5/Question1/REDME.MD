# Node.js Interview Questions & Answers

## 1. What is Node.js? How does it differ from browser JavaScript?

**Answer:**

Node.js is a JavaScript runtime that allows us to run JavaScript outside the browser, mainly on the server.

**Differences:**

| Node.js | Browser JavaScript |
|---------|-------------------|
| Runs on server | Runs in browser |
| Can access file system, OS, network | Cannot access system directly |
| Used for backend APIs | Used for UI and DOM |
| Has `fs`, `http`, `process` modules | Has `window`, `document` |

---

## 2. What is the event loop in Node.js? Explain how it works.

**Answer:**

The event loop is the mechanism that allows Node.js to handle multiple tasks using a single thread.

**How it works (simple flow):**

1. Executes synchronous code first
2. Async operations go to background
3. When ready, callbacks are placed in queues
4. Event loop picks tasks and executes them one by one

👉 This is why Node.js is fast and scalable.

---

## 3. What is non-blocking I/O? How does Node.js achieve it?

**Answer:**

Non-blocking I/O means Node.js does not wait for a task like file read or API call to finish.

**How Node.js achieves this:**

* Uses async APIs
* Uses event loop
* Heavy tasks are handled in background (thread pool)

**Result:** ➡️ Server keeps responding to other requests

---

## 4. Explain the difference between synchronous and asynchronous code.

**Answer:**

| Synchronous | Asynchronous |
|-------------|--------------|
| Blocks execution | Does not block |
| One task at a time | Multiple tasks |
| Slow for I/O | Fast for I/O |
| Example: `fs.readFileSync()` | Example: `fs.readFile()` |

---

## 5. What are callbacks? What is callback hell?

**Answer:**

A **callback** is a function passed as an argument and executed later.

**Callback Hell:**

* Too many nested callbacks
* Hard to read and maintain
* Causes error handling problems

**Example:**

```javascript
a(() => {
  b(() => {
    c(() => {
      d();
    });
  });
});
```

---

## 6. What are Promises? How do they solve callback hell?

**Answer:**

A **Promise** represents a value that will be available in the future.

**States:**

* Pending
* Fulfilled
* Rejected

**How they help:**

* Chain `.then()` calls
* Flat structure
* Central error handling using `.catch()`

---

## 7. What is async/await? How does it work internally?

**Answer:**

`async/await` is a cleaner way to write asynchronous code using Promises.

**Internally:**

* `async` function always returns a Promise
* `await` pauses execution until Promise resolves
* Does NOT block the event loop

**Example:**

```javascript
const data = await fetchData();
```

---

## 8. What is the difference between process.nextTick() and setImmediate()?

**Answer:**

| process.nextTick | setImmediate |
|------------------|--------------|
| Executes immediately | Executes in next event loop phase |
| Higher priority | Lower priority |
| Can block event loop | Safer to use |

👉 `nextTick` runs before I/O callbacks.

---

## 9. What are streams in Node.js? Name the types of streams.

**Answer:**

Streams are used to handle large data efficiently without loading it into memory.

**Types of Streams:**

1. Readable
2. Writable
3. Duplex
4. Transform

**Example:**

```javascript
fs.createReadStream("file.txt");
```

---

## 10. What is the Buffer class in Node.js?

**Answer:**

Buffer is used to handle binary data directly in memory.

**Used when:**

* Working with files
* Streams
* Network data

**Example:**

```javascript
Buffer.from("Hello");
```

---



