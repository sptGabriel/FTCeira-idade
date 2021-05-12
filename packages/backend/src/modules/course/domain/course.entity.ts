import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { v4 } from 'uuid'
import Questionnaire from '~/modules/questionnaire/domain/questionnaire.entity'
import Class from './class.entity'


export enum CURSOS_IES {
  SI = 'sistemas',
  ADM = 'administração ',
  DIR = 'direito',
}

@Entity()
export default class Course {
  constructor() {
    if (!this.id) this.id = v4()
  }

  @PrimaryColumn()
  public readonly id: string
  @Column()
  public name: string
  @Column()
  public description: string
  @Column()
  public tittle: string
  @Column({ default: true })
  public active: boolean
  @Column({
    type: 'enum',
    enum: CURSOS_IES,
    nullable: false,
    name: 'ies_course',
  })
  public iesCourse: string
  @OneToMany(() => Class, (_class) => _class.course, {eager: true})
  classes: Class[]
  @OneToMany(() => Questionnaire, questionnares => questionnares.course)
  questionnaires: Questionnaire[]
  //@OneToMany(() => Registration, registration => registration.course)
  //registrations: Registration[]
}
