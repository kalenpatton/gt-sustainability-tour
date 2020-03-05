ar express = require('express');
var router = express.Router();
const mysql = require('mysql')

/* GET specific location by id */
router.get('/users', (req, res) => {
  const locationId = req.params.loc_id
  console.log("Fetching users ")

  // THIS IS WILDLY UNSAFE CHANGE THIS ASAP
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1 Love GT Sustainability.',
    database: 'users',
  })

  const queryString = "SELECT * FROM users WHERE type == 1"
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for locations\n\t" + err)
      res.sendStatus(500) // Internal Server Error
      return
    }
    console.log("Fetched users")
    res.json(rows)
  })
})
