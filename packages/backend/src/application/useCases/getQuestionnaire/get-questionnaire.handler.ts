import { inject, injectable } from 'tsyringe'
import Questionnaire from '~/modules/questionnaire/domain/questionnaire.entity'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'

@injectable()
export class GetAllQuestionnaires {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {}

  get questionnaireRepository() {
    return this.transactionalRepo.getRepository(Questionnaire)
  }

  async execute(): Promise<any> {
    const questionnaires = await this.questionnaireRepository.find({
      relations: ['questions', 'questions.alternatives'],
    })
    return questionnaires.map((qs) => qs.toJson())
  }
}
