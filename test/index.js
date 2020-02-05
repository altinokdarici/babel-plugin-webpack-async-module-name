const babel = require("babel-core");
const path = require("path");
const readFileSync = require("fs").readFileSync;
const expect = require("chai").expect;

function testPlugin(code, plugin) {
  const result = babel.transform(code, {
    plugins: ["./lib/index.js"]
  });
  return result.code;
}

function replaceLineBreak(string) {
  return string.replace(/\r\n/gi, "\n");
}

describe("babel-plugin-webpack-async-module-name", () => {
  const actual = readFileSync(
    path.join(__dirname, "actual.code"),
    "utf8"
  ).trim();
  const expected = readFileSync(
    path.join(__dirname, "expected.code"),
    "utf8"
  ).trim();

  it("The transformation code should be equal to the expected code.", () => {
    const result = testPlugin(actual);
    expect(replaceLineBreak(result)).to.equal(replaceLineBreak(expected));
  });
});
