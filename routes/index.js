var express = require('express');
var router = express.Router();
// var single = require('./single');
var path = express().get('views')

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' })
  res.sendfile(path+'/index.html')
});







module.exports = router;
