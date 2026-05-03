const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

pool.on('connect', (client) => {
  client.query('SET search_path TO geospatial_db, public')
})

pool.connect((err, client, release) => {
  if (err) {
    console.error('Database connection FAILED:', err.message)
  } else {
    client.query('SET search_path TO geospatial_db, public', (err) => {
      release()
      if (err) {
        console.error('Schema set FAILED:', err.message)
      } else {
        console.log('Database connected successfully ✅')
      }
    })
  }
})

module.exports = pool