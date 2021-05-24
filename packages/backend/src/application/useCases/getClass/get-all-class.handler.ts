import { inject, injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import Class from '~/modules/course/domain/class.entity'

@injectable()
export class GetAllClasses {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {
  }

  get classRepository() {
    return this.transactionalRepo.getRepository(Class)
  }

  async execute(): Promise<any> {
		const classes =  await this.classRepository.find({relations: ['course']})
    return classes.map((classRoom) => classRoom.toJson())
  }
}
