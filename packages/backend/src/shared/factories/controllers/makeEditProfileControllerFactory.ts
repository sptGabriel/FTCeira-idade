import { EditProfileController } from '~/modules/person/ui/edit-profile.controller'
import { SuccessResponse } from '~/shared/responses/sucess-response'

export const makeEditProfileControllerFactory = () => {
  const sucessPresenter = new SuccessResponse()
  return new EditProfileController(sucessPresenter)
}
