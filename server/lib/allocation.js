const _ = require('lodash/fp');

const match = (participants, [...sensors]) => 
  _.map(
    (participant) => {
      const sensor = _.find({ owner: participant.id }, sensors)
                  || _.find({ owner: null }, sensors);

      if (sensor) {
        sensors = _.remove({ id: sensor.id }, sensors);
      }

      return {
        user_id: participant.id,
        sensor_id: sensor ? sensor.id : null,
        sensor_is_user_property: sensor ? sensor.owner === participant.id : false,
      }
    }
  )(participants);

const missingAllocations = allocations =>
  _.pipe(
    _.filter({ sensor_id: null }),
    _.map(allocation => allocation.user_id),
  )(allocations);

module.exports = {
  match,
  missingAllocations,
};
