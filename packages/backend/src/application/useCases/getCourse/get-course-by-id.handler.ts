import { inject } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import { BadRequestERROR } from '~/application/errors/bad-request.error'
import Course from '~/modules/course/domain/course.entity'

export class GetCourseByID {
  constructor(
		@inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {
  }

  get courseRepository() {
    return this.transactionalRepo.getRepository(Course)
  }

  async execute(id:string): Promise<any> {
		const course = await this.courseRepository.findOne({where:{id}})
		if(!course) throw new BadRequestERROR({message: 'Course doenst exists'})
		return course
  }
}
