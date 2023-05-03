let User = require('../models/user')

module.exports.home = function(req, res){
    return res.end('<h1>Euser profile</h1>')
}



module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile')
    }

    return res.render('user_sign_up', {
        title: "codilal | sign up"
    })
}
module.exports.proFile = async function(req, res){
    
    // return res.render('profile', {
    //     title: "codilal | profile",
    //     // user: user
    // })
    // if(req.cookies.user_id){
    //     User.findById(req.cookies.user_id, function(err, user){
    //         console.log(err);
    //         if(user){
               if(req.isAuthenticated()){ 
                return res.render('profile', {
                    title: "User profile",
                    user: req.user
                })
            }
            // }
            return res.redirect('/user/signin')
               
        // });

    // }
    // else{
    //     return res.redirect('/user/signin')
    // }
}


module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile')
    }

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
// module.exports.createSession = async function(req, res){
//     console.log(req.body)
//     let user = await User.findOne({ email: req.body.email });
//     //if user esist
//     console.log(user);
//     console.log(user.password, req.body.password);
//     if(user){

//         if(user.password != req.body.password){
//             return res.redirect('back');
//         }
//         res.cookie('user_id', user.id);
//         console.log(res.cookie);
//         return res.redirect("/user/profile")
//     }
//     else{
//         return res.redirect("back")
//     }
// }


module.exports.createSession = async function(req, res){
    return res.redirect('/');
}

module.exports.destroyession = async function(req, res){
    req.logout(
        function(err){
            if(err){
                console.log(err);
            }
        }
    );
    

    return res.redirect('/');
}
