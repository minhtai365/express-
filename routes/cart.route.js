var db=require('../db');
const express = require('express');
const router = express.Router();
var db=require('../db');
router.get('/add/:id',function(req,res,next){
    var proId=req.params.id;
    var ssId=req.signedCookies.ssId;
    if(!ssId){
         res.redirect('/product');
         return;
    }
    var count=db.get('session').find({'id':ssId}).get('cart.' + proId,0).value();
    db.get('session').find({'id':ssId}).set('cart.' + proId,count+1).write();
     res.redirect('/product');    
});

module.exports=router;
