import { ConnectionOptions } from 'typeorm'
import Person from './src/modules/person/domain/person.entity'
import User from './src/modules/person/domain/user.entity'
import Class from './src/modules/course/domain/class.entity'
import Questionnaire from './src/modules/questionnaire/domain/questionnaire.entity'
import Question from './src/modules/questionnaire/domain/question.entity'
import Registration from './src/modules/person/domain/registration.entity'
import Course from './src/modules/course/domain/course.entity'
import QuestionAlternative from './src/modules/questionnaire/domain/question-alternative.entity'
import QuestionnaireAnswer from './src/modules/questionnaire/domain/questionnaire-answer.entity'
import Answer from './src/modules/questionnaire/domain/answer.entity'
import CourseHasTeachers from './src/modules/course/domain/classes-has-teachers.entity'
const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'build/src'
// rootDir + '/modules/**/infra/entities/*.{js,ts}'
const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PWD,
  database: process.env.PGDB_NAME,
  entities: [
    Person,
    User,
    Class,
    Course,
    Question,
    Questionnaire,
    QuestionAlternative,
    QuestionnaireAnswer,
    Answer,
    Registration,
    CourseHasTeachers
  ],
  migrations: [rootDir + '/shared/infra/database/migrations/**/*.{js,ts}'],
  cli: {
    migrationsDir: `${rootDir}/shared/infra/database/migrations`,
  },
  synchronize: true,
  logging: true,
}

export = config
