import express, { Application, Router } from "express";
import { resolve } from "path";

export function setupRoutes (app: Application, router: Router) {
  app.use('/static', express.static(resolve(__dirname, '../../static')))
  app.use('/api', router)
}