import { container } from 'tsyringe'
import { Either, right } from '~/shared/core/either'
import { BaseError } from '~/application/errors/base-app.error'
import { IController } from '~/shared/ports/controller'
import { RequestModel } from '~/shared/ports/request-model'
import { IResponseHandler } from '~/shared/ports/response-handler'
import { IResponseModel } from '~/shared/ports/response-model'
import Course from '../domain/course.entity'
import { GetAllActiveCourses } from '~/application/useCases/getCourse/get-all-active-courses.handler'

export class GetAllActiveCoursesController implements IController {
  constructor(private readonly presenter: IResponseHandler<Course[]>) {}

  public async handle(
    req: RequestModel
  ): Promise<Either<BaseError, IResponseModel<Course[]>>> {
    const useCase = container.resolve(GetAllActiveCourses)
    const result = await useCase.execute()
    return right(await this.presenter.response(result))
  }
}
