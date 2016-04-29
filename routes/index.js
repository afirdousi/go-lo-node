var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  //res.render('index', { title: 'Express' });
  res.json({'title':'SJSU' , course: 'Mobile Computing Project', friendList: [ "Sandeep Pal",
               "Abhi Tripathi",
                "Amit Verma",
                "Awadhesh Diwakar",
                "Shishir Verma",
                "Ravi"]});

});

router.post('/test', function(req, res, next) {

     console.log(req.body);
});

module.exports = router;
