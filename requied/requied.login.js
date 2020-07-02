var db=require('../db');

module.exports.login = function(req, res, next) {
    // console.log(req.cookies.userId);   
    if(!req.signedCookies.userId){
        res.redirect('/login/index');
        return;
    };
    var user=db.get('user').find({id:req.signedCookies.userId}).value();
    if(!user){
        res.redirect('/login/index');
        return; 
    };
    //locals biến tồn tại tại người dùng 1 phiên
    res.locals.auser = user;
    // console.log(res.locals.user);
    next();
};