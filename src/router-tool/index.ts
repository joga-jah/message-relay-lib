import { NextFunction, Request, Response, Router } from 'express'

import ErrorsRouter from './ErrorsRouter'

export default class RouterTool {
  static create(
    router: Router,
    verb: string,
    path: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    controller: (req: Request, res: Response, next: NextFunction) => any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    middleware?: (req: Request, res: Response, next: NextFunction) => any
  ) {
    switch (verb) {
      case 'POST': {
        if (middleware) {
          router.route(path).post(middleware, (req, res, next) => {
            ErrorsRouter.verifyError(req, res, next, controller)
          })
        } else {
          router.route(path).post((req, res, next) => {
            ErrorsRouter.verifyError(req, res, next, controller)
          })
        }
        break
      }
      case 'PUT': {
        if (middleware) {
          router.route(path).put(middleware, (req, res, next) => {
            ErrorsRouter.verifyError(req, res, next, controller)
          })
        } else {
          router.route(path).put((req, res, next) => {
            ErrorsRouter.verifyError(req, res, next, controller)
          })
        }
        break
      }
      case 'PATCH': {
        if (middleware) {
          router.route(path).patch(middleware, (req, res, next) => {
            ErrorsRouter.verifyError(req, res, next, controller)
          })
        } else {
          router.route(path).patch((req, res, next) => {
            ErrorsRouter.verifyError(req, res, next, controller)
          })
        }
        break
      }
      case 'DELETE': {
        if (middleware) {
          router.route(path).delete(middleware, (req, res, next) => {
            ErrorsRouter.verifyError(req, res, next, controller)
          })
        } else {
          router.route(path).delete((req, res, next) => {
            ErrorsRouter.verifyError(req, res, next, controller)
          })
        }
        break
      }

      default: {
        if (middleware) {
          router.route(path).get(middleware, (req, res, next) => {
            ErrorsRouter.verifyError(req, res, next, controller)
          })
        } else {
          router.route(path).get((req, res, next) => {
            ErrorsRouter.verifyError(req, res, next, controller)
          })
        }
        break
      }
    }
  }
}
