const readline = require("readline");


/* Default function if no code is specified in the command line */
const defaultFn = obj => obj;


/*
 * Process input stream, aggregating into a single string, then parse and
 * process
 */
const processJson = (fn = defaultFn) => {
  const raw = [];
  readline
    .createInterface({ input: process.stdin })
    .on("line", line => raw.push(line))
    .on("close", () => {
      try {
        const parsedJson = JSON.parse(raw.join(""));
        const rv = fn(parsedJson);
        console.log(JSON.stringify(rv, null, 2));
        process.exit(0);
      } catch (err) {
        console.error(err);
        process.exit(1);
      }
    });
};


module.exports = {
  processJson,
};
