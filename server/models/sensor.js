const _ = require('lodash/fp');

const SensorsMock = require('../mocks/sensors');

const findByParticipants = participants =>
  Promise.resolve(
    _.filter(
      sensor => sensor.usable && _.some(sensor.owner, participants)
    )(SensorsMock)
  );

const findAvailable = (count) =>
  Promise.resolve(
    _.pipe(
      _.filter(sensor => sensor.usable && !sensor.owner),
      _.slice(0, count)
    )(SensorsMock)
  );

const findSensorForParticipants = participants =>
  Sensor.findByParticipants(participants)
    .then((ownerSensors) => 
      Sensor.findAvailable(participants.length - ownerSensors.length)
        .then((freeSensores) => [
          ...ownerSensors,
          ...freeSensors
        ]));

module.exports = {
  findByParticipants,
  findAvailable,
};


