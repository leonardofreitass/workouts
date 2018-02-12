const _ = require('lodash/fp');

const SensorsMock = require('../mocks/sensors');

const findByParticipants = participants =>
  Promise.resolve(
    _.filter(
      sensor => sensor.usable && _.includes(sensor.owner, participants)
    )(SensorsMock)
  );

const findAvailable = () =>
  Promise.resolve(
    _.find({ usable: true, owner: null }, SensorsMock)
  );

const findAvailableForParticipants = (count) =>
  Promise.resolve(
    _.pipe(
      _.filter(sensor => sensor.usable && !sensor.owner),
      _.slice(0, count)
    )(SensorsMock)
  );

const findSensorForParticipants = participants =>
  findByParticipants(participants)
    .then((ownerSensors) => 
    findAvailableForParticipants(participants.length - ownerSensors.length)
        .then((freeSensors) => [
          ...ownerSensors,
          ...freeSensors
        ]));

module.exports = {
  findByParticipants,
  findAvailable,
  findAvailableForParticipants,
  findSensorForParticipants,
};


