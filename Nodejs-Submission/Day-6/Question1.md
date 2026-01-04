# Node.js Core Modules - Interview Guide

## Q1: What are core modules in Node.js? Name at least 10.

### Answer:

Core modules are built-in modules that come with Node.js and don't require installation via npm. They provide essential functionality for various operations.

Node.js includes several built-in modules that provide essential functionality without requiring external packages. Here are the most important ones:

1. **fs** - File System operations
2. **path** - File path utilities
3. **http/https** - Creating web servers and making HTTP requests
4. **events** - Event-driven architecture
5. **stream** - Handling streaming data
6. **buffer** - Working with binary data
7. **os** - Operating system information
8. **crypto** - Cryptographic functionality
9. **util** - Utility functions
10. **child_process** - Spawning child processes
11. **cluster** - Multi-process management
12. **net** - TCP/IP networking

---

## Q2: Explain the 'fs' module. What's the difference between fs and fs/promises?

### Answer:

The `fs` module provides an API for interacting with the file system. It allows you to read, write, delete, and manipulate files and directories.

### Difference between `fs` and `fs/promises`

**fs (callback-based):**
```javascript
const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

**fs/promises (promise-based):**
```javascript
const fs = require('fs/promises');

async function readFile() {
  try {
    const data = await fs.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

**Key Difference:** `fs` uses traditional callback patterns, while `fs/promises` returns promises, enabling cleaner async/await syntax and better error handling.

---

## Q3: What is the 'path' module used for?

### Answer:

The `path` module provides utilities for working with file and directory paths in a cross-platform way.

**Common use cases:**
```javascript
const path = require('path');

// Join path segments
path.join('/users', 'john', 'documents'); // '/users/john/documents'

// Get file extension
path.extname('file.txt'); // '.txt'

// Get filename without extension
path.basename('/path/to/file.txt', '.txt'); // 'file'

// Get directory name
path.dirname('/path/to/file.txt'); // '/path/to'

// Resolve absolute path
path.resolve('folder', 'file.txt'); // Absolute path based on current directory
```

It handles OS-specific path separators automatically (/ on Unix, \ on Windows).

---

## Q4: Explain the EventEmitter class. How do you use it?

### Answer:

The `EventEmitter` class is the foundation of Node.js's event-driven architecture. It allows objects to emit named events and register listeners for those events.

**Basic usage:**
```javascript
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// Register listener
myEmitter.on('event', (data) => {
  console.log('Event occurred:', data);
});

// Emit event
myEmitter.emit('event', { message: 'Hello World' });
```

**Common pattern in Node.js:** Many core modules like streams and HTTP servers inherit from EventEmitter.

---

## Q5: What is the difference between on() and once() in EventEmitter?

### Answer:

**on()** - Registers a listener that fires every time the event is emitted:
```javascript
myEmitter.on('event', () => {
  console.log('This fires every time');
});

myEmitter.emit('event'); // Logs message
myEmitter.emit('event'); // Logs message again
```

**once()** - Registers a listener that fires only the first time, then automatically removes itself:
```javascript
myEmitter.once('event', () => {
  console.log('This fires only once');
});

myEmitter.emit('event'); // Logs message
myEmitter.emit('event'); // Nothing happens
```

---

## Q6: How does error handling work with EventEmitters?

### Answer:

EventEmitters have special handling for 'error' events. If an 'error' event is emitted and no listener is registered, Node.js will throw an exception and potentially crash.

## Q7: What is the 'cluster' module? Why would you use it?

### Answer:

The `cluster` module allows you to create child processes (workers) that share the same server port, enabling load balancing across multiple CPU cores.

**Why use it:**
- Node.js runs on a single thread by default
- Cluster module allows utilizing all CPU cores
- Improves performance and availability
- Each worker runs in a separate process with its own memory

## Q8: What are child processes? When would you spawn one?

### Answer:

Child processes allow you to execute other programs or Node.js scripts from your main application. Each child process runs independently with its own memory space.

**When to spawn a child process:**
- Running CPU-intensive operations without blocking the main thread
- Executing system commands
- Running scripts in different languages
- Isolating risky operations
- Parallel processing of tasks

---

## Q9: What is the difference between spawn, exec, and fork?

### Answer:

### spawn()
- Streams data (stdout/stderr) as it's generated
- Best for large data output
- More memory efficient
- Returns a stream


### exec()
- Buffers entire output in memory
- Best for small data output
- Easier to use for simple commands
- Returns output in callback


### fork()
- Specialized version of spawn for Node.js scripts
- Creates a new V8 instance
- Built-in IPC (Inter-Process Communication) channel
- Best for running other Node.js scripts

