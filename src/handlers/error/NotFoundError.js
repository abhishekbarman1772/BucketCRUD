const CustomError = require('./Exception');

class NotFoundError extends CustomError {
  constructor(message, requestUser = null, requestParams = null, requestBody = null) {
    super(message, 404, 'not_found', requestUser, requestParams, requestBody);

    this.name = 'NotFoundError';
    this.status = 404;
    this.code = 'not_found';
  }
}

module.exports = NotFoundError;
