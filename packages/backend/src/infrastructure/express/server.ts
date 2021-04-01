import express, { Router } from 'express'
import { setupApp } from './setup/app'

export const SetupExpress = () => {
  const port = process.env.APP_PORT
  const app = express()
  const router = Router()
  setupApp(app, router)
  app.listen(port, () => {
    console.log(`info`, `Server listening -> http://127.0.0.1:${port}`)
  })
}