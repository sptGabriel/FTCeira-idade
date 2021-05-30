import Course from '~/modules/course/domain/course.entity'
import { GetAllCoursesController } from '~/modules/course/ui/get-all-coursers.controller'
import { CreatedResponse } from '../../responses/created-response'

export const makeGetCoursesControllerFactory = () => {
  const createdClassPresenter = new CreatedResponse<Course[]>()
  return new GetAllCoursesController(createdClassPresenter)
}
