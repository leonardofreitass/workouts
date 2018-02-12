const { expect } = require('chai');

const AllocationLib = require('../../../server/lib/allocation');

const ParticipantsFixture = require('../../support/fixtures/workout_participants');
const SensorsFixture = require('../../support/fixtures/sensors');
const AllocationsFixture = require('../../support/fixtures/allocations');
const InsufficientSensorsFixture = require('../../support/fixtures/insufficient_sensors');
const InsufficientAllocationsFixture = require('../../support/fixtures/insufficient_allocations');

describe('AllocationLib', () => {
  describe('.match', () => {
    context('when there is a sensor for everybody', () => {
      it('should return allocations that match workout participants to sensors (including user owned sensors)', () => {
        const allocations = AllocationLib.match(ParticipantsFixture, SensorsFixture);
        expect(allocations).to.be.eql(AllocationsFixture);
      });
    });

    context('when there isn\'t a sensor for everybody', () => {
      it('should return allocations that match workout participants to the sensors available', () => {
        const allocations = AllocationLib.match(ParticipantsFixture, InsufficientSensorsFixture);
        expect(allocations).to.be.eql(InsufficientAllocationsFixture);
      });
    });
  });

  describe('.missingAllocations', () => {
    context('when the allocation successfully matched a sensor for each participant', () => {
      it('should return an empty array', () => {
        const missingAllocations = AllocationLib.missingAllocations(AllocationsFixture);
        const expected = [];
        expect(missingAllocations).to.be.eql(expected);
      });
    });

    context('when the allocation lacked a sensor for each participant', () => {
      it('should return the array of participants without a sensor', () => {
        const missingAllocations = AllocationLib.missingAllocations(InsufficientAllocationsFixture);
        const expected = [7, 10, 13];
        expect(missingAllocations).to.be.eql(expected);
      });
    });
  });
});
