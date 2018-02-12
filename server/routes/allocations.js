const express = require('express');

module.exports = ({ handlers }) => {
  const AllocationHandler = handlers.allocation;
  const router = express.Router();

  router.route('/')
    .post(AllocationHandler.createAllocations);

  return router;
}
