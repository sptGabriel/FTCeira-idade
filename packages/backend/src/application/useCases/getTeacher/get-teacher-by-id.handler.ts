import { inject } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import { BadRequestERROR } from '~/application/errors/bad-request.error'
import Person from '~/modules/person/domain/person.entity'

export class GetTeacherByID {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {}

  get personRepository() {
    return this.transactionalRepo.getRepository(Person)
  }

  async execute(id: string): Promise<any> {
    const teacher = await this.personRepository.findOne({
      where: { id, role: 'teacher' },
    })
    if (!teacher) throw new BadRequestERROR({ message: 'Student not found' })
    return teacher
  }
}
