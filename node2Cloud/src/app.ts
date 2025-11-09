import type { Express, Request, Response } from 'express'
import express from 'express'
import { DB } from './config/db.js'
import { BottomMiddlewares } from './middlewares/Bottom.js'
import { TopMiddlewares } from './middlewares/Top.js'
import { accountModel } from './models/account.model.js'
import { initRoutes } from './routes/initRoutes.js'

const app: Express = express()

TopMiddlewares.forEach(mw => app.use(mw))

app.get('/', async (req: Request, res: Response) => {
  const data = await DB.select().from(accountModel)

  res.json({
    msg: `Alive 🚀 `,
    status: `Hello from docker 🔥🔥🔥`,
    data,
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
