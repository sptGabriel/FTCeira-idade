import { GetAllClassRoomController } from '~/modules/course/ui/get-all-class-room.controller'
import { CreatedResponse } from '../../responses/created-response'

export const makeGetClassRoomsControllerFactory = () => {
  const createdClassPresenter = new CreatedResponse()
  return new GetAllClassRoomController(createdClassPresenter)
}
