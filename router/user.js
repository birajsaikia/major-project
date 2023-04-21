const express = require('express');
const router = express.Router();
const Usercontroler = require('../controller/user-controller');


router.get('/' , Usercontroler.home)

router.get('/profile', Usercontroler.proFile)

router.get('/signup', Usercontroler.signUp)
router.get('/signin', Usercontroler.signIn)

router.post('/create', Usercontroler.create)
router.post('/createsession', Usercontroler.createSession)
console.log('user router load');
module.exports = router;