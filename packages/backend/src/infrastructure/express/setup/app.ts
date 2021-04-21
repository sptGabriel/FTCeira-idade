import express from 'express'
import { resolve } from 'path'
import { bodyParser } from '../middlewares/body-parser-middleware'
import { contentType } from '../middlewares/content-type-middleware'
import { cors } from '../middlewares/cors-middleware'
import { errorHandler } from '../middlewares/error-handler-middleware'
import { loggerMiddleware } from '../middlewares/logger-middleware'
import { metricsMiddleware } from '../middlewares/metrics-middleware'
import { rateLimitter } from '../middlewares/rate-limit-middleware'
import { router } from '../router'

const app = express()
app.use(bodyParser)
app.use(cors)
app.use(contentType)
app.use('/static', express.static(resolve(__dirname, '../../static')))
app.use('/api', router)
app.use(rateLimitter)
app.use(metricsMiddleware)
app.use(loggerMiddleware)
app.use(errorHandler)
export default app
