import { container, inject, injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import User from '~/modules/person/domain/user.entity'
import { BadRequestERROR } from '~/application/errors/bad-request.error'
import Person from '~/modules/person/domain/person.entity'
import { ChangePasswordDTO } from '~/application/dtos/change-password.dto'
import { IHashComparer } from '~/shared/ports/hash-comparer'
import { IHasher } from '~/shared/ports/hasher'

@injectable()
export class ChangeAvatarHandler {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {}

  get userRepository() {
    return this.transactionalRepo.getRepository(User)
  }

  async execute(url: string): Promise<any> {
    await this.userRepository.save({avatar: url})
  }
}
