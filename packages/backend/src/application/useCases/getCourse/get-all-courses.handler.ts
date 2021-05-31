import { inject, injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import Class from '~/modules/course/domain/class.entity'
import Course from '~/modules/course/domain/course.entity'

@injectable()
export class GetAllCourses {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {
  }

  get classRepository() {
    return this.transactionalRepo.getRepository(Course)
  }

  async execute(): Promise<any> {
		const courses =  await this.classRepository.find({relations: ['classes']})
    return courses.map((classRoom) => classRoom.toJson())
  }
}
