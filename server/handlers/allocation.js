const _ = require('lodash/fp');

const ErrorHandler = require('../lib/error');
const AllocationLib = require('../lib/allocation');

module.exports = ({ models, io }) => {

  // Models
  const Sensor = models.sensor;
  const Workout = models.workout;

  // API Handlers
  const createAllocations = (req, res) => {
    const { workout_id, participants } = req.body;
    
    return Sensor.findSensorForParticipants(participants)
      .then((sensors) => {
        const allocations = AllocationLib.match(participants, sensors);
        const participants_without_allocation = AllocationLib.missingAllocations(allocations);

        const payload = { 
          allocations,
          participants_without_allocation,
        };

        io.emit('new allocations', { workout_id, ...payload });

        return Workout.createAllocations(allocations)
          .then(() => res.send(payload));
      })
      .catch(ErrorHandler.onError(res));
  };

  const getWorkoutAllocations = (req, res) => {
    const { workout_id } = req.params;

    return Workout.getAllocations(Number(workout_id))
      .then((workout) => res.send(workout))
      .catch(ErrorHandler.onError(res));
  };

  // Socket Handlers
  const onFailure = _.curry((socket, { user_id }) => {
    Sensor.findAvailable()
      .then((sensor) => {
        socket.emit('new sensor', { sensor });
      });
  });

  return {
    createAllocations,
    getWorkoutAllocations,
    onFailure,
  };
}
