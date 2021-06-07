import { string } from 'joi'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm'
import { v4 } from 'uuid'
import Person from '~/modules/person/domain/person.entity'
import Answer from './answer.entity'
import Questionnaire from './questionnaire.entity'

@Entity()
export default class QuestionnaireAnswer {
  constructor() {
    if (!this.id) this.id = v4()
  }

  @PrimaryColumn()
  public readonly id: string
  @ManyToOne(() => Questionnaire,(questionnaire) => questionnaire.answers)
  public questionnaire: Questionnaire
  @ManyToOne(() => Person,(person) => person.answers)
  public student: Person
  //@OneToMany(() => Answer, (qa) => qa.userAnswer, {
  //  cascade: ['insert', 'update'],
  //})
  //public answers: Answer[]
  @Column({
    type: 'jsonb',
    array: true,
    default: () => "'[]'",
    nullable: false,
  })
  @Column('jsonb',{ nullable: false })
  public answer!: Array<{
    questionId: string,
    answerText?: string,
    answerNumeric?: number
  }>;
}
