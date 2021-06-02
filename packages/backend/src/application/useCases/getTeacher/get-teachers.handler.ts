import { inject } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import Person from '~/modules/person/domain/person.entity'

export class GetAllTeachers {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {}

  get personRepository() {
    return this.transactionalRepo.getRepository(Person)
  }

  async execute(): Promise<any> {
    return await this.personRepository.find({ where: { role: 'teacher' } })
  }
}
