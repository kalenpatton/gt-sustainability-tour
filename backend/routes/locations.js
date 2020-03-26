var express = require('express')
var router = express.Router()
const mysql = require('mysql')

// THIS IS WILDLY UNSAFE CHANGE THIS ASAP
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'location_info',
})


/* GET locations listing. */
router.get('/', function(req, res, next) {

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

/* GET specific location by id */
router.get('/:loc_id', (req, res) => {
  const locationId = req.params.loc_id
  console.log("Fetching location with id: " + locationId)

  const queryString = "SELECT * FROM locations WHERE id = ?"
  connection.query(queryString, [locationId], (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for location\n\t" + err)
      res.sendStatus(500) // Internal Server Error
      return
    }
    console.log("Fetched location")
    res.json(rows)
  })
})

/* POST specific location by id 

  req.body should be json of format:
  {
	    "name":"locname",
	    "description":"locdesc",
	    "transcript":"loctrans",
	    "latitude":30.000,
	    "longitude":-84.000,
	    "filters":null
  }

  Returns the auto-generated id of the new location
*/
router.post('/', (req, res) => {
  console.log("Creating new location")
  console.log(req.body)
  const location = req.body
  console.log("New location info: " + location)

  const queryString = "INSERT INTO locations (name, description, transcript, latitude, longitude, filters) VALUES (?, ?, ?, ?, ?, ?)"
  connection.query(queryString,
                  [location.name, location.description, location.transcript, location.latitude, location.longitude, location.filters],
                  (err, result, fields) => {
    if (err) {
      console.log("Failed to create location\n\t" + err)
      res.sendStatus(500) // Internal Server Error
      return
    }
    console.log("Location created")
    console.log(result)
    res.status(201).send('Location added with ID: ' + result.insertId)
  })
})

/* PUT specific location by id

  req.body should be json of format:
  {
	    "name":"locname",
	    "description":"locdesc",
	    "transcript":"loctrans",
	    "latitude":30.000,
	    "longitude":-84.000,
	    "filters":null
  }

  Any unmodified fields should include their existing value
*/
router.put('/:loc_id', (req, res) => {
  const locationId = req.params.loc_id
  const location = req.body
  console.log("Updating location with ID " + locationId)
  console.log("Updated location info: " + location)

  const queryString = "UPDATE locations SET name = ?, description = ?, transcript = ?, latitude = ?, longitude = ?, filters = ? WHERE id = ?"
  connection.query(queryString,
                  [location.name, location.description, location.transcript, location.latitude, location.longitude, location.filters, locationId],
                  (err, result) => {
    if (err) {
      console.log("Failed to update location\n\t" + err)
      res.sendStatus(500) // Internal Server Error
      return
    }
    console.log("Location updated")
    res.end("Location updated")
  })
})

/* DELETE specific location by id */
router.delete('/:loc_id', (req, res) => {
  const locationId = req.params.loc_id
  console.log("Deleting location with ID " + locationId)

  const queryString = "DELETE FROM locations WHERE id = ?"
  connection.query(queryString, locationId, (err, result) => {
    if (err) {
      console.log("Failed to delete location\n\t" + err)
      res.sendStatus(500) // Internal Server Error
      return
    }
    console.log("Location " + locationId + " deleted")
    res.end('Location has been deleted')
  })
})

module.exports = router
