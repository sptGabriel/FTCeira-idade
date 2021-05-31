import { Either, left, right } from '~/shared/core/either'
import { BaseError } from '~/application/errors/base-app.error'
import { IController } from '~/shared/ports/controller'
import { RequestModel } from '~/shared/ports/request-model'
import { IResponseHandler } from '~/shared/ports/response-handler'
import { IResponseModel } from '~/shared/ports/response-model'
import { StudentApplyInCourseDTO } from '~/application/dtos/student-apply-in-course.dto'
import { validateDTO } from '~/shared/utils/validateSchema.helper'
import { StudentApplyInCourseSchema } from '~/application/schemas/student-apply-in-course.schema'
import { StudentApplyInCourseHandler } from '~/application/useCases/studentApplyInCourse/student-apply-in-course.handler'
import { container } from 'tsyringe'

export class StudentApplyInCourseController implements IController {
  constructor(
    private readonly presenter: IResponseHandler,
  ) {}

  public async handle(
    req: RequestModel<StudentApplyInCourseDTO>,
  ): Promise<Either<BaseError, IResponseModel<any>>> {
    const useCase = container.resolve(StudentApplyInCourseHandler)
    const userId = req.userId
    if (!userId) throw new Error('Unauthorized')
    const dto = req.params as StudentApplyInCourseDTO
    const validate = validateDTO(
      dto,
      StudentApplyInCourseSchema,
      'course',
    )
    if (validate) return left(validate)
    const result = await useCase.execute(userId, dto.classId)
    return right(await this.presenter.response(result))
  }
}
