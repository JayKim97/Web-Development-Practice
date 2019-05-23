var app = require("express")();

app.get("/",function(req,res){
    res.render("home.ejs");
});

app.get("/fallinlovewith/:thing",function(req,res){
    var thing = req.params.thing;
    res.render("love.ejs",{thing:thing});
});

app.listen(3000, function(){
    console.log("server started");
});