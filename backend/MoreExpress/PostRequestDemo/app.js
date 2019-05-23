var express = require("express");
var app = express();
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var friends = ["tony","chris","scott"];
app.set("view engine", "ejs");

app.get("/",function(req,res){
    res.render("home");
});

app.get("/friends",function(req,res){
    res.render("friends",{friends:friends});
});

app.post("/addFriend",function(req,res){
    var newfriend = req.body.newfriend;
    friends.push(newfriend);
    res.redirect("/friends");
});

app.listen(3000,function(){
    console.log("server started")
});