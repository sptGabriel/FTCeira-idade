import { inject, injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import { BadRequestERROR } from '~/application/errors/bad-request.error'
import Course from '~/modules/course/domain/course.entity'
import Class from '~/modules/course/domain/class.entity'
import Registration from '~/modules/person/domain/registration.entity'
import { In } from 'typeorm'

@injectable()
export class EnrolledStudentsHandler {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {}

  get classRepository() {
    return this.transactionalRepo.getRepository(Class)
  }

  get courseRepository() {
    return this.transactionalRepo.getRepository(Course)
  }

  get registrationRepository() {
    return this.transactionalRepo.getRepository(Registration)
  }

  async execute(id: string): Promise<any> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['classes'],
    })
    if (!course) throw new BadRequestERROR({ message: 'Course doenst exists' })
    const classedIds = course.classes.map((item) => item.id)
    const registrations = await this.registrationRepository.find({
      where: { class: In(classedIds) },
      relations: ['student'],
    })
    return registrations.map((reg) => reg.student.toJson())
  }
}
