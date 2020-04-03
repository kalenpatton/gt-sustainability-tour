var express = require('express')
var router = express.Router()
const mysql = require('mysql')
var multer = require('multer');
var upload = multer();

const ImageHandler = require('./ImageHandler');
require('dotenv').config()

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'location_info',
  multipleStatements: true
})


/* GET locations listing. */
router.get('/', function(req, res) {

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
      console.log("Location created")
      console.log(result)
      res.status(201).send('Location added with ID: ' + result.insertId)
    }
  });
})

/* PUT specific location by id

  req.body should be json of format:
  {
	    "name":"locname",
	    "description":"locdesc",
	    "transcript":"loctrans",
	    "latitude":30.000,
	    "longitude":-84.000,
	    "filters":null,

      "imageList":[1,2,3,-1,-1],
      "newImages":[img1, img2] //images must include a caption field.
  }

  Any unmodified fields should include their existing value
*/
router.put('/:loc_id', upload.any(), async (req, res) => {
  const locationId = req.params.loc_id;
  const location = req.body;
  const newImgs = req.files;
  var imageList = 'imageList' in req.body ? req.body.imageList.slice() : [];
  console.log("Updating location with ID " + locationId)
  // console.log("Updated location info: " + location)

  const queryString = "UPDATE locations SET name = ?, description = ?, transcript = ?, latitude = ?, longitude = ?, filters = ? WHERE id = ?"
  connection.query(queryString,
                  [location.name, location.description, location.transcript, location.latitude, location.longitude, location.filters, locationId],
                  (err, result) => {
    if (err) {
      console.log("Failed to update location\n\t" + err)
      res.sendStatus(500) // Internal Server Error
      return
    } else {
      // Get previous image list
      const queryString = "SELECT * FROM images WHERE site_id = ?"
      connection.query(queryString, [locationId], (err, result, fields) => {
        if (err) {
          console.log("Failed to query for images\n\t" + err)
          return
        } else {
          // Update imageList
          let unusedImages = new Set(result.map(({id, site_id, index, caption}) => `${id}`));

          const imageHandler = new ImageHandler(locationId, connection);
          let j = 0;
          for (var i = 0; i < imageList.length; i++) {
            if (imageList[i] == -1) {
              // Add new image
              imageList[i] = imageHandler.add(newImgs[j].buffer, i, newImgs[j].caption);
              j++;
            } else {
              // Update image index for existing image
              imageHandler.updateIndex(imageList[i],i);
            }
            unusedImages.delete(imageList[i]);
          }

          unusedImages.forEach((imgId) => {
            imageHandler.delete(imgId);
          });

          console.log("Location updated")
          res.end("Location updated")
        }
      })
    }
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
    } else {
      // delete images
      ImageHandler.deleteAll(locationId);

      console.log("Location " + locationId + " deleted")
      res.end('Location has been deleted')
    }
  })
})

module.exports = router
