import { ConnectionOptions } from 'typeorm';
import Person from './src/modules/person/domain/person.entity';
import Teacher from './src/modules/teacher/domain/teacher.entity';
import User from './src/modules/person/domain/user.entity';
const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'build/src';
// rootDir + '/modules/**/infra/entities/*.{js,ts}'
const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PWD,
  database: process.env.PGDB_NAME,
  entities: [Person, Teacher, User],
  migrations: [rootDir + '/shared/infra/database/migrations/**/*.{js,ts}'],
  cli: {
    migrationsDir: `${rootDir}/shared/infra/database/migrations`,
  },
  synchronize: true,
  logging: true,
};

export = config;