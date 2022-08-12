import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  ENV,
} = process.env

let client: Pool = new Pool()

if (ENV === 'dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    user: POSTGRES_USERNAME,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
  })
}
if (ENV==='test') {
    client = new Pool({
        host: POSTGRES_HOST,
        user: POSTGRES_USERNAME,
        database: POSTGRES_TEST_DB,
        password: POSTGRES_PASSWORD,
      })
}

export default client
