import { TeacherAcceptApplicationController } from '~/modules/course/ui/accept-teacher-application-course.controller'
import { SuccessResponse } from '~/shared/responses/sucess-response'

export const makeAcceptTeacherApplicationControllerFactory = () => {
  const sucessPresenter = new SuccessResponse()
  return new TeacherAcceptApplicationController(sucessPresenter)
}
