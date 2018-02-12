const Consign = require('consign');

const Config = require('./config/config');
const ExpressConfig = require('./config/express');

const Logger = require('./lib/logger');

module.exports = class Server {

  static bootstrap() {
    return new Server();
  }

  constructor() {
    this.config = new Config();

    Consign({ cwd: 'server', verbose: false })
      .include('models')
      .then('handlers')
      .then('routes')
      .into(this);

    this.app = new ExpressConfig(this).app;

    this.routes();
  }

  routes(){

  }

  start(){
    return this.app.listen(this.config.port, () => {

      Logger.info(`Workouts server running at: localhost:${this.config.port}`);
    });
  }
};
