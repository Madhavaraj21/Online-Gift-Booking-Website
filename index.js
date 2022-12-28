var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const alert = require('alert')

const app = express()

app.use(bodyParser.json())
app.use(express.static('Public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/Logindb')
var db = mongoose.connection;
db.on('error',()=>console.log('Error in Connecting to Database'));
db.once('open',()=>console.log("connected to db"));

app.post("/sign_up",(req,res)=>{
    var name = req.body.Name;
    var email = req.body.Email;
    var password = req.body.Password;
    console.log(name);
    var data = {
        "name" : name,
        "email": email,
        "password" : password
     }
     db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
     });
     return res.redirect('Home page.html')
})



app.post("/sign_in",(req,res)=>{
    
    var email = req.body.email;
    var pass = req.body.password;

    db.collection("users").find( {email:email,password:pass} ).toArray(function(err, result) {
        if (err) throw err;
        if (result.length === 0){
            alert("Invalid UserName or Password");
        }
        else{
            return res.redirect('Home page.html')
        }
      });
})


app.get("/billing", (req, res)=>{
    res.redirect('payment.html')
})
app.post("/billing", (req, res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var address = req.body.address;
    var city = req.body.city;
    var zipcode = req.body.zipcode;   
    var data1 = {
        "name" : name,
        "email": email,
        "address" : address,
        "city" : city,
        "zipcode" : zipcode }
    
        db.collection('payment').insertOne(data1,(err,collection)=>{
            if(err){
                throw err;
            }
            console.log("Billing");
         });
     return res.redirect('carddetails.html')
})

app.get("/card", (req, res)=>{
    res.redirect('carddetails.html')
})
app.post("/card", (req, res)=>{
    var cardnumber = req.body.cardnumber;
    var expiremonth = req.body.expiremonth;
    var expireyear = req.body.expireyear;
    var ccv = req.body.ccv;   
    var data2 = {
        "cardnumber" : cardnumber,
        "expiremonth": expiremonth,
        "expireyear" : expireyear,
        "ccv" : ccv,}
db.collection('card').insertOne(data2,(err,collection)=>{
            if(err){
                throw err;
            }
            console.log("card");
         });
         alert("PAYMENT SUCCESSFUL");
     return res.redirect('Home Page.html')
})

app.post("/contact",(req,res)=>{
    var fname = req.body.fname;
    var phone = req.body.phone;
    var location = req.body.location;
    var subject = req.body.subject
    var data3 = {
        "name" : fname,
        "phone": phone,
        "location" : location,
        "subject" : subject
     }
     db.collection('contact').insertOne(data3,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Contact Successfully");
     });
     return res.redirect('Home page.html')
})

app.post("/product", function(req, res){
    var product = req.body.product;
     console.log(product)
     var data = {"product":product}
    db.collection('product').insertOne(data,(err,collection)=>{
     if(err){
         throw err;
     }
     console.log("Record Inserted Successfully");
  });
  return res.redirect('payment.html')
})
   

app.get('/',function(req,res){
    res.set({
        'Access-control-Allow-Origin': '*'
        });
    return res.redirect('login.html');
    }).listen(4000)
  
    
console.log("Listening on PORT 4000");

