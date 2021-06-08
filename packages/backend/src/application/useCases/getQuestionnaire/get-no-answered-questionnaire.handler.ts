import { inject, injectable } from 'tsyringe'
import { MoreThan } from 'typeorm'
import QuestionnaireAnswer from '~/modules/questionnaire/domain/questionnaire-answer.entity'
import Questionnaire from '~/modules/questionnaire/domain/questionnaire.entity'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'

@injectable()
export class GetStudentsQuestionnaires {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {}

  get questionnaireRepository() {
    return this.transactionalRepo.getRepository(Questionnaire)
  }

  get answeredRepository() {
    return this.transactionalRepo.getRepository(QuestionnaireAnswer)
  }

  async execute(id: string): Promise<any> {
    const allQuestionnaires = await this.questionnaireRepository.find({
      relations: ['questions', 'questions.alternatives'],
      where:{endDate: MoreThan(Date.now())}
    })

    const userAnswers = await this.answeredRepository.find({where:{
      student: { id },
    }})

    const questionnaires = allQuestionnaires.filter((q) => 
    !!userAnswers.find((ans) => ans.questionnaire.id === q.id))

    return questionnaires.map((qs) => qs.toJson())
  }
}
