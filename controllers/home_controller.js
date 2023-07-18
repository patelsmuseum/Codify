module.exports.home = function(req, res){
    // return res.end('<h1>express controller is up</h1>');

    return res.render('home' ,{
        title: "Home"
    });
}