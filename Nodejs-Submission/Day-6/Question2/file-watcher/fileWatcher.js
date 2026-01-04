const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");

class FileWatcher extends EventEmitter {
  constructor(directory) {
    super();
    this.directory = directory;
    this.files = new Set(fs.readdirSync(directory));
  }

  start() {
    try {
      fs.watch(this.directory, (eventType, filename) => {
        if (!filename) return;

        const filePath = path.join(this.directory, filename);
        const exists = fs.existsSync(filePath);

        if (exists && !this.files.has(filename)) {
          this.files.add(filename);
          this.emit("file-added", filename);
        } 
        else if (exists && this.files.has(filename)) {
          this.emit("file-modified", filename);
        } 
        else if (!exists && this.files.has(filename)) {
          this.files.delete(filename);
          this.emit("file-deleted", filename);
        }
      });
    } catch (error) {
      this.emit("error", error);
    }
  }
}

const watcher = new FileWatcher("./watch-folder");

watcher.on("file-added", (file) => {
  console.log(`[${new Date().toISOString()}] File added: ${file}`);
});

watcher.on("file-modified", (file) => {
  console.log(`[${new Date().toISOString()}] File modified: ${file}`);
});

watcher.on("file-deleted", (file) => {
  console.log(`[${new Date().toISOString()}] File deleted: ${file}`);
});

watcher.on("error", (err) => {
  console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
});

watcher.start();
