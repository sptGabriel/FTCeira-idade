import { GetNotAnsweredQuestionnairesController } from '~/modules/questionnaire/ui/get-no-answered-questionnaires.controller'
import { SuccessResponse } from '~/shared/responses/sucess-response'

export const makeGetNotAnsweredQuestionnairesControllerFactory = () => {
  const sucess = new SuccessResponse()
  return new GetNotAnsweredQuestionnairesController(sucess)
}
