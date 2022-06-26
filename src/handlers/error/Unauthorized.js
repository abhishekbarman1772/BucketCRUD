const CustomError = require('./Exception');

class Unauthorized extends CustomError {
  constructor(message, requestUser = null, requestParams = null, requestBody = null) {
    super(message, 401, 'unauthorized', requestUser, requestParams, requestBody);

    this.name = 'Unauthorized';
    this.status = 401;
    this.code = 'unauthorized';
  }
}

module.exports = Unauthorized;
