import Person from '~/modules/person/domain/person.entity'
import { GetTeachersController } from '~/modules/person/ui/get-teachers.controller'
import { SuccessResponse } from '../../responses/sucess-response'


export const makeGetTeachersControllerFactory = () => {
  const sucessPresenter = new SuccessResponse<Person[]>()
  return new GetTeachersController(sucessPresenter)
}
