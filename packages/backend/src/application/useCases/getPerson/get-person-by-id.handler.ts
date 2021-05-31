import { inject, injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import { BadRequestERROR } from '~/application/errors/bad-request.error'
import Person from '~/modules/person/domain/person.entity'
import User from '~/modules/person/domain/user.entity'

@injectable()
export class GetUserByID {
  constructor(
		@inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {
  }

  get userRepository() {
    return this.transactionalRepo.getRepository(User)
  }

  async execute(id:string): Promise<any> {
		const user = await this.userRepository.findOne({where:{id}})
		if(!user) throw new BadRequestERROR({message: 'Person doesnt exists'})
		return user.toJson()
  }
}
