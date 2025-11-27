const express = require("express");

const serverConfig = require("./config/serverConfig");
const app = express();

const PORT = serverConfig.port;

const prepareandstartServer = async () => {
  app.listen(PORT, () => {
    console.log(`Auth Service is running on port ${PORT}`);
  });
};

prepareandstartServer();
