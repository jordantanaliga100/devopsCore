import type { Express, Request, Response } from 'express'
import express from 'express'
import { BottomMiddlewares } from './middlewares/Bottom.js'
import { TopMiddlewares } from './middlewares/Top.js'
import { userModel } from './models/user.model.js'
import { initRoutes } from './routes/initRoutes.js'

const app: Express = express()

TopMiddlewares.forEach(mw => app.use(mw))

app.get('/test', async (req: Request, res: Response) => {
  const db = req.app.locals.db
  const data = await db.select().from(userModel)
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
