import { Column, Entity, ManyToOne } from "typeorm"
import Person from "~/modules/person/domain/person.entity"
import Course from "./course.entity"

@Entity()
export default class CourseHasTeachers {
  @ManyToOne(() => Course, (course) => course.teachers, {primary: true})
  course: Course
	@ManyToOne(() => Person, (person) => person.teachers, {primary: true})
  teacher: Person
	@Column({default: false})
	approved: boolean
}
