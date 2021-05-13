import { container, inject, injectable } from 'tsyringe'
import { TransactionalRepository } from '~/shared/core/uow/transactional-repo'
import { ISignInDTO } from '~/application/dtos/sign-in.dto'
import { IEncrypter } from '~/shared/ports/encrypter'
import { IHashComparer } from '~/shared/ports/hash-comparer'
import User from '~/modules/person/domain/user.entity'
import { BadRequestERROR } from '~/application/errors/bad-request.error'
import Course from '~/modules/course/domain/course.entity'

export class GetAllCourses {
  constructor(
    @inject(TransactionalRepository)
    private transactionalRepo: TransactionalRepository,
  ) {
  }

  get courseRepository() {
    return this.transactionalRepo.getRepository(Course)
  }

  async execute(): Promise<any> {
		return await this.courseRepository.find()
  }
}
