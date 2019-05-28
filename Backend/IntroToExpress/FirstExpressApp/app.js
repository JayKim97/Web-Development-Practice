var express = require("express");
var app = express();
// "/" => "hi there!"
app.get("/", function(req, res){
    res.send("Hi there!");
});

// "/bye" => "goodbye!"
app.get("/bye",function(req, res){
    res.send("Bye");
});

// "/dog" => "meow!"
app.get("/dog", function(req, res){
    res.send("meow");
});

app.get("/r/:subredditName",function(req, res){
    res.send(("welcome to subreddit "+req.params.subredditName).toUpperCase());
});

app.get("*",function(req,res){
    res.send("request failed");
})

// tell express to listen for requests
app.listen(3000, function(){
    console.log("server started");
});