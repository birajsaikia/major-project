const express = require('express');
const router = express.Router();
const homecontroler = require('../controller/hom-controler');


router.get('/' , homecontroler.home)
router.use('/user' , require('./user'));
router.use('/posts' , require('./posts'));


console.log('router load');
module.exports = router;