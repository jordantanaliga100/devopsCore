import type { Express, Request, Response } from 'express'
import express from 'express'
import { BottomMiddlewares } from '../middlewares/Bottom.js'
import { TopMiddlewares } from '../middlewares/Top.js'
import { users } from '../models/schema.js'
import { initRoutes } from '../routes/initRoutes.js'

const app: Express = express()

TopMiddlewares.forEach(mw => app.use(mw))

app.get('/', async (req: Request, res: Response) => {
  const db = req.app.locals.db
  const data = await db.select().from(users)
  res.json({ msg: `Alive 🚀`, data: data })
})

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

initRoutes(app)

BottomMiddlewares.forEach(mw => app.use(mw))

export default app
