import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { v4 } from 'uuid'
import Person from '~/modules/person/domain/person.entity'

@Entity()
export default class User {
  constructor() {
    if (!this.id) this.id = v4()
  }

  @PrimaryColumn()
  public readonly id: string
  @OneToOne(() => Person, { eager: true, cascade: ['update'] })
  @JoinColumn()
  person: Person
  @Column()
  public email: string
  @Column()
  public password: string
  @Column({ nullable: true })
  public avatar: string
  //@Column({ nullable: true })
  //public deletedAt: Date

  public toJson() {
    return {
      id: this.id, 
      email: this.email,
      avatar: this.avatar,
      firstName: this.person.firstName,
      lastName: this.person.lastName,
      cpf: this.person.cpf,
      birthDate: this.person.birthDate,
      phone: this.person.phone,
      role: this.person.role
    }
  }
}
