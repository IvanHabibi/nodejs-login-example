var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Halo Gais!' });
  res.render('login');
});

router.post('/login', function(req, res, next) {
  // res.render('index', { title: 'Halo Gais!' });
  console.log(req.body)
  if(req.body.email=='admin@example.com'&&req.body.pass=='password'){
    res.render('correct');
  }else{
    res.render('wrong');
  }

});

module.exports = router;
