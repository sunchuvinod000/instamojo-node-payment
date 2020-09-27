const express = require("express");
const insta = require("instamojo-nodejs");
const bodyparser = require("body-parser");
const API_KEY= "test_dfef3ec888869f6db66902453b8";
const AUTH_KEY= "test_be2f17e07d6eba0dd6b50904baf";


const app = express()

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json())
app.set('view engine','hbs');
const port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/pay',(req,res)=>{
    insta.setKeys(API_KEY, AUTH_KEY);
    const name= req.body.name;
    const email = req.body.email;
    const amount = req.body.amount;
    res.redirect('index')
    
})




 app.listen(port,()=>{
     console.log("listeing");
 })