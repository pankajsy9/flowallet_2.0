var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('wallet/login', { title: 'FloWallet Login' });
});

module.exports = router;
