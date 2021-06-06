import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { v4 } from 'uuid'
import Course from '~/modules/course/domain/course.entity'
import Question from './question.entity'
import QuestionnaireAnswer from './questionnaire-answer.entity'

@Entity()
export default class Questionnaire {
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
  public startDate: Date

  @Column()
  public endDate: Date

  @Column()
  public value: number

  @Column()
  public isActive: boolean

  @OneToMany(() => Question, (question) => question.questionnaire)
  public questions: Question[]

  @OneToMany(() => QuestionnaireAnswer, (qa) => qa.student, { lazy: true })
  public answers: QuestionnaireAnswer[]

  @ManyToOne(() => Course, (course) => course.questionnaires, {eager: true})
  course: Course

  public toJson() {
    return {
      id: this.id,
      startDate: this.startDate,
      endDate: this.endDate,
      description: this.description,
      value: this.value,
      isActive: this.isActive,
      questions: this.questions.map((qs) => qs.toJson())
    }
  }
}
