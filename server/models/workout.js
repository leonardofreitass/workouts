const _ = require('lodash/fp');

const WorkoutsMock = require('../mocks/workouts');

const getAllocations = id =>
  Promise.resolve(
    _.pipe(
      _.find({ id }),
      _.pick('allocations')
    )(WorkoutsMock)
  );

const createAllocations = (id, allocations) => 
  Promise.resolve({
    id,
    allocations
  });

module.exports = {
  getAllocations,
  createAllocations,
};


