import { Config, defineConfig } from 'drizzle-kit'
import './src/config/env'

export default defineConfig({
  schema: './src/models/schema.ts',
  out: './src/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
}) satisfies Config
