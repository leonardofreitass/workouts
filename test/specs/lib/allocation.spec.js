const { expect } = require('chai');

const AllocationLib = require('../../../server/lib/allocation');

const ParticipantsFixture = require('../../support/fixtures/workout_participants');
const SensorsFixture = require('../../support/fixtures/sensors');
const AllocationsFixture = require('../../support/fixtures/allocations');

describe('AllocationLib', () => {
  describe('.match', () => {

    it('should match workout participants to sensors', () => {

      const allocations = AllocationLib.match(ParticipantsFixture, SensorsFixture);
      expect(allocations).to.be.eql(AllocationsFixture);
    });
  });
});
