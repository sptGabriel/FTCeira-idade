import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm'
import { v4 } from 'uuid'
import QuestionnaireAnswer from '~/modules/questionnaire/domain/questionnaire-answer.entity'
import Registration from './registration.entity'
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
  public user!: User
  @OneToMany(() => Registration, (registration) => registration.student, {
    eager: true
  })
  public registrations: Registration[]
  @OneToMany(() => QuestionnaireAnswer, (qa) => qa.student, {lazy: true})
  public answers: QuestionnaireAnswer[]
}
