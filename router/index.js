const express = require('express');
const router = express.Router();
const homecontroler = require('../controller/hom-controler');


router.get('/' , homecontroler.home)

console.log('router load');
module.exports = router;