import { createLogger, transports, format } from 'winston'

const loggerOptions = {
  format: format.combine(format.timestamp(), format.json()),
  level: 'debug',
  transports: [new transports.Console()]
}

export { default as loggerMiddleware } from './logger-middleware'
export { Logger } from 'winston'
export default createLogger(loggerOptions)
