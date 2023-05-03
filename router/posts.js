let express = require('express');
let router = express.Router();

let postcontroller = require('../controller/posts-controler');

router.post('/create', postcontroller.create);

module.exports = router;