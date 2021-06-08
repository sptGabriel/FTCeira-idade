import { Router } from 'express'
import { adaptRoute } from '~/infrastructure/express/adapters/express-route-adapter'
import { adminAuth } from '~/infrastructure/express/middlewares/admin.auth'
import { coordinatorAuth } from '~/infrastructure/express/middlewares/coordinator.auth'
import { studentAuth } from '~/infrastructure/express/middlewares/student.auth'
import { makeAnswerQuestionnaireControllerFactory } from '~/shared/factories/controllers/makeAnswerQuestionnaireControllerFactory'
import { makeCreateQuestionnaireControllerFactory } from '~/shared/factories/controllers/makeCreateQuestionnaireControllerFactory'
import { makeGetQuestionnairesControllerFactory } from '~/shared/factories/controllers/makeGetQuestionnairesControllerFactory'
import { AllRoleAuth } from '~/infrastructure/express/middlewares/all-role.auth copy'
import { makeGetNotAnsweredQuestionnairesControllerFactory } from '~/shared/factories/controllers/makeGetNotAnsweredQuestionnairesControllerFactory'

const questionnaireRouter = Router()

questionnaireRouter.post(
  '/add',
  adminAuth,
  adaptRoute(makeCreateQuestionnaireControllerFactory()),
)
questionnaireRouter.get(
  '/',
  AllRoleAuth,
  adaptRoute(makeGetNotAnsweredQuestionnairesControllerFactory()),
)
questionnaireRouter.get(
  '/all',
  coordinatorAuth,
  adaptRoute(makeGetQuestionnairesControllerFactory()),
)
questionnaireRouter.post(
  '/:questionnaireId',
  studentAuth,
  adaptRoute(makeAnswerQuestionnaireControllerFactory()),
)
export { questionnaireRouter }
