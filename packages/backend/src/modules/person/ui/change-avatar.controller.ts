import { Either, left, right } from '~/shared/core/either'
import { BaseError } from '~/application/errors/base-app.error'
import { IController } from '~/shared/ports/controller'
import { RequestModel } from '~/shared/ports/request-model'
import { IResponseHandler } from '~/shared/ports/response-handler'
import { IResponseModel } from '~/shared/ports/response-model'
import { validateDTO } from '~/shared/utils/validateSchema.helper'
import { EditProfileSchema } from '~/application/schemas/edit-profile.schema'
import { container } from 'tsyringe'
import { AdminEditProfileDTO } from '~/application/dtos/edit-profile.dto'
import { AdminEditProfileHandler } from '~/application/useCases/editProfile/admin-edit-profile.handler'
import { ChangeAvatarHandler } from '~/application/useCases/changeAvatar/change-avatar.handler'

export class ChangeAvatarController implements IController {
  constructor(
    private readonly presenter: IResponseHandler,
  ) {}

  public async handle(
    req: RequestModel,
  ): Promise<Either<BaseError, IResponseModel<any>>> {
		const useCase = container.resolve(ChangeAvatarHandler)
    const userId = req.userId
    if (!userId) throw new Error('Unauthorized')
    const result = await useCase.execute(req.file.filename)
    return right(await this.presenter.response(result))
  }
}
