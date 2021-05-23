import { Either, left, right } from '~/shared/core/either'
import { BaseError } from '~/application/errors/base-app.error'
import { IController } from '~/shared/ports/controller'
import { RequestModel } from '~/shared/ports/request-model'
import { IResponseHandler } from '~/shared/ports/response-handler'
import { IResponseModel } from '~/shared/ports/response-model'
import { validateDTO } from '~/shared/utils/validateSchema.helper'
import { AdminChangePasswordDTO } from '~/application/dtos/change-password.dto'
import { ChangePasswordSchema } from '~/application/schemas/change-password.schema'
import { BadRequestERROR } from '~/application/errors/bad-request.error'
import { AdminChangePasswordHandler } from '~/application/useCases/changePassword/admin-change-pwd.handler'
import { AdminChangePasswordSchema } from '~/application/schemas/admin-change-password.schema'

export class AdminChangePasswordController implements IController {
  constructor(
    private readonly useCase: AdminChangePasswordHandler,
    private readonly presenter: IResponseHandler,
  ) {}

  public async handle(
    req: RequestModel<AdminChangePasswordDTO>,
  ): Promise<Either<BaseError, IResponseModel<any>>> {
    const userId = req.userId
    if (!userId) throw new Error('Unauthorized')
    const dto = req.body as AdminChangePasswordDTO
    const { targetId } = req.params as AdminChangePasswordDTO
    if (!targetId) throw new BadRequestERROR({ message: 'Invalid targetId' })
    if (targetId === userId) {
      throw new BadRequestERROR({ message: 'Invalid Operation' })
    }
    const validate = validateDTO(dto, AdminChangePasswordSchema, 'person')
    if (validate) return left(validate)
    const result = await this.useCase.execute(targetId, dto)
    return right(await this.presenter.response(result))
  }
}
