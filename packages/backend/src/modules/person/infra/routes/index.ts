import { Router } from 'express'
import { adaptRoute } from '~/infrastructure/express/adapters/express-route-adapter'
import { adminAuth } from '~/infrastructure/express/middlewares/admin.auth'
import { AllRoleAuth } from '~/infrastructure/express/middlewares/all-role.auth copy'
import { makeAdminChangePwdControllerFactory } from '~/shared/factories/controllers/makeAdminChangePwdControllerFactory'
import { makeChangePwdControllerFactory } from '~/shared/factories/controllers/makeChangePwdControllerFactory'
import { makeCreatePersonControllerFactory } from '~/shared/factories/controllers/makeCreatePersonControllerFactory'
import { makeSigninControllerFactory } from '~/shared/factories/controllers/makeSigninControllerFactory'

const personRouter = Router()
personRouter.post('/signup', adaptRoute(makeCreatePersonControllerFactory()))
personRouter.post('/signin', adaptRoute(makeSigninControllerFactory()))
personRouter.post(
  '/change-pwd/:targetId',
  adminAuth,
  adaptRoute(makeAdminChangePwdControllerFactory()),
)
personRouter.post(
  '/change-pwd',
  AllRoleAuth,
  adaptRoute(makeChangePwdControllerFactory()),
)
export { personRouter }
