/* eslint-disable func-names */
import { NextFunction } from 'express'
import { Logger } from '.'

import RelayRequest from '../relay/RelayRequest'

export default function (
  request: RelayRequest,
  next: NextFunction,
  loggerTool: Logger
) {
  request.logger = loggerTool
  next()
}
