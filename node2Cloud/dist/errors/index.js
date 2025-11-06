export class AppError extends Error {
  message
  statusCode
  isOperational
  constructor(message, statusCode, isOperational = true) {
    super(message)
    this.message = message
    this.statusCode = statusCode
    this.isOperational = isOperational
    this.status = `0`.startsWith('4') ? 'fail' : 'error'
  }
  status
}
export const ErrorClass = {
  // 400 - Client Errors
  BadRequest: class extends AppError {
    constructor(message = 'Bad Request') {
      super(message, 400)
    }
  },
  Unauthorized: class extends AppError {
    constructor(message = 'Unauthorized') {
      super(message, 401)
    }
  },
  Forbidden: class extends AppError {
    constructor(message = 'Forbidden') {
      super(message, 403)
    }
  },
  NotFound: class extends AppError {
    constructor(message = 'Not Found') {
      super(message, 404)
    }
  },
  // 422 - Validation Errors
  UnprocessableEntity: class extends AppError {
    constructor(message = 'Unprocessable Entity') {
      super(message, 422)
    }
  },
  // 500 - Server Errors
  InternalServer: class extends AppError {
    constructor(message = 'Internal Server Error') {
      super(message, 500)
    }
  },
  ServiceUnavailable: class extends AppError {
    constructor(message = 'Service Unavailable') {
      super(message, 503)
    }
  },
}
//# sourceMappingURL=index.js.map
