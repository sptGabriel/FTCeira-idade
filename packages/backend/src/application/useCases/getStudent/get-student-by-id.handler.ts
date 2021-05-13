import { inject } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import { BadRequestERROR } from '~/application/errors/bad-request.error'
import Course from '~/modules/course/domain/course.entity'
import Person from '~/modules/person/domain/person.entity'

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