import { ChangeAvatarController } from '~/modules/person/ui/change-avatar.controller'
import { SuccessResponse } from '../../responses/sucess-response'

export const makeChangeAvatarControllerFactory = () => {
  const signinPresented = new SuccessResponse()
  return new ChangeAvatarController(signinPresented)
}
