import { inject } from 'tsyringe'
import { BadRequestERROR } from '~/application/errors/bad-request.error'
import Registration from '~/modules/person/domain/registration.entity'
import QuestionnaireAnswer from '~/modules/questionnaire/domain/questionnaire-answer.entity'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'

export class GetRegistrationsByUserID {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {}

  get registrationRepository() {
    return this.transactionalRepo.getRepository(Registration)
  }

  async execute(userId: string): Promise<any> {
    const registration = await this.registrationRepository.findOne({
      relations: ['student', 'class'],
      where: { student: { id: userId } },
    })
    if (!registration) {
      throw new BadRequestERROR({message: 'Registration not found'})
    }
    return registration
  }
}
