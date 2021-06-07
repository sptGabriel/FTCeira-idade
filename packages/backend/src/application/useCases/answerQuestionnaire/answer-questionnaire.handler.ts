import { inject, injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import User from '~/modules/person/domain/user.entity'
import { AnswerDTO } from '~/application/dtos/answer-questionnaire.dto'
import { BadRequestERROR } from '~/application/errors/bad-request.error'
import Question from '~/modules/questionnaire/domain/question.entity'
import Questionnaire from '~/modules/questionnaire/domain/questionnaire.entity'
import QuestionnaireAnswer from '~/modules/questionnaire/domain/questionnaire-answer.entity'
import Answer from '~/modules/questionnaire/domain/answer.entity'
import Registration from '~/modules/person/domain/registration.entity'
import { In } from 'typeorm'

@injectable()
export class AnswerQuestionnaireHandler {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {}

  get userRepository() {
    return this.transactionalRepo.getRepository(User)
  }
  get questionRepository() {
    return this.transactionalRepo.getRepository(Question)
  }
  get questionnaireRepository() {
    return this.transactionalRepo.getRepository(Questionnaire)
  }
  get answerRepository() {
    return this.transactionalRepo.getRepository(Answer)
  }
  get userAnswerRepository() {
    return this.transactionalRepo.getRepository(QuestionnaireAnswer)
  }

  get registrationRepository() {
    return this.transactionalRepo.getRepository(Registration)
  }

  async execute(userId: string, dto: AnswerDTO): Promise<any> {
    if (!dto.questionnaireId && dto.answers && dto.answers.length < 1) {
      throw new BadRequestERROR({ message: `Invalid Operation` })
    }
    const { questionnaireId, answers } = dto
    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user) throw new BadRequestERROR({ message: `User doesnt exist` })
    const questionnaire = await this.questionnaireRepository.findOne({
      relations: ['questions', 'course'],
      where: { id: questionnaireId },
    })
    if (!questionnaire) {
      throw new BadRequestERROR({ message: `Questionnaire doesnt exist` })
    }
    const classes = await questionnaire.course.classes
    const classedIds = classes.map((cl) => cl.id)
    const isRegistered = await this.registrationRepository.findOne({
      where: {
        student: { id: user.id },
        class: In(classedIds),
        approved: true,
      },
    })
    if (!isRegistered) {
      throw new BadRequestERROR({
        message: `User not registered in the course`,
      })
    }
    const hasAnswer = await this.userAnswerRepository.findOne({
      where: { student: user.person, questionnaire },
    })
    if (hasAnswer) {
      throw new BadRequestERROR({ message: `Already answered questionnaire` })
    }
    const userAnswer = new QuestionnaireAnswer()
    userAnswer.student = user.person
    userAnswer.questionnaire = questionnaire
    userAnswer.answers = []
    for (const res of answers) {
      const answer = new Answer()
      const has = questionnaire.questions.find((i) => i.id === res.questionId)
      if (has) {
        answer.answerNumeric = res.answerNumeric
        answer.answerText = res.answerText
        answer.question = has
        userAnswer.answers.push(answer)
      }
    }
    if (userAnswer.answers.length < questionnaire.answers.length) {
      throw new BadRequestERROR({ message: `Invalid Operations` })
    }
    await this.userAnswerRepository.save(userAnswer)
  }
}
