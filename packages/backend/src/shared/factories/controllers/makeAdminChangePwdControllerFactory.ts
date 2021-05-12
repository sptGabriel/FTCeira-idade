import { AdminChangePasswordHandler } from '~/application/useCases/changePassword/admin-change-pwd.handler'
import { AdminChangePasswordController } from '~/modules/person/ui/admin-change-password.controller'
import { SuccessResponse } from '../../responses/sucess-response'
import { BcryptAdapter } from '../../utils/bcrypt.adapter'

export const makeAdminChangePwdControllerFactory = () => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const useCase = new AdminChangePasswordHandler(bcryptAdapter)
  const signinPresented = new SuccessResponse()
  return new AdminChangePasswordController(useCase, signinPresented)
}
