import { NextFunction, Request, Response, Router } from "express"

export default (router: Router): void => {
  router.post('/test', (req: Request, res: Response, next: NextFunction) => {
		console.log('ok its fine')
		throw new Error('i')
	})
}