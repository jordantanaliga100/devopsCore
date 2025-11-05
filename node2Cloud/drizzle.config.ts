import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'
// import './config/env.js'

const env = process.env.NODE_ENV || 'development'
const envFile = env === 'production' ? '.env.prod' : '.env.local'
config({ path: envFile })

export default defineConfig({
  schema: './models/user.model.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL!,
  },
})
