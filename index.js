#!/usr/bin/env node
const readline = require("readline");
const cli = require("commander");


/* Default function if no code is specified in the command line */
const defaultFn = obj => obj;


/*
 * Process input stream, aggregating into a single string, then parse and
 * process
 */
const processJson = fn => {
  const raw = [];
  readline
    .createInterface({
      input: process.stdin,
    })
    .on("line", line => raw.push(line))
    .on("close", () => {
      // Try to parse the JSON
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


/* Process command line arguments */
cli
  .version("0.0.1")
  .option("-c, --code <code>", "Function to execute to parse JSON");
cli.parse(process.argv);


/* Create stdin stream processor and execute */
const { code } = cli;
const fn = code ? eval(code) : defaultFn;
processJson(fn);
