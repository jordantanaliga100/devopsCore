import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/neon-http'

const env = process.env.NODE_ENV || 'development'
const envFile = env === 'production' ? '.env.prod' : '.env.local'
export const conf = config({ path: envFile! })

export async function initDb() {
  const dbUrl = process.env.DB_URL

  // if (process.env.NODE_ENV === 'development') {
  //   neonConfig.fetchEndpoint = 'http://neon-local:5432/sql'
  //   neonConfig.useSecureWebSocket = false
  //   neonConfig.poolQueryViaFetch = true
  // }
  try {
    if (!dbUrl) throw new Error('❌ Missing DATABASE_URL in environment variables')
    const sql = neon(dbUrl)
    const db = drizzle({ client: sql })

    console.log('✅ Database connection initialized successfully')
    return db
  } catch (err) {
    console.error('🔥 Failed to connect to database:', err)
    process.exit(1)
  }
}
