import { inject, injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import User from '~/modules/person/domain/user.entity'
import { BadRequestERROR } from '~/application/errors/bad-request.error'
import Person from '~/modules/person/domain/person.entity'
import { AdminEditProfileDTO } from '~/application/dtos/edit-profile.dto'


@injectable()
export class AdminEditProfileHandler {
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

  async execute(id: string, dto: AdminEditProfileDTO): Promise<any> {
    const { birthDate, firstName, lastName, phone, email, cpf  } = dto
		if(!birthDate && !firstName && !lastName && !phone && !email && !cpf) {
			throw new BadRequestERROR({ message: `Invalid Operation` })
		}
    const person = await this.userRepository.findOne({ where: { id } })
    if (!person) throw new BadRequestERROR({ message: `This user not exist` })
		const BirthDate = birthDate ? this.validBirthDate(birthDate) : false
		if(!BirthDate) throw new BadRequestERROR({ message: `Invalid Date` })
		if(firstName) person.person.firstName = firstName
		if(lastName) person.person.lastName = lastName
		if(phone) person.person.phone = phone
		if(birthDate) person.person.birthDate = birthDate
		if(email) person.email = email
    if(cpf) person.person.cpf = cpf
		await this.userRepository.save(person)
  }
}
