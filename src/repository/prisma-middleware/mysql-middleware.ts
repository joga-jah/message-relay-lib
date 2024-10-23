/* eslint-disable func-names */
import { NextFunction, Response } from 'express'
import { PrismaClient } from '@prisma/client'

import RelayRequest from '../../relay/RelayRequest'

export default async function (
  request: RelayRequest,
  _response: Response,
  next: NextFunction
) {
  request.prisma = {
    mysql: new PrismaClient()
  }

  next()
}
