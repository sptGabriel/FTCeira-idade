import express, { Router } from 'express'
import { bodyParser } from '../middlewares/body-parser-middleware'
import { contentType } from '../middlewares/content-type-middleware'
import { cors } from '../middlewares/cors-middleware'
import { errorHandler } from '../middlewares/error-handler-middleware'
import { loggerMiddleware } from '../middlewares/logger-middleware'
import { metricsMiddleware } from '../middlewares/metrics-middleware'
import { rateLimitter } from '../middlewares/rate-limit-middleware'

import { setupRoutes } from './routes'

const router = Router()
const app = express()
app.use(bodyParser)
app.use(cors)
app.use(contentType)
setupRoutes(app, router)
app.use(rateLimitter)
app.use(metricsMiddleware)
app.use(loggerMiddleware)
app.use(errorHandler)
export default app
