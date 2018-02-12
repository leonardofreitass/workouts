const Winston = require('winston');

const logger = new Winston.Logger({
  transports: [
    new Winston.transports.File({
      filename: './all.log',
      handleExceptions: true,
      json: true,
      maxFiles: 5,
      colorize: false,
    }),
    new Winston.transports.Console({
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
  ],
  exitOnError: false,
});

logger.stream = {
  write: (message) => {
    logger.log('info', message);
  },
};

module.exports = logger;
