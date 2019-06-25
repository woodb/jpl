const readline = require("readline");

/**
 * Process input stream, aggregating into a single string, then parse and
 * process
 */
const processJsonBuffer = ({ buffer = process.stdin, fn = obj => obj }) =>
  new Promise((resolve, reject) => {
    const raw = [];
    readline
      .createInterface({ input: buffer })
      .on("line", line => raw.push(line))
      .on("close", () => {
        try {
          const parsedJson = JSON.parse(raw.join(""));
          const rv = fn(parsedJson);
          resolve(rv);
        } catch (err) {
          reject(err);
        }
      });
  });

module.exports = {
  processJsonBuffer
};
