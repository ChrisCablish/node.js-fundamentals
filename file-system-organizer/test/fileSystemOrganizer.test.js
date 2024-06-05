import fs from "fs";
import path, { dirname } from "path";
import { organizeFiles } from "../fileSystemOrganizer";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testDirPath = path.join(__dirname, "test_files");

beforeEach(() => {
  fs.mkdirSync(testDirPath, { recursive: true });
});
