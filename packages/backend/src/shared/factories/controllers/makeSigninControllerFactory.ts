import { SiginHandler } from '~/application/useCases/signin/sign-in.handler'
import { SignInController } from '~/modules/person/ui/sign-in.controller'
import { SuccessResponse } from '../../responses/sucess-response'
import { BcryptAdapter } from '../../utils/bcrypt.adapter'
import { JwtAdapter } from '../../utils/jwt-adapter'

export const makeSigninControllerFactory = () => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter('ft3idade', 3600)
  const useCase = new SiginHandler(bcryptAdapter, jwtAdapter)
  const signinPresented = new SuccessResponse<{ token: string }>()
  return new SignInController(useCase, signinPresented)
}
