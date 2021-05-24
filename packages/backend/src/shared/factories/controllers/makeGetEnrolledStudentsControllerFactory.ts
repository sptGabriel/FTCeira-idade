import { EnrolledStudentsController } from '~/modules/course/ui/enrolled-students.controller'
import Person from '~/modules/person/domain/person.entity'
import { SuccessResponse } from '~/shared/responses/sucess-response'

export const makeEnrolledStudentsControllerFactory = () => {
  const createdClassPresenter = new SuccessResponse<Person[]>()
  return new EnrolledStudentsController(createdClassPresenter)
}
