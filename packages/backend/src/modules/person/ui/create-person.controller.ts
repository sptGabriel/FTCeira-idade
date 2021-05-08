import { container } from 'tsyringe'
import { Either, left, right } from '~/shared/core/either'
import { IUnitOfWork } from '~/shared/core/uow/unit-of-work'
import { BaseError } from '~/application/errors/base-app.error'
import { IController } from '~/shared/ports/controller'
import { RequestModel } from '~/shared/ports/request-model'
import { IResponseHandler } from '~/shared/ports/response-handler'
import { IResponseModel } from '~/shared/ports/response-model'
import { validateDTO } from '~/shared/utils/validateSchema.helper'
import Person from '../../../modules/person/domain/person.entity'
import { CreatePersonHandler } from '~/application/useCases/createPerson/create-person.handler'
import { CreatePersonDTO } from '~/application/dtos/create-person.dto'
import { CreatePersonSchema } from '~/application/schemas/create-person.schema'

export class CreatePersonController implements IController {
  constructor(private readonly presenter: IResponseHandler) {}

  public async handle(
    req: RequestModel<CreatePersonDTO>,
  ): Promise<Either<BaseError, IResponseModel<Person>>> {
    const useCase = container.resolve(CreatePersonHandler)
    const uow = container.resolve<IUnitOfWork>('Uow')
    const dto = req.body as CreatePersonDTO
    const validate = validateDTO(dto, CreatePersonSchema, 'person')
    if (validate) return left(validate)
    const result = await uow.withTransaction(() => useCase.execute(dto))
    return right(await this.presenter.response())
  }
}
