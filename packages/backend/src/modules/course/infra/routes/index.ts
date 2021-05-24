import { Router } from 'express'
import { adaptRoute } from '~/infrastructure/express/adapters/express-route-adapter'
import { adminAuth } from '~/infrastructure/express/middlewares/admin.auth'
import { coordinatorAuth } from '~/infrastructure/express/middlewares/coordinator.auth'
import { studentAuth } from '~/infrastructure/express/middlewares/student.auth'
import { teacherAuth } from '~/infrastructure/express/middlewares/teacher.auth'
import { multerConfig } from '~/infrastructure/multer/config'
import { makeAcceptStudentApplicationControllerFactory } from '~/shared/factories/controllers/makeAcceptStudentApplicationControllerFactory'
import { makeAcceptTeacherApplicationControllerFactory } from '~/shared/factories/controllers/makeAcceptTeacherApplicationControllerFactory'
import { makeCreateClassControllerFactory } from '~/shared/factories/controllers/makeCreateClassControllerFactory'
import { makeCreateCourseControllerFactory } from '~/shared/factories/controllers/makeCreateCourseControllerFactory'
import { makeGetClassRoomsControllerFactory } from '~/shared/factories/controllers/makeGetClassRoomsControllerFactory'
import { makeGetCourseByIdControllerFactory } from '~/shared/factories/controllers/makegetCourseByIdControllerFactory'
import { makeGetCoursesControllerFactory } from '~/shared/factories/controllers/makeGetCoursesControllerFactory'
import { makeEnrolledStudentsControllerFactory } from '~/shared/factories/controllers/makeGetEnrolledStudentsControllerFactory'
import { makeStudentCourseRegistrationControllerFactory } from '~/shared/factories/controllers/makeStudentCourseRegistrationControllerFactory'
import { makeTeacherCourseRegistrationControllerFactory } from '~/shared/factories/controllers/makeTeacherCourseRegistrationControllerFactory'
import multer from 'multer'

const courseRouter = Router()
courseRouter.get(
  '/',
  coordinatorAuth,
  adaptRoute(makeGetCoursesControllerFactory()),
)
courseRouter.get(
  '/enrolledstudents',
  coordinatorAuth,
  adaptRoute(makeEnrolledStudentsControllerFactory()),
)
courseRouter.post('/', adaptRoute(makeGetCourseByIdControllerFactory()))
courseRouter.post(
  '/add',
  coordinatorAuth,
  multer(multerConfig).single('media'),
  adaptRoute(makeCreateCourseControllerFactory()),
)
courseRouter.post(
  '/classes/add',
  coordinatorAuth,
  adaptRoute(makeCreateClassControllerFactory()),
)
courseRouter.get(
  '/classes',
  coordinatorAuth,
  adaptRoute(makeGetClassRoomsControllerFactory()),
)
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
