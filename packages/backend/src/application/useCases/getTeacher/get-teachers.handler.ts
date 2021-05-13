import { inject } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import Course from '~/modules/course/domain/course.entity'
import Person from '~/modules/person/domain/person.entity'

export class GetAllStudents {
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
