var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/",function(req,res){
    res.render("home");
});

app.get("/fallinlovewith/:thing",function(req,res){
    var thing = req.params.thing;
    res.render("love",{thing:thing});
});

app.get("/posts", function(req,res){
    var posts = [
        {title: "love soyeon", author: "abd"},
        {title: "Jeonsoyeon", author: "gidle"},
        {title: "(G)I-dle", author: "neverland"}
    ];

    res.render("posts",{posts: posts});
});

app.listen(3000, function(){
    console.log("server started");
});