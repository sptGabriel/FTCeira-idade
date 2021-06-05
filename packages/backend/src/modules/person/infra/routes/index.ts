import { Router } from 'express'
import multer from 'multer'
import { adaptRoute } from '~/infrastructure/express/adapters/express-route-adapter'
import { adminAuth } from '~/infrastructure/express/middlewares/admin.auth'
import { AllRoleAuth } from '~/infrastructure/express/middlewares/all-role.auth copy'
import { coordinatorAuth } from '~/infrastructure/express/middlewares/coordinator.auth'
import { studentAuth } from '~/infrastructure/express/middlewares/student.auth'
import { multerConfig } from '~/infrastructure/multer/config'
import { makeAdminChangePwdControllerFactory } from '~/shared/factories/controllers/makeAdminChangePwdControllerFactory'
import { makeAdminEditProfileApplicationControllerFactory } from '~/shared/factories/controllers/makeAdminEditProfileControllerFactory'
import { makeChangeAvatarControllerFactory } from '~/shared/factories/controllers/makeChangeAvatarControllerFactory'
import { makeChangePwdControllerFactory } from '~/shared/factories/controllers/makeChangePwdControllerFactory'
import { makeCreatePersonControllerFactory } from '~/shared/factories/controllers/makeCreatePersonControllerFactory'
import { makeEditProfileControllerFactory } from '~/shared/factories/controllers/makeEditProfileControllerFactory'
import { makeGetCoordinatorsControllerFactory } from '~/shared/factories/controllers/makeGetCoordinatorsControllerFactory'
import { makeEnrollmentStudentsControllerFactory } from '~/shared/factories/controllers/makeGetEnrollmentsStudentsControllerFactory'
import { makeGetStudentsControllerFactory } from '~/shared/factories/controllers/makegetStudentsControllerFactory'
import { makeGetTeachersControllerFactory } from '~/shared/factories/controllers/makeGetTeachersControllerFactory'
import { makeGetUserByIdControllerFactory } from '~/shared/factories/controllers/makegetUserByIdControllerFactory'
import { makeGetUsersControllerFactory } from '~/shared/factories/controllers/makegetUsersControllerFactory'
import { makeSigninControllerFactory } from '~/shared/factories/controllers/makeSigninControllerFactory'

const personRouter = Router()
personRouter.post('/signup', adaptRoute(makeCreatePersonControllerFactory()))
personRouter.post('/signin', adaptRoute(makeSigninControllerFactory()))
personRouter.post(
  '/ftc3idade/coordinators',
  coordinatorAuth,
  adaptRoute(makeSigninControllerFactory()),
)
personRouter.get(
  '/users/me',
  AllRoleAuth,
  adaptRoute(makeGetUserByIdControllerFactory()),
)
personRouter.get(
  '/users/students',
  adminAuth,
  adaptRoute(makeGetStudentsControllerFactory()),
)
personRouter.get(
  '/users/coordinators',
  coordinatorAuth,
  adaptRoute(makeGetCoordinatorsControllerFactory()),
)
personRouter.get(
  '/users/teachers',
  coordinatorAuth,
  adaptRoute(makeGetTeachersControllerFactory()),
)
personRouter.get(
  '/users/enrollments',
  studentAuth,
  adaptRoute(makeEnrollmentStudentsControllerFactory()),
)
personRouter.get(
  '/users',
  adminAuth,
  adaptRoute(makeGetUsersControllerFactory()),
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
personRouter.post(
  '/change-avatar',
  AllRoleAuth,
  multer(multerConfig).single('avatar'),
  adaptRoute(makeChangeAvatarControllerFactory()),
)
export { personRouter }
