import {
  Column,
  Db,
  Entity,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { v4 } from 'uuid'
import User from './user.entity'

export enum PersonRole {
  TEACHER = 'teacher',
  COORDINATOR = 'coordinator',
  STUDENT = 'student',
}

@Entity()
export default class Person {
  constructor() {
    if (!this.id) this.id = v4()
  }

  @PrimaryColumn()
  public readonly id: string
  @Column({ name: 'first_name', nullable: false })
  public firstName: string
  @Column({ name: 'last_name', nullable: false })
  public lastName: string
  @Column({ name: 'cpf', nullable: false })
  public cpf: string
  @Column({ name: 'birth_data', nullable: false })
  public birthDate: Date
  @Column()
  public phone: string
  @Column({
    type: 'enum',
    enum: PersonRole,
    default: PersonRole.STUDENT,
  })
  public role: string
  @OneToOne(() => User, (user) => user.person)
  user!: User
}
