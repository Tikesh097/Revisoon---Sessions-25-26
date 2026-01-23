const express = require("express");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const app = express();

app.post("/process-csv", (req, res) => {
  const inputPath = path.join(__dirname, "files", "input.csv");
  const outputPath = path.join(__dirname, "files", "output.csv");

  const totalSize = fs.statSync(inputPath).size;
  let processedBytes = 0;

  const readStream = fs.createReadStream(inputPath);
  const writeStream = fs.createWriteStream(outputPath);

  const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
  });

  readStream.on("data", (chunk) => {
    processedBytes += chunk.length;
  });

  rl.on("line", (line) => {
    writeStream.write(line.toUpperCase() + "\n");
  });

  rl.on("close", () => {
    writeStream.end();
    res.json({ progress: "100%" });
  });

  readStream.on("error", () => {
    res.status(500).json({ error: "Error reading file" });
  });

  writeStream.on("error", () => {
    res.status(500).json({ error: "Error writing file" });
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
