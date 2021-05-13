import { inject } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import { BadRequestERROR } from '~/application/errors/bad-request.error'
import Class from '~/modules/course/domain/class.entity'
import Course from '~/modules/course/domain/course.entity'

export class GetClassByCourseID {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {}

  get courseRepository() {
    return this.transactionalRepo.getRepository(Course)
  }

  async execute(id: string): Promise<any> {
    const course = await this.courseRepository.findOne({
      relations: ['classes'],
      where: { id },
    })
    if (!course) throw new BadRequestERROR({ message: 'Course doenst exists' })
    return course.classes
  }
}
