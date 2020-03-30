var express = require('express')
var router = express.Router()
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'users',
})

/* GET all users */
router.get('/', (req, res) => {
  console.log("Fetching users")

  const queryString = "SELECT * FROM users WHERE type == 1"
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users\n\t" + err)

      res.sendStatus(500) // Internal Server Error
      return
    }
    console.log("Fetched users")
    res.json(rows)
  })
})

module.exports = router