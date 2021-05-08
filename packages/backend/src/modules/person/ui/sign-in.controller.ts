import { container } from 'tsyringe'
import { Either, left, right } from '~/shared/core/either'
import { IUnitOfWork } from '~/shared/core/uow/unit-of-work'
import { BaseError } from '~/application/errors/base-app.error'
import { IController } from '~/shared/ports/controller'
import { RequestModel } from '~/shared/ports/request-model'
import { IResponseHandler } from '~/shared/ports/response-handler'
import { IResponseModel } from '~/shared/ports/response-model'
import { validateDTO } from '~/shared/utils/validateSchema.helper'
import Person from '../../../modules/person/domain/person.entity'

import { CreatePersonHandler } from '~/application/useCases/createPerson/create-person.handler'
import { CreatePersonDTO } from '~/application/dtos/create-person.dto'
import { ISignInDTO } from '~/application/dtos/sign-in.dto'
import { CredentialsSchema } from '~/application/schemas/credentials.schema'
import { SiginHandler } from '~/application/useCases/signin/sign-in.handler'

export class SignInController implements IController {
  constructor(
    private readonly useCase: SiginHandler,
    private readonly presenter: IResponseHandler<{ token: string }>,
  ) {}

  public async handle(
    req: RequestModel<ISignInDTO>,
  ): Promise<Either<BaseError, IResponseModel<Person>>> {
    const dto = req.body as ISignInDTO
    const validate = validateDTO(dto, CredentialsSchema, 'user')
    if (validate) return left(validate)
    const result = await this.useCase.execute(dto)
    return right(await this.presenter.response(result))
  }
}
