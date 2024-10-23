import httpErrors from './http-errors'
import BaseError from './BaseError'

class ValidationError extends BaseError {
  constructor(errorDetail: Array<string>) {
    const message = httpErrors.validation

    if (errorDetail) {
      message.errorDetail = errorDetail
    }

    super(400, JSON.stringify(message), undefined)
  }
}

export default ValidationError
