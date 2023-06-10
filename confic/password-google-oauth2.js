const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let crypto = require('crypto');
let User = require('../models/user')

passport.use(new GoogleStrategy({
    clientID: "812896215692-2orcnbmu8kovi2t3kdn6lrudqtbg95vu.apps.googleusercontent.com",
    clientSecret:  "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",
    callbackURL: "http://localhost:8000/user/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
        if(err){
            console.log("err in google stratgy",err);
            return;
        }
        console.log(profile);
        if(user){
            return done(null, user);
        }else{
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function(err, user){
                console.log("err in crateing user",err);
                return done(null, user);
            })
        }
    
      });
  }
));


module.exports = passport;