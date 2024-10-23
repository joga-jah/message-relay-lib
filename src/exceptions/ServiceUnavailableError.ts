import BaseError from './BaseError'
import httpErrors from './http-errors'

export default class ServiceUnavailableError extends BaseError {
  constructor() {
    super(503, JSON.stringify(httpErrors.serviceUnavailable))
  }
}
