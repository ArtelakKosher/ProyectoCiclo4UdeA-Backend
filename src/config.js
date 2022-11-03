const dotenv = require("dotenv");
dotenv.config({ path: "src/config/config.env" });

const config = {
  appConfig: {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
  },
};

module.exports = config;
