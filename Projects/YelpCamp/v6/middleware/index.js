const Campground = require("../models/campground");
const Comment     =require("../models/comment");
var middlewareObj={};
//MIDDLEWARE
middlewareObj.isLoggedIn = function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};


middlewareObj.checkCommentOwnership = function (req, res, next){
    //is user logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err,foundComment)=>{
            if(err){
                res.redirect("back");
            }
            else{
                //does user own the comment
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect("back");
                }
            }
        });
    }
    else{
        res.redirect("back");
    };
};
middlewareObj.checkCampgroundOwnership= function (req, res, next){
    //is user logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,(err,foundCampground)=>{
            if(err){
                res.redirect("back");
            }
            else{
                //does user own the campground
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect("back");
                }
            }
        });
    }
    else{
        //if not redirect
        res.redirect("back");
    }
}

module.exports = middlewareObj;