const Dotenv = require('dotenv');

module.exports = class Config {
  constructor() {
    Dotenv.config();

    this.env = process.env.NODE_ENV;

    this.port = process.env.PORT;
    this.log = process.env.REQUEST_LOG;
  }
};
