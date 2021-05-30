import Person from '~/modules/person/domain/person.entity'
import { GetUsersController } from '~/modules/person/ui/get-users.controller'
import { SuccessResponse } from '../../responses/sucess-response'


export const makeGetUsersControllerFactory = () => {
  const sucessPresenter = new SuccessResponse<Person[]>()
  return new GetUsersController(sucessPresenter)
}
