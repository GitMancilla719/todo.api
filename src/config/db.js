const { Pool } = require('pg')
const dotenv = require('dotenv')
dotenv.config()


const configDev = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  }

const configProd = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
  }

const pool = new Pool(process.env.ENVIRONMENT === 'production'
    ? configProd
    : configDev
)

module.exports = pool