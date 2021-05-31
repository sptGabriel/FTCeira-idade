import { inject, injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import User from '~/modules/person/domain/user.entity'
import { BadRequestERROR } from '~/application/errors/bad-request.error'
import Person from '~/modules/person/domain/person.entity'
import { EditProfileDTO } from '~/application/dtos/edit-profile.dto'

@injectable()
export class EditProfileHandler {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {}

  get userRepository() {
    return this.transactionalRepo.getRepository(User)
  }
  get personRepository() {
    return this.transactionalRepo.getRepository(Person)
  }
  public validBirthDate(birthDate: Date) {
    return birthDate > new Date() ? false : true
  }

  async execute(id: string, dto: EditProfileDTO): Promise<any> {
    const { birthDate, firstName, lastName, phone, email } = dto
    if (!birthDate && !firstName && !lastName && !phone && !email) {
      throw new BadRequestERROR({ message: `Invalid Operation` })
    }
    const student = await this.userRepository.findOne({ where: { id } })
    if (!student) throw new BadRequestERROR({ message: `This user not exist` })
    const BirthDate = birthDate ? this.validBirthDate(birthDate) : undefined
    if (BirthDate === false) {
      throw new BadRequestERROR({ message: `Invalid Date` })
    }
    if (firstName) student.person.firstName = firstName
    if (lastName) student.person.lastName = lastName
    if (phone) student.person.phone = phone
    if (birthDate) student.person.birthDate = birthDate
    if (email) student.email = email
    await this.userRepository.save(student)
  }
}
