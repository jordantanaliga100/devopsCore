import dotenv from 'dotenv'
import path from 'path'

const env = process.env.NODE_ENV || 'local'
const envFile = env === 'prod' ? '.env.prod' : '.env.local'
dotenv.config({ path: path.resolve(process.cwd(), envFile) })

import './server.js'
