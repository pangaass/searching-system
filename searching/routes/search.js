var express = require('express');
var router = express.Router();
var test = require('./test.js')
/* GET home page. */
router.get('/', function (req, res, next) {
 /*
  request.get(get_config(req.query.query, parseInt(req.query.page)))
    .then(body => {
      console.log(body);
      //res.status(200);
      res.json(body);
      // res.end();
    })
    .catch(err => {
      res.status(404);
      res.json(err);
      res.end();
    })*/
  test(req.query.query,req.query.page)
    .then(body=>{
      res.status(200).json(body);
    })
});

module.exports = router;