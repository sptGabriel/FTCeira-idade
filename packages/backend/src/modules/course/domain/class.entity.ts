import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { v4 } from 'uuid'
import Course from '~/modules/course/domain/course.entity'
import Registration from '~/modules/person/domain/registration.entity'

export enum Shift {
  MAT = 'matutino',
  VESP = 'vespertino',
}

@Entity()
export default class Class {
  constructor() {
    if (!this.id) this.id = v4()
  }
  @PrimaryColumn()
  public readonly id: string
  @Column()
  public cod: string
  @Column({ name: 'start_date' })
  public startDate: Date
  @Column({ name: 'end_date' })
  public endDate: Date
  @Column({
    type: 'enum',
    enum: Shift,
    nullable: false,
    default: Shift.MAT,
  })
  public shift: string
  @Column({ default: true })
  public active: boolean
  @Column({ type: 'int' })
  public max: number
  @Column({ type: 'int', default: 0 })
  public current: number
  @ManyToOne(() => Course, (course) => course.classes)
  course: Course
  @OneToMany(() => Registration, (registration) => registration.class, {
    eager: true,
  })
  registrations: Registration[]

  public toJson() {
    const registrations = this.registrations.filter((reg) => reg.approved)
    return {
      id: this.id,
      code: this.cod,
      course: this.course,
      shift: this.shift,
      students: registrations.length > 0 ? registrations.length : 0,
    }
  }
}
