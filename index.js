var express = require("express");

const port= process.env.PORT || 3001;
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app =express();

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/reg',{
    useNewUrLParser :true,
    UseUnifiedTopoLogy:true

});

var db=mongoose.connection;
db.on('error',()=>console.log("error aala re sove kar"));
db.once('open',()=>console.log("connected to database"))

app.post("/signup",(req,res)=>{
    var fname =req.body.fname;
    var lname =req.body.lname;
    var email =req.body.email;
    var number =req.body.number;
    var pass =req.body.pass;
    var cpass =req.body.cpass;

    var data={
        "fname": fname,
        "lname": lname,
        "email": email,
        "number":number,
        "pass":pass,
        "cpass":cpass,

    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("record successfully")
    });

    return res.redirect('success.html')

})

app.get("/", (req,res) =>{
    res.send({
        "ALLow-access-ALLow-Origin":"*"
    })
   
}).listen(3000);

app.listen(port,(req,res)=>{
    console.log('server is running ');
} )


