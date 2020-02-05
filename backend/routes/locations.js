var express = require('express');
var router = express.Router();
const mysql = require('mysql')

/* GET specific location by id */
router.get('/:loc_id', (req, res) => {
  const locationId = req.params.loc_id
  console.log("Fetching location with id: " + locationId)

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1 Love GT Sustainability.',
    database: 'location_info',
  })

  const queryString = "SELECT * FROM locations WHERE id = ?"
  connection.query(queryString, [locationId],(err, rows, fields) => {
    if (err) {
      console.log("Failed to query for locations\n\t" + err)
      res.sendStatus(500) // Internal Server Error
      return
    }
    console.log("Fetched locations")
    res.json(rows)
  })
})

/* GET locations listing. */
router.get('/', function(req, res, next) {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1 Love GT Sustainability.',
    database: 'location_info',
  })

  const queryString = "SELECT * FROM locations"
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for locations\n\t" + err)
      res.sendStatus(500) // Internal Server Error
      return
    }
    console.log("Fetched locations")
    res.json(rows)
  })
});


module.exports = router;
