import 'reflect-metadata'
import '~/infrastructure/containers'
import { container } from 'tsyringe'
import { IConnection } from '~/shared/core/interfaces/connection'
import app from './setup/app'

const port = process.env.port || 8080
const db = container.resolve<IConnection>('Database')
db.connect()
  .then(async () => {
    app.listen(port, () =>
      console.log(`Server running at http://localhost:${port}`),
    )
  })
  .catch(console.error)
