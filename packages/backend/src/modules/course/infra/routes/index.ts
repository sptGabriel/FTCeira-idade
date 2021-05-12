import express, { Router } from 'express'
import { adaptRoute } from '~/infrastructure/express/adapters/express-route-adapter'
import { coordinatorAuth } from '~/infrastructure/express/middlewares/coordinator.auth'
import { studentAuth } from '~/infrastructure/express/middlewares/student.auth'
import { makeAcceptStudentApplicationControllerFactory } from '~/shared/factories/controllers/makeAcceptStudentApplicationControllerFactory'
import { makeCreateClassControllerFactory } from '~/shared/factories/controllers/makeCreateClassControllerFactory'
import { makeCreateCourseControllerFactory } from '~/shared/factories/controllers/makeCreateCourseControllerFactory'
import { makeStudentCourseRegistrationControllerFactory } from '~/shared/factories/controllers/makeStudentCourseRegistrationControllerFactory'

const courseRouter = Router()
courseRouter.post('/add', adaptRoute(makeCreateCourseControllerFactory()))
courseRouter.post('/classes/add', adaptRoute(makeCreateClassControllerFactory()))
courseRouter.post(
  '/classes/apply/:classId',
	studentAuth,
  adaptRoute(makeStudentCourseRegistrationControllerFactory()),
)
courseRouter.post(
  '/:courseId/:classId/accept/:userId',
  adaptRoute(makeAcceptStudentApplicationControllerFactory()),
)
export { courseRouter }
