import { Request } from 'express'
import { Logger } from 'winston'
import { Counter } from 'prom-client'
import { Prisma } from '@prisma/client'

export default interface RelayRequest extends Request {
  logger?: Logger
  metricsTool?: {
    successCounter: Counter<string>
    errorCounter: Counter<string>
  }
  prisma?: {
    mysql?: Prisma
    mongo?: Prisma
  }
}
