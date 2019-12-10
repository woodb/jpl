const test = require("ava");
const fs = require("fs");

const { processJsonBuffer } = require("../src");
const { main } = require("../bin/main");

const VALID_JSON_OBJECT = require("./data/valid.json");

test("processJsonBuffer is a function", t => {
  t.is(typeof processJsonBuffer, "function");
});

test("processJsonBuffer returns a Promise", async t => {
  const rv = processJsonBuffer({});
  t.is(Promise.resolve(rv), rv);
});

test("processJsonBuffer returns unmodified object", async t => {
  const fh = fs.createReadStream("tests/data/valid.json");
  const rv = await processJsonBuffer({ buffer: fh });
  t.deepEqual(rv, VALID_JSON_OBJECT);
});

test("processJsonBuffer modifies an object", async t => {
  const fh = fs.createReadStream("tests/data/valid.json");
  const fn = ({ foo }) => ({ foo });
  const rv = await processJsonBuffer({ buffer: fh, fn });
  t.deepEqual(rv, fn(VALID_JSON_OBJECT));
});

test("processJsonBuffer throws on bad JSON", async t => {
  const fh = fs.createReadStream("tests/data/invalid.json");
  await t.throwsAsync(() => processJsonBuffer({ buffer: fh }));
});

test("processJsonBuffer throws on bad function", async t => {
  const fh = fs.createReadStream("tests/data/valid.json");
  await t.throwsAsync(() =>
    processJsonBuffer({ buffer: fh, fn: obj => obj.not.exist })
  );
});

test("throws on bad input code string", async t => {
  const fh = fs.createReadStream("tests/data/valid.json");
  await t.throwsAsync(
    () => main({ code: "invalid javascript" }, fh),
    SyntaxError
  );
});

test("throws on function having multiple parameters", async t => {
  const fh = fs.createReadStream("tests/data/valid.json");
  await t.throwsAsync(
    () => main({ code: "(foo, bar) => null" }, fh),
    /one parameter/
  );
});

test("throws on code evaluating to anything but a function", async t => {
  const fh = fs.createReadStream("tests/data/valid.json");
  await t.throwsAsync(() => main({ code: "[1, 2, 3]" }, fh), /function/);
});

test("returns unmodified object", async t => {
  const fh = fs.createReadStream("tests/data/valid.json");
  const rv = await main({}, fh);
  t.is(rv, JSON.stringify(VALID_JSON_OBJECT, null, 2));
});

test("modifies an object", async t => {
  const fh = fs.createReadStream("tests/data/valid.json");
  const fn = ({ foo }) => ({ foo });
  const rv = await main({ code: "({ foo }) => ({ foo })" }, fh);
  t.is(rv, JSON.stringify(fn(VALID_JSON_OBJECT), null, 2));
});
