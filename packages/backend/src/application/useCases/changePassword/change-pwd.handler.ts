import { container, inject, injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import User from '~/modules/person/domain/user.entity'
import { BadRequestERROR } from '~/application/errors/bad-request.error'
import Person from '~/modules/person/domain/person.entity'
import { AdminEditProfileDTO } from '~/application/dtos/admin-edit-profile.dto'
import { ChangePasswordDTO } from '~/application/dtos/change-password.dto'
import { IHashComparer } from '~/shared/ports/hash-comparer'
import { IHasher } from '~/shared/ports/hasher'

@injectable()
export class ChangePasswordHandler {
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

  async execute(id: string, dto: ChangePasswordDTO): Promise<any> {
    const { password, confirmPassword, oldPassword } = dto
    if (password !== confirmPassword) throw new Error(`Password doesnt match.`)
    if (password === oldPassword) throw new Error(`Provide a new password`)
    if (!password && !confirmPassword && !oldPassword) {
      throw new BadRequestERROR({ message: `Invalid Operation` })
    }
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) throw new BadRequestERROR({ message: `This user not exist` })
    const isValid = await this.hash.compare(oldPassword, user.password)
    if (!isValid) throw new Error(`Password doesnt match.`)
    user.password = await this.hash.hash(password)
    await this.userRepository.save(user)
  }
}
