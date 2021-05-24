import { container } from 'tsyringe'
import { Either, right } from '~/shared/core/either'
import { BaseError } from '~/application/errors/base-app.error'
import { IController } from '~/shared/ports/controller'
import { RequestModel } from '~/shared/ports/request-model'
import { IResponseHandler } from '~/shared/ports/response-handler'
import { IResponseModel } from '~/shared/ports/response-model'
import { GetAllClasses } from '~/application/useCases/getClass/get-all-class.handler'

export class GetAllClassRoomController implements IController {
  constructor(private readonly presenter: IResponseHandler) {}

  public async handle(
    req: RequestModel
  ): Promise<Either<BaseError, IResponseModel<any>>> {
    const useCase = container.resolve(GetAllClasses)
    const result = await useCase.execute()
    return right(await this.presenter.response(result))
  }
}
