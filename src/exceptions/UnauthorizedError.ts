import httpErrors from './http-errors'
import BaseError from './BaseError'

class UnauthorizedError extends BaseError {
  constructor() {
    super(401, JSON.stringify(httpErrors.unauthorized))
  }
}

export default UnauthorizedError
