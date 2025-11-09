import app from './app.js'
import { initDb } from './config/db.js'
import './config/env.js'

const PORT = Number(process.env.PORT) || 5000
const startServer = async () => {
  try {
    // db connection here...
    await initDb()
    // scattered db instance...
    app.listen(PORT, () => {
      console.log(`Server Alive: http://localhost:${PORT} 🚀 `)
    })
  } catch (error) {
    console.log(`Server Error: ${error}`)
  }
}

startServer()
