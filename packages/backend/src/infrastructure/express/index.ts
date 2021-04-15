import { Logger } from '~/common/helpers/logger-helper'
import { DataContext } from '../context/data-context'

import app from './setup/app'

const port = process.env.port || 8080

DataContext.connect()
  .then(async () => {
    app.listen(port, () =>
      Logger.info(`Server running at http://localhost:${port}`),
    )
  })
  .catch(console.error)
