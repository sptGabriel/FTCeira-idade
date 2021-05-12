import { Either, left, right } from '~/shared/core/either'
import { BaseError } from '~/application/errors/base-app.error'
import { IController } from '~/shared/ports/controller'
import { RequestModel } from '~/shared/ports/request-model'
import { IResponseHandler } from '~/shared/ports/response-handler'
import { IResponseModel } from '~/shared/ports/response-model'
import { validateDTO } from '~/shared/utils/validateSchema.helper'
import { ChangePasswordHandler } from '~/application/useCases/changePassword/change-pwd.handler'
import { ChangePasswordDTO } from '~/application/dtos/change-password.dto'
import { ChangePasswordSchema } from '~/application/schemas/change-password.schema'

export class ChangePasswordController implements IController {
  constructor(
    private readonly useCase: ChangePasswordHandler,
    private readonly presenter: IResponseHandler,
  ) {}

  public async handle(
    req: RequestModel<ChangePasswordDTO>,
  ): Promise<Either<BaseError, IResponseModel<any>>> {
    const userId = req.userId
    if (!userId) throw new Error('Unauthorized')
    const dto = req.body as ChangePasswordDTO
    const validate = validateDTO(dto, ChangePasswordSchema, 'person')
    if (validate) return left(validate)
    const result = await this.useCase.execute(userId, dto)
    return right(await this.presenter.response(result))
  }
}
