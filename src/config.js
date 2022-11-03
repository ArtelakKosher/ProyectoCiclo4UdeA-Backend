const dotenv = require("dotenv");
dotenv.config({ path: "src/config/config.env" });

const config = {
  appConfig: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
};

module.exports = config;
