import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

//name the target directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetDirectory = path.join(__dirname, "target");

//read the target directory
fs.readdir(
  targetDirectory,
  { encoding: "utf-8", withFileTypes: true },
  (err, files) => {
    if (err) {
      console.error("Failed to read directory:", err);
      return;
    }
    console.log(
      "Files in directory:",
      files.map((file) => file.name)
    );

    //once the directory is read, loop through each file
    files.forEach((file) => {
      if (file.isDirectory()) {
        console.log(`${file.name} is a directory`); //don't create a new directory if it already exists
      } else {
        const ext = path.extname(file.name); //get file extension
        const extDirectory = path.join(targetDirectory, ext || "no ext"); //create new directory path string (not the path itself)

        if (!fs.existsSync(extDirectory)) {
          fs.mkdirSync(extDirectory, { recursive: true }); //this actually creates the new path
        }

        //name the old and new file path strings to pass into fs.rename
        const oldFilePath = path.join(targetDirectory, file.name);
        const newFilePath = path.join(extDirectory, file.name);

        //move the file(s) to new extension specific directory using fs.rename
        fs.rename(oldFilePath, newFilePath, (err) => {
          if (err) {
            console.error(`Failed to move file: ${file.name}`, err);
            return;
          }
          console.log(`Moved ${file.name} to ${extDirectory}/`);
        });
      }
    });
  }
);
