var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.currentUser){
    res.render('index' , {session: req.session});
  } else {
    res.redirect("/login");
  }     
});

module.exports = router;
