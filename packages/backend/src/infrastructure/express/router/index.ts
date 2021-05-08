import { Router } from 'express'
import { personRouter } from '~/modules/person/infra/routes'

const router = Router()
router.use(personRouter)

export { router }
