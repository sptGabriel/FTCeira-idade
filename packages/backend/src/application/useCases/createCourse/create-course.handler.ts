import { inject, injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import { CreateCourseDTO } from '~/application/dtos/create-course.dto'
import Course from '~/modules/course/domain/course.entity'
import { ConflictERROR } from '~/application/errors/conflict.error'

@injectable()
export class CreateCourseHandler {
  public get transactionalRepo(): TransactionalRepository {
    return this._transactionalRepo
  }
  public set transactionalRepo(value: TransactionalRepository) {
    this._transactionalRepo = value
  }
  constructor(
    @inject(TransactionalRepository)
    private _transactionalRepo: TransactionalRepository,
  ) {}

  get courseRepository() {
    return this.transactionalRepo.getRepository(Course)
  }

  async execute(dto: CreateCourseDTO): Promise<any> {
    const { description, name, iesCourse, tittle } = dto
    const hasCourse = await this.courseRepository.findOne({where:{name}})
    if(hasCourse) throw new ConflictERROR(`Course already exists`)
    const course = await this.courseRepository.create({
      description,
      name,
      tittle,
      iesCourse,
    })
    await this.courseRepository.save(course)
  }
}
