var express = require('express');
var router = express.Router();
const mysql = require('mysql')

/* GET filters by id. */
router.get('/:filter_id', (req, res) => {
    const filtersId = req.params.filter_id
    console.log("Fetching location with id: " + filtersId)
  
    // THIS IS WILDLY UNSAFE CHANGE THIS ASAP
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',  //your password here
      database: 'location_info',
    })
  
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

  // THIS IS WILDLY UNSAFE CHANGE THIS ASAP
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',  //your password here
    database: 'location_info',
  })

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

  /* POST a new filter. */
  router.post('/', function(req, res, next) {
    // THIS IS WILDLY UNSAFE CHANGE THIS ASAP
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '', //your password here
      database: 'location_info',
    })

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

module.exports = router;
