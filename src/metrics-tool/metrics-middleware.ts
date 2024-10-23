/* eslint-disable func-names */
import { Counter } from 'prom-client'
import { NextFunction } from 'express'
import RelayRequest from '../relay/RelayRequest'

export default function (
  request: RelayRequest,
  next: NextFunction,
  successCounter: Counter,
  errorCounter: Counter
) {
  request.metricsTool = {
    successCounter,
    errorCounter
  }

  next()
}
