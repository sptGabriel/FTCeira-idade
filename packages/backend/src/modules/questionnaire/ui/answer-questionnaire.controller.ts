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
import { CreateQuestionnaireSchema } from '~/application/schemas/create-questionnaire.schema'
import { AnswerDTO } from '~/application/dtos/answer-questionnaire.dto'
import { AnswerQuestionnaireHandler } from '~/application/useCases/answerQuestionnaire/answer-questionnaire.handler'

export class AnswerQuestionnaireController implements IController {
  constructor(private readonly presenter: IResponseHandler) {}

  public async handle(
    req: RequestModel<AnswerDTO>,
  ): Promise<Either<BaseError, IResponseModel<Person>>> {
    const useCase = container.resolve(AnswerQuestionnaireHandler)
    const userId = req.userId
    if (!userId) throw new Error('Unauthorized')
    const uow = container.resolve<IUnitOfWork>('Uow')
    const dto = req.body as AnswerDTO
    const { questionnaireId } = req.params as { questionnaireId: string }
    await uow.withTransaction(() =>
      useCase.execute(userId, { ...dto, questionnaireId }),
    )
    return right(await this.presenter.response())
  }
}
