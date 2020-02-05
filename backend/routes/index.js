var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Responding to root route")
  res.render('index', {
    title: 'GT Sustainability Self-guided Tour Backend',
    routes: '/locations'
  });
});

module.exports = router;
