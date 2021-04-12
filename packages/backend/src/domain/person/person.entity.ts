//import { ICommand } from 'kill-event-sourcing'
//import { v4 } from 'uuid'
//import { Entity } from '~/common/helpers/entity'
//import { User } from './user-entity'

//export type IPerson = {
//  id: string
//  user: User
//  firstName: string
//  lastName: string
//  registration: string
//}

//export class Person extends Entity<IPerson> {
//  constructor(props: IPerson) {
//    super(props)
//  }
//  public static create(command: ICreatePersonCommand): Person {}
//}

////export class CreateTeachCommand implements ICommand {
////  constructor(
////    public firstName: string,
////    public lastName: string,
////    public registration: string,
////    public salary: number,
////    public hourPrice: number,
////    public login: string,
////    public password: string,
////  ) {}
////}

////export class CreateStudentCommand implements ICommand {
////  constructor(
////    public firstName: string,
////    public lastName: string,
////    public registration: string,
////    public login: string,
////    public password: string,
////  ) {}
////}

////export class Teacher extends Entity<PersonID> implements IPerson  {
////  private readonly _firstName: string
////  private readonly _lastName: string
////  private readonly _registration: string
////  private readonly _salary: number
////  private readonly _hourPrice: number
////  private readonly _user: User

////  private constructor(
////    firstName: string,
////    lastName: string,
////    registration: string,
////    salary: number,
////    hourPrice: number,
////    user: User,
////    _id?: PersonID,
////  ) {
////    super(_id || new PersonID(v4()))
////    this._firstName = firstName
////    this._lastName = lastName
////    this._registration = registration
////    this._user = user
////    this._hourPrice = hourPrice
////    this._salary = salary
////  }

////  public static CreateNew(cmd: CreateTeachCommand) {
////    const account = User.CreateNew(cmd.login, cmd.password)
////    return new Teacher(
////      cmd.firstName,
////      cmd.lastName,
////      cmd.registration,
////      cmd.salary,
////      cmd.hourPrice,
////      account,
////    )
////  }

////  get firstName() {
////    return this._firstName
////  }
////  get lastName() {
////    return this._lastName
////  }
////  get registration() {
////    return this._registration
////  }
////  get salary() {
////    return this._salary
////  }
////  get hourPrice() {
////    return this._hourPrice
////  }
////  get user() {
////    return this._user
////  }
////}

////export class Student extends Entity<PersonID> implements IPerson {
////  private readonly _firstName: string
////  private readonly _lastName: string
////  private readonly _registration: string
////  private readonly _user: User

////  private constructor(
////    firstName: string,
////    lastName: string,
////    registration: string,
////    user: User,
////    _id?: PersonID,
////  ) {
////    super(_id || new PersonID(v4()))
////    this._firstName = firstName
////    this._lastName = lastName
////    this._registration = registration
////    this._user = user
////  }

////  public static CreateNew(cmd: CreateStudentCommand) {
////    const account = User.CreateNew(cmd.login, cmd.password)
////    return new Student(cmd.firstName, cmd.lastName, cmd.registration, account)
////  }

////  get user() {
////    return this._user
////  }
////  get firstName() {
////    return this._firstName
////  }
////  get lastName() {
////    return this._lastName
////  }
////  get registration() {
////    return this._registration
////  }
////}

////export class User {
////  private _login: string
////  private _password: string

////  private constructor(_login: string, _password: string) {
////    this._login = _login
////    this._password = _password
////  }

////  public static CreateNew(login: string, password: string) {
////    return new User(login, password)
////  }
////}
