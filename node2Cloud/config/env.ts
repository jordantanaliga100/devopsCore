import { config } from 'dotenv'

const env = process.env.NODE_ENV

const envMap: Record<string, string> = {
  production: '.env.prod',
  development: '.env.local',
  staging: 'env.staging',
  test: '.env.test',
  local: '.env.local',
}

const envFile = envMap[env!]

export const conf = config({ path: envFile! })

if (conf.error) {
  console.error(`❌ Failed to load ${envFile}:`, conf.error)
} else {
  console.log(`✅ Loaded environment: ${env}`)
}
