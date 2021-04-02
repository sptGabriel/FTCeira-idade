import express, { Router } from 'express'
import { bodyParser } from '../middlewares/body-parser.global-middleware'
import { contentType } from '../middlewares/content-type'
import { cors } from '../middlewares/cors'
import { errorHandler } from '../middlewares/error-handler.middleware'
import { setupRoutes } from './routes'

const router = Router()
const app = express()
app.use(bodyParser)
app.use(cors)
app.use(contentType)
setupRoutes(app, router)
app.use(errorHandler)
export default app
