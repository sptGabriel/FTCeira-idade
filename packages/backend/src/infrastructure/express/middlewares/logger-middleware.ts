import morgan = require('morgan')
import { logger } from '~/common/helpers/logger-helper'

export const loggerMiddleware = morgan(
  ':method :url :status :response-time ms - :res[content-length]',
  {
    stream: {
      write: (message: string) =>
        logger.info(message.substring(0, message.lastIndexOf('\n'))),
    },
  },
)
