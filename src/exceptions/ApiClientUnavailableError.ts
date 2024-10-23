import BaseError from './BaseError'
import httpErrors from './http-errors'

export default class ApiClientUnavailableError extends BaseError {
  constructor() {
    super(503, JSON.stringify(httpErrors.apiClientUnavailable))
  }
}
