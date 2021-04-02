import express, { Application, Router } from "express";
import { readdirSync } from "fs";
import { resolve } from "path";

export function setupRoutes (app: Application, router: Router) {
  app.use('/static', express.static(resolve(__dirname, '../../static')))
  app.use('/api', router)
  readdirSync(`${__dirname}/../routes`).map(async (fileStr) => {
    if (fileStr.includes('.test.')) return
    const file = await import(`../routes/${fileStr}`)
    file.default(router, app)
  })
}