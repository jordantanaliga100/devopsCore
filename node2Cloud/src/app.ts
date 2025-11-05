import type { Express, Request, Response } from 'express'
import express from 'express'
import { BottomMiddlewares } from '../middlewares/Bottom'
import { TopMiddlewares } from '../middlewares/Top.js'

const app: Express = express()

TopMiddlewares.forEach(mw => app.use(mw))

app.get('/', (req: Request, res: Response) => {
  res.send(`Alive 🚀`)
})

BottomMiddlewares.forEach(mw => app.use(mw))

export default app
