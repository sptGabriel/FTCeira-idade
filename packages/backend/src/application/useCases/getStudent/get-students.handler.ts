import { inject,injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import User from '~/modules/person/domain/user.entity'

@injectable()
export class GetAllStudents {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) { }

  get userRepository() {
    return this.transactionalRepo.getRepository(User)
  }

  async execute(): Promise<any> {
    const students: User[] = await this.userRepository.find({
      where: { person:{role: 'student' }}
    })
    return students.map((st) => st.toJson())
  }
}
