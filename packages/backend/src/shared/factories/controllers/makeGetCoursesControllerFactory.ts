import Course from '~/modules/course/domain/course.entity'
import { GetAllCoursesController } from '~/modules/course/ui/get-all-coursers.controller'
import { SuccessResponse } from '~/shared/responses/sucess-response'

export const makeGetCoursesControllerFactory = () => {
  const createdClassPresenter = new SuccessResponse<Course[]>()
  return new GetAllCoursesController(createdClassPresenter)
}
