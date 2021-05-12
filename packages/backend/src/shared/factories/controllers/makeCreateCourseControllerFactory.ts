import { CreateCourseController } from '~/modules/course/ui/create-course.controller'
import { CreatedResponse } from '~/shared/responses/created-response'

export const makeCreateCourseControllerFactory = () => {
  const createdCoursePresenter = new CreatedResponse()
  return new CreateCourseController(createdCoursePresenter)
}
