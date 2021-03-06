import { inject, injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import Person from '~/modules/person/domain/person.entity'

@injectable()
export class GetAllCoordinators {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {}

  get personRepository() {
    return this.transactionalRepo.getRepository(Person)
  }

  async execute(): Promise<any> {
    return await this.personRepository.find({ where: { role: 'coordinator' } })
  }
}
