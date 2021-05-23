import { string } from 'joi'
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 } from 'uuid'
import Question from './question.entity'

interface IAlternatives {
  awnser: boolean
  alternative: string
}

export interface IQuestion {
  questioning: string
  alternatives?: IAlternatives[]
}

@Entity({ name: 'question_alternatives' })
export default class QuestionAlternative {
  constructor() {
    if (!this.id) this.id = v4()
  }

  @PrimaryColumn()
  public readonly id: string
  @Column()
  public answer: boolean
  @Column()
  public alternative: string
  @ManyToOne(() => Question, (question) => question.alternatives, {
    nullable: false,
  })
  public question: Question
}
