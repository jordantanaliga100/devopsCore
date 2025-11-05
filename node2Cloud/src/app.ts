import type { Express, Request, Response } from 'express'
import express from 'express'
import { BottomMiddlewares } from '../middlewares/Bottom.js'
import { TopMiddlewares } from '../middlewares/Top.js'
const app: Express = express()

TopMiddlewares.forEach(mw => app.use(mw))

app.get('/', (req: Request, res: Response) => {
  const db = req.app.locals.db;

  const data = db.select().from('users')
  res.json({msg:`Alive 🚀`, data: data})
})

BottomMiddlewares.forEach(mw => app.use(mw))

export default app
