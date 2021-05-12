import { CreatePersonController } from '~/modules/person/ui/create-person.controller'
import { CreatedResponse } from '../../responses/created-response'

export const makeCreatePersonControllerFactory = () => {
  const createdPersonPresenter = new CreatedResponse()
  return new CreatePersonController(createdPersonPresenter)
}
