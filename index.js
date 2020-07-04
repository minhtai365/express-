require('dotenv').config();

const express=require('express');
const app=express();
const port=5555;
const userRoute=require('./routes/user.route');
const loginRoute=require('./routes/login.route');
const productsRoute=require('./routes/products.route');
const reqLogin=require('./requied/requied.login');
const cartRoute=require('./routes/cart.route');
var sessionRoute=require('./routes/session.route');
// cookie
var cookieParser = require('cookie-parser');

app.listen(port,function(){
    console.log('Server listening on port '+port); 
});

const bodyParser = require('body-parser')

//set pug
app.set('view engine','pug');
app.set('views', './view');
//body lấy dữ liệu nhập
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));

//cookie
app.use(cookieParser(process.env.signedval));
app.use(sessionRoute);

app.get('/',function(req,res){
        res.render('index',{bien:'Minh Tài'});
});
app.use('/user',reqLogin.login,userRoute);
app.use('/login',loginRoute);
app.use('/product',productsRoute);
app.use('/cart',cartRoute);

