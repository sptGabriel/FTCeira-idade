import { inject, injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import User from '~/modules/person/domain/user.entity'
import { BadRequestERROR } from '~/application/errors/bad-request.error'
import CourseHasTeachers from '~/modules/course/domain/classes-has-teachers.entity'
import Course from '~/modules/course/domain/course.entity'

@injectable()
export class TeacherApplyInCourseHandler {
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

  async execute(id: string, courseId: string): Promise<any> { 
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) throw new BadRequestERROR({ message: `This user not exist` })
    if (user.person.role !== 'teacher') {
      throw new BadRequestERROR({ message: `Invalid Operation` })
    }
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
    })
    if (!course) throw new BadRequestERROR({ message: `Course doesnt exist` })
    if (course.iesCourse !== user.person.iesCourse) {
      throw new BadRequestERROR({
        message: `The teacher cannot apply to the course`,
      })
    }
    const alreadyApplied = await this.courseHasTeachersRepository.findOne({
      where: { course: { id: courseId }, teacher: { id: user.person.id } },
    })
    if (alreadyApplied) {
      throw new BadRequestERROR({
        message: `Teacher already has an application for this course`,
      })
    }
    await this.courseHasTeachersRepository.save({
      course,
      teacher: user.person,
      approved: false,
    })
  }
}
