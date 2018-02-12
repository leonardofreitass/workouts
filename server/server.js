const Consign = require('consign');
const SocketIO = require('socket.io');
const Http = require('http');

const Config = require('./config/config');
const ExpressConfig = require('./config/express');

const Logger = require('./lib/logger');

module.exports = class Server {
  static bootstrap() {
    return new Server();
  }

  constructor() {
    this.config = new Config();

    this.app = new ExpressConfig(this).app;
    this.server = Http.Server(this.app);
    this.io = new SocketIO(this.server);

    Consign({ cwd: 'server', verbose: false })
      .then('validators')
      .include('models')
      .then('handlers')
      .then('routes')
      .into(this);

    this.routes();
    this.sockets();
  }

  routes() {
    this.app.use('/api/allocations', this.routes.allocations);
  }

  sockets() {
    this.io.on('connection', (socket) => {
      Logger.info('User connected');

      socket.on('sensor failure', this.handlers.allocation.onFailure(socket));
    });
  }

  start() {
    return this.server.listen(this.config.port, () => {
      Logger.info(`Workouts server running at: localhost:${this.config.port}`);
    });
  }
};
