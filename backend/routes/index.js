var express = require('express');
var path = require('path');
var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   console.log("Responding to root route")
//   res.send("Gt Sustainability Self-guided Tour Backend")
// });

const CLIENT_PATH = path.join(__dirname, '../../client');
const ADMIN_PATH = path.join(__dirname, '../../admin');

// Route to admin/client builds
router.use(express.static(path.join(CLIENT_PATH, 'build')));
router.use(express.static(path.join(ADMIN_PATH, 'build')));

router.get('/', function (req, res) {
  res.sendFile(path.join(CLIENT_PATH, 'build', 'index.html'));
});

router.get('/tour', function (req, res) {
  res.sendFile(path.join(CLIENT_PATH, 'build', 'index.html'));
});

router.get('/adminlogin', function (req, res) {
  res.sendFile(path.join(ADMIN_PATH, 'build', 'index.html'));
});

router.get('/admindash', function (req, res) {
  res.sendFile(path.join(ADMIN_PATH, 'build', 'index.html'));
});


module.exports = router;
