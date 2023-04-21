let User = require('../models/user')

module.exports.home = function(req, res){
    return res.end('<h1>Euser profile</h1>')
}



module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "codilal | sign up"
    })
}
module.exports.proFile = function(req, res){
    return res.render('profile', {
        title: "codilal | profile"
    })
}


module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "codilal | sign in"
    })
}

module.exports.create = async function(req, res){
    if(req.body.password != req.body.conform_password){
        return res.redirect('back')
    }
    
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      User.create(req.body, function (err, user) {
        console.log(req.body);

        if (err) {
          console.log("error in creating user while signing up");
          return;
        }

        return res.redirect("/user/signin");
      });
    } else {
      return res.redirect("back");
    }


}

module.exports.createSession = async function(req, res){
    let user = await User.findOne({ email: req.body.email });
    //if user esist
    if(user){
        if(user.password != user.body.password){
            return res.redirect('back');
        }
        res.cookie('user_id', user.id);
        return res.redirect("/user/profile")
    }
}
