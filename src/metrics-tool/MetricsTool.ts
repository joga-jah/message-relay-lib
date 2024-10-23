import Prometheus, {
  collectDefaultMetrics,
  Counter,
  CounterConfiguration,
  Registry
} from 'prom-client'
import { NextFunction, Request, Response } from 'express'

const httpRequestDurationMicroseconds = new Prometheus.Histogram({
  // Buckets for response time from 0.1ms to 500ms
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500],
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  name: 'http_request_duration_ms'
})

export { default as metricsMiddleware } from './metrics-middleware'

export default class MetricsTool {
  static configureHistogram(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const responseTimeInMs = response.locals.startEpoch
      ? Date.now() - response.locals.startEpoch
      : Date.now()

    httpRequestDurationMicroseconds
      .labels(request.method, request.path, `${response.statusCode}`)
      .observe(responseTimeInMs)

    next()
  }

  static collectMetricsDefault() {
    return Prometheus.collectDefaultMetrics()
  }

  static async status(_request: Request, response: Response) {
    response.set('Content-Type', Prometheus.register.contentType)

    const metrics = await Prometheus.register.metrics()
    response.end(metrics)
  }

  static createCounter(dataMetric: CounterConfiguration<string>) {
    return new Prometheus.Counter(dataMetric)
  }

  static registerMetrics(appName: string = 'app') {
    const appNameFixed = appName.replace('-', '_')
    const register = new Registry()
    collectDefaultMetrics({ register })

    let successCounter = register.getSingleMetric(
      `${appNameFixed}_requests_success_total`
    ) as Counter<string>

    if (!successCounter) {
      successCounter = this.createCounter({
        help: 'Total number of successful requests in the application',
        labelNames: ['path', 'code', 'method'],
        name: `${appNameFixed}_requests_success_total`
      })

      register.registerMetric(successCounter)
    }

    let errorCounter = register.getSingleMetric(
      `${appNameFixed}_error_request_total`
    ) as Counter<string>

    if (!errorCounter) {
      errorCounter = MetricsTool.createCounter({
        help: 'Total number of errors encountered in the application',
        labelNames: ['path', 'code', 'method'],
        name: `${appNameFixed}_error_request_total`
      })

      register.registerMetric(errorCounter)
    }

    return {
      successCounter,
      errorCounter
    }
  }
}
