// Import necessary modules
import fs from "fs";
import path from "path";

// Function to organize files
function organizeFiles(directory) {
  fs.readdir(
    directory,
    { encoding: "utf-8", withFileTypes: true },
    (err, files) => {
      if (err) {
        console.error("Failed to read directory:", err);
        return;
      }

      files.forEach((file) => {
        if (!file.isDirectory()) {
          const ext = path.extname(file.name);
          const extDirectory = path.join(directory, ext || "no_ext");

          if (!fs.existsSync(extDirectory)) {
            fs.mkdirSync(extDirectory, { recursive: true });
          }

          const oldFilePath = path.join(directory, file.name);
          const newFilePath = path.join(extDirectory, file.name);

          fs.rename(oldFilePath, newFilePath, (err) => {
            if (err) {
              console.error(`Failed to move ${file.name}:`, err);
            }
          });
        }
      });
    }
  );
}

// Export the function
export { organizeFiles };
