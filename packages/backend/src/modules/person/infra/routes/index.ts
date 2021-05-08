import express, { Router } from 'express'
import { adaptRoute } from '~/infrastructure/express/adapters/express-route-adapter'
import { makeCreatePersonControllerFactory } from '~/shared/factories/makeCreatePersonControllerFactory'
import { makeSigninControllerFactory } from '~/shared/factories/makeSigninControllerFactory'

const personRouter = Router()
personRouter.post('/signup', adaptRoute(makeCreatePersonControllerFactory()))
personRouter.post('/signin', adaptRoute(makeSigninControllerFactory()))
export { personRouter }
