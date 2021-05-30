import { inject, injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import { BadRequestERROR } from '~/application/errors/bad-request.error'
import Course from '~/modules/course/domain/course.entity'
import Class from '~/modules/course/domain/class.entity'
import Registration from '~/modules/person/domain/registration.entity'
import User from '~/modules/person/domain/user.entity'

@injectable()
export class EnrollmentStudentsHandler {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {}

  get classRepository() {
    return this.transactionalRepo.getRepository(Class)
  }

  get userRepository() {
    return this.transactionalRepo.getRepository(User)
  }

  get courseRepository() {
    return this.transactionalRepo.getRepository(Course)
  }

  get registrationRepository() {
    return this.transactionalRepo.getRepository(Registration)
  }

  async execute(id: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) throw new BadRequestERROR({ message: 'User doenst exists' })
    const enrollments = await this.registrationRepository.find({
      where: { student: { id } },
      relations: ['class', 'class.course'],
    })
    return enrollments.map((en) => ({
      id,
      course: en.class.course.name,
      classRoom: en.class.cod,
      status: en.approved,
      admission: en.createdAt,
    }))
  }
}
