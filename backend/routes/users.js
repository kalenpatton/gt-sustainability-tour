var express = require('express')
var router = express.Router()
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const UserHandler = require('./UserHandler');
const withAuth = require('./withAuth');
require('dotenv').config()

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'location_info',
})

const secret = process.env.SECRET;

/* GET all users */
router.get('/', (req, res) => {
  console.log("Fetching users")

  const queryString = "SELECT * FROM users"
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users\n\t" + err)

      res.sendStatus(500) // Internal Server Error
      return
    }
    console.log("Fetched users")
    res.json(rows)
  })
})

router.post('/register', (req, res) => {
  console.log("Adding new user.")
  const { email, password } = req.body;

  const userHandler = new UserHandler(connection);
  userHandler.add(email, password, (err) => {
    if (err) {
      res.status(500).json({
        error: `Error registerting new user: ${err}`
      }) // Internal Server Error
      return
    }
    res.sendStatus(200)
  });
})

router.post('/authenticate', (req, res) => {
  console.log("Verifying user login.")
  const { email, password } = req.body;
  console.log(req.body)

  const userHandler = new UserHandler(connection);
  userHandler.test(email, password, (err, same, usertype) => {
    if (err) {
      res.status(500).json({
        error: err
      }) // Internal Server Error
    } else if (!same) {
      res.status(401).json({
        error: 'Incorrect email or password.'
      }); // Invalid credentials
    } else {
      const payload = { email, usertype };
      const token = jwt.sign(payload, secret, {
        expiresIn: '1h'
      });
      res.cookie('token', token, {httpOnly: true}).sendStatus(200); // Valid credentials
      console.log(`User ${email} logged in.`)
    }
  });
})

router.get('/checktoken', withAuth, (req, res) => {
  res.sendStatus(200);
})

module.exports = router