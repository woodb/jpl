#!/usr/bin/env node
const cli = require("commander");
const { main } = require("./main");

/* Process command line arguments */
cli
  .version("0.1.0-alpha.0")
  .option("-c, --code <code>", "Function to execute to parse JSON");
cli.parse(process.argv);


const run = async () => {
  try {
    console.log(await main(cli, process.stdin));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
