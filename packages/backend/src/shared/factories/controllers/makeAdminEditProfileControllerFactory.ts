import { AdminEditProfileController } from '~/modules/person/ui/admin-edit-profile.controller copy'
import { SuccessResponse } from '~/shared/responses/sucess-response'

export const makeAdminEditProfileApplicationControllerFactory = () => {
  const sucessPresenter = new SuccessResponse()
  return new AdminEditProfileController(sucessPresenter)
}
