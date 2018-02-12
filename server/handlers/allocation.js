const ErrorHandler = require('../lib/error');
const AllocationLib = require('../lib/allocation');

module.exports = ({ models }) => {

  const Sensor = models.sensor;
  const Workout = models.workout;

  const createAllocations = (req, res) => {
    const { workout_id, participants } = req.body;
    
    return Sensor.findSensorForParticipants(participants)
      .then((sensors) => {
        const allocations = AllocationLib.match(participants, sensors);
        const participants_without_allocation = AllocationLib.missingAllocations(allocations);

        return Workout.createAllocations(allocations)
          .then(() => res.send({ 
            allocations,
            participants_without_allocation,
          }));
      })
      .catch(ErrorHandler.onError(res));
  };

  const getWorkoutAllocations = (req, res) => {
    const { workout_id } = req.params;

    return Workout.getAllocations(workout_id)
      .then((allocations) => res.send({
        allocations
      }))
      .catch(ErrorHandler.onError(res));
  };

  return {
    createAllocations,
    getWorkoutAllocations,
  };
}
