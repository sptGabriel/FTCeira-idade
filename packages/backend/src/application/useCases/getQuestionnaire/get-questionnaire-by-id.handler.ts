import { inject } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import { BadRequestERROR } from '~/application/errors/bad-request.error'
import Person from '~/modules/person/domain/person.entity'
import Questionnaire from '~/modules/questionnaire/domain/questionnaire.entity'

export class GetQuestionnaireByID {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {}

  get questionnaireRepository() {
    return this.transactionalRepo.getRepository(Questionnaire)
  }

  async execute(id: string): Promise<any> {
    const questionnaire = await this.questionnaireRepository.findOne({
      where: { id },
    })
    if (!questionnaire) {
      throw new BadRequestERROR({ message: 'Questionnaire not found' })
    }
    return questionnaire
  }
}
