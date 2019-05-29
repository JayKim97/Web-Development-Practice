const express   = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Hopeful Future", 
//     image: "https://mikeputnamphoto.files.wordpress.com/2008/08/lower-meadow-campsite.jpg",
//     description: "This is hopeful future right across depressing past"
// }, (err,campground) =>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("created");
//         console.log(campground);
//     }
// });

app.get("/",(req, res)=>{
    res.render("landing");
});

app.get("/campgrounds", (req,res)=>{
    //get all campgrounds from DB
    Campground.find({},(err, allCampgrounds)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{campgrounds:allCampgrounds});
        }
    })
});

app.post("/campgrounds",(req,res)=>{
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description
   var newCampground = {name: name, image: image, description: desc};
   //create a new campground and save to DB
   Campground.create(newCampground,(err, newlyCreated)=>{
       if(err){
           console.log(err);
       }
       else{
            res.redirect("/campgrounds");
       }
   });
});

app.get("/campgrounds/new",(req,res)=>{
    res.render("new.ejs");
});

//show - more info about one campground
app.get("/campgrounds/:id",(req,res)=>{
    //find the campground with provided ID
    Campground.findById(req.params.id, (err, foundCampground)=>{
        if(err){
            console.log(err);
        }
        else{
            //render show template
            res.render("show", {campground: foundCampground});
        }
    });
    //render show template with that campground
});

app.listen(3000,()=>{
    console.log("The YelpCamp Server");
});