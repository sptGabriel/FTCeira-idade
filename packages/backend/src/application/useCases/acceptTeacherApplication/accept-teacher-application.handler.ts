import { inject, injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import User from '~/modules/person/domain/user.entity'
import { BadRequestERROR } from '~/application/errors/bad-request.error'
import Course from '~/modules/course/domain/course.entity'
import CourseHasTeachers from '~/modules/course/domain/classes-has-teachers.entity'

@injectable()
export class AcceptTeacherApplicationHandler {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {}

  get userRepository() {
    return this.transactionalRepo.getRepository(User)
  }
  get courseRepository() {
    return this.transactionalRepo.getRepository(Course)
  }
  get courseHasTeachersRepository() {
    return this.transactionalRepo.getRepository(CourseHasTeachers)
  }

  async execute(userId: string, courseId: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user) throw new BadRequestERROR({ message: `This user not exist` })
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
    })
    if (!course) throw new BadRequestERROR({ message: `Course doesnt exists` })
    const hasReg = await this.courseHasTeachersRepository.findOne({
      where: {
        teacher: { id: user.person.id },
        course: { id: course.id },
      },
    })
    if (!hasReg) {
      throw new BadRequestERROR({
        message: `There is no teacher application for this course`,
      })
    }
    if (hasReg.approved) {
      throw new BadRequestERROR({ message: `Already approved` })
    }
    await this.courseHasTeachersRepository.update(hasReg, { approved: true })
  }
}
