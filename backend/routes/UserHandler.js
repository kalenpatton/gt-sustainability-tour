// Handles adding/deleting of admin users

const bcrypt = require('bcryptjs');
require('dotenv').config()

const saltRounds = 10;



class UserHandler {
  constructor(connection) {
    this.connection = connection;
  }

  // add email/password pair to database
  add(email, password, type, callback) {
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        return callback(err);
      }
      const queryString = "INSERT INTO users (email, password, usertype) values(?, ?, ?)";
      this.connection.query(queryString,
                      [email, hashedPassword, type],
                      (err, rows, fields) => {
        if (err) {
          return callback(err);
        }
        return callback();
      })
    });
  }

  // change the password for a user
  setPassword(email, password, callback) {
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        return callback(err);
      }
      const queryString = "UPDATE users SET password = ? WHERE email = ?";
      this.connection.query(queryString,
                      [hashedPassword, email],
                      (err, rows, fields) => {
        if (err) {
          return callback(err);
        }
        return callback();
      })
    });
  }

  // test and email/password pair
  test(email, password, callback) {
    const queryString = "SELECT password, usertype FROM users WHERE email = ?";
    this.connection.query(queryString,
                    [email],
                    (err, result, fields) => {
      if (err) {
        return callback(err);
      }
      if (result.length == 0) {
        return callback(err, false)
      }
      const truePassword = result[0].password;
      const usertype = result[0].usertype;
      bcrypt.compare(password, truePassword, (err, same) => {
        if (err) {
          return callback(err);
        } else {
          return callback(err, same, usertype);
        }
      })
    })
  }


  // delete user
  delete(email, callback) {
    const queryString = "DELETE FROM users WHERE email = ?";
    this.connection.query(queryString,
                    [email],
                    (err, rows, fields) => {
      if (err) {
        return callback(err);
      }
      return callback();
    })
  }
}
module.exports = UserHandler;