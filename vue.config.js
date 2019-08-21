const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "./docs"), // Working around a github pages limitation
  publicPath: "guild-challenge"
};
