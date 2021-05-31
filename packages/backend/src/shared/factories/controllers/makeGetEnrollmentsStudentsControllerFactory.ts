import { EnrollmentStudentsController } from '~/modules/person/ui/enrollment-students.controller'
import { SuccessResponse } from '~/shared/responses/sucess-response'

export const makeEnrollmentStudentsControllerFactory = () => {
  const createdClassPresenter = new SuccessResponse<any>()
  return new EnrollmentStudentsController(createdClassPresenter)
}
