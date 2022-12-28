var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var ejs=require("ejs")
const app = express()
app.set("view engine", "ejs");

app.use(bodyParser.json())
app.use('/',express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/test')

var db =mongoose.connection;

db.on('error',()=>console.log("Error in Connection to database"));
db.once('open',()=>console.log("Connected to Database"))

const movieSchema =new mongoose.Schema({
    // username: String,
    // email: String,
    // password: String    
    product : String
},
{ 
    collection:'note4'
})

const Movie = mongoose.model('Movie',movieSchema);



  app.get('/',(req,res)=>{
   Movie.find({},function(err,movies){
    res.render('sample',{ 
         MovieList: movies

   })   
   });
    
})

app.listen(3001,function(){

    console.log("Listening on PORT 3001"); 
});

