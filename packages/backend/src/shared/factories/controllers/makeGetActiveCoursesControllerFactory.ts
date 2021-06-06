import Course from '~/modules/course/domain/course.entity'
import { GetAllActiveCoursesController } from '~/modules/course/ui/get-all-active-coursers.controller'
import { SuccessResponse } from '~/shared/responses/sucess-response'

export const makeGetActiveCoursesControllerFactory = () => {
  const createdClassPresenter = new SuccessResponse<Course[]>()
  return new GetAllActiveCoursesController(createdClassPresenter)
}
