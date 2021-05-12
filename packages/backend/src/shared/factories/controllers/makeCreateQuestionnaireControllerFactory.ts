import { CreateQuestionnaireController } from '~/modules/questionnaire/ui/create-questionnaire.controller'
import { SuccessResponse } from '~/shared/responses/sucess-response'

export const makeCreateQuestionnaireControllerFactory = () => {
  const sucessPresenter = new SuccessResponse()
  return new CreateQuestionnaireController(sucessPresenter)
}
