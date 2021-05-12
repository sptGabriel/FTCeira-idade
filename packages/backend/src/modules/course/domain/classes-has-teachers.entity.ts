//import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
//import { v4 } from "uuid"
//import CourseHasClasses from "~/modules/course/domain/course-has-classes.entity"

//@Entity()
//export default class ClasseHasTeachers {
//  constructor() {
//    if (!this.id) this.id = v4()
//  }
//  @PrimaryColumn()
//  public readonly id: string
//  @Column({name: "start_date"})
//  public startDate: string
//  @Column({name: "end_date"})
//  public endDate: string
//	@Column()
//  public periodo: string
//	@Column({type: 'int'})
//  public max: number
//	@OneToMany(type => CourseHasClasses, courseClasses => courseClasses.classe)
//  courseClasses: CourseHasClasses[];
//}
