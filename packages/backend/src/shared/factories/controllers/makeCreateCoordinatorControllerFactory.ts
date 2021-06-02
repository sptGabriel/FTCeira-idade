import { CreateCoordinatorController } from '~/modules/person/ui/create-coordinator.controller'
import { CreatedResponse } from '../../responses/created-response'

export const makeCreateCoordinatorControllerFactory = () => {
  const createdCoordinatorPresenter = new CreatedResponse()
  return new CreateCoordinatorController(createdCoordinatorPresenter)
}
