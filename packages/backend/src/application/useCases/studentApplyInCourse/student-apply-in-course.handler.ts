import { inject, injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import User from '~/modules/person/domain/user.entity'
import { BadRequestERROR } from '~/application/errors/bad-request.error'

import Registration from '~/modules/person/domain/registration.entity'
import Class from '~/modules/course/domain/class.entity'

@injectable()
export class StudentApplyInCourseHandler {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {}

  get userRepository() {
    return this.transactionalRepo.getRepository(User)
  }
  get classRepository() {
    return this.transactionalRepo.getRepository(Class)
  }
  get registrationRepository() {
    return this.transactionalRepo.getRepository(Registration)
  }

  async execute(id: string, classId: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) throw new BadRequestERROR({ message: `This user not exist` })
    if (user.person.role !== 'student') {
      throw new BadRequestERROR({ message: `Invalid Operation` })
    }
    const alreadyApplied = this.registrationRepository.findOne({
      where: { student: { id: user.person.id }, class: { id: classId } },
    })
    if (alreadyApplied) {
      throw new BadRequestERROR({
        message: `User already has an application for this course`,
      })
    }
    const classe = await this.classRepository.findOne({
      where: { id: classId },
    })
    if (!classe) throw new BadRequestERROR({ message: `Class doesnt exist` })
    if (classe.current === classe.max) {
      throw new BadRequestERROR({
        message: `This course has no more vacancies`,
      })
    }
    await this.registrationRepository.save({
      class: classe,
      student: user.person,
    })
  }
}
