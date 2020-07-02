var express = require('express');
var router = express.Router();
var md5=require('md5');

var db=require('../db');
const { signedCookie } = require('cookie-parser');


router.get('/index', function (req, res) {
    res.render('login/index')
});
router.post('/index', function (req, res) {
    var email=req.body.email;
    var pass=req.body.pass;
    var hashpass=md5(pass);
    var user=db.get('user').find({email:email}).value();
    if(!user){
        res.render('login/index',{
            Errors:[
                'User does not exist!!!'
            ],
            Values:req.body
        });
        return;
    };
    if(user.pass !== hashpass){
        res.render("login/index",{
            Errors:[
                "Wrong password !!!"
            ],
            Values:req.body
        });
        return;
    };
    res.cookie('userId',user.id,{
        signed:true
    });
    res.redirect("/user"); 
});

module.exports = router;