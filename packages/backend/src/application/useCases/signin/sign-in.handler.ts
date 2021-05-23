import { container, inject, injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import { ISignInDTO } from '~/application/dtos/sign-in.dto'
import { IEncrypter } from '~/shared/ports/encrypter'
import { IHashComparer } from '~/shared/ports/hash-comparer'
import User from '~/modules/person/domain/user.entity'
import { BadRequestERROR } from '~/application/errors/bad-request.error'

export class SiginHandler {
  private transactionalRepo: TransactionalRepository
  constructor(
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
  ) {
    this.transactionalRepo = container.resolve(TransactionalRepository)
  }

  get userRepository() {
    return this.transactionalRepo.getRepository(User)
  }

  async execute(dto: ISignInDTO): Promise<any> {
    const { email, password } = dto
    const account = await this.userRepository.findOne({ where: { email } })
    if (!account) throw new BadRequestERROR({ message: `This user not exist` })
    const isValid = await this.hashComparer.compare(password, account.password)
    if (!isValid) throw new BadRequestERROR({ message: `Invalid Password` })
    const accessToken = await this.encrypter.encrypt(account.id)
    return { token: accessToken }
  }
}
