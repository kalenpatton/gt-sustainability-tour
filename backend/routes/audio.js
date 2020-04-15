var express = require('express');
var multer = require('multer');
var upload = multer();
var router = express.Router();
const path = require('path');
const mysql = require('mysql')
const fs = require('fs');

const AudioHandler = require('./AudioHandler');
<<<<<<< HEAD
=======
const withAuth = require('./withAuth');
>>>>>>> c7ac4bc92055c076d28c64bf7ba59cf06b1b0b5c
require('dotenv').config()

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'location_info',
})

  // req.body should be json of format:
  // {
  //     "site_id":5,
  //     "audio": {<my_site_audio.mp3>}
  // }
<<<<<<< HEAD
router.post('/', upload.single('audio'), async function (req, res) {
=======
router.post('/', withAuth, upload.single('audio'), function (req, res) {
>>>>>>> c7ac4bc92055c076d28c64bf7ba59cf06b1b0b5c
  const audio = req.file;
  const site_id = req.body.site_id;
  if (!audio) {
    res.status(401).send("Audio file is missing");
    return
  }

  // Add audio to file system
  AudioHandler.add(site_id, audio.buffer);
  console.log("Audio added");
  res.status(201).send('Audio added for site ' + site_id);
});


module.exports = router;
