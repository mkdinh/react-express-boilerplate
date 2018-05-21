module.exports = (function() {
  switch (process.env.NODE_ENV) {
    case "prod":
      return require("./prod");
    case "test":
      return require("./test");
    case "ci":
      return require("./ci");
    default:
      return require("./dev");
  }
})();
