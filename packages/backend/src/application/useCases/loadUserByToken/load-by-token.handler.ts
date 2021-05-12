import { container } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import User from '~/modules/person/domain/user.entity'
import { IDecrypter } from '~/shared/ports/decrypter'
import { JsonWebTokenError } from 'jsonwebtoken'

export class LoadUserByTokenHandler {
  private transactionalRepo: TransactionalRepository
  constructor(private readonly decrypt: IDecrypter) {
    this.transactionalRepo = container.resolve(TransactionalRepository)
  }

  get userRepository() {
    return this.transactionalRepo.getRepository(User)
  }

  private async getUser(id: string, role: string[]) {
    const user = await this.userRepository.findOne({
      where: { id },
    })
    if (!user) throw new Error('Not allowed')
    if (user.id !== id) throw new Error('Not allowed')
    if (!role.includes(user.person.role)) throw new Error('Not allowed')
    return user
  }

  async load(token: string, role: string[]): Promise<any> {
    try {
      const decoded: any = await this.decrypt.decrypt(token)
      return await this.getUser(decoded.id, role)
    } catch (error) {
      if (error instanceof JsonWebTokenError) throw new Error()
      throw error
    }
  }
}
