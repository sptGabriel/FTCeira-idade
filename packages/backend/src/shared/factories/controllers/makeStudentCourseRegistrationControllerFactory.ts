import { StudentApplyInCourseController } from '~/modules/course/ui/student-apply-in-course.controller'
import { SuccessResponse } from '~/shared/responses/sucess-response'

export const makeStudentCourseRegistrationControllerFactory = () => {
  const sucessPresenter = new SuccessResponse()
  return new StudentApplyInCourseController(sucessPresenter)
}
