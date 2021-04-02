import morgan = require('morgan')
import { Logger } from '~/common/helpers/logger-helper'

export const loggerMiddleware = morgan(
  ':method :url :status :response-time ms - :res[content-length]',
  {
    stream: {
      write: (message: string) =>
        Logger.info(message.substring(0, message.lastIndexOf('\n'))),
    },
  },
)
