var express = require('express')
var router = express.Router()
const mysql = require('mysql')
var multer = require('multer');
var upload = multer();

const ImageHandler = require('./ImageHandler');

// THIS IS WILDLY UNSAFE CHANGE THIS ASAP
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'gttourapp',
  password: 'gttourapp',
  database: 'location_info',
  multipleStatements: true
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
      "filters":null,

      "newImgs":[img1, img2] //images must include a caption field.
  }

  Returns the auto-generated id of the new location
*/
router.post('/', upload.any(), async (req, res) => {
  // Set up variables
  console.log("Creating new location");
  console.log(req.body);
  console.log(req.files);
  const location = req.body;
  const newImgs = req.files;
  var site_id = -1;

  // Insert location data into locations table
  let queryString = "INSERT INTO locations (name, description, transcript, latitude, longitude, filters) VALUES (?, ?, ?, ?, ?, ?); SELECT LAST_INSERT_ID() AS `newId`"
  connection.query(queryString,
                  [location.name, location.description, location.transcript, location.latitude, location.longitude, location.filters],
                  (err, result, fields) => {
    if (err) {
      console.log("Failed to create location\n\t" + err);
      res.sendStatus(500); // Internal Server Error
    } else {
      site_id = result[1][0].newId;
      console.log(site_id);

      // Add images
      const imageHandler = new ImageHandler(site_id, connection);
      for (var i = 0; i < newImgs.length; i++) {
        imageHandler.add(newImgs[i].buffer, i, newImgs[i].caption);
      }
      console.log("Location created");
      res.json({site_id: site_id});
    }
  });
});

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
    res.end("send something useful here maybe?")
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
