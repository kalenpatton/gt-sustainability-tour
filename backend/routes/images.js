var express = require('express');
var multer = require('multer');
var upload = multer();
var router = express.Router();
const path = require('path');
const mysql = require('mysql')

const ImageHandler = require('./ImageHandler');

// THIS IS WILDLY UNSAFE CHANGE THIS ASAP
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'gttourapp',
  password: 'gttourapp',
  database: 'location_info',
})

// router.post('/upload', upload.single('image'), async function(req, res) {
//   const imgInfo = req.body;
//   console.log(imgInfo);
//   const image = req.file;
//   if (!image) {
//     res.status(401).sent("Image is missing.");
//     return;
//   }

//   // Add new images to image table/file system
//   try {
//     const imagePath = path.join(process.cwd(), '/public/images');
//     const fileUpload = new ImageHandler(imagePath);
//     // Insert newImages[j] into database, get id
//     let queryString = "INSERT INTO images (site_id, `index`, caption) VALUES (?, ?, ?); SELECT LAST_INSERT_ID() as `newImgId`"
//     let newImgId = -1;
//     await connection.query(queryString,
//                     [imgInfo.siteId, imgInfo.index, imgInfo.caption],
//                     (err, result, fields) => {
//       if (err) {
//         console.log("Failed to add image \n\t" + err);
//         res.sendStatus(500); // Internal Server Error
//       } else {
//         newImgId = result[1][0].newImgId;
//       }
//     });
//     // Save image to file system
//     fileUpload.save(image.buffer, newImgId);

//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//     return;
//   }
// });

// router.get('/reorder', function(req, res, next) {

// });

/* GET imageList by location id */
router.get('/:loc_id', (req, res) => {
  const locationId = req.params.loc_id
  console.log("Fetching image list for location id: " + locationId)

  const queryString = "SELECT * FROM images WHERE site_id = ?"
  connection.query(queryString, [locationId], (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for images\n\t" + err)
      res.sendStatus(500) // Internal Server Error
      return
    } else {
      console.log("Fetched image list");
      res.json(rows)
    }
  })
})

router.get('/', function(req, res, next) {
  console.log("Responding to root route")
  /* res.render('index', {
    title: 'GT Sustainability Self-guided Tour Backend',
    routes: '/locations, /locations/:id'
  }); */
  res.send("IMAGE PAGE")
});

module.exports = router;
