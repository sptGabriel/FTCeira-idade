import { EntityRepository, getRepository, Repository } from 'typeorm'
import Person from '../../domain/person.entity'
import { IPersonRepository } from '../../repositories/person.repository'
import { CreatePersonDTO } from '../../../../application/useCases/createPerson/create-person.dto'

@EntityRepository(Person)
export class PersonRepository
  extends Repository<Person>
  implements IPersonRepository {
  async findByCPF(cpf: string): Promise<Person | undefined> {
    const person = await this.findOne({ where: { cpf } })
    return person
  }

  async findById(id: string): Promise<Person | undefined> {
    const user = await this.findOne(id)
    return user
  }
}
