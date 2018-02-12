const _ = require('lodash/fp');

const UsersMock = require('../mocks/users');

const find = query =>
  Promise.resolve(_.filter(query, UsersMock));

module.exports = {
  find,
};

