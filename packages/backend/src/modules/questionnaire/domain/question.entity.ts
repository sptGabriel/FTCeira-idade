import { string } from 'joi'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm'
import { v4 } from 'uuid'
import Answer from './answer.entity'
import QuestionAlternative from './question-alternative.entity'
import Questionnaire from './questionnaire.entity'

interface IAlternatives {
  answer: boolean
  alternative: string
}

export interface IQuestion {
  questioning: string
  alternatives?: IAlternatives[]
}

@Entity()
export default class Question {
  constructor() {
    if (!this.id) this.id = v4()
  }

  @PrimaryColumn()
  public readonly id: string
  @Column({ nullable: true })
  public image: string
  @Column()
  public questioning: string
  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire)
  questionnaire: Questionnaire
  @OneToMany(
    () => QuestionAlternative,
    (questionnares) => questionnares.question,
    { eager: true, cascade: ['insert', 'update'] },
  )
  public alternatives: QuestionAlternative[]
  @OneToOne(() => Answer, (answer) => answer.question)
  public answer!: Answer
}
