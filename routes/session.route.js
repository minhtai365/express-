
var shortid = require('shortid');
var db=require('../db');
// var { signedCookie } = require('cookie-parser');
module.exports=function(req,res,next){
    // var id=shortid.generate();
    // res.cookie('ssId',id);
    console.log(req.signedCookies.ssId);
    if (!req.signedCookies.ssId){    
        var sid=shortid.generate();
        res.cookie('ssId',sid,{
            signed: true
        });

        db.get('session').push({
            id: sid        
        }).write();    
    }
    next();
}