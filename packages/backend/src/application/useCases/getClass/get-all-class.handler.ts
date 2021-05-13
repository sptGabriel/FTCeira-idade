import { inject } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import Class from '~/modules/course/domain/class.entity'

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
		return await this.classRepository.find()
  }
}
