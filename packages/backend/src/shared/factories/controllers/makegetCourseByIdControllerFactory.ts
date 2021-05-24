import Course from '~/modules/course/domain/course.entity'
import { GetCourseByIDController } from '~/modules/course/ui/get-course-by-id.controller'
import { SuccessResponse } from '../../responses/sucess-response'


export const makeGetCourseByIdControllerFactory = () => {
  const sucessPresenter = new SuccessResponse<Course>()
  return new GetCourseByIDController(sucessPresenter)
}
