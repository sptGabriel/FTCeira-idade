import { Either, right } from '~/shared/core/either'
import { BaseError } from '~/application/errors/base-app.error'
import { IController } from '~/shared/ports/controller'
import { RequestModel } from '~/shared/ports/request-model'
import { IResponseHandler } from '~/shared/ports/response-handler'
import { IResponseModel } from '~/shared/ports/response-model'
import { container } from 'tsyringe'
import { AcceptTeacherApplicationHandler } from '~/application/useCases/acceptTeacherApplication/accept-teacher-application.handler'

export class TeacherAcceptApplicationController implements IController {
  constructor(
    private readonly presenter: IResponseHandler,
  ) {}

  public async handle(
    req: RequestModel,
  ): Promise<Either<BaseError, IResponseModel<any>>> {
    const useCase = container.resolve(AcceptTeacherApplicationHandler)
    const dto = req.params as {courseId: string, userId: string}
    const result = await useCase.execute(dto.userId, dto.courseId)
    return right(await this.presenter.response(result))
  }
}
