import { CreatePersonDTO } from '~/application/dtos/create-person.dto'
import { BaseError } from '~/application/errors/base-app.error'
import { UnprocessableERROR } from '~/application/errors/unprocessable-entity.error'
import { IController } from '~/application/ports/controller'
import { RequestModel } from '~/application/ports/request-model'
import { IResponseHandler } from '~/application/ports/response-handler'
import { IResponseModel } from '~/application/ports/response-model'
import { Either, hasErrors, left, right } from '~/common/helpers/either-helper'
import { CreatePersonCommand } from '~/domain/person/commands/create-person.command'
import { Person } from '~/domain/person/entities/person.aggregrate'
import { Credentials } from '~/domain/person/value-objects/person-credentials.value-object'
import { PersonEmail } from '~/domain/person/value-objects/person-email.value-object'
import { PersonName } from '~/domain/person/value-objects/person-name.value-object'
import { IMediator } from '~/shared/core/mediator'

export class CreatePersonController implements IController {
  constructor(
    private readonly _mediator: IMediator,
    private readonly presenter: IResponseHandler<Person>,
  ) {}

  public async handle(
    req: RequestModel<CreatePersonDTO>,
  ): Promise<Either<BaseError, IResponseModel<Person>>> {
    const {
      email,
      password,
      login,
      lastName,
      firstName,
    } = req.body as CreatePersonDTO
    const emailOrError = PersonEmail.build(email)
    const nameOrError = PersonName.build({ firstName, lastName })
    const credentialsOrError = Credentials.build({ login, password })
    const guard = hasErrors([emailOrError, nameOrError, credentialsOrError])
    if (guard) return left(new UnprocessableERROR('person', guard))
    const command = new CreatePersonCommand(
      nameOrError.value as PersonName,
      emailOrError.value as PersonEmail,
      credentialsOrError.value as Credentials,
    )
    const result: any = await this._mediator.publish(command)
    return result.isRight()
      ? right(await this.presenter.response(result.value))
      : result
  }
}
