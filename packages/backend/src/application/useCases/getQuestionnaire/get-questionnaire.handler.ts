import { inject } from 'tsyringe'
import Questionnaire from '~/modules/questionnaire/domain/questionnaire.entity'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'

export class GetAllQuestionnaires {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {}

  get questionnaireRepository() {
    return this.transactionalRepo.getRepository(Questionnaire)
  }

  async execute(): Promise<any> {
    return await this.questionnaireRepository.find({
      relations: ['questions', 'questions.alternatives'],
    })
  }
}
