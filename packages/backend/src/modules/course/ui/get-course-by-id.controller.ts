import { container } from 'tsyringe'
import { Either, right } from '~/shared/core/either'
import { BaseError } from '~/application/errors/base-app.error'
import { IController } from '~/shared/ports/controller'
import { RequestModel } from '~/shared/ports/request-model'
import { IResponseHandler } from '~/shared/ports/response-handler'
import { IResponseModel } from '~/shared/ports/response-model'
import Person from '../../../modules/person/domain/person.entity'
import { GetCourseByID } from '~/application/useCases/getCourse/get-course-by-id.handler'
import Course from '../domain/course.entity'
import { BadRequestERROR } from '~/application/errors/bad-request.error'

export class GetCourseByIDController implements IController {
  constructor(
    private readonly presenter: IResponseHandler<Course>,
  ) {}

  public async handle(
    req: RequestModel,
  ): Promise<Either<BaseError, IResponseModel<Person>>> {
		const useCase = container.resolve(GetCourseByID)
    const userId = req.userId
    if (!userId) throw new Error('Unauthorized')
    if(!req.body.courseId) throw new BadRequestERROR()
    const result = await useCase.execute(req.body.courseId)
    return right(await this.presenter.response(result))
  }
}
