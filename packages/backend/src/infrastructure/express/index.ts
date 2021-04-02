import { config } from '../database/config'
import { Connection } from '../database/connection'
import app from './setup/app'

const port = process.env.port || 8080

Connection.connect(config)
  .then(async () => {
    app.listen(port, () =>
      console.log(`Server running at http://localhost:${port}`),
    )
  })
  .catch(console.error)
