import { container } from 'tsyringe'
import { Either, left, right } from '~/shared/core/either'
import { IUnitOfWork } from '~/shared/core/uow/unit-of-work'
import { BaseError } from '~/application/errors/base-app.error'
import { IController } from '~/shared/ports/controller'
import { RequestModel } from '~/shared/ports/request-model'
import { IResponseHandler } from '~/shared/ports/response-handler'
import { IResponseModel } from '~/shared/ports/response-model'
import Person from '../../../modules/person/domain/person.entity'
import { CreateQuestionnaireDTO } from '~/application/dtos/create-questionnaire.dto'
import { CreateQuestionnaireHandler } from '~/application/useCases/createQuestionnaire/create-questionnaire.handler'

export class CreateQuestionnaireController implements IController {
  constructor(private readonly presenter: IResponseHandler) {}

  public async handle(
    req: RequestModel<CreateQuestionnaireDTO>,
  ): Promise<Either<BaseError, IResponseModel<Person>>> {
    const useCase = container.resolve(CreateQuestionnaireHandler)
    const uow = container.resolve<IUnitOfWork>('Uow')
    const dto = req.body as CreateQuestionnaireDTO
    await uow.withTransaction(() => useCase.execute(dto))
    return right(await this.presenter.response())
  }
}
