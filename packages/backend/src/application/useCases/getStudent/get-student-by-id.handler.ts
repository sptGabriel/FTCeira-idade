import { inject, injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import { BadRequestERROR } from '~/application/errors/bad-request.error'
import Person from '~/modules/person/domain/person.entity'
@injectable()
export class GetStudentByID {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {}

  get personRepository() {
    return this.transactionalRepo.getRepository(Person)
  }

  async execute(id: string): Promise<any> {
    const student = await this.personRepository.findOne({
      where: { id, role: 'student' },
    })
    if (!student) throw new BadRequestERROR({ message: 'Student not found' })
    return student
  }
}
