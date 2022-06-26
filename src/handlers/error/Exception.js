class CustomError extends Error {
  constructor(
    message,
    status,
    code,
    requestUser = null,
    requestParams = null,
    requestBody = null,
  ) {
    super(message, status, code, requestUser, requestParams, requestBody);

    this.name = 'CustomError';
    this.message = message;
    this.status = status;
    this.code = code;
    this.request_user = requestUser;
    this.request_params = requestParams;
    this.request_body = requestBody;
  }
}

module.exports = CustomError;
