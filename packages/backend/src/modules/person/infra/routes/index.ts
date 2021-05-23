import { Router } from 'express'
import { adaptRoute } from '~/infrastructure/express/adapters/express-route-adapter'
import { adminAuth } from '~/infrastructure/express/middlewares/admin.auth'
import { AllRoleAuth } from '~/infrastructure/express/middlewares/all-role.auth copy'
import { coordinatorAuth } from '~/infrastructure/express/middlewares/coordinator.auth'
import { studentAuth } from '~/infrastructure/express/middlewares/student.auth'
import { makeAdminChangePwdControllerFactory } from '~/shared/factories/controllers/makeAdminChangePwdControllerFactory'
import { makeAdminEditProfileApplicationControllerFactory } from '~/shared/factories/controllers/makeAdminEditProfileControllerFactory'
import { makeChangePwdControllerFactory } from '~/shared/factories/controllers/makeChangePwdControllerFactory'
import { makeCreatePersonControllerFactory } from '~/shared/factories/controllers/makeCreatePersonControllerFactory'
import { makeEditProfileControllerFactory } from '~/shared/factories/controllers/makeEditProfileControllerFactory'
import { makeGetUserByIdControllerFactory } from '~/shared/factories/controllers/makegetUserByIdControllerFactory'
import { makeSigninControllerFactory } from '~/shared/factories/controllers/makeSigninControllerFactory'

const personRouter = Router()
personRouter.post('/signup', adaptRoute(makeCreatePersonControllerFactory()))
personRouter.post('/signin', adaptRoute(makeSigninControllerFactory()))
personRouter.get(
  '/users/me',
  studentAuth,
  adaptRoute(makeGetUserByIdControllerFactory()),
)
personRouter.post(
  '/edit-profile',
  AllRoleAuth,
  adaptRoute(makeEditProfileControllerFactory()),
)
personRouter.post(
  '/edit-profile/:targetId',
  coordinatorAuth,
  adaptRoute(makeAdminEditProfileApplicationControllerFactory()),
)
personRouter.post(
  '/change-pwd/:targetId',
  coordinatorAuth,
  adaptRoute(makeAdminChangePwdControllerFactory()),
)
personRouter.post(
  '/change-pwd',
  AllRoleAuth,
  adaptRoute(makeChangePwdControllerFactory()),
)
export { personRouter }
