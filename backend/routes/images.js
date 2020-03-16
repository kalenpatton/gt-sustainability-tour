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

router.post('/upload', upload.single('image'), async function(req, res) {
    try {
        console.log(req.body);
        const imagePath = path.join(process.cwd(), '/public/images');
        const fileUpload = new ImageHandler(imagePath);
        if (!req.file) {
            return res.status(401).json({error: 'No image provided.'});
        }


        // WIP

        // // CASE: New image
        // if (req.body.id == -1) {
        //   const queryString = "INSERT INTO images (site_id,index,caption) VALUES ()"
        //   connection.query(queryString, req.query.filter, (err, result) => {
        //     if (err) {
        //       console.log("Failed to query for filters\n\t" + err)
        //       res.sendStatus(500) // Internal Server Error
        //       return
        //     }
        //     res.status(201).send('Filter added with ID: ' + result.insertId)
        //     console.log("Added filter")
        //   })
        // // CASE: Edit image
        // } else {

        // }
        const id = await fileUpload.save(req.file.buffer);




        res.status(200).json({id: id});
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/', function(req, res, next) {
  console.log("Responding to root route")
  /* res.render('index', {
    title: 'GT Sustainability Self-guided Tour Backend',
    routes: '/locations, /locations/:id'
  }); */
  res.send("IMAGE PAGE")
});

module.exports = router;
