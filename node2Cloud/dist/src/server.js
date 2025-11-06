import '../config/env.js'
import app from './app.js'
const PORT = Number(process.env.PORT) || 5000
const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server Alive: http://localhost:${PORT} 🚀 `)
    })
  } catch (error) {
    console.log(`Server Error: ${error}`)
  }
}
startServer()
//# sourceMappingURL=server.js.map
