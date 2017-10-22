import test from "ava";

import { processJson } from "../src";

test("processJson is a valid function", t => {
  t.is(typeof processJson, "function", "processJson must be a function");
});
