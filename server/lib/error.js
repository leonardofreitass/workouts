const _ = require('lodash/fp');

const Logger = require('../lib/logger');

const onError = _.curry((res, error) => {
  if (error.name === 'ValidationError') {
    return res.status(422).send({
      error: 'missing_or_invalid_fields',
      details: error.details,
    });
  }

  Logger.error(error);
  return res.status(503).send({ error: 'server_error' });
});

module.exports = {
  onError
};
