import Person from '../domain/person.entity'
import { CreatePersonDTO } from '../../../application/useCases/createPerson/create-person.dto'

export interface IPersonRepository {
  findByCPF(email: string): Promise<Person | undefined>
  findById(id: string): Promise<Person | undefined>
}
