const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

router.get("/", (req,res)=>{
    
    //get all campgrounds from DB
    Campground.find({},(err, allCampgrounds)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    })
});

router.post("/",(req,res)=>{
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

router.get("/new",(req,res)=>{
    res.render("campgrounds/new");
});

//show - more info about one campground
router.get("/:id",(req,res)=>{
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground)=>{
        if(err){
            console.log(err);
        }
        else{
            //console.log(foundCampground)
            //render show template
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    //render show template with that campground
});

module.exports = router;