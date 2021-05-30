import { inject, injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import { BadRequestERROR } from '~/application/errors/bad-request.error'
import User from '~/modules/person/domain/user.entity'

@injectable()
export class GetUsers {
  constructor(
		@inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {
  }

  get userRepository() {
    return this.transactionalRepo.getRepository(User)
  }

  async execute(): Promise<any> {
		const users = await this.userRepository.find()
		if(!users) throw new BadRequestERROR({message: 'Person doesnt exists'})
		return users.map((user) => user.toJson())
  }
}
