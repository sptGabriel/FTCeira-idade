import { CreatePersonDTO } from '~/application/dtos/create-person.dto'
import { IController } from '~/application/ports/controller'
import { RequestModel } from '~/application/ports/request-model'
import { IMediator } from '~/shared/core/mediator'

export class CreatePersonController implements IController {
  constructor(private readonly _mediator: IMediator) {}

  public async handle(_req: RequestModel<CreatePersonDTO>): Promise<any> {
    //const command = new CreatePersonCommand(req.body as CreatePersonDTO)
    //const result = await this._mediator.publish(command)
    //console.log(result, 'hu')
  }
}
