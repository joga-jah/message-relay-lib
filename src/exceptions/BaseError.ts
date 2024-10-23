class BaseError extends Error {
  name: string

  message: string

  code: number

  clientError: string | undefined

  constructor(code: number, message: string, clientError?: string) {
    super(message)

    this.name = this.constructor.name
    this.message = message
    this.code = code
    this.clientError = clientError

    Error.captureStackTrace(this, this.constructor)
  }
}

export default BaseError
