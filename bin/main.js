const { processJsonBuffer } = require("../src");

/* Create stdin stream processor and execute */
const main = async (params, buffer) => {
  const { code } = params;

  // If provided, attempt to evaluate code and validate that it's a function
  try {
    const fn = code ? eval(code) : void 0;

    // Validate the provided code if provided
    if (fn !== void 0) {
      if (typeof fn !== "function") {
        throw new Error("Provided code must evaluate to a single function");
      }

      if (fn.length !== 1) {
        throw new Error("Provided function must accept only one parameter");
      }
    }

    // Process input buffer and output
    const rv = await processJsonBuffer({ buffer, fn });
    return JSON.stringify(rv, null, 2);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  main
};
