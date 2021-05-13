import { TeacherApplyInCourseController } from '~/modules/course/ui/teacher-apply-in-course.controller'
import { SuccessResponse } from '~/shared/responses/sucess-response'

export const makeTeacherCourseRegistrationControllerFactory = () => {
  const sucessPresenter = new SuccessResponse()
  return new TeacherApplyInCourseController(sucessPresenter)
}
