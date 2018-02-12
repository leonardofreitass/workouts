const _ = require('lodash/fp');

const match = (participants, [...sensors]) => 
  _.map(
    (participant) => {
      const sensor = _.find({ owner: participant.id }, sensors)
                  || _.find({ owner: null }, sensors);

      _.remove({ id: sensor.id }, sensors);

      return {
        user_id: participant.id,
        sensor_id: sensor ? sensor.id : null,
        sensor_is_user_property: sensor ? sensor.owner === participant.id : null,
      }
    }
  )(participants);

module.exports = {
  match,
};
