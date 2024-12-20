class ApiError extends Error {
  status;
  errors;

  constructor(status: number, message: string, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'User is not authorized');
  }

  static NotPermissions() {
    return new ApiError(402, 'You do not have permissions for it');
  }

  static BadRequest(message: string, errors = []) {
    return new ApiError(400, message, errors);
  }
}

export default ApiError;
