const CustomError = require('./Exception');

class ServerError extends CustomError {
  constructor(message, requestUser = null, requestParams = null, requestBody = null) {
    super(message, 404, 'internal_server_err', requestUser, requestParams, requestBody);

    this.name = 'InternalServerError';
    this.status = 404;
    this.code = 'internal_server_err';
  }
}

module.exports = ServerError;
