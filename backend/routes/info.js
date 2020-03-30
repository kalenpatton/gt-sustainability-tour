var express = require('express');
var router = express.Router();
const mysql = require('mysql')

router.get('/',(req,res)=>{
    //need to replace this with database connection
    res.json({info:"this is some information about GT sustainability,this is some information about GT sustainability,this is some information about GT sustainability,this is some information about GT sustainability,this is some information about GT sustainability"});
});

module.exports = router