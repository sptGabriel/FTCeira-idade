import { GetQuestionnairesController } from '~/modules/questionnaire/ui/get-questionnaires.controller'
import { SuccessResponse } from '~/shared/responses/sucess-response'

export const makeGetQuestionnairesControllerFactory = () => {
  const sucess = new SuccessResponse()
  return new GetQuestionnairesController(sucess)
}
