import { Application, Router } from 'express'
import { bodyParser } from '../middlewares/body-parser.global-middleware'
import { contentType } from '../middlewares/content-type'
import { cors } from '../middlewares/cors'
import { errorHandler } from '../middlewares/error-handler.middleware'
import { setupRoutes } from './routes'

export const setupApp = (app: Application, router: Router): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
	setupRoutes(app, Router())
	app.use(errorHandler)
}