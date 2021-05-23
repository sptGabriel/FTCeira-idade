import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import Question from './question.entity'
import QuestionnaireAnswer from './questionnaire-answer.entity'

@Entity()
export default class Answer {
  @ManyToOne(() => QuestionnaireAnswer, (qa) => qa.answers, { primary: true })
  public userAnswer: QuestionnaireAnswer
  @ManyToOne(() => Question, (qa) => qa.answer, { primary: true })
  question: Question
  @Column({ nullable: true })
  public answerNumeric?: number
  @Column({ nullable: true })
  public answerText?: string
}
