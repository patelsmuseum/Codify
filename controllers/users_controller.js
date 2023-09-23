const User = require('../models/user');
const fs = require('fs');
const path = require('path');


//manually serving to user profile
// module.exports.profile = async function (req, res) {
//   try {
//     if (req.cookies.user_id) {           //checking userid is present in cookies or not for checking sign in
//       const user = await User.findById(req.cookies.user_id).exec();    //if presnt then find user in db
//       if (user) {        //if user is present in db
//         return res.render('user_profile', {
//           title: "User",
//           user: user // Pass the 'user' object to the view
//         });
//       }
//       return res.redirect('sign-in'); //if not present in db
//     } else {
//       return res.redirect('sign-in');   // if cookies is not present 
//     }
//   } catch (error) {
//     // Handle any errors that occurred during the process
//     res.status(500).json({ error: 'An error occurred while fetching the user.'});
//   }
// };

//passport module k liye
module.exports.profile = async  function(req,res){
  try{
    const user = await User.findById(req.params.id);

    return res.render('user_profile' , {
      title:'profile' ,
      profile_user : user
    });
  }catch (err){
      console.log('Error in fetching the user ' , err);
  }
}

module.exports.update = async function(req, res){
   

  if(req.user.id == req.params.id){

      try{

          let user = await User.findById(req.params.id);
          User.uploadedAvatar(req, res, function(err){
              if (err){
                console.log('*****Multer Error: ', err)
              }
              
              console.log(req.file);
              user.name = req.body.name;
              user.email = req.body.email;

              if(req.file){

                if (user.avatar){
                  fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                }
                user.avatar = User.avatarPath + '/' + req.file.filename;
              }
              user.save();
              return res.redirect('back');
          });

      }catch(err){
          req.flash('error', err);
          return res.redirect('back');
      }

  }else{
      req.flash('error', 'Unauthorized!');
      return res.status(401).send('Unauthorized');
  }
}

//rendering signup page for user
module.exports.signUp = function(req , res){
  if(req.isAuthenticated()){                       // restricting this page when once loged in
    return  res.redirect('/users/profile');
  }


    return res.render('user_signup' , {
        title : "signUP"
    });
}

//rendering signin page for user
module.exports.signin = function(req , res){
  if(req.isAuthenticated()){                    //restricting this page once logged in
    return res.redirect('/users/profile');
  }
  
  return res.render('user_signin' ,{
        title: "signIN"
    });
}



//sign up process
module.exports.create = async function (req, res) {
    if (req.body.password !== req.body.confirm_password) {
      req.flash('error'  , 'Password not matched')
      return res.redirect('back');
    }
  
    try {
      const existingUser = await User.findOne({ email: req.body.email });
  
      if (!existingUser) {
        const newUser = await User.create(req.body);
        req.flash('success'  , 'Account created . Please login')
        return res.redirect('sign-in');
      } else {
        req.flash('error' , 'Already registered . Plaese sign in')
        return res.redirect('back');
      }
    } catch (error) {
      console.log('Error in user signup:', error);
      return res.status(500).send('An error occurred during user signup.');
    }
  };


// sign in and create a session for the user
// Manual authentication 
// module.exports.createSession = async function (req, res) {
//   try {
//     const user = await User.findOne({ email: req.body.email });

//     if (user) {
//       if (user.password !== req.body.password) {
//         return res.redirect('back');
//       }

//       res.cookie('user_id', user.id);
//       return res.redirect('profile');

//     } else {
//       return res.redirect('back');
//     }
    
//   } catch (error) {
//     console.log('Error in user sign-in:', error);
//     return res.status(500).send('An error occurred during user sign-in.');
//   }
// };

//using passport library creating session

module.exports.createSession = function(req,res){
  req.flash('success' , 'Logged in succesfully');
  return res.redirect('/');
}

module.exports.destroySession = function(req , res){
  req.logout(function(err){
    if(err){
      req.flash('error' , 'failed in logging out');
    }
    
    req.flash('success' , 'Logged out succesfully');
    return res.redirect('/');

  });

  
}