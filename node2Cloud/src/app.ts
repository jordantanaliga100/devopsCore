import type { Express, Request, Response } from 'express'
import express from 'express'
import { BottomMiddlewares } from './middlewares/Bottom.js'
import { SecurityMiddlewares } from './middlewares/Security.js'
import { TopMiddlewares } from './middlewares/Top.js'
import { initRoutes } from './routes/initRoutes.js'

const app: Express = express()

SecurityMiddlewares.forEach(mw => app.use(mw))
TopMiddlewares.forEach(mw => app.use(mw))

app.get('/', async (req: Request, res: Response) => {
  // const data = await DB.select().from(accountModel)
  res.json({
    msg: `Alive 🚀`,
    // status: `Hello from docker 🔥🔥🔥`,
    // data,
  })
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
