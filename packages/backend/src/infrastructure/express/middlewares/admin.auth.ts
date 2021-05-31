import { makeAuthMiddleware } from '~/shared/factories/middlewares/auth-middleware.factory'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'

export const adminAuth = adaptMiddleware(
  makeAuthMiddleware(['teacher', 'coordinator']),
)
