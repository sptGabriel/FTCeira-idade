import { inject, injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import Person from '~/modules/person/domain/person.entity'
import User from '~/modules/person/domain/user.entity'

@injectable()
export class GetAllTeachers {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {}

  get userRepository() {
    return this.transactionalRepo.getRepository(User)
  }

  async execute(): Promise<any> {
    const teachers: User[] = await this.userRepository.find({
      where: { person:{role: 'student' }}
    })
    return teachers.map((teachers) => teachers.toJson())
  }
}
