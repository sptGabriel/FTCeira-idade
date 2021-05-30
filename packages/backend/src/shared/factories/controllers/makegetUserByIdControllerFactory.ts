import Person from '~/modules/person/domain/person.entity'
import { GetUserByIDController } from '~/modules/person/ui/get-user-by-id.controller'
import { SuccessResponse } from '../../responses/sucess-response'


export const makeGetUserByIdControllerFactory = () => {
  const sucessPresenter = new SuccessResponse<Person>()
  return new GetUserByIDController(sucessPresenter)
}
