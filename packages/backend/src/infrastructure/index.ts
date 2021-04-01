import { config } from './db/config'
import { Connection } from './db/connection'
import { SetupExpress } from './express/server'

async function startServer () {
  try {
    await Connection.connect(config)
    SetupExpress()
  } catch (error) {
    throw error
  }
}

export default startServer()