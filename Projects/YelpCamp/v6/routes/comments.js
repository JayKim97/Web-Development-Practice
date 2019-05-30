const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment =require("../models/comment")

// =================
// COMMENTS ROUTE
// =================
router.get("/new", isLoggedIn, (req,res)=>{
    Campground.findById(req.params.id,(err, campground)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{campground: campground});
        }
    });
});

router.post("/",isLoggedIn,(req,res)=>{
    //look up campground using ID
    Campground.findById(req.params.id,(err,campground)=>{
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            //create new comment
            Comment.create(req.body.comment,(err,comment)=>{
                if(err){
                    console.log(err);
                }
                else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
        }
    });
});
//MIDDLEWARE
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;