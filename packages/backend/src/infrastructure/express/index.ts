import { config } from '../db/config'
import { Connection } from '../db/connection'
import app from './setup/app'

const port = process.env.port || 8080

Connection.connect(config)
  .then(async () => {
    app.listen(port, () =>
      console.log(`Server running at http://localhost:${port}`),
    )
  })
  .catch(console.error)
