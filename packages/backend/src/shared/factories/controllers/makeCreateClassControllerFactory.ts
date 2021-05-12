import { CreateClassController } from '~/modules/course/ui/create-class.controller'
import { CreatedResponse } from '../../responses/created-response'

export const makeCreateClassControllerFactory = () => {
  const createdClassPresenter = new CreatedResponse()
  return new CreateClassController(createdClassPresenter)
}
