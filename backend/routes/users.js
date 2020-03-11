var express = require('express')
var router = express.Router()
const mysql = require('mysql')

// THIS IS WILDLY UNSAFE CHANGE THIS ASAP
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'FF13isfun!!',
  database: 'users',
})

/* GET all users */
router.get('/', (req, res) => {
  console.log("Fetching users")

  const queryString = "SELECT * FROM users"
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