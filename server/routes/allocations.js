const Express = require('express');
const ValidationMiddleware = require('../middleware/validation');

module.exports = ({ validators, handlers }) => {
  const AllocationHandler = handlers.allocation;
  const router = Express.Router();

  router.route('/')
    .post(ValidationMiddleware(validators.allocation_request), AllocationHandler.createAllocations);

  router.route('/:workout_id')
    .get(AllocationHandler.getWorkoutAllocations);

  return router;
}
