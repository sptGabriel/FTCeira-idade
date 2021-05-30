import { Column, CreateDateColumn, Entity, ManyToOne, UpdateDateColumn } from "typeorm"
import Class from "~/modules/course/domain/class.entity";
import Person from "~/modules/person/domain/person.entity";
import User from "./user.entity";

@Entity()
export default class Registration {

	@ManyToOne(() => User, user => user.registrations, {primary: true})
  student: User;

	@ManyToOne(() => Class, _class => _class, {primary: true})
  class: Class;

	//@ManyToOne(() => Course, course => course.registrations, {primary: true})
  //course: Course;

	@Column({default: false})
	approved: boolean
	@CreateDateColumn()
  public createdAt: Date;
  @UpdateDateColumn()
  public updatedAt: Date;
}