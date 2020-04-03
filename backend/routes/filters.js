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

/* GET filters by id. */
router.get('/:filter_id', (req, res) => {
    const filtersId = req.params.filter_id
    console.log("Fetching location with id: " + filtersId)
  
    const queryString = "SELECT * FROM filters WHERE id = ?"
    connection.query(queryString, [filtersId],(err, rows, fields) => {
      if (err) {
        console.log("Failed to query for filters\n\t" + err)
        res.sendStatus(500) // Internal Server Error
        return
      }
      console.log("Fetched location")
      res.json(rows)
    })
  })

  /* GET filters listing. */
router.get('/', function(req, res, next) {
  const queryString = "SELECT * FROM filters"
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for filters\n\t" + err)
      res.sendStatus(500) // Internal Server Error
      return
    }
    console.log("Fetched filters")
    res.json(rows)
  })
});

  /* POST a new filter. 
  Call with the new filter like so:
      /filters?filter=New Filter Name
  */
  router.post('/', function(req, res, next) {
    const queryString = "INSERT INTO filters (filter) VALUES (?)"
    connection.query(queryString, req.query.filter, (err, result) => {
      if (err) {
        console.log("Failed to query for filters\n\t" + err)
        res.sendStatus(500) // Internal Server Error
        return
      }
      res.status(201).send('Filter added with ID: ' + result.insertId)
      console.log("Added filter")
    })
  });

  /* DELETE a filter by id number. 
      /filters/:filter_id
  */
  router.delete('/:filter_id', (req, res) => {
    const filterId = req.params.filter_id
    console.log("Deleting filter with ID " + filterId)
  
    const queryString = "DELETE FROM filters WHERE id = ?"
    connection.query(queryString, filterId, (err, result) => {
      if (err) {
        console.log("Failed to delete filter\n\t" + err)
        res.sendStatus(500) // Internal Server Error
        return
      }
      console.log("Filter " + filterId + " deleted")
      res.end('Filter ' + filterId + ' has been deleted')
    })
  })

module.exports = router;
