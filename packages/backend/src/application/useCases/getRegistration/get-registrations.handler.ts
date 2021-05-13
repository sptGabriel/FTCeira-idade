import { inject } from 'tsyringe'
import Registration from '~/modules/person/domain/registration.entity'
import QuestionnaireAnswer from '~/modules/questionnaire/domain/questionnaire-answer.entity'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'

export class GetAllStudentAnswers {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {}

  get registrationRepository() {
    return this.transactionalRepo.getRepository(Registration)
  }

  async execute(): Promise<any> {
    return await this.registrationRepository.find({
      relations: ['student', 'class'],
    })
  }
}
