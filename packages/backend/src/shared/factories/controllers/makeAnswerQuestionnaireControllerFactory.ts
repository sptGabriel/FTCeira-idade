import { AnswerQuestionnaireController } from '~/modules/questionnaire/ui/answer-questionnaire.controller'
import { SuccessResponse } from '~/shared/responses/sucess-response'

export const makeAnswerQuestionnaireControllerFactory = () => {
  const sucessPresenter = new SuccessResponse()
  return new AnswerQuestionnaireController(sucessPresenter)
}
