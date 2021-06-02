import Person from '~/modules/person/domain/person.entity'
import { GetStudentsController } from '~/modules/person/ui/get-students.controller'
import { SuccessResponse } from '../../responses/sucess-response'


export const makeGetStudentsControllerFactory = () => {
  const sucessPresenter = new SuccessResponse<Person[]>()
  return new GetStudentsController(sucessPresenter)
}
