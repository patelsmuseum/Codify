const User = require('../models/user');

module.exports.profile = function(req , res){
    // return res.end('<h1> User profile controller is active');

    return res.render('user_profile' ,{
        title: "Home"
    });
}

//rendering signup page for user
module.exports.signUp = function(req , res){
    return res.render('user_signup' , {
        title : "signUP"
    });
}

//rendering signin page for user
module.exports.signin = function(req , res){
    return res.render('user_signin' ,{
        title: "signIN"
    });
}

// module.exports.create = function(req , res){
//     if(req.body.password != req.body.confirm_password){
//         return res.redirect('back');
//     }

//     User.findOne({email: req.body.email} , function(err , user){
//         if(err){
//             console.log('error in finding user in signup ');
//             return;
//         }

//         if(!user){
//             User.create(req.body , function(err , user){
//                 if(err){
//                     console.log('error in creating  user in signup ');
//                     return;
//                 }
//                 return res.redirect('./users/sign-in');
//             })
//         }else{
//             return res.redirect('back');
//         }
//     });

// }

module.exports.create = async function (req, res) {
    if (req.body.password !== req.body.confirm_password) {
      return res.redirect('back');
    }
  
    try {
      const existingUser = await User.findOne({ email: req.body.email });
  
      if (!existingUser) {
        const newUser = await User.create(req.body);
        return res.redirect('sign-in');
      } else {
        return res.redirect('back');
      }
    } catch (error) {
      console.log('Error in user signup:', error);
      return res.status(500).send('An error occurred during user signup.');
    }
  };

module.exports.createSession = function(req , res){
    //todo later
}