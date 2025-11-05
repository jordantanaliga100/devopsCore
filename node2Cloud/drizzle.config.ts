import { defineConfig } from 'drizzle-kit'
import './config/env.js'

export default defineConfig({
  schema: './models/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL!,
  },
})
