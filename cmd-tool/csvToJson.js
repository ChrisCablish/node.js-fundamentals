const fs = require("fs");
const readline = require("readline");

const csvFilePath = "./data.csv";

const fileStream = fs.createReadStream(csvFilePath);

const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

rl.on("line", (line) => {
  console.log(`Line from file: ${line}`);
});

rl.on("close", () => {
  console.log("Finished reading the file.");
});
