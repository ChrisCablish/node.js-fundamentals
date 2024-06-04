import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetDirectory = path.join(__dirname, "target");

// now that we have the directory where we want to look for files, we need to actually read them and
// do something with them.

fs.readdir(
  targetDirectory,
  { encoding: "utf-8", withFileTypes: true },
  (err, files) => {
    if (err) {
      console.error("Failed to read directory:", err);
      return;
    }

    console.log(files[0].isFile());
    console.log(
      "Files in directory:",
      files.map((file) => file.name)
    );
  }
);
