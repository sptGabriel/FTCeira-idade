import { inject } from 'tsyringe'
import { BadRequestERROR } from '~/application/errors/bad-request.error'
import QuestionnaireAnswer from '~/modules/questionnaire/domain/questionnaire-answer.entity'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'

export class GetStudentAnswerByID {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {}

  get questionnaireAnswersRepository() {
    return this.transactionalRepo.getRepository(QuestionnaireAnswer)
  }

  async execute(userId: string, questionnaireId: string): Promise<any> {
    const answers = await this.questionnaireAnswersRepository.findOne({
      relations: ['student', 'answers', 'questionnaire'],
      where: {
        student: { id: userId },
        questionnaire: { id: questionnaireId },
      },
    })
    if (!answers) {
      throw new BadRequestERROR({
        message: 'Student answers on this questionnaire not found',
      })
    }
    return answers
  }
}
