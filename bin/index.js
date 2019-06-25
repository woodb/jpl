#!/usr/bin/env node
const cli = require("commander");
const { main } = require("./main");
const { version } = require("../package.json");

/* Process command line arguments */
cli
  .version(version)
  .option("-c, --code <code>", "Function to execute to parse JSON");
cli.parse(process.argv);

const run = async () => {
  try {
    const cb = err => (err ? process.exit(1) : process.exit(0));
    const rv = await main(cli, process.stdin);
    process.stdout.write(rv, null, cb);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
