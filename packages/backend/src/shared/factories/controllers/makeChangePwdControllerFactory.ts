import { ChangePasswordHandler } from '~/application/useCases/changePassword/change-pwd.handler'
import { AdminChangePasswordController } from '~/modules/person/ui/admin-change-password.controller'
import { ChangePasswordController } from '~/modules/person/ui/person-change-password.controller'
import { SuccessResponse } from '../../responses/sucess-response'
import { BcryptAdapter } from '../../utils/bcrypt.adapter'

export const makeChangePwdControllerFactory = () => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const useCase = new ChangePasswordHandler(bcryptAdapter)
  const signinPresented = new SuccessResponse()
  return new ChangePasswordController(useCase, signinPresented)
}
