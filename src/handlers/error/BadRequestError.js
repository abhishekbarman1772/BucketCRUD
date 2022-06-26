const Exception = require('./Exception');

class BadRequestError extends Exception {
  constructor(message, requestUser = null, requestParams = null, requestBody = null) {
    super(message, 400, 'bad_request', requestUser, requestParams, requestBody);

    this.name = 'BadRequestError';
    this.status = 400;
    this.code = 'bad_request';
  }
}

module.exports = BadRequestError;
