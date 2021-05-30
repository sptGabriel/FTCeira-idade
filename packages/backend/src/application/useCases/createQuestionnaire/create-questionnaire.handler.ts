import { inject, injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import { PersonRepository } from '../../../modules/person/infra/repositories/person.repository'
import { CreateQuestionnaireDTO } from '~/application/dtos/create-questionnaire.dto'
import Course from '~/modules/course/domain/course.entity'
import { BadRequestERROR } from '~/application/errors/bad-request.error'
import Questionnaire from '~/modules/questionnaire/domain/questionnaire.entity'
import Question from '~/modules/questionnaire/domain/question.entity'
import QuestionAlternative from '~/modules/questionnaire/domain/question-alternative.entity'

@injectable()
export class CreateQuestionnaireHandler {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {}

  get personRepository() {
    return this.transactionalRepo.getCustomRepository(PersonRepository)
  }
  get questionnaireRepository() {
    return this.transactionalRepo.getRepository(Questionnaire)
  }
  get questionRepository() {
    return this.transactionalRepo.getRepository(Question)
  }
  get questionAlternativeRepository() {
    return this.transactionalRepo.getRepository(QuestionAlternative)
  }
  get courseRepository() {
    return this.transactionalRepo.getRepository(Course)
  }

  private validateDate(startDate: Date, endDate: Date): boolean {
    const _startDate = new Date(startDate)
    const _endDate = new Date(endDate)
    return _startDate > _endDate ? false : true
  }

  async execute(dto: CreateQuestionnaireDTO): Promise<any> {
    const {
      questions,
      courseId,
      endDate,
      startDate,
      name,
      value,
      description,
    } = dto
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
    })
    if (!course) throw new BadRequestERROR({ message: `Course doesn't exist` })
    const validDate = this.validateDate(startDate, endDate)
    if (!validDate) throw new BadRequestERROR({ message: `Invalid date` })
    const questionnaire = this.questionnaireRepository.create({
      course,
      name,
      endDate,
      startDate,
      description,
      isActive: true,
      value,
    })
    const Questions = questions.map((q) =>
      this.questionRepository.create({
        image: q.image,
        questioning: q.questioning,
        questionnaire,
        alternatives: q.alternatives.map((alt) =>
          this.questionAlternativeRepository.create({
            alternative: alt.alternative,
            answer: alt.answer,
          }),
        ),
      }),
    )
    await this.questionnaireRepository.save(questionnaire)
    await this.questionRepository.save(Questions)
  }
}
