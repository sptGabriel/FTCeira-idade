import winston, { createLogger, transports, format } from 'winston'

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
})

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const level = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

export const logger = createLogger({
  level: level(),
  levels,
  format: format.combine(
    format.label({ label: 'right meow!' }),
    format.colorize({ all: true }),
    //format.json(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [
    new transports.File({
      filename: 'error.log',
      level: 'error',
      dirname: __dirname+`../../../logging/errors.log`,
      maxsize: 5242880,
      format: format.json(),
    }),
    new transports.File({
      filename: __dirname+`../../../logging/combined.log`,
      level: 'info',
      maxsize: 5242880,
    }),

    new transports.Console(),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: __dirname+`../../../logging/exceptions.log`,
      maxsize: 5242880,
    }),
  ],
})