import { LoadUserByTokenHandler } from '~/application/useCases/loadUserByToken/load-by-token.handler'
import { IMiddleware } from '../ports/middleware'
import { IResponseHandler } from '../ports/response-handler'

export class AuthMiddleware implements IMiddleware {
  constructor(
    private readonly loadUserByToken: LoadUserByTokenHandler,
    private readonly presenter: IResponseHandler<{ userId: string }>,
    private readonly role: string[],
  ) {}
  public async handle(request: any) {
    if (!request) throw new Error()
    if (!request.accessToken) throw new Error('Unauthorized')
    const user = await this.loadUserByToken.load(request.accessToken, this.role)
    return this.presenter.response({ userId: user.id })
  }
}
