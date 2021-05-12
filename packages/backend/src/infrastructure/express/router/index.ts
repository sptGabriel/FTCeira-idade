import { Router } from 'express'
import { courseRouter } from '~/modules/course/infra/routes'
import { personRouter } from '~/modules/person/infra/routes'
import { questionnaireRouter } from '~/modules/questionnaire/infra/routes'

const router = Router()
router.use(personRouter)
router.use("/courses", courseRouter)
router.use("/questionnaires", questionnaireRouter)
export { router }
