const _ = require('lodash/fp');

const UsersMock = require('../mocks/users');

const find = (query) =>
  _.filter(query, UsersMock);

module.exports = {
  find,
};


