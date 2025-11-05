import type { Express } from 'express'
import { logger } from '../helpers/logger.js'
import { RouteModules } from './index.js'

export const initRoutes = (app: Express) => {
  const prefix = `/api/v1`

  Object.entries(RouteModules).forEach(([resource, router]) => {
    app.use(`${prefix}/${resource}`, router)
    logger.info(`✅ Mounted route: ${prefix}/${resource}`)
  })
}
