const _ = require('lodash/fp');

const Logger = require('../lib/logger');

const onError = _.curry((res, error) => {
  Logger.error(error);
  return res.status(503).send({ error: 'server_error' });
});

module.exports = {
  onError
};
