import { Either, right } from '~/shared/core/either'
import { BaseError } from '~/application/errors/base-app.error'
import { IController } from '~/shared/ports/controller'
import { RequestModel } from '~/shared/ports/request-model'
import { IResponseHandler } from '~/shared/ports/response-handler'
import { IResponseModel } from '~/shared/ports/response-model'
import { container } from 'tsyringe'
import { AcceptStudentApplicationHandler } from '~/application/useCases/acceptStudentApplication/accept-student-application.handler'
import { AcceptApplyInCourseDTO } from '~/application/dtos/accept-apply-in-course.dto'

export class AcceptStudentApplicationController implements IController {
  constructor(
    private readonly presenter: IResponseHandler,
  ) {}

  public async handle(
    req: RequestModel<AcceptApplyInCourseDTO>,
  ): Promise<Either<BaseError, IResponseModel<any>>> {
    const useCase = container.resolve(AcceptStudentApplicationHandler)
    const dto = req.params as AcceptApplyInCourseDTO
    const result = await useCase.execute(dto.userId, dto.classId)
    return right(await this.presenter.response(result))
  }
}
