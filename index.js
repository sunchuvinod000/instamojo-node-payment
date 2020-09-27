const express = require("express");

const Insta = require('instamojo-nodejs');

const bodyparser = require("body-parser");
const API_KEY = "test_dfef3ec888869f6db66902453b8";
const AUTH_KEY = "test_be2f17e07d6eba0dd6b50904baf";

Insta.isSandboxMode(true);

const app = express()

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json())
app.set('view engine','hbs');
const port = process.env.PORT || 3000;
app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/pay',(req,res)=>{
    Insta.setKeys(API_KEY, AUTH_KEY);
    const name= req.body.name;
    const email = req.body.email;
    const amount = req.body.amount;
    if(name && email && amount){

    const data = new Insta.PaymentData();
    const REDIRECT_URL = "https://paise-dey-baba.herokuapp.com/success"

    data.setRedirectUrl(REDIRECT_URL);
    data.send_email = "True";
    data.purpose = "testing "
    data.amount = amount;
    data.name = name;
    data.email = email;
    data.allow_repeated_payments = 'True';
    Insta.createPayment(data, function (error, response) {
        if (error) {
         console.log(error)
        } else {
          // Payment redirection link at response.payment_request.longurl
          res.render("index",{invoice:"Please check your email to make payment"})
        }
      });
    }
    else{
        res.render("index",{required:"*All feilds are required*"})
    }
    
})
app.get('/success',(req,res)=>{
     res.render("index",{success:"Your Payment is Successful"}) 
})




 app.listen(port,()=>{
     console.log("listeing");
 })