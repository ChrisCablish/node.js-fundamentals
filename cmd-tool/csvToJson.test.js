// csvToJson.test.js
const fs = require("fs");
const readline = require("readline");

// Mocking fs and readline modules
jest.mock("fs");
jest.mock("readline");

describe("CSV file reading", () => {
  test("should read lines from a CSV file correctly", () => {
    const testData = [
      "id,name,age,city",
      "1,John Doe,28,New York",
      "2,Jane Smith,32,Los Angeles",
      "3,Emily Johnson,22,Chicago",
      "4,Chris Lee,36,Houston",
      "5,Marcus Brown,41,Philadelphia",
    ];

    const mockStream = require("stream").Readable({
      read() {
        this.push(testData.join("\n"));
        this.push(null); // No more data
      },
    });

    const mockRl = {
      on: jest.fn().mockImplementation((event, callback) => {
        if (event === "line") {
          testData.forEach((line) => callback(line));
        } else if (event === "close") {
          callback();
        }
      }),
      close: jest.fn(),
    };

    readline.createInterface.mockReturnValue(mockRl);
    fs.createReadStream.mockReturnValue(mockStream);

    require("./csvToJson"); // This path might need to be adjusted

    // Check that all lines have been read
    testData.forEach((line) => {
      expect(mockRl.on).toHaveBeenCalledWith("line", expect.any(Function));
    });

    // Check that the 'close' event was triggered
    expect(mockRl.on).toHaveBeenCalledWith("close", expect.any(Function));
  });
});
