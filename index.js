#!/usr/bin/env node
const readline = require("readline");
const cli = require("commander");

const defaultFn = obj => {
  return obj;
};


/*
 * Process input stream, aggregating into a single string, then parse and
 * process
 */
const processJson = (fn=defaultFn) => {
  const raw = [];
  readline
    .createInterface({
      input: process.stdin,
    })
    .on("line", line => {
      raw.push(line);
    })
    .on("close", () => {
      const rawJson = raw.join("");
      const obj = JSON.parse(rawJson);
      const rv = fn(obj);
      console.log(JSON.stringify(rv, null, 2));
      process.exit(0);
    });
};


cli
  .version("0.0.1")
  .option("-c, --code <code>", "Function to execute to parse JSON");

cli.parse(process.argv);

const { code } = cli;
processJson(eval(code));
