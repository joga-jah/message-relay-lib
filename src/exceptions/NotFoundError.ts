import httpErrors from './http-errors'
import BaseError from './BaseError'

class NotFoundError extends BaseError {
  constructor(errorDetail: Array<string>) {
    const message = httpErrors.notFound

    if (errorDetail) {
      message.errorDetail = errorDetail
    }

    super(404, JSON.stringify(message))
  }
}

export default NotFoundError
