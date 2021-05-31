import { Either, left, right } from '~/shared/core/either'
import { BaseError } from '~/application/errors/base-app.error'
import { IController } from '~/shared/ports/controller'
import { RequestModel } from '~/shared/ports/request-model'
import { IResponseHandler } from '~/shared/ports/response-handler'
import { IResponseModel } from '~/shared/ports/response-model'
import { validateDTO } from '~/shared/utils/validateSchema.helper'
import { EditProfileSchema } from '~/application/schemas/edit-profile.schema'
import { container } from 'tsyringe'
import { EditProfileHandler } from '~/application/useCases/editProfile/edit-profile.handler'
import { EditProfileDTO } from '~/application/dtos/edit-profile.dto'

export class EditProfileController implements IController {
  constructor(
    private readonly presenter: IResponseHandler,
  ) {}

  public async handle(
    req: RequestModel<EditProfileDTO>,
  ): Promise<Either<BaseError, IResponseModel<any>>> {
		const useCase = container.resolve(EditProfileHandler)
    const userId = req.userId
    if (!userId) throw new Error('Unauthorized')
    const dto = req.body as EditProfileDTO
    const validate = validateDTO(dto, EditProfileSchema, 'person')
    if (validate) return left(validate)
    const result = await useCase.execute(userId, dto)
    return right(await this.presenter.response(result))
  }
}
