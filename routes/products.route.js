var express = require('express');
const db = require('../db');
var router = express.Router();

router.get('/',function(req,res){
    var pag=parseInt(req.query.page)||1;//n
    var pages= 8; //x
    var start= (pag-1)*pages;
    var end= pag*pages;
    var num = db.get('products').value().length/pages;
    var inn=num % 1;
    if(inn!=0){
        num=num+1-inn;
    }
    res.render('products/index',{
        // products:db.get('products').value().slice(start,end)
        products:db.get('products').drop(start).take(pages).value(),
        pag:pag,
        num:num      

    });    
    
});

router.get('/search',function(req,res){
    var prd=req.query.pr
    var pag=parseInt(req.query.page)||1;
    var pages=8;
    var start=(pag-1)*pages;
    var end=pag*pages;
   
    var product=db.get('products').value().filter(function(pro){             
        return pro.name.toLowerCase().indexOf(prd.toLowerCase()) !== -1;    
    });
    // console.log(product.name);
    var num=product.length/pages;
    var inn=num%1;
    if(inn!=0){
        num=num+1-inn;
    }    
    res.render('products/index',{
        products:product.slice(start,end),
        pag:pag,
        num:num
    });
});

module.exports = router;