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
import { CreatePersonDTO } from '~/application/dtos/create-person.dto'
import { CreatePersonSchema } from '~/application/schemas/create-person.schema'
import { CreateCoordinatorHandler } from '~/application/useCases/createPerson/create-coordinator.handler'

export class CreateCoordinatorController implements IController {
  constructor(private readonly presenter: IResponseHandler) {}

  public async handle(
    req: RequestModel<CreatePersonDTO>,
  ): Promise<Either<BaseError, IResponseModel<Person>>> {
    const useCase = container.resolve(CreateCoordinatorHandler)
    const userId = req.userId
    if (!userId) throw new Error('Unauthorized')
    const uow = container.resolve<IUnitOfWork>('Uow')
    const dto = req.body as CreatePersonDTO
    const validate = validateDTO(dto, CreatePersonSchema, 'person')
    if (validate) return left(validate)
    await uow.withTransaction(() => useCase.execute(dto))
    return right(await this.presenter.response())
  }
}
