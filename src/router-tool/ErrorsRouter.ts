/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response } from 'express'

import {
  ApiClientUnavailableError,
  BadRequestError,
  NotFoundError,
  ServiceUnavailableError,
  UnauthorizedError,
  ValidationError
} from '../exceptions'
import httpErrors from '../exceptions/http-errors'

import RelayRequest from '../relay/RelayRequest'

export default class ErrorsRouter {
  static async verifyError(
    request: RelayRequest,
    response: Response,
    next: NextFunction,
    controller: (
      req: RelayRequest,
      res: Response,
      nextFunc: NextFunction
    ) => any
  ) {
    try {
      await controller(request, response, next)

      // ** Metrics
      request.metricsTool?.successCounter
        ?.labels({
          method: request.method,
          path: request.path,
          code: response.statusCode.toString()
        })
        ?.inc()

      return true
    } catch (error: any) {
      // ** Metrics
      if (request.metricsTool) {
        request.metricsTool.errorCounter.inc({
          method: request.method.toLowerCase(),
          path: request.path,
          code: error.code
        })
      }

      request.logger?.error(`Error log: ${error.message}`)
      return errorResponse(request, response, error)
    }
  }
}

const errorResponse = (_req: RelayRequest, res: Response, error: any) => {
  if (error instanceof ValidationError) {
    return res.status(error.code).json(JSON.parse(error.message))
  }

  if (error instanceof UnauthorizedError) {
    return res.status(error.code).json(JSON.parse(error.message))
  }

  if (error instanceof ServiceUnavailableError) {
    return res.status(error.code).json(JSON.parse(error.message))
  }

  if (error instanceof BadRequestError) {
    return res.status(error.code).json(JSON.parse(error.message))
  }

  if (error instanceof NotFoundError) {
    return res.status(error.code).json(JSON.parse(error.message))
  }

  if (error instanceof ApiClientUnavailableError) {
    return res.status(error.code).json(JSON.parse(error.message))
  }

  return res.status(500).json(httpErrors.internalServerError)
}
