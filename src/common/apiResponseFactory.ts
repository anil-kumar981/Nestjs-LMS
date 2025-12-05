export class ApiResponseFactory {
  static success<T>(data: T, message = 'Success') {
    return {
      status: 'success',
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  static error(message = 'Error', statusCode = 500, errors?: any) {
    return {
      status: 'error',
      message,
      errors: errors || null,
      timestamp: new Date().toISOString(),
      statusCode,
    };
  }
}