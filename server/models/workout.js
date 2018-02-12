const _ = require('lodash/fp');

const WorkoutsMock = require('../mocks/workouts');

const getAllocations = id =>
  _.pipe(
    _.find({ id }),
    _.pick('allocations')
  )(WorkoutsMock);

const createAllocations = (id, allocations) => ({
  id,
  allocations
});

module.exports = {
  getAllocations,
  createAllocations,
};


