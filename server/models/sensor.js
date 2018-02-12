const _ = require('lodash/fp');

const SensorsMock = require('../mocks/sensors');

const findByParticipants = (participants) =>
  _.filter(
    sensor => sensor.usable && _.some(sensor.owner, participants)
  )(SensorsMock);

module.exports = {
  findByParticipants,
};


