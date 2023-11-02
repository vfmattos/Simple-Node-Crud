var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('new', { title: 'Cadastro de cliente', doc: {}, action: '/new' });
});


module.exports = router;
