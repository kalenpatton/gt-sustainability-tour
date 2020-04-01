var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Responding to root route")
  res.send("Gt Sustainability Self-guided Tour Backend")
});

module.exports = router;
