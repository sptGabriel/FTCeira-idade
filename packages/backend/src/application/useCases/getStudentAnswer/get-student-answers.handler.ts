import { inject } from 'tsyringe'
import QuestionnaireAnswer from '~/modules/questionnaire/domain/questionnaire-answer.entity'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'

export class GetAllStudentAnswers {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {}

  get questionnaireAnswersRepository() {
    return this.transactionalRepo.getRepository(QuestionnaireAnswer)
  }

  async execute(): Promise<any> {
    return await this.questionnaireAnswersRepository.find(
      { relations: ['student', 'answers', 'questionnaire'] },
    )
  }
}
