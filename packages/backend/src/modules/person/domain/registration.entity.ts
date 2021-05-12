import { Column, Entity, ManyToOne } from "typeorm"
import Class from "~/modules/course/domain/class.entity";
import Person from "~/modules/person/domain/person.entity";

@Entity()
export default class Registration {

	@ManyToOne(() => Person, person => person.registrations, {primary: true})
  student: Person;

	@ManyToOne(() => Class, _class => _class, {primary: true})
  class: Class;

	//@ManyToOne(() => Course, course => course.registrations, {primary: true})
  //course: Course;

	@Column({default: false})
	approved: boolean
}