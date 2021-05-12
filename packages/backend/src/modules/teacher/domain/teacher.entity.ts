import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm'
import { v4 } from 'uuid'
import Person from '~/modules/person/domain/person.entity'

@Entity()
export default class Teacher {
  constructor() {
    if (!this.id) this.id = v4()
  }
  @PrimaryColumn()
  public readonly id: string
  @OneToOne(() => Person)
  @JoinColumn()
  person: Person
  @Column()
  course: string
}
