var express = require('express');
var router = express.Router();
const mysql = require('mysql')
require('dotenv').config()

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'location_info',
})

// GET the single row of the info table
router.get('/', (req, res) => {
  console.log("Fetching general sustainability info")

  const queryString = "SELECT * FROM ocs_info"
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for sustainability info\n\t" + err)
      res.sendStatus(500) // Internal Server Error
      return
    }
    console.log("Fetched sustainability info")
    res.json(rows[0])
  })
})

/* PUT the single row of the info table
  req.body should be json of format:
  {
    "information":"new info here"
  }
*/
router.put('/', (req, res) => {
  const new_information = req.body
  console.log("Updating sustainability info")
  console.log("Updated sustainability info: " + new_information)

  const queryString = "UPDATE ocs_info SET information = ?"
  connection.query(queryString, [new_information.information], (err, result) => {
    if (err) {
      console.log("Failed to update sustainability info\n\t" + err)
      res.sendStatus(500) // Internal Server Error
      return
    }
    console.log("Sustainability info updated")
    res.end("Sustainability info updated")
  })
})

module.exports = router