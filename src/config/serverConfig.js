const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();

module.exports = {
  port: process.env.PORT || 3000,
  SALT: bcrypt.genSaltSync(10),
  JWT_KEY: process.env.JWT_KEY || "default_jwt",
};
