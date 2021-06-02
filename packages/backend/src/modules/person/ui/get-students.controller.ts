import { container } from 'tsyringe'
import { Either, right } from '~/shared/core/either'
import { BaseError } from '~/application/errors/base-app.error'
import { IController } from '~/shared/ports/controller'
import { RequestModel } from '~/shared/ports/request-model'
import { IResponseHandler } from '~/shared/ports/response-handler'
import { IResponseModel } from '~/shared/ports/response-model'
import Person from '../../../modules/person/domain/person.entity'
import { GetAllStudents } from '~/application/useCases/getStudent/get-students.handler'

export class GetStudentsController implements IController {
  constructor(
    private readonly presenter: IResponseHandler<Person[]>,
  ) {}

  public async handle(
    req: RequestModel,
  ): Promise<Either<BaseError, IResponseModel<Person[]>>> {
		const useCase = container.resolve(GetAllStudents)
    const userId = req.userId
    if (!userId) throw new Error('Unauthorized')
    const result = await useCase.execute()
    return right(await this.presenter.response(result))
  }
}
