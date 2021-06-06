import { inject,injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import Class from '~/modules/course/domain/class.entity'
import Course from '~/modules/course/domain/course.entity'

@injectable()
export class GetAllActiveCourses {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {
  }

  get classRepository() {
    return this.transactionalRepo.getRepository(Course)
  }

  async execute(): Promise<any> {
    const courses = await this.classRepository.find({ relations: ['classes'] })
    return courses.filter((c: Course) => c.active)
      .map((classRoom: Class) => classRoom.toJson())
  }
}
