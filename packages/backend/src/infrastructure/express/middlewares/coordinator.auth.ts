import { makeAuthMiddleware } from "~/shared/factories/middlewares/auth-middleware.factory";
import { adaptMiddleware } from "../adapters/express-middleware-adapter";

export const coordinatorAuth = adaptMiddleware(makeAuthMiddleware(['coordinator']))