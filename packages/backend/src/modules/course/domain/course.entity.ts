import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { v4 } from 'uuid'
import Questionnaire from '~/modules/questionnaire/domain/questionnaire.entity'
import Class from './class.entity'
import CourseHasTeachers from './classes-has-teachers.entity'

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
  @Column({ nullable: true })
  public media: string
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
  @OneToMany(() => Class, (_class) => _class.course)
  public classes: Class[]
  @OneToMany(() => Questionnaire, (questionnares) => questionnares.course)
  public questionnaires: Questionnaire[]
  @OneToMany(() => CourseHasTeachers, (cht) => cht.course)
  public teachers: CourseHasTeachers[]
  //@OneToMany(() => Registration, registration => registration.course)
  //registrations: Registration[]
  public toJson() {
    return {
      id: this.id,
      description: this.description,
      tittle: this.tittle,
      category: this.iesCourse,
      media: this.media,
      students:
        this.classes.length > 0
          ? this.classes
              .map((cl) => cl.toJson().students)
              .reduce((s, c) => s + c)
          : 0,
    }
  }
}
