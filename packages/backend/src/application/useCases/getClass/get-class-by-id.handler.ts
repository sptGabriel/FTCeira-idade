import { inject } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import { BadRequestERROR } from '~/application/errors/bad-request.error'
import Class from '~/modules/course/domain/class.entity'

export class GetClasseByID {
  constructor(
		@inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {
  }

  get classRepository() {
    return this.transactionalRepo.getRepository(Class)
  }

  async execute(id:string): Promise<any> {
		const classe = await this.classRepository.findOne({where:{id}})
		if(!classe) throw new BadRequestERROR({message: 'Course doenst exists'})
		return classe
  }
}
