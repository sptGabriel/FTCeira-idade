import Person from '~/modules/person/domain/person.entity'
import { GetCoordinatorsController } from '~/modules/person/ui/get-coordinators.controller'
import { SuccessResponse } from '../../responses/sucess-response'


export const makeGetCoordinatorsControllerFactory = () => {
  const sucessPresenter = new SuccessResponse<Person[]>()
  return new GetCoordinatorsController(sucessPresenter)
}
