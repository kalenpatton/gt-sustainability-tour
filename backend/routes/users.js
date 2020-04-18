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
router.get('/', withAuth, (req, res) => {
  console.log("Fetching users")

  const queryString = "SELECT email, usertype FROM users"
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

router.post('/register', withAuth, (req, res) => {
  if (req.usertype != 'superadmin') {
    res.status(401).json({
      error: `User not authorized to edit accounts.`
    })
  }
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

router.delete('/', withAuth, (req, res) => {
  if (req.usertype != 'superadmin') {
    res.status(401).json({
      error: `User not authorized to edit accounts.`
    });
    return;
  }
  const { email } = req.body;
  if (!email) {
    res.status(400).json({
      error: `No user provided.`
    });
    return;
  }
  if (req.email == email) {
    res.status(400).json({
      error: `You cannot delete your own account.`
    })
    return;
  }
  console.log("Deleting user " + email)

  const userHandler = new UserHandler(connection);
  userHandler.delete(email, (err) => {
    if (err) {
      res.status(500).json({
        error: `Error deleting user: ${err}`
      }) // Internal Server Error
      return;
    }
    res.sendStatus(200)
  });
})

router.post('/authenticate', (req, res) => {
  console.log("Verifying user login.")
  const { email, password } = req.body;

  const userHandler = new UserHandler(connection);
  userHandler.test(email, password, (err, same, usertype) => {
    if (err) {
      res.status(500).json({
        error: err
      }) // Internal Server Error
    } else if (!same) {
      res.status(401).json({
        error: 'Invalid email or password.'
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

router.post('/changepass', withAuth, (req, res) => {
  console.log("Changing password")
  const { password, newPassword } = req.body;
  const email = req.email;

  const userHandler = new UserHandler(connection);
  userHandler.test(email, password, (err, same, usertype) => {
    if (err) {
      res.status(500).json({
        error: err
      }) // Internal Server Error
    } else if (!same) {
      res.status(401).json({
        error: 'Invalid current password.'
      }); // Invalid credentials
    } else {
      userHandler.setPassword(email, newPassword, (err) => {
        if (err) {
          res.status(500).json({
            error: err
          }) // Internal Server Error
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
})

router.get('/checktoken', withAuth, (req, res) => {
  res.status(200).json({
    email : req.email,
    usertype : req.usertype
  });
})

module.exports = router