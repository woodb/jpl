#!/usr/bin/env node
const cli = require("commander");
const { processJson } = require("../src");


/* Process command line arguments */
cli
  .version("0.0.2")
  .option("-c, --code <code>", "Function to execute to parse JSON");
cli.parse(process.argv);


/* Create stdin stream processor and execute */
const { code } = cli;
const fn = code ? eval(code) : void 0;
processJson(fn);
