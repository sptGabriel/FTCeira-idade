import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import { CPFAlreadyExistsError } from '../../../modules/person/errors/cpf-already-exists.error'
import { PersonRepository } from '../../../modules/person/infra/repositories/person.repository'
import { CreatePersonDTO } from '~/application/dtos/create-person.dto'
import Teacher from '~/modules/teacher/domain/teacher.entity'
import User from '~/modules/person/domain/user.entity'
import { MailAlreadyExistsError } from '~/modules/person/errors/mail-already-exists.error'
import { ConflictERROR } from '~/application/errors/conflict.error'

@injectable()
export class CreatePersonHandler {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {}

  get personRepository() {
    return this.transactionalRepo.getCustomRepository(PersonRepository)
  }
  get userRepository() {
    return this.transactionalRepo.getRepository(User)
  }
  get teacherRepository() {
    return this.transactionalRepo.getRepository(Teacher)
  }
  async execute(dto: CreatePersonDTO): Promise<any> {
    const hasPerson = await this.personRepository.findByCPF(dto.cpf)
    if (hasPerson) throw new ConflictERROR('Person already exists')
    const hasMail = await this.userRepository.findOne({
      where: { email: dto.credentials.email },
    })
    if (hasMail) throw new ConflictERROR('Email already registred')
    const passwordHash = await hash(dto.credentials.password, 8)
    const person = this.personRepository.create(dto)
    const user = this.userRepository.create({
      person,
      password: passwordHash,
      email: dto.credentials.email,
    })
    await this.personRepository.save({ ...person, user })
    await this.userRepository.save(user)
  }
}
