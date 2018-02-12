const _ = require('lodash/fp');

const SensorsMock = require('../mocks/sensors');

const findByParticipants = participants =>
  Promise.resolve(
    _.filter(
      sensor => sensor.usable && _.includes(sensor.owner, participants)
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
  findByParticipants(participants)
    .then((ownerSensors) => 
      findAvailable(participants.length - ownerSensors.length)
        .then((freeSensors) => [
          ...ownerSensors,
          ...freeSensors
        ]));

module.exports = {
  findByParticipants,
  findAvailable,
  findSensorForParticipants,
};


