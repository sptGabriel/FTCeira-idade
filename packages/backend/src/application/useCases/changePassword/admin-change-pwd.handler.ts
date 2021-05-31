import { container, inject, injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import User from '~/modules/person/domain/user.entity'
import { BadRequestERROR } from '~/application/errors/bad-request.error'
import { AdminChangePasswordDTO } from '~/application/dtos/change-password.dto'
import { IHashComparer } from '~/shared/ports/hash-comparer'
import { IHasher } from '~/shared/ports/hasher'

@injectable()
export class AdminChangePasswordHandler {
  private transactionalRepo: TransactionalRepository
  constructor(
    @inject(TransactionalRepository)
    private readonly hash: IHashComparer & IHasher,
  ) {
    this.transactionalRepo = container.resolve(TransactionalRepository)
  }

  get userRepository() {
    return this.transactionalRepo.getRepository(User)
  }

  async execute(id: string, dto: AdminChangePasswordDTO): Promise<any> {
    const { password, confirmPassword } = dto
    if (password !== confirmPassword) throw new Error(`Password doesnt match.`)
    if (!password && !confirmPassword) {
      throw new BadRequestERROR({ message: `Invalid Operation` })
    }
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) throw new BadRequestERROR({ message: `This user not exist` })
    user.password = await this.hash.hash(password)
    await this.userRepository.save(user)
  }
}
