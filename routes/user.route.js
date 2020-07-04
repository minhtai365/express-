var express = require('express');
var router = express.Router();
//shortid
const shortid = require('shortid');
var db = require('../db');
//requied
var reqLogin=require('../requied/requied.login');

// var user = [
//     { id: 0, name: 'Trần' },
//     { id: 1, name: 'Minh' },
//     { id: 2, name: 'Tài' },
//     { id: 3, name: 'Thiên' }
// ];
router.get('/',function (req, res) {
    res.render('user/index', { 
        user: db.get('user').value()
    });
});
router.get('/search', function (req, res) {
    var q = req.query.q;
    var valsearch = db.get('user').value().filter(function (li) {
        return li.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    console.log(req.query);
    res.render('user/index', { user: valsearch });
});
router.get('/create', function (req, res) {
    res.render('user/create');
});
router.post('/create',function(req,res){
    req.body.id=shortid.generate();
    var err=[];
    if (!req.body.name) {
        err.push("Name is requied !!!")
    };
    if(err.length){
        res.render("user/create",{
            Errors:err,
            Values:req.body
        });
        return;
    }
    db.get('user').push(req.body).write();
    res.redirect('/user');
})
router.get('/:id', function (req, res) {
    var id = req.params.id;
    var user = db.get('user').find({id:id}).value();
    res.render('user/view', { user: user });
});




module.exports = router;