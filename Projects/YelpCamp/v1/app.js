const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

var campgrounds=[
    {name: "Salmon Creek", image: "https://mikeputnamphoto.files.wordpress.com/2008/08/lower-meadow-campsite.jpg"},
    {name: "Hopeful Future", image: "https://mikeputnamphoto.files.wordpress.com/2008/08/lower-meadow-campsite.jpg"},
    {name: "Depressing Past", image: "https://mikeputnamphoto.files.wordpress.com/2008/08/lower-meadow-campsite.jpg"},
    {name: "Salmon Creek", image: "https://mikeputnamphoto.files.wordpress.com/2008/08/lower-meadow-campsite.jpg"},
    {name: "Hopeful Future", image: "https://mikeputnamphoto.files.wordpress.com/2008/08/lower-meadow-campsite.jpg"},
    {name: "Depressing Past", image: "https://mikeputnamphoto.files.wordpress.com/2008/08/lower-meadow-campsite.jpg"},
    {name: "Salmon Creek", image: "https://mikeputnamphoto.files.wordpress.com/2008/08/lower-meadow-campsite.jpg"},
    {name: "Hopeful Future", image: "https://mikeputnamphoto.files.wordpress.com/2008/08/lower-meadow-campsite.jpg"},
    {name: "Depressing Past", image: "https://mikeputnamphoto.files.wordpress.com/2008/08/lower-meadow-campsite.jpg"}
];

app.get("/",(req, res)=>{
    res.render("landing");
});

app.get("/campgrounds", (req,res)=>{
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",(req,res)=>{
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image};
   campgrounds.push(newCampground);
   res.redirect("/campgrounds");
});

app.get("/campgrounds/new",(req,res)=>{
    res.render("new.ejs");
});

app.listen(3000,()=>{
    console.log("The YelpCamp Server");
});