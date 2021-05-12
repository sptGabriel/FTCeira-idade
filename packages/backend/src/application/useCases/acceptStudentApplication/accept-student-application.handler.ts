import { inject, injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import User from '~/modules/person/domain/user.entity'
import { BadRequestERROR } from '~/application/errors/bad-request.error'
import Registration from '~/modules/person/domain/registration.entity'
import Class from '~/modules/course/domain/class.entity'
import Course from '~/modules/course/domain/course.entity'
import { In, Raw } from 'typeorm'

@injectable()
export class AcceptStudentApplicationHandler {
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
  get courseRepository() {
    return this.transactionalRepo.getRepository(Course)
  }
  get registrationRepository() {
    return this.transactionalRepo.getRepository(Registration)
  }

  async execute(userId: string, classId: string, courseId: string): Promise<any> {
    const classe = await this.classRepository.findOne({
      where: { id: classId },
    })
    if (!classe) throw new BadRequestERROR({ message: `Classe doesnt exists` })
    const hasReg = await this.registrationRepository.findOne({
      where: {
        student: { id: userId },
        class: classId,
      },
    })
    if (classe.current >= classe.max) {
      await this.registrationRepository.delete({
        student: hasReg?.student,
        class: hasReg?.class,
      })
      throw new BadRequestERROR({ message: `Class full` })
    }
    if (!hasReg) {
      throw new BadRequestERROR({
        message: `There is no user application for this course`,
      })
    }
    if (hasReg.approved) {
      throw new BadRequestERROR({ message: `Already approved` })
    }
    await this.registrationRepository.update(hasReg, { approved: true })
    await this.classRepository
      .createQueryBuilder('class')
      .update(Class)
      .whereInIds(classe.id)
      .set({ current: () => 'current + 1' })
      .execute()
  }
}
