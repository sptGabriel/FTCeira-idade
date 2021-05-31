import { LoadUserByTokenHandler } from '~/application/useCases/loadUserByToken/load-by-token.handler'
import { AuthMiddleware } from '~/shared/middlewares/is-auth.middleware'
import { IMiddleware } from '~/shared/ports/middleware'
import { SuccessResponse } from '~/shared/responses/sucess-response'
import { JwtAdapter } from '~/shared/utils/jwt-adapter'

export const makeAuthMiddleware = (role: string[]): IMiddleware => {
  const authPresenter = new SuccessResponse<{ userId: string }>()
  const jwtAdapter = new JwtAdapter('ft3idade', 3600)
  const useCase = new LoadUserByTokenHandler(jwtAdapter)
  return new AuthMiddleware(useCase, authPresenter, role)
}
