import httpErrors from './http-errors'
import BaseError from './BaseError'

class BadRequestError extends BaseError {
  constructor() {
    super(400, JSON.stringify(httpErrors.badRequest))
  }
}

export default BadRequestError
