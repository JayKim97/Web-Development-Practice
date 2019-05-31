const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const Comment     =require("../models/comment");
const middleware = require("../middleware");
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

router.post("/",middleware.isLoggedIn,(req,res)=>{
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var price = req.body.price;
   var author ={
       id: req.user._id,
       username: req.user.username
   };
   var newCampground = {name: name, image: image, description: desc, price: price,author: author};
   //create a new campground and save to DB
   Campground.create(newCampground,(err, newlyCreated)=>{
       if(err){
           console.log(err);
       }
       else{
           console.log(newlyCreated);
            res.redirect("/campgrounds");
       }
   });
});

//NEW 
router.get("/new",middleware.isLoggedIn,(req,res)=>{
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

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership,(req,res)=>{
    Campground.findById(req.params.id,(err,foundCampground)=>{
        if(err){
            req.flash("error", "Campground not found");
        }
        else{
            res.render("campgrounds/edit",{campground: foundCampground});
        }
    });
});
//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership,(req,res)=>{
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground,(err,updatedCampeground)=>{
        if(err){
            
            res.redirect("/campgrounds");
        }
        else{
            //redirect somewhere(show page)
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership,(req,res)=>{
    Campground.findByIdAndRemove(req.params.id,(err,campgroundRemoved)=>{
        if(err){
            res.redirect("/campgrounds");
        }
        // else{
        //     res.redirect("/campgrounds");
        // }
        else{
            Comment.deleteMany( {_id: { $in: campgroundRemoved.comments } }, (err) => {
                if (err) {
                    console.log(err);
                }
                res.redirect("/campgrounds");
            });
            req.flash("success", "Comment removed");
        }
    });
});



module.exports = router;