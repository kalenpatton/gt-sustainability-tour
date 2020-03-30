var express = require('express');
var router = express.Router();
const mysql = require('mysql')
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'location_info',
  })

router.get('/',(req,res)=>{
    //need to replace this with database connection
    res.json({info:"this is some information about GT sustainability,this is some information about GT sustainability,this is some information about GT sustainability,this is some information about GT sustainability,this is some information about GT sustainability"});
});

module.exports = router