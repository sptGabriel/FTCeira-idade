import { container } from 'tsyringe'
import { Either, left, right } from '~/shared/core/either'
import { BaseError } from '~/application/errors/base-app.error'
import { IController } from '~/shared/ports/controller'
import { RequestModel } from '~/shared/ports/request-model'
import { IResponseHandler } from '~/shared/ports/response-handler'
import { IResponseModel } from '~/shared/ports/response-model'
import { validateDTO } from '~/shared/utils/validateSchema.helper'
import { CreateCourseHandler } from '~/application/useCases/createCourse/create-course.handler'
import { CreateCourseDTO } from '~/application/dtos/create-course.dto'
import { CreateCourseSchema } from '~/application/schemas/create-course.schema'

export class CreateCourseController implements IController {
  constructor(private readonly presenter: IResponseHandler) {}

  public async handle(
    req: RequestModel<CreateCourseDTO>,
  ): Promise<Either<BaseError, IResponseModel<any>>> {
    const useCase = container.resolve(CreateCourseHandler)
    const dto = req.body as CreateCourseDTO
    const validate = validateDTO(dto, CreateCourseSchema, 'course')
    if (validate) return left(validate)
    await useCase.execute({...dto, media: req.file.filename})
    return right(await this.presenter.response())
  }
}
