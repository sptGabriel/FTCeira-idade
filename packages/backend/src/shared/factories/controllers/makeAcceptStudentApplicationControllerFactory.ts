import { AcceptStudentApplicationController } from '~/modules/course/ui/accept-student-application-course.controller'
import { SuccessResponse } from '~/shared/responses/sucess-response'

export const makeAcceptStudentApplicationControllerFactory = () => {
  const sucessPresenter = new SuccessResponse()
  return new AcceptStudentApplicationController(sucessPresenter)
}
