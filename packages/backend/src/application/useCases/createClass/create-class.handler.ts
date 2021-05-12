import { inject, injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import Course from '~/modules/course/domain/course.entity'
import { CreateClassDTO } from '~/application/dtos/create-class.dto'
import { ConflictERROR } from '~/application/errors/conflict.error'
import { BadRequestERROR } from '~/application/errors/bad-request.error'
import Class from '~/modules/course/domain/class.entity'

@injectable()
export class CreateClassHandler {
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

  get classRepository() {
    return this.transactionalRepo.getRepository(Class)
  }

  private validateDate(startDate: Date, endDate: Date): boolean {
    const _startDate = new Date(startDate)
    const _endDate = new Date(endDate)
    return _startDate > _endDate ? false : true
  }

  async execute(dto: CreateClassDTO): Promise<any> {
    const { cod, courseId, endDate, max, shift, startDate } = dto
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
    })
    if (!course) throw new BadRequestERROR({ message: `Course doesn't exists` })
    const hasClass = await this.classRepository.findOne({ where: { cod } })
    if (hasClass) throw new ConflictERROR(`Class already exists`)
    const validDate = this.validateDate(startDate, endDate)
    if (!validDate) throw new BadRequestERROR({ message: `Invalid date` })
    const newClass = this.classRepository.create({
      cod,
      course,
      max,
      shift,
      startDate,
      endDate,
    })
    await this.classRepository.save(newClass)
  }
}
