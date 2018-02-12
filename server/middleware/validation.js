const ErrorHandler = require('../lib/error');

const middleware = validator =>
  (req, res, next) => {
    const { error } = validator.required().validate(req.body, { abortEarly: false });
    if (error) {
      return ErrorHandler.onError(res, error);
    }
    return next();
  };

module.exports = middleware;
