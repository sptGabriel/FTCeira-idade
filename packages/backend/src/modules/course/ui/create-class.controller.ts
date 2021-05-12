import { container } from 'tsyringe'
import { Either, left, right } from '~/shared/core/either'
import { BaseError } from '~/application/errors/base-app.error'
import { IController } from '~/shared/ports/controller'
import { RequestModel } from '~/shared/ports/request-model'
import { IResponseHandler } from '~/shared/ports/response-handler'
import { IResponseModel } from '~/shared/ports/response-model'
import { validateDTO } from '~/shared/utils/validateSchema.helper'
import { CreateClassDTO } from '~/application/dtos/create-class.dto'
import { CreateClassSchema } from '~/application/schemas/create-class.schema'
import { CreateClassHandler } from '~/application/useCases/createClass/create-class.handler'

export class CreateClassController implements IController {
  constructor(private readonly presenter: IResponseHandler) {}

  public async handle(
    req: RequestModel<CreateClassDTO>,
  ): Promise<Either<BaseError, IResponseModel<any>>> {
    const useCase = container.resolve(CreateClassHandler)
    const dto = req.body as CreateClassDTO
    const validate = validateDTO(dto, CreateClassSchema, 'class')
    if (validate) return left(validate)
    await useCase.execute(dto)
    return right(await this.presenter.response())
  }
}
