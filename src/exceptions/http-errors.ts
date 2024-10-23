export default {
  badRequest: {
    errorCode: 'BAD_REQUEST',
    message: 'Bad Request'
  },
  apiClientUnavailable: {
    errorCode: 'SERVICE_UNAVAILABLE',
    message: 'API Client Unavailable'
  },
  internalServerError: {
    errorCode: 'INTERNAL_SERVER_ERROR',
    errorDetail: Array<string>(),
    message: 'Internal Server Error'
  },
  notFound: {
    errorCode: 'NOT_FOUND',
    errorDetail: Array<string>(),
    message: 'Not Found'
  },
  serviceUnavailable: {
    errorCode: 'SERVICE_UNAVAILABLE',
    message: 'Service Unavailable'
  },
  unauthorized: {
    errorCode: 'UNAUTHORIZED',
    message: 'unauthorized'
  },
  validation: {
    errorCode: 'VALIDATION_ERROR',
    errorDetail: Array<string>(),
    message: 'Validation Error'
  }
}
