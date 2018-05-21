const mockgoose = require("./mockgoose");

module.exports = async function() {
  delete require.cache[require.resolve("../../index")];
  const server = require("../../index");
  await mockgoose.connect();

  server.closeConnection = function() {
    return new Promise(r => {
      mockgoose.disconnect().then(() => {
        server.close(() => r());
      });
    });
  };

  return server;
};
