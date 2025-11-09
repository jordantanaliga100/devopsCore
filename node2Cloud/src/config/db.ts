import { neon, neonConfig } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

export async function initDb() {
  try {
    const dbUrl = process.env.DATABASE_URL
    if (!dbUrl) throw new Error('❌ Missing DATABASE_URL in environment variables')

    neonConfig.fetchEndpoint = 'http://neon-local:5432/sql'
    neonConfig.useSecureWebSocket = false
    neonConfig.poolQueryViaFetch = true

    const sql = neon(dbUrl)

    const db = drizzle({ client: sql })

    console.log('✅ Database connection initialized successfully')
    return db
  } catch (err) {
    console.error('🔥 Failed to connect to database:', err)
    process.exit(1)
  }
}

export const DB = await initDb()
