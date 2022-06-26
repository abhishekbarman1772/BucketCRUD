const BadRequestError = require('../handlers/error/BadRequestError');

const errorHandler = function (error, req, res, next) {
  if (error instanceof BadRequestError) {
    return res.status(error.status).json({
      status: error.code,
      message: error.message,
    });
  }

  return res.json({
    message: error.message,
  });
};

module.exports = errorHandler;
