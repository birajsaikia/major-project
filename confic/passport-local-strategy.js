let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;

let User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function(email, password, done){
        User.findOne({email: email}, function(err, user){
            if(err){
                console.log('Error in finding user --> pasport')
                return done(null,err)
            }
            if( !user || user.password != password){
                console.log('invalid  User/password');
                return done(null, false);
            }
            return done(null, user);
        })
    }
));

//serializing the user to diside which kye to be in kept in the cookice
passport.serializeUser(function(user, done){
    done(null, user.id)
})

//// deserializing the user to diside which kye to be in kept in the cookice
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> pasport')
            return done(null,err)
        }
        return done(null, user);
    });
});

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    return res.redirect('/user/signin')
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    
    next();
}

module.exports = passport;