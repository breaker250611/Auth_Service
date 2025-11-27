const express = require("express");
const apiRoutes = require("./routes/index");
const serverConfig = require("./config/serverConfig");
const bodyParser = require("body-parser");
const app = express();

const PORT = serverConfig.port;

const prepareandstartServer = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);
  app.listen(PORT, () => {
    console.log(`Auth Service is running on port ${PORT}`);
  });
};

prepareandstartServer();
