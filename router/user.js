const express = require('express');
const router = express.Router();
const Usercontroler = require('../controller/user-controller');
const passport = require('passport');


router.get('/' , Usercontroler.home)

router.get('/profile', 
passport.checkAuthentication, 
Usercontroler.proFile)

router.get('/signup', Usercontroler.signUp);
router.get('/signin', Usercontroler.signIn);

router.post('/create', Usercontroler.create);




router.post('/createsession',
 passport.authenticate(
    'local',
    {failureRedirect: '/user/signin'},
) ,
Usercontroler.createSession)

router.get('/signout', Usercontroler.destroyession)


console.log('user router load');
module.exports = router;