import { Router } from 'express'
import { adaptRoute } from '~/infrastructure/express/adapters/express-route-adapter'
import { adminAuth } from '~/infrastructure/express/middlewares/admin.auth'
import { coordinatorAuth } from '~/infrastructure/express/middlewares/coordinator.auth'
import { studentAuth } from '~/infrastructure/express/middlewares/student.auth'
import { teacherAuth } from '~/infrastructure/express/middlewares/teacher.auth'
import { makeAcceptStudentApplicationControllerFactory } from '~/shared/factories/controllers/makeAcceptStudentApplicationControllerFactory'
import { makeAcceptTeacherApplicationControllerFactory } from '~/shared/factories/controllers/makeAcceptTeacherApplicationControllerFactory'
import { makeCreateClassControllerFactory } from '~/shared/factories/controllers/makeCreateClassControllerFactory'
import { makeCreateCourseControllerFactory } from '~/shared/factories/controllers/makeCreateCourseControllerFactory'
import { makeStudentCourseRegistrationControllerFactory } from '~/shared/factories/controllers/makeStudentCourseRegistrationControllerFactory'
import { makeTeacherCourseRegistrationControllerFactory } from '~/shared/factories/controllers/makeTeacherCourseRegistrationControllerFactory'

const courseRouter = Router()
courseRouter.post('/add', adaptRoute(makeCreateCourseControllerFactory()))
courseRouter.post('/classes/add', adaptRoute(makeCreateClassControllerFactory()))
courseRouter.put(
  '/classes/apply/:classId',
	studentAuth,
  adaptRoute(makeStudentCourseRegistrationControllerFactory()),
)
courseRouter.post(
  '/:courseId/:classId/accept/:userId',
  coordinatorAuth,
  adaptRoute(makeAcceptStudentApplicationControllerFactory()),
)
courseRouter.post(
  '/mentoring/apply/:courseId',
	teacherAuth,
  adaptRoute(makeTeacherCourseRegistrationControllerFactory()),
)
courseRouter.put(
  '/mentoring/:courseId/accept/:userId',
  coordinatorAuth,
  adaptRoute(makeAcceptTeacherApplicationControllerFactory()),
)
export { courseRouter }
