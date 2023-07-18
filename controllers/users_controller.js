module.exports.profile = function(req , res){
    // return res.end('<h1> User profile controller is active');

    return res.render('user_profile' ,{
        title: "Home"
    });
}