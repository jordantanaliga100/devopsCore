import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import '../config/env.js'

export async function initDb() {
  try {
    const dbUrl = process.env.DB_URL
    if (!dbUrl) throw new Error('❌ Missing DB_URL in environment variables')

    const sql = neon(dbUrl)
    const db = drizzle({ client: sql })

    console.log('✅ Database connection initialized successfully')
    return db
  } catch (err) {
    console.error('🔥 Failed to connect to database:', err)
    process.exit(1)
  }
}
